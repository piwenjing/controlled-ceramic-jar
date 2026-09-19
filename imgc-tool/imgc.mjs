#!/usr/bin/env node
/**
 * imgc — 个人图片 + 视频压缩 CLI
 *
 * 用法:
 *   imgc <input> [-o <output>] [-f webp|jpg|png] [-q 80] [-w 1600]
 *                [--crf 23] [--preset medium] [--no-audio] [--vcodec copy]
 *
 * 示例:
 *   imgc photo.jpg
 *   imgc ./photos ./videos --thumb 400
 *   imgc video.mp4 --crf 26 --preset slow
 *   imgc ./all-media --dry-run --json
 *
 * 图片输入: JPG / PNG / WebP / HEIC(iPhone 照片)/ TIFF  → sharp
 * 视频输入: MP4 / MOV / WebM / MKV / AVI / M4V          → ffmpeg
 *
 * 视频压缩需要系统装了 ffmpeg:`brew install ffmpeg`
 */

import sharp from "sharp";
import { promises as fs } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import { glob } from "glob";

// ─────────────────────────────────────────────────────────────────────
// 颜色输出(只在 TTY 启用,管道时去掉颜色避免污染日志)
// ─────────────────────────────────────────────────────────────────────
const C = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
  blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m", gray: "\x1b[90m",
};
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (color, text) => (useColor ? `${C[color]}${text}${C.reset}` : text);

// ─────────────────────────────────────────────────────────────────────
// 支持的文件后缀(图片 + 视频,小写比较)
// ─────────────────────────────────────────────────────────────────────
const IMAGE_EXT = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tiff", ".tif",
]);
const VIDEO_EXT = new Set([
  ".mp4", ".mov", ".m4v", ".webm", ".mkv", ".avi",
]);
const SUPPORTED_EXT = new Set([...IMAGE_EXT, ...VIDEO_EXT]);

// 视频默认输出格式
const VIDEO_OUT_EXT = "mp4";

// ─────────────────────────────────────────────────────────────────────
// ffmpeg 探测
// ─────────────────────────────────────────────────────────────────────
async function findTool(cmd) {
  return new Promise((resolve) => {
    const proc = spawn("which", [cmd], { stdio: ["ignore", "pipe", "ignore"] });
    let out = "";
    proc.stdout.on("data", (d) => (out += d));
    proc.on("close", (code) => resolve(code === 0 ? out.trim() : null));
  });
}

async function ensureFfmpeg() {
  const ffmpeg = await findTool("ffmpeg");
  const ffprobe = await findTool("ffprobe");
  return { ffmpeg, ffprobe };
}

// ─────────────────────────────────────────────────────────────────────
// 参数解析(轻量,够用就行)
// ─────────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {
    _: [],
    output: null,
    format: "webp",        // 图片输出格式
    quality: 80,
    width: 1600,
    thumb: null,
    recursive: true,
    dryRun: false,
    json: false,
    concurrency: 4,
    // 视频参数
    crf: 23,
    preset: "medium",
    audio: true,
    vcodec: "libx264",     // copy / libx264
  };

  const next = (i) => (i + 1 < argv.length ? argv[i + 1] : null);

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") args.help = true;
    else if (a === "-o" || a === "--output") args.output = next(i), i++;
    else if (a === "-f" || a === "--format") args.format = String(next(i) || "webp"), i++;
    else if (a === "-q" || a === "--quality") args.quality = Number(next(i) || 80), i++;
    else if (a === "-w" || a === "--width") args.width = Number(next(i) || 1600), i++;
    else if (a === "-w0" || a === "--no-width") args.width = 0, i++;
    else if (a === "--thumb") args.thumb = Number(next(i) || 400), i++;
    else if (a === "--no-thumb") args.thumb = null;
    else if (a === "--no-recursive") args.recursive = false;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--json") args.json = true;
    else if (a === "--no-color") process.env.NO_COLOR = "1";
    else if (a === "-j" || a === "--jobs") args.concurrency = Number(next(i) || 4), i++;
    // 视频选项
    else if (a === "--crf") args.crf = Number(next(i) || 23), i++;
    else if (a === "--preset") args.preset = String(next(i) || "medium"), i++;
    else if (a === "--no-audio") args.audio = false;
    else if (a === "--vcodec") args.vcodec = String(next(i) || "libx264"), i++;
    else if (!a.startsWith("-")) args._.push(a);
  }
  return args;
}

function printHelp() {
  console.log(`
${paint("cyan", "imgc")} — 图片 + 视频压缩 CLI(macOS / WebP / MP4)

${paint("bold", "用法")}
  ${paint("gray", "imgc")} ${paint("yellow", "<input> [input ...]")} ${paint("gray", "[options]")}

  ${paint("yellow", "<input>")}  一个或多个文件 / 目录,空格分隔(支持 Finder 拖拽)
  自动按扩展名分发:${paint("cyan", "图片")} 走 sharp,${paint("cyan", "视频")} 走 ffmpeg
  多个输入时,统一输出到第一个输入父目录的 ./compressed/(可用 -o 指定)

${paint("bold", "通用选项")}
  ${paint("green", "-o")}, ${paint("green", "--output")}  ${paint("gray", "<dir>")}    输出目录
  ${paint("green", "-j")}, ${paint("green", "--jobs")}     ${paint("gray", "<n>")}      并发数(默认 4,视频重建议 2)
  ${paint("green", "--dry-run")}                  只看不写,显示预估效果
  ${paint("green", "--json")}                     JSON 输出(给脚本调用)
  ${paint("green", "--no-color")}                 关闭颜色

${paint("bold", "图片选项")}
  ${paint("green", "-f")}, ${paint("green", "--format")}  ${paint("gray", "<fmt>")}    输出格式  webp / jpg / png(默认 webp)
  ${paint("green", "-q")}, ${paint("green", "--quality")} ${paint("gray", "<1-100>")}  质量(默认 80)
  ${paint("green", "-w")}, ${paint("green", "--width")}   ${paint("gray", "<px>")}     最大宽度(默认 1600)
  ${paint("green", "--no-width")}                不限制宽度
  ${paint("green", "--thumb")}      ${paint("gray", "<px>")}     同时输出缩略图(默认 400)
  ${paint("green", "--no-recursive")}               不递归子目录

${paint("bold", "视频选项")}
  ${paint("green", "--crf")}        ${paint("gray", "<0-51>")}   视频质量(默认 23,18 高质/26 高压)
  ${paint("green", "--preset")}     ${paint("gray", "<name>")}  编码预设  fast/medium/slow(默认 medium)
  ${paint("green", "--vcodec")}     ${paint("gray", "<codec>")} 视频编码  libx264/copy(默认 libx264,copy 不重编码)
  ${paint("green", "--no-audio")}                  去掉音频
  ${paint("green", "-w")}                          最大宽度(视频也生效,默认 1600 → 限到 1600px)

${paint("bold", "示例")}
  ${paint("gray", "$")} imgc photo.jpg                     ${paint("dim", "# 单图片 → WebP")}
  ${paint("gray", "$")} imgc ./photos                      ${paint("dim", "# 整个目录")}
  ${paint("gray", "$")} imgc video.mp4 --crf 26            ${paint("dim", "# 单视频,高压缩")}
  ${paint("gray", "$")} imgc ./videos --preset slow       ${paint("dim", "# 更慢但更小")}
  ${paint("gray", "$")} imgc ./all-media                   ${paint("dim", "# 图片 + 视频混合,自动分发")}
  ${paint("gray", "$")} imgc a.jpg video.mp4 ./photos      ${paint("dim", "# 文件 + 目录混合")}
  ${paint("gray", "$")} imgc ./media --dry-run --json      ${paint("dim", "# 预览,不写文件")}

${paint("bold", "支持格式")}
  图片: ${paint("cyan", "JPG / PNG / WebP / HEIC / TIFF")}      → sharp
  视频: ${paint("cyan", "MP4 / MOV / WebM / MKV / AVI / M4V")}  → ffmpeg(${paint("yellow", "需 brew install ffmpeg")})
`);
}

// ─────────────────────────────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────────────────────────────
const fmtSize = (b) => {
  if (b == null) return "?";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(2)} MB`;
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const fmtPct = (before, after) => {
  if (!before) return "0%";
  const ratio = (1 - after / before) * 100;
  return (ratio >= 0 ? "-" : "+") + Math.abs(ratio).toFixed(1) + "%";
};

const fmtTime = (sec) => {
  if (!sec || !isFinite(sec)) return "?";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
                 : `${m}:${String(s).padStart(2, "0")}`;
};

async function getFiles(input, recursive) {
  const stat = await fs.stat(input);
  if (stat.isFile()) return [input];
  const pattern = recursive ? "**/*" : "*";
  const matches = await glob(pattern, { cwd: input, absolute: true, nocase: true });
  return matches.filter((f) => SUPPORTED_EXT.has(path.extname(f).toLowerCase()));
}

function deriveOutputPath(input, outputDir, format) {
  const base = path.basename(input, path.extname(input));
  return path.join(outputDir, `${base}.${format}`);
}

function deriveThumbPath(input, outputDir, thumbWidth, format) {
  const ext = path.extname(input);
  const base = path.basename(input, ext);
  return path.join(outputDir, `${base}-${thumbWidth}w.${format}`);
}

// ─────────────────────────────────────────────────────────────────────
// 视频信息读取(ffprobe)
// ─────────────────────────────────────────────────────────────────────
async function getVideoInfo(ffprobe, input) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffprobe, [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries", "format=duration:stream=width,height,codec_name",
      "-of", "json",
      input,
    ], { stdio: ["ignore", "pipe", "pipe"] });

    let out = "";
    proc.stdout.on("data", (d) => (out += d));
    proc.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffprobe exited ${code}`));
      try {
        const json = JSON.parse(out);
        const stream = json.streams?.[0] || {};
        resolve({
          width: stream.width || 0,
          height: stream.height || 0,
          duration: parseFloat(json.format?.duration || stream.duration || "0") || 0,
          codec: stream.codec_name || "unknown",
        });
      } catch (e) {
        reject(new Error("parse ffprobe json failed"));
      }
    });
    proc.on("error", reject);
  });
}

// ─────────────────────────────────────────────────────────────────────
// ffmpeg 执行(异步,监听 stderr 拿实时进度)
// ─────────────────────────────────────────────────────────────────────
function runFfmpeg(ffmpeg, ffmpegArgs, onProgress) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpeg, ffmpegArgs, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    let lastLine = "";

    proc.stderr.on("data", (data) => {
      const chunk = data.toString();
      stderr += chunk;
      // 解析最后一行 time= 进度
      const lines = chunk.split("\n");
      lastLine = lines[lines.length - 2] || lastLine;
      const m = lastLine.match(/time=(\d+):(\d+):(\d+\.\d+)/);
      if (m && onProgress) {
        const t = Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
        onProgress(t);
      }
    });

    proc.on("close", (code) => {
      if (code === 0) resolve({ code, stderr });
      else {
        const tail = stderr.split("\n").filter(Boolean).slice(-8).join("\n");
        reject(new Error(`ffmpeg 退出码 ${code}\n${tail}`));
      }
    });
    proc.on("error", reject);
  });
}

// ─────────────────────────────────────────────────────────────────────
// 图片压缩
// ─────────────────────────────────────────────────────────────────────
async function compressImage(input, args, outputDir) {
  const before = (await fs.stat(input)).size;
  const meta = await sharp(input).metadata();

  if (args.dryRun) {
    const estFactor = args.format === "webp" ? 0.18 : args.format === "jpg" ? 0.28 : 0.4;
    const estAfter = Math.max(1024, Math.round(before * estFactor));
    return { input, before, after: estAfter, dryRun: true, width: meta.width, height: meta.height, type: "image" };
  }

  await fs.mkdir(outputDir, { recursive: true });
  const outPath = deriveOutputPath(input, outputDir, args.format);

  let pipeline = sharp(input).rotate();
  if (args.width > 0) pipeline = pipeline.resize({ width: args.width, withoutEnlargement: true });

  let outInfo;
  if (args.format === "webp") outInfo = await pipeline.webp({ quality: args.quality }).toFile(outPath);
  else if (args.format === "jpg" || args.format === "jpeg")
    outInfo = await pipeline.jpeg({ quality: args.quality, mozjpeg: true }).toFile(outPath);
  else if (args.format === "png")
    outInfo = await pipeline.png({ quality: args.quality, compressionLevel: 9 }).toFile(outPath);
  else throw new Error(`unsupported format: ${args.format}`);

  const after = outInfo.size;
  const result = {
    input, output: outPath, before, after,
    width: outInfo.width, height: outInfo.height, type: "image",
  };

  if (args.thumb) {
    const thumbOut = deriveThumbPath(input, outputDir, args.thumb, args.format);
    const thumbInfo = await sharp(input)
      .rotate()
      .resize({ width: args.thumb, withoutEnlargement: true })
      .toFormat(args.format, { quality: 75 })
      .toFile(thumbOut);
    result.thumb = thumbOut;
    result.thumbSize = thumbInfo.size;
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────
// 视频压缩(ffmpeg)
// ─────────────────────────────────────────────────────────────────────
async function compressVideo(input, args, outputDir, tools) {
  const before = (await fs.stat(input)).size;
  let info;
  try {
    info = await getVideoInfo(tools.ffprobe, input);
  } catch (e) {
    info = { width: 0, height: 0, duration: 0, codec: "?" };
  }

  if (args.dryRun) {
    // 经验估算:
    //   copy 模式:基本不变
    //   libx264 重编码 crf 23:大约 30-50% 节省
    //   更高 crf 或源很大:可能省 60-80%
    const factor = args.vcodec === "copy" ? 0.95 : args.crf >= 28 ? 0.25 : args.crf >= 26 ? 0.32 : 0.4;
    const estAfter = Math.round(before * factor);
    return {
      input, before, after: estAfter, dryRun: true,
      width: info.width, height: info.height, duration: info.duration, codec: info.codec, type: "video",
    };
  }

  await fs.mkdir(outputDir, { recursive: true });
  const base = path.basename(input, path.extname(input));
  const outPath = path.join(outputDir, `${base}.${VIDEO_OUT_EXT}`);

  const ffmpegArgs = [
    "-y",                       // 覆盖已存在
    "-hide_banner", "-loglevel", "error",
    "-i", input,
    "-c:v", args.vcodec,
  ];

  if (args.vcodec !== "copy") {
    ffmpegArgs.push("-crf", String(args.crf));
    ffmpegArgs.push("-preset", args.preset);
    if (args.width > 0 && info.width && info.width > args.width) {
      ffmpegArgs.push("-vf", `scale=${args.width}:-2`);
    }
  }

  if (args.audio) {
    ffmpegArgs.push("-c:a", "aac", "-b:a", "128k");
  } else {
    ffmpegArgs.push("-an");
  }

  // web 友好:把 moov atom 移到文件头,网页能边下边播
  ffmpegArgs.push("-movflags", "+faststart");
  ffmpegArgs.push(outPath);

  const startTime = Date.now();
  await runFfmpeg(tools.ffmpeg, ffmpegArgs);
  const elapsed = (Date.now() - startTime) / 1000;

  const after = (await fs.stat(outPath)).size;
  return {
    input, output: outPath, before, after,
    width: info.width, height: info.height, duration: info.duration, codec: info.codec,
    elapsed, type: "video",
  };
}

// ─────────────────────────────────────────────────────────────────────
// 分发:按扩展名走 image / video
// ─────────────────────────────────────────────────────────────────────
async function dispatch(input, args, outputDir, tools) {
  const ext = path.extname(input).toLowerCase();
  try {
    if (VIDEO_EXT.has(ext)) return await compressVideo(input, args, outputDir, tools);
    if (IMAGE_EXT.has(ext)) return await compressImage(input, args, outputDir);
    return { input, error: `unsupported extension: ${ext}` };
  } catch (e) {
    return { input, error: e.message };
  }
}

// ─────────────────────────────────────────────────────────────────────
// 主流程
// ─────────────────────────────────────────────────────────────────────
async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args._.length === 0) {
    printHelp();
    return;
  }

  const inputs = args._;

  // 探测 ffmpeg(仅在用户输入含视频时才强制要求)
  const tools = await ensureFfmpeg();

  // 验证所有输入路径
  const validInputs = [];
  for (const input of inputs) {
    const stat = await fs.stat(input).catch(() => null);
    if (!stat) {
      console.error(paint("red", `✗ 输入路径不存在: ${input}`));
      continue;
    }
    validInputs.push({ input, stat });
  }

  if (validInputs.length === 0) {
    console.error(paint("red", "✗ 没有有效输入"));
    process.exit(1);
  }

  // 探测是否需要 ffmpeg(输入里有视频文件就强依赖)
  let needsFfmpeg = false;
  for (const { input, stat } of validInputs) {
    if (stat.isFile() && VIDEO_EXT.has(path.extname(input).toLowerCase())) needsFfmpeg = true;
    // 目录:用 glob 探测一下里头的视频(简化:跳过,报错时再让用户确认)
  }
  if (needsFfmpeg && (!tools.ffmpeg || !tools.ffprobe)) {
    console.error(paint("red", "✗ 视频压缩需要 ffmpeg,系统找不到"));
    console.error(paint("yellow", "  macOS 安装:brew install ffmpeg"));
    console.error(paint("gray", `  which ffmpeg → ${tools.ffmpeg || "(未找到)"}, which ffprobe → ${tools.ffprobe || "(未找到)"}`));
    process.exit(1);
  }

  // 输出目录
  let outputDir;
  if (args.output) {
    outputDir = args.output;
  } else if (validInputs.length === 1) {
    const { input, stat } = validInputs[0];
    outputDir = stat.isFile()
      ? path.join(path.dirname(input), "compressed")
      : path.join(path.dirname(input), `${path.basename(input)}-compressed`);
  } else {
    outputDir = path.join(path.dirname(validInputs[0].input), "compressed");
  }

  for (const { input } of validInputs) {
    const absInput = path.resolve(input);
    const absOutput = path.resolve(outputDir);
    if (absOutput === absInput || absOutput.startsWith(absInput + path.sep)) {
      console.error(paint("red", `✗ 输出目录不能是输入目录的子目录: ${outputDir} (输入: ${input})`));
      process.exit(1);
    }
  }

  // 收集文件
  console.log(paint("cyan", `🔍 扫描 ${validInputs.length} 个路径:`));
  const allFiles = [];
  for (const { input } of validInputs) {
    const fromInput = await getFiles(input, args.recursive);
    if (fromInput.length === 0) {
      console.log(paint("gray", `   ⚠ ${input} (无支持的图/视频)`));
    } else {
      const images = fromInput.filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase())).length;
      const videos = fromInput.filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase())).length;
      const parts = [];
      if (images) parts.push(paint("cyan", `${images} 图`));
      if (videos) parts.push(paint("magenta", `${videos} 视频`));
      console.log(`   ✓ ${input}  →  ${parts.join(" + ")}`);
      allFiles.push(...fromInput);
    }
  }

  // 视频多了 → 自动降并发(避免 CPU 爆)
  const videoCount = allFiles.filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase())).length;
  const actualConcurrency = videoCount > 5
    ? Math.min(args.concurrency, 2)
    : videoCount > 0
    ? Math.min(args.concurrency, 3)
    : args.concurrency;
  if (videoCount > 0 && actualConcurrency < args.concurrency) {
    console.log(paint("gray", `   ℹ  检测到 ${videoCount} 个视频,自动降并发到 ${actualConcurrency}`));
  }

  const uniqueFiles = [...new Set(allFiles)];
  if (uniqueFiles.length === 0) {
    console.error(paint("yellow", "⚠ 没找到支持的图/视频"));
    return;
  }

  const imageCount = uniqueFiles.filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase())).length;
  const totalVideos = uniqueFiles.length - imageCount;
  console.log(
    paint("cyan", `📁 共 ${uniqueFiles.length} 个文件(图片 ${imageCount} + 视频 ${totalVideos}) → 输出: ${outputDir}`)
  );
  console.log(
    paint("gray", `   图片:格式=${args.format} 质量=${args.quality} 宽度=${args.width > 0 ? "≤" + args.width + "px" : "不限"}`)
  );
  if (totalVideos > 0) {
    console.log(
      paint("gray", `   视频:vcodec=${args.vcodec} crf=${args.crf} preset=${args.preset} audio=${args.audio ? "yes" : "no"}`)
    );
  }
  if (args.thumb) console.log(paint("gray", `   缩略图:${args.thumb}px`));
  if (args.dryRun) console.log(paint("yellow", "   ⚠ DRY RUN — 不写文件"));
  console.log("");

  if (!args.dryRun) await fs.mkdir(outputDir, { recursive: true });

  // 并发处理
  const results = [];
  const startTime = Date.now();
  for (let i = 0; i < uniqueFiles.length; i += actualConcurrency) {
    const chunk = uniqueFiles.slice(i, i + actualConcurrency);
    const chunkResults = await Promise.all(
      chunk.map(async (f) => await dispatch(f, args, outputDir, tools))
    );
    results.push(...chunkResults);

    for (const r of chunkResults) {
      const idx = results.length - chunkResults.length + chunkResults.indexOf(r) + 1;
      const num = paint("gray", `[${String(idx).padStart(String(uniqueFiles.length).length)}/${uniqueFiles.length}]`);
      if (r.error) {
        console.log(`${num} ${paint("red", "✗")} ${paint("bold", path.basename(r.input))} ${paint("red", r.error)}`);
      } else {
        const tag = r.type === "video" ? paint("magenta", "▶") : paint("cyan", "✓");
        const name = paint("bold", path.basename(r.input));
        const before = paint("gray", fmtSize(r.before));
        const after = paint("green", fmtSize(r.after));
        const pct = fmtPct(r.before, r.after);
        const pctColor = r.after < r.before ? "green" : "yellow";
        const extra = r.type === "video" && r.duration
          ? paint("gray", ` (${fmtTime(r.duration)} ${r.width}×${r.height})`)
          : "";
        console.log(`${num} ${tag} ${name}${extra} ${before} → ${after} ${paint(pctColor, "(" + pct + ")")}`);
        if (r.thumbSize) {
          console.log(`        ${paint("gray", "└─ 缩略图:" + fmtSize(r.thumbSize))}`);
        }
        if (r.type === "video" && r.elapsed) {
          console.log(`        ${paint("gray", "└─ 编码用时:" + fmtTime(r.elapsed))}`);
        }
      }
    }
  }

  // 汇总
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const successful = results.filter((r) => !r.error);
  const failed = results.length - successful.length;
  const totalBefore = successful.reduce((s, r) => s + r.before, 0);
  const totalAfter = successful.reduce((s, r) => s + r.after, 0);
  const totalThumb = successful.reduce((s, r) => s + (r.thumbSize || 0), 0);
  const totalVideo = successful.filter((r) => r.type === "video").length;
  const totalImage = successful.length - totalVideo;

  console.log("");
  console.log(paint("bold", "📊 汇总"));
  console.log(`   处理: ${paint("green", successful.length + "/" + results.length)} 个${failed ? paint("red", " (失败 " + failed + ")") : ""}`);
  if (totalImage) console.log(`     图片 ${totalImage} 个`);
  if (totalVideo) console.log(`     视频 ${totalVideo} 个`);
  console.log(`   输入: ${paint("gray", fmtSize(totalBefore))}  →  输出: ${paint("green", fmtSize(totalAfter))}`);
  if (!args.dryRun && totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log(`   节省: ${paint("green", fmtSize(saved) + " (-" + pct + "%)")}`);
  }
  if (args.thumb && totalThumb > 0) console.log(`   缩略图: ${paint("gray", fmtSize(totalThumb))}`);
  console.log(`   用时: ${paint("cyan", elapsed + "s")}  输出目录: ${paint("cyan", outputDir)}`);

  if (args.json) {
    const out = {
      output: outputDir,
      count: successful.length,
      imageCount: totalImage,
      videoCount: totalVideo,
      failed,
      totalBefore,
      totalAfter,
      saved: totalBefore - totalAfter,
      savedPct: totalBefore > 0 ? (1 - totalAfter / totalBefore) * 100 : 0,
      elapsed: Number(elapsed),
      results: successful,
    };
    console.log("");
    console.log(JSON.stringify(out, null, 2));
  }

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error(paint("red", "✗ " + err.message));
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
});
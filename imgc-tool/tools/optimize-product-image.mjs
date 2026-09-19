#!/usr/bin/env node
/**
 * 把 amphora-clean.png 转成 webp 产品展示图
 * - 保持原图比例(竖向 1105:1920)
 * - 高质量 webp 编码
 * - 输出到同目录,文件名同用户给的 OSS 命名
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "amphora-clean.png");
const output = path.join(__dirname, "amphora-en-clean.webp");

const meta = await sharp(input).metadata();
console.log(`📷 输入: ${path.basename(input)}`);
console.log(`   ${meta.width}x${meta.height} ${meta.format}`);

await sharp(input)
  .webp({ quality: 92, effort: 4 })
  .toFile(output);

const outMeta = await sharp(output).metadata();
const inStat = await import("node:fs").then((fs) => fs.statSync(input));
const outStat = await import("node:fs").then((fs) => fs.statSync(output));
const ratio = (1 - outStat.size / inStat.size) * 100;

console.log(`\n✅ 输出: ${path.basename(output)}`);
console.log(`   ${outMeta.width}x${outMeta.height} webp`);
console.log(`   ${(inStat.size / 1024).toFixed(0)} KB → ${(outStat.size / 1024).toFixed(0)} KB (${ratio > 0 ? "省" : "增"} ${Math.abs(ratio).toFixed(0)}%)`);
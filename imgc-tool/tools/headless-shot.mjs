#!/usr/bin/env node
/**
 * 用 Chrome headless 渲染 HTML 并截图
 * 用法:node headless-shot.mjs <html-file> <output-png> [--width=1400] [--height=1100]
 */

import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("用法:node headless-shot.mjs <input.html> <output.png> [options]");
  process.exit(1);
}

const input = path.resolve(args[0]);
const output = path.resolve(args[1]);

let width = 1400;
let height = 1100;
for (const a of args.slice(2)) {
  const m = a.match(/^--(?:width|w)=(\d+)$/);
  if (m) width = Number(m[1]);
  const m2 = a.match(/^--(?:height|h)=(\d+)$/);
  if (m2) height = Number(m2[1]);
}

// 输出目录确保存在
await fs.mkdir(path.dirname(output), { recursive: true });

console.log(`📸 Chrome headless:`);
console.log(`   input:  ${input}`);
console.log(`   output: ${output}`);
console.log(`   size:   ${width}x${height}`);

const proc = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--force-device-scale-factor=2",  // 高清输出(2x DPR)
  `--window-size=${width},${height}`,
  `--screenshot=${output}`,
  `file://${input}`,
], { stdio: ["ignore", "inherit", "inherit"] });

await new Promise((resolve, reject) => {
  proc.on("close", (code) => {
    if (code === 0) {
      console.log(`✅ 截图完成: ${output}`);
      resolve();
    } else {
      reject(new Error(`Chrome 退出码 ${code}`));
    }
  });
  proc.on("error", reject);
});
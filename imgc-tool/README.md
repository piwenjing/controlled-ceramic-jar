# imgc — macOS 图片压缩 CLI

一行命令批量压缩图片,默认输出 **WebP**,体积降 70-90%。Finder 拖拽即用。

## 安装

```bash
cd /Users/mr.root/IdeaProject/imgc-tool
./install.sh
```

脚本会自动:
1. 装依赖(`sharp` + `glob`)
2. 把 `imgc.mjs` 软链到 `~/bin/imgc`
3. 检查 `~/bin` 是否在 `PATH`,不在就提示你加 `export PATH="$HOME/bin:$PATH"` 到 `~/.zshrc`

## 用法

```bash
imgc <input> [input ...] [options]
```

`<input>` 可以是**多个文件 / 目录**,用空格分隔。Finder 拖拽即用:

```
$ imgc photo1.jpg photo2.jpg ./photos/
🔍 扫描 3 个路径:
   ✓ photo1.jpg  →  1 张
   ✓ photo2.jpg  →  1 张
   ✓ ./photos/   →  12 张
📁 共 14 张图 → 输出: ./compressed/
```

多个输入时,默认统一输出到**第一个输入父目录**的 `./compressed/`。可以用 `-o <dir>` 指定其他位置。

**自动按扩展名分发**:
- 图片(jpg/png/webp/heic/tiff)→ sharp 引擎
- 视频(mp4/mov/webm/mkv/avi/m4v)→ ffmpeg 引擎

### 常用示例

```bash
imgc photo.jpg                       # 单文件 → ./compressed/photo.webp
imgc ./photos                        # 整个目录,递归 → ./photos-compressed/
imgc a.jpg b.jpg c.jpg               # 多个文件,空格分隔
imgc ./photos ./more-photos a.jpg    # 文件 + 目录混合(去重后统一输出)
imgc ./photos -o ./webp              # 指定输出目录
imgc ./photos -q 75                  # 质量 75(默认 80)
imgc ./photos -w 1200                # 限制宽度 1200px(默认 1600)
imgc ./photos --thumb 400            # 同时出 400px 缩略图
imgc ./photos --dry-run              # 只看不压,预览预估效果
imgc ./photos --format jpg -q 70     # 输出 JPG 而非 WebP
imgc ./photos --no-recursive         # 不递归子目录
imgc ./photos -j 8                   # 8 并发(默认 4)

# 视频
imgc video.mp4                       # 单视频 → libx264 crf 23
imgc video.mp4 --crf 26              # 高压缩
imgc video.mp4 --preset slow         # 更慢但更小
imgc video.mp4 --no-audio            # 去音频
imgc video.mp4 --vcodec copy         # 不重编码(快,适合已 H.264 的素材)
imgc ./videos                        # 整个视频目录
imgc ./all-media                     # 图片 + 视频混合,自动分发
```

### 所有选项

| 选项 | 说明 | 默认 |
|---|---|---|
| `-o, --output <dir>` | 输出目录 | `./<name>-compressed/` |
| `-f, --format <webp\|jpg\|png>` | **图片**输出格式 | `webp` |
| `-q, --quality <1-100>` | **图片**质量 | `80` |
| `-w, --width <px>` | 最大宽度(图/视频都生效) | `1600` |
| `--no-width` | 不限制宽度 | — |
| `--thumb <px>` | 同时输出图片缩略图 | 关闭 |
| `--no-recursive` | 不递归子目录 | 递归 |
| `--crf <0-51>` | **视频**质量(18 高质/26 高压) | `23` |
| `--preset <fast\|medium\|slow>` | **视频**编码预设 | `medium` |
| `--vcodec <libx264\|copy>` | **视频**编码器(`copy` 不重编码) | `libx264` |
| `--no-audio` | 视频去掉音频 | 关闭 |
| `-j, --jobs <n>` | 并发数(视频多时自动降) | `4` |
| `--dry-run` | 只看不写 | 关闭 |
| `--json` | JSON 输出 | 关闭 |
| `--no-color` | 关闭颜色 | 自动 |

## 支持的输入格式

- **图片**:JPG / PNG / WebP / HEIC(iPhone 照片)/ TIFF
- **视频**:MP4 / MOV / WebM / MKV / AVI / M4V(需要 ffmpeg)

视频压缩需要先装 ffmpeg:

```bash
brew install ffmpeg
```

## Finder 拖拽

直接把文件 / 文件夹从 Finder 拖到 Terminal 即可,空格和引号自动处理:

```
$ imgc /Users/mr.root/Pictures/案例照片/  --thumb 400
🔍 扫描: /Users/mr.root/Pictures/案例照片/
📁 找到 12 张图 → 输出: /Users/mr.root/Pictures/案例照片-compressed/
   格式: webp  质量: 80  宽度: ≤1600px  并发: 4
   缩略图: 400px
```

## 卸载

```bash
rm ~/bin/imgc
rm -rf /Users/mr.root/IdeaProject/imgc-tool
```

## 项目结构

```
imgc-tool/
├── imgc.mjs       # CLI 入口(shebang,直接 node 跑)
├── package.json   # 依赖 + bin 声明
├── install.sh     # 一键安装
├── README.md      # 本文件
└── tools/         # 辅助脚本 + 真实工作流产物(见下)
```

## 依赖

- [`sharp`](https://sharp.pixelplumbing.com/) — 图片处理引擎(libvips 内核,极快)
- [`glob`](https://github.com/isaacs/node-glob) — 文件匹配

## 实现细节

- **EXIF 自动旋转** — iPhone 拍的照片方向信息不丢
- **等比缩放** — 默认限制宽度 1600px,`withoutEnlargement: true` 防止小图被放大
- **不覆盖原图** — 默认输出到独立子目录,`./<input>-compressed/`
- **并发处理** — 默认 4 并发,可调
- **格式智能** — WebP 走 `quality` 参数,JPG 走 `mozjpeg`(质量更好体积更小),PNG 走 `compressionLevel: 9`
- **HEIC 支持** — 底层用 libvips 自带的 libheif 解码
- **EXIF 警告** — 不保留 EXIF 信息(更适合网页,如果需要保留可以加 `.withMetadata()`)

## 辅助脚本(`tools/`)

`tools/` 里是手动工作流里用到的两个独立小脚本,跟主 CLI 解耦但复用 `sharp`:

### `tools/headless-shot.mjs` — HTML → PNG

用 Chrome headless 渲染 HTML 并截图(2x DPR 高清)。

```bash
# 装了 Chrome 即可
node tools/headless-shot.mjs input.html output.png --width=1400 --height=1100
```

适用场景:HTML 模板 + SVG/CSS 标注 + 浏览器渲染 → 高清截图。比纯 sharp 直接画更灵活(CSS 文字、阴影、虚线引线都能画)。

### `tools/optimize-product-image.mjs` — 产品图优化

`sharp` 把大图重压成高质量 WebP,保持原比例。默认拿 `amphora-clean.png` 输 `amphora-en-clean.webp`,可直接改文件头路径复用。

```bash
node tools/optimize-product-image.mjs
# 📷 输入: amphora-clean.png
#    1105x1920 png
# ✅ 输出: amphora-en-clean.webp
#    87 KB → 67 KB (省 23%)
```

### 典型工作流(英文产品图)

1. **设计原稿**:用 Sketch / Figma 出一张干净产品图(去背景的 PNG,如 `amphora-clean.png`)
2. **加 SVG 引线标注**:在 HTML 里定位 `obj-img` + `overlay` 浮层,SVG 画虚线引线 + 标签 `<text>`(模板参考 `amphora-en.html` / `amphora-en-clean.html`)
3. **渲染高清图**:`node tools/headless-shot.mjs amphora-en-clean.html out.png --width=1480 --height=2200`
4. **压缩成 WebP 上 OSS**:`node tools/optimize-product-image.mjs`,产物直接 `ossutil put` 上去

> 注:`tools/` 里的 `amphora-*.png|html|webp` 产物文件已 gitignore,因为是某个具体项目的工作产物(不是示例素材)。两个 `.mjs` 脚本保留作为可复用的工具。

## 更新版本

```bash
cd /Users/mr.root/IdeaProject/imgc-tool
git pull  # 或手动覆盖文件
npm install
```
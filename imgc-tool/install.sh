#!/usr/bin/env bash
# imgc 一键安装(macOS / Linux)
# 流程:
#   1. 检测 npm registry 是否可达,不通则自动切到 npmmirror
#   2. npm install
#   3. 创建符号链接到 ~/bin/imgc
#   4. PATH 检查

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN_DIR="$HOME/bin"
LINK_PATH="$BIN_DIR/imgc"

echo "📦 imgc 安装"
echo "   项目目录: $SCRIPT_DIR"
echo ""

# ──────────────────────────────────────────────────────────────
# 检测 npm registry 连通性,不通切国内镜像
# ──────────────────────────────────────────────────────────────
cd "$SCRIPT_DIR"

probe_registry() {
  local url="$1"
  curl -sS -o /dev/null --max-time 5 -w "%{http_code}" "$url" 2>/dev/null || echo "000"
}

REGISTRY=""
echo "→ 检测 npm registry 连通性..."
NPM_DEFAULT=$(probe_registry "https://registry.npmjs.org/-/ping")
NPM_CN=$(probe_registry "https://registry.npmmirror.com/-/ping")

if [[ "$NPM_DEFAULT" == "200" ]]; then
  REGISTRY="https://registry.npmjs.org/"
  echo "  ✓ 默认 registry 通 ($REGISTRY)"
elif [[ "$NPM_CN" == "200" ]]; then
  REGISTRY="https://registry.npmmirror.com/"
  echo "  ✓ 默认不通,切换到国内镜像 ($REGISTRY)"
else
  echo "  ⚠️  npm registry 都不通,请检查网络"
  echo "     默认: $NPM_DEFAULT"
  echo "     镜像: $NPM_CN"
  echo ""
  echo "  如果你在用 VPN / 代理,先确认代理能访问 npm"
  echo "  或临时切镜像:npm config set registry https://registry.npmmirror.com/"
  exit 1
fi

# ──────────────────────────────────────────────────────────────
# 装依赖
# ──────────────────────────────────────────────────────────────
echo ""
echo "→ 安装依赖(npm install,使用 $REGISTRY)..."
npm install \
  --registry "$REGISTRY" \
  --no-audit \
  --no-fund \
  --loglevel=warn
echo "  ✓ 依赖装好"

# ──────────────────────────────────────────────────────────────
# chmod 入口
# ──────────────────────────────────────────────────────────────
chmod +x "$SCRIPT_DIR/imgc.mjs"

# ──────────────────────────────────────────────────────────────
# 创建符号链接
# ──────────────────────────────────────────────────────────────
mkdir -p "$BIN_DIR"
if [ -L "$LINK_PATH" ] || [ -e "$LINK_PATH" ]; then
  echo ""
  echo "⚠️  已存在: $LINK_PATH,移除旧链接"
  rm -f "$LINK_PATH"
fi
ln -s "$SCRIPT_DIR/imgc.mjs" "$LINK_PATH"
echo ""
echo "→ 软链: $LINK_PATH -> $SCRIPT_DIR/imgc.mjs"

# ──────────────────────────────────────────────────────────────
# PATH 检查
# ──────────────────────────────────────────────────────────────
echo ""
if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
  echo "⚠️  $BIN_DIR 不在 PATH 中"
  echo "   把这一行加到 ~/.zshrc(默认 shell)或 ~/.bashrc:"
  echo ""
  echo "     export PATH=\"\$HOME/bin:\$PATH\""
  echo ""
  echo "   然后 source ~/.zshrc(或新开 Terminal)"
else
  echo "✓ $BIN_DIR 已在 PATH"
fi

# ──────────────────────────────────────────────────────────────
# 自检
# ──────────────────────────────────────────────────────────────
echo ""
echo "→ 自检..."
if "$LINK_PATH" --help > /dev/null 2>&1; then
  echo "  ✓ imgc --help 正常"
else
  echo "  ✗ imgc --help 报错,可能要再 npm install 试试"
  exit 1
fi

echo ""
echo "🎉 装完了!试试:"
echo "   imgc --help"
echo "   imgc /path/to/your/photos"
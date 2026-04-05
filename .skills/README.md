# 已安装技能列表

本目录包含从 [anthropics/skills](https://github.com/anthropics/skills) 安装的技能。

## 已安装技能

### 1. PPT 制作 - [pptx](./pptx/SKILL.md)
**用途**: 创建、编辑、读取 PowerPoint 演示文稿
- 创建幻灯片、演示文稿、Pitch Deck
- 从模板编辑或从零开始创建
- 提取和分析 PPTX 文件内容
- 提供设计指南和颜色方案

### 2. 前端开发 - [frontend-design](./frontend-design/SKILL.md)
**用途**: 创建高质量的前端界面
- 网站、落地页、仪表板设计
- React 组件、HTML/CSS 布局
- 避免"AI 风格"的通用设计
- 独特的字体、颜色、动画效果

### 3. Web Artifacts 构建 - [web-artifacts-builder](./web-artifacts-builder/SKILL.md)
**用途**: 构建复杂的 React + TypeScript 项目
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui 组件
- 打包成单个 HTML 文件
- 适合复杂的交互式应用

### 4. 视觉设计 - [canvas-design](./canvas-design/SKILL.md)
**用途**: 创建海报、艺术作品、静态设计
- PNG 和 PDF 输出
- 设计哲学驱动的创作
- 博物馆级别的视觉质量
- 最小化文字，最大化视觉冲击

### 5. Claude API 开发 - [claude-api](./claude-api/SKILL.md)
**用途**: 使用 Claude API 构建 LLM 应用
- 多语言支持 (Python, TypeScript, Java, Go, Ruby, C#, PHP)
- Messages API、Streaming、Tool Use
- Thinking/Reasoning 功能
- 最佳实践和代码示例

### 6. MCP 服务器构建 - [mcp-builder](./mcp-builder/SKILL.md)
**用途**: 创建 Model Context Protocol 服务器
- 让 LLM 与外部服务交互
- TypeScript/Python SDK
- 工具设计和错误处理
- 部署和文档指南

---

## 原始仓库

完整技能仓库位于: `/Users/mr.root/IdeaProject/controlled-ceramic-jar/skills/`

更多技能可查看:
- `skills/skills/` - 所有技能示例
- `skills/spec/` - Agent Skills 规范
- `skills/template/` - 技能模板

---

## 使用方法

当你需要执行相关任务时，Claude 会自动参考这些技能文件中的指南和最佳实践。

例如:
- "帮我创建一个产品介绍 PPT" → 使用 pptx 技能
- "帮我设计一个网站首页" → 使用 frontend-design 技能
- "帮我创建一个海报" → 使用 canvas-design 技能
- "帮我接入 Claude API" → 使用 claude-api 技能

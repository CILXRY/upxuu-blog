# 🍥 UpXuu's Blog

这是基于 [Fuwari](https://github.com/saicaca/fuwari) 模板构建的个人博客，由 UpXuu 维护和定制。

[**🖥️ 访问我的博客**](https://upxuu.com)

## 🎯 主要特性

在 Fuwari 原有功能的基础上，我添加了以下定制内容：

- ✅ SEO 优化：集成 [astro-seo](https://github.com/jonasmerlin/astro-seo) 插件
- ✅ JSON-LD 结构化数据：支持文章、关于页面、归档页面等
- ✅ 友链页面：支持友链申请和展示
- ✅ 移动端优化：完善响应式设计
- ✅ 评论功能：集成评论 SDK
- ✅ Commit 信息展示：页脚显示最新 Git commit 信息
- ✅ 页面过渡：使用 Swup 实现平滑页面切换

---

## 🍥 关于原项目 Fuwari

[**🖥️ Live Demo (Vercel)**](https://fuwari.vercel.app)

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)



## ✨ 原项目特性

- [x] 基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- [x] 流畅的动画和页面过渡效果
- [x] 亮色/暗色模式切换
- [x] 可自定义的主题颜色和横幅
- [x] 响应式设计
- [x] 搜索功能（使用 [Pagefind](https://pagefind.app/)）
- [x] [Markdown 扩展语法](https://github.com/saicaca/fuwari?tab=readme-ov-file#-markdown-extended-syntax)
- [x] 目录导航
- [x] RSS 订阅
- [x] SEO 优化

## 🎨 主题配置

要更改默认主题模式，编辑 `src/constants/constants.ts`：

```typescript
export const DEFAULT_THEME = LIGHT_MODE; // 选项：LIGHT_MODE, DARK_MODE
```

- `LIGHT_MODE`: 始终使用亮色模式（默认）
- `DARK_MODE`: 始终使用暗色模式

## 🚀 快速开始

1. 创建你的博客仓库：
    - [从此模板生成新仓库](https://github.com/saicaca/fuwari/generate) 或 Fork 此仓库
    - 或者运行以下命令之一：
       ```sh
       npm create fuwari@latest
       yarn create fuwari
       pnpm create fuwari@latest
       bun create fuwari@latest
       deno run -A npm:create-fuwari@latest
       ```
2. 在本地编辑你的博客，克隆你的仓库后运行 `pnpm install` 安装依赖
    - 如果尚未安装 [pnpm](https://pnpm.io)，运行 `npm install -g pnpm`
3. 编辑配置文件 `src/config.ts` 来定制你的博客
4. 运行 `pnpm new-post <filename>` 创建新文章，然后在 `src/content/posts/` 中编辑
5. 按照 [部署指南](https://docs.astro.build/en/guides/deploy/) 将博客部署到 Vercel、Netlify、GitHub Pages 等平台，部署前需要编辑 `astro.config.mjs` 中的站点配置

## 📝 文章 Frontmatter 配置

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我的新 Astro 博客的第一篇文章
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # 仅当文章语言与 `config.ts` 中的网站语言不同时设置
---
```

## 🧩 Markdown 扩展语法

除了 Astro 默认支持的 [GitHub Flavored Markdown](https://github.github.com/gfm/) 外，还包括以下额外的 Markdown 功能：

- 提示框（[预览和使用](https://fuwari.vercel.app/posts/markdown-extended/#admonitions)）
- GitHub 仓库卡片（[预览和使用](https://fuwari.vercel.app/posts/markdown-extended/#github-repository-cards)）
- 增强的代码块（使用 Expressive Code）（[预览](https://fuwari.vercel.app/posts/expressive-code/) / [文档](https://expressive-code.com/)）

## ⚡ 常用命令

所有命令都在项目根目录的终端中运行：

| 命令                       | 说明                                                |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖                                            |
| `pnpm dev`                 | 启动本地开发服务器（`localhost:4321`）              |
| `pnpm build`               | 构建生产站点到 `./dist/`                            |
| `pnpm preview`             | 本地预览构建结果                                    |
| `pnpm check`               | 检查代码错误                                        |
| `pnpm format`              | 使用 Biome 格式化代码                               |
| `pnpm new-post <filename>` | 创建新文章                                          |
| `pnpm astro ...`           | 运行 Astro CLI 命令，如 `astro add`、`astro check`  |
| `pnpm astro --help`        | 获取 Astro CLI 使用帮助                             |

## ✏️ 贡献

查看 [贡献指南](https://github.com/saicaca/fuwari/blob/main/CONTRIBUTING.md) 了解如何参与此项目的贡献。

## 📄 许可证

本项目采用 MIT 许可证。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari?ref=badge_large&issueType=license)

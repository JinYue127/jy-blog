# 🍥Jy-Blog

基于 [Astro](https://astro.build) 和 [Fuwari](https://github.com/saicaca/fuwari)开发的静态博客模板。

![astro version](https://img.shields.io/badge/astro-4.15.12-red)
![node version](https://img.shields.io/badge/node-20.17.0-blue)

[**🖥️在线预览（Vercel）**](https://jy-blog.vercel.app/)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;

> README 版本：`2024-09-10`

## 📷 Screenshots

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ Features

- ✅ 基于 Astro 和 Tailwind CSS 开发
- ✅ 有着规范的 URL 和 OpenGraph 信息，对 SEO 友好
- ✅ 支持站点地图
- ✅ 支持 RSS 订阅
- ✅ 流畅的动画和页面过渡
- ✅ 亮色 / 暗色模式
- ✅ 自定义主题色和横幅图片
- ✅ 响应式设计
- ✅ 支持评论系统
- ✅ 支持搜索

## 🚀 TODO

- [ ] 文内目录

## 🔧 Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## ⚙️ 文章 Frontmatter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: /images/cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

## 🧞 Commands

下列指令均需要在项目根目录执行：

| Command                           | Action                            |
|:----------------------------------|:----------------------------------|
| `pnpm install` 并 `pnpm add sharp` | 安装依赖                              |
| `pnpm dev`                        | 在 `localhost:4321` 启动本地开发服务器      |
| `pnpm build`                      | 构建网站至 `.vercel/output/static`     |
| `pnpm preview`                    | 本地预览已构建的网站                        |
| `pnpm new-post`                   | 创建新文章                             |
| `pnpm astro ...`                  | 执行 `astro add`, `astro check` 等指令 |
| `pnpm astro --help`               | 显示 Astro CLI 帮助                   |


## 文章来源
- 掘金
- 必应
- 日常总结
- [web-interview](https://github.com/febobo/web-interview)
- ......

---
title: "友链自助申请系统上线啦"
published: 2026-04-24
description: "博客友链申请流程已全面自动化，基于 GitHub Issues 和 Actions 实现"
tags: ["技术", "博客", "GitHub Actions"]
category: "技术"
---

博客的友链申请系统全新上线啦！现在申请友链完全自动化，只需要填写一个表单，系统就会自动完成验证和添加。

## 使用方法

### 第一步：准备友链信息

在你网站的友链页面添加 UpXuu 的友链：

```yaml
名称: UpXuu
链接: https://upxuu.com
头像: https://upxuu.com/images/20260214145619.jpg
描述: 逐光而上
```

### 第二步：提交申请

点击友链页面右上角的「新建友链申请」按钮，或直接访问 [GitHub Issues](https://github.com/ImUpXuu/myblog/issues/new?template=friend-request.yml) 填写申请表单。

需要填写的信息：
- **网站名称**：你的网站名字

- **网站链接**：你的网站首页

- **友链页面 URL**：你网站上添加了本站友链的页面地址（必填）

- **网站描述**：简短介绍一下你的网站

- **网站头像 URL**：可选，你的网站头像

  <img src="https://edit.upxuu.com/img/2026/4/25/1777073716565_207.png" alt="image-20260425073516248" style="zoom:67%;" />

### 第三步：等待验证

提交后，系统会自动检查：
1. 你的友链页面是否可以正常访问
2. 页面中是否包含 UpXuu 的友链

验证过程中 Issue 会标记为「验证中」，通过后会自动回复Issue 并向您github绑定的邮箱发送邮件确认

### 第四步：触发vercel发起构建

你的友链将在3min内被添加至本站 喵~

![image-20260425073835372](https://edit.upxuu.com/img/2026/4/25/1777073915536_212.png)

### 验证失败怎么办

如果验证失败，Issue 会回复具体原因。你修复问题后，只需在 Issue 下任意回复一条评论，系统就会重新验证。

## 技术原理

### 整体架构

```
用户提交 Issue
    ↓
GitHub Actions 自动触发
    ↓
Playwright 模拟浏览器访问友链页面
    ↓
检查页面是否包含 upxuu.com
    ↓
验证通过 → 自动更新 friends.json → Push 到 GitHub
    ↓
Vercel 触发构建 → 网站更新
```

### 关键技术点

#### 1. Issue 表单驱动

使用 GitHub Issue Templates 定义表单结构，用户提交的信息会自动填充到 Issue body 中。Workflow 监听 `issues` 事件获取表单数据。

<img src="https://edit.upxuu.com/img/2026/4/25/1777073813674_390.png" alt="image-20260425073653483" style="zoom:50%;" />

#### 2. Playwright 浏览器自动化

使用 Playwright 模拟真实浏览器访问，可以绕过 Cloudflare 等反爬机制，同时检查页面内容和所有链接。配置了 12 秒超时和 3 次重试，提高稳定性。

#### 3. GitHub Actions 自动部署

验证通过后，Action 会自动：
- Stash 本地更改
- Pull 远程最新代码
- 添加友链到 `public/data/friends.json`（包含 issue_id）
- Commit 并 Push
- 触发 Vercel 重新构建部署

#### 4. 友链与 Issue 关联

每条通过 Issues 添加的友链都会记录对应的 issue_id，每日巡检发现异常时会自动在该 Issue 下评论通知，并标记「友链异常」标签。

### 相关文件

- [friend-link-checker.yml](https://github.com/ImUpXuu/myblog/blob/main/.github/workflows/friend-link-checker.yml) - 自动化工作流
- [cron-check.yml](https://github.com/ImUpXuu/myblog/blob/main/.github/workflows/cron-check.yml) - 每日巡检工作流
- [friend-request.yml](https://github.com/ImUpXuu/myblog/blob/main/.github/ISSUE_TEMPLATE/friend-request.yml) - 申请表单模板
- [friends.json](https://github.com/ImUpXuu/myblog/blob/main/public/data/friends.json) - 友链数据

## 每日巡检

每天 16:00 (UTC+8) 会自动检查所有友链的连通性。如果发现异常：
- 对于通过 Issues 添加的友链，会在该 Issue 下评论通知并标记异常
- 所有巡检结果汇总到巡检报告 Issue 中

---

有什么问题可以在 [GitHub Issues](https://github.com/ImUpXuu/myblog/issues) 里提，也可以直接评论哦~

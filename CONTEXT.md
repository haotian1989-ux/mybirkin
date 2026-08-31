# MYBIRKIN 项目交接 — 新对话快速接上

## 一句话现状
网站 `www.mybirkin.com` 已上线运行，后台全中文，前端全英文，移动端适配完毕。**最大问题：数据全存 localStorage，换设备不互通。**

## 代码位置
- 项目路径: `/Users/zhanghaotian/Documents/Codex/2026-07-26/new-chat/myshop`
- GitHub: `haotian1989-ux/mybirkin`
- 部署: Vercel（push 即部署）

## 项目背景
高端手工皮具电商（对标 Hermès），客单价 $500-$1000，目标客户欧美/中东。
技术栈: Next.js 14 + TypeScript + Tailwind CSS，黑/金极简审美。

## 已完成功能
| 功能 | 路径 |
|------|------|
| 首页 | `/` — Hero、精选、系列分类、品牌承诺 |
| 商品列表/详情 | `/shop`, `/product/[slug]` |
| 购物车 | Context + 侧边抽屉 |
| 定制 Builder | `/builder` — 皮料/颜色/五金/款型/工匠 5 步 |
| 工艺展示 | `/craft` + 4 子页（皮料/五金/工匠/流程） |
| 客户评论 | 产品详情页下方 |
| 客服浮窗 | 右下 WhatsApp/Telegram（后台可配） |
| 管理后台 | `/admin` — 密码 mybirkin2024 |

## 后台板块（全中文）
1. **产品管理** — 增删改产品，每产品支持多图上传
2. **定制数据** — 皮料/颜色/五金/款型/工匠（Builder 的数据源）
3. **首页编辑** — Hero 大图、标语、按钮文字
4. **联系方式** — WhatsApp/Telegram 链接
5. **工艺页面** — 5 个子页面，Hero/介绍/内容区块（图文视频）全可编辑
6. **关于我们** — Our Story 页面全部文字和图片
7. **客户订单** — 查看客户在结算页提交的订单、联系方式，可标记状态/删除

## 图片上传
- Cloudinary 直传，Cloud Name: `vzsmwu1w`
- upload preset: `mybirkin_uploads`（unsigned）
- **重要**: Vercel CSP 阻止外部 JS，所以上传用的是 HTTP POST fetch，不用 Cloudinary Widget
- API Key: `565691429838718`, API Secret: `SnvFlRRfcf5Tbgq0arhoOFytDBo`

## 数据存储（当前最大问题）
所有数据存 localStorage，key 对照：
- 产品: `myb_admin_products`
- 皮料/颜色/五金/款型/工匠: `myb_admin_leathers` / `_colors` / `_hardware` / `_silhouettes` / `_artisans`
- 工艺: `myb_craft_overview` / `_leather` / `_hardware` / `_artisans` / `_process`
- 首页: `myb_homepage_hero` / `_homepage_sections`
- 联系: `myb_contact_links`
- 评论: `mybirkin_reviews`

**症状**: 在电脑 A 改了大图/加了产品，手机或电脑 B 看不到 → 因为数据只存在 A 的浏览器里。

## 最高优先级待办
**接 Supabase 数据库** — 把上述所有 localStorage 迁移到 PostgreSQL，所有设备共享数据。
需要用户注册 Supabase（免费），流程和之前注册 Cloudinary 类似。

## 其他待办
- Stripe 支付
- 联系链接配真实号

## 用户偏好（非常重要）
1. **先问再动手** — 用户明确说过「后续的任务你应该多向我提问直到完全清楚了我的需求，再开始工作」
2. **后台中文，前端英文** — 员工看后台要中文，客户看前端要英文
3. 不要抽成平台，高度定制
4. 风格极简高级
5. **动手前先备份** — 每个任务开始改代码前，必须先让用户在终端执行 git 提交 + tag 备份（沙箱无法写 .git），备份确认成功后才能开始工作；同时要把 Supabase 数据导出备份

## 关键文件
- 管理后台: `src/app/admin/page.tsx`
- Builder 数据管理: `src/components/AdminPanel.tsx`
- 工艺编辑器: `src/components/CraftEditor.tsx`
- 工艺子页面组件: `src/components/CraftSubPage.tsx`
- 图片上传: `src/components/ImageUploader.tsx`
- 图片灯箱: `src/components/ImageLightbox.tsx`
- 登录门: `src/components/AdminGate.tsx`
- 数据定义: `src/lib/types.ts`, `src/lib/data.ts`, `src/lib/craft-data.ts`, `src/lib/builder-data.ts`
- SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`
- Google 验证文件: `public/googlec9f81d52f1e8993c.html` — **GSC 所有权验证用，绝对不能删除**

## 环境约束
- 沙箱无网络，npm install 需用户在系统终端执行
- git push 也需用户在终端执行
- 沙箱对 .git 只读，git commit/tag 等写操作都需用户在终端执行
- 用户是 Mac，终端在 VS Code 或 Terminal.app
- 截图不支持，用户不能用 image_url 格式发图

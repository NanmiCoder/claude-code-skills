# Slide Design Guide

> Subagent 生成幻灯片时的完整设计参考。

## 技术栈

- **框架**: React 函数组件，default export
- **样式**: Tailwind CSS（使用主题变量，不硬编码颜色）
- **图标**: lucide-react
- **动画**: framer-motion

## 主题色变量

所有颜色必须使用 Tailwind 主题变量：

```
主色系: primary-50 ~ primary-950, accent-50 ~ accent-950
背景色: bg-base, bg-card, bg-elevated
文字色: text-primary, text-secondary, text-muted
边框色: border-default, border-subtle
```

## 布局规则

### slide-page 容器

`slide-page` 已内置 padding（四边 2.5rem，底部为导航预留 6.5rem），是 `flex flex-col`。

```jsx
<div className="slide-page">
  {/* 背景装饰 - absolute 定位，不占布局空间 */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* 渐变光晕、网格等 */}
  </div>

  {/* 标题区 - shrink-0 防止压缩 */}
  <header className="relative z-10 mb-6 shrink-0">
    <h1 className="text-4xl font-bold">标题</h1>
  </header>

  {/* 内容区 - slide-content 自动填充剩余空间 */}
  <div className="slide-content relative z-10">
    {/* 卡片网格放这里 */}
  </div>
</div>
```

### 禁止的写法

- ❌ `h-screen` / `min-h-screen` — 无视父容器约束
- ❌ 在 slide-page 上加额外 `p-*` / `px-*` / `py-*` — 与内置 padding 冲突
- ❌ 内层 `h-full` 包裹 — 会吞掉 padding 空间
- ❌ 任何 viewport 单位的高度

## 网格布局 + 卡片

```jsx
// 2 卡片横排
<div className="slide-content relative z-10 grid-auto-fit grid-cols-2">

// 4 卡片 2×2
<div className="slide-content relative z-10 grid-auto-fit grid-2x2">

// 3 卡片横排
<div className="slide-content relative z-10 grid-auto-fit grid-1x3">

// 6 卡片 2×3
<div className="slide-content relative z-10 grid-auto-fit grid-2x3">
```

**卡片模式：**

```jsx
<div className="card-fit glass rounded-xl p-4">
  <header className="mb-3">Title</header>
  <div className="card-body">Content</div>
</div>
```

**内容密度限制**（1080p 基准）：最多 4 卡片/页，每卡片最多 3 条目。长文本用 `line-clamp-2`，单行用 `truncate`。

## 样式规范

| 元素 | 规则 |
|------|------|
| 大卡片圆角 | `rounded-xl` 或 `rounded-2xl` |
| 小元素圆角 | `rounded-lg` |
| 玻璃态 | `glass` 类，或 `bg-white/10 backdrop-blur-md border border-white/20` |
| 扁平态 | `bg-bg-card shadow-sm border border-border-default` |
| 主标题 | `text-4xl` 或 `text-5xl font-bold` |
| 副标题 | `text-xl` 或 `text-2xl font-medium` |
| 正文 | `text-base` 或 `text-lg` |
| 辅助文字 | `text-sm text-text-secondary` |

## 动画指南

使用 framer-motion，不用 CSS 动画：

```jsx
// 容器 + 子元素 stagger
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>
```

| 场景 | 动画 |
|------|------|
| 卡片入场 | `opacity: 0→1, y: 20→0` |
| 标题入场 | `opacity: 0→1, scale: 0.95→1` |
| 卡片悬停 | `whileHover={{ scale: 1.02 }}` |
| 列表项 | `staggerChildren: 0.1` |

**时机**: 快速响应 `0.3s`，标准过渡 `0.5s`，戏剧入场 `0.8s`。

## 设计哲学

### 字体选择

**Display 标题字体（选一）:** Sora / DM Sans / Outfit / Manrope / Poppins
**Body 正文字体（选一）:** Source Sans 3 / Nunito Sans / Work Sans

- 标题用 Display，正文用 Body，一个演示最多 2 种字体
- ❌ 禁用：Arial, Helvetica, Inter, Roboto, Times New Roman

### 反 AI 通用风格

- 配色要有明确主导色，不是均匀分布
- 布局要有变化，不是千篇一律的卡片网格
- 背景要有氛围感（渐变光晕、模糊光斑），不是纯色
- ❌ 禁止紫色渐变 + 白底组合
- 每次生成应选不同的字体、配色、美学方向

### 背景氛围

每个 slide 自行处理背景装饰（absolute 定位）：
- 渐变光晕：`bg-primary-500/20 blur-3xl rounded-full`
- 模糊光斑：大尺寸 + 低透明度 + `blur-[120px]`
- 细线网格 / 点阵（opacity 0.03）

## 禁止事项

1. ❌ 不要硬编码颜色值（如 `#3b82f6`），用主题变量
2. ❌ 不要使用外部 CSS 文件
3. ❌ 不要使用 class components
4. ❌ 不要使用 Inter/Roboto/Arial 等通用字体
5. ❌ 只允许 lucide-react 和 framer-motion 作为额外依赖
6. ❌ 不要在 slide-page 上加额外 padding 或 h-screen

# Slide Design Principles

> 这是给 Subagent 生成幻灯片页面时参考的设计原则

## 技术栈

- **框架**: React (函数组件)
- **样式**: Tailwind CSS
- **图标**: lucide-react

## 主题色变量

所有颜色必须使用 Tailwind 主题变量，不要硬编码颜色值：

```
主色系:
- primary-50 ~ primary-950 (主色渐变)
- accent-50 ~ accent-950 (强调色渐变)

背景色:
- bg-base      深色背景主色
- bg-card      卡片背景
- bg-elevated  浮层背景

文字色:
- text-primary    主文字
- text-secondary  次要文字
- text-muted      弱化文字

边框色:
- border-default  默认边框
- border-subtle   弱边框
```

## 布局原则

### ⛔ 绝对禁止的写法

这些写法**会破坏布局**，导致内容溢出或被导航遮挡：

```jsx
// ❌ 禁止 h-screen - 无视父容器约束
<div className="slide-page h-screen">

// ❌ 禁止在 slide-page 上添加额外 padding
<div className="slide-page p-12 pb-24">

// ❌ 禁止内层 h-full 包裹 - 会吞掉 padding
<div className="slide-page">
  <div className="h-full flex flex-col justify-center">  {/* 错！ */}

// ❌ 禁止 min-h-screen 或任何 viewport 单位
<div className="slide-page min-h-screen">
```

### ✅ 正确的页面结构

`slide-page` 类已内置所有必要的 padding（上下左右 2.5rem，底部 6.5rem）：

```jsx
<div className="slide-page">
  {/* 背景装饰 - 使用 absolute 定位，不占布局空间 */}
  <div className="absolute inset-0 pointer-events-none">
    {/* 渐变、网格等装饰 */}
  </div>

  {/* 标题区 - 固定高度，shrink-0 防止压缩 */}
  <header className="relative z-10 mb-6 shrink-0">
    <h1>标题</h1>
  </header>

  {/* 内容区 - slide-content 自动填充剩余空间 */}
  <div className="slide-content relative z-10">
    {/* 卡片网格 - 不要加 h-full */}
  </div>
</div>
```

### slide-page 工作原理

- `padding: 2.5rem`（四边）
- `padding-bottom: ~6.5rem`（为导航栏预留）
- `display: flex; flex-direction: column`
- 子元素在 padding 区域内自动布局

### 响应式断点

| 屏幕 | 宽度 | padding | gap | 推荐卡片/行 |
|------|------|---------|-----|-------------|
| 1080p | ≤1920px | 2rem | 1rem | 2 |
| 2K | ≤2560px | 2.5rem | 1.5rem | 2-3 |
| 4K | >2560px | 3rem | 2rem | 3-4 |

### 内容密度限制（防止溢出）

| 屏幕 | 最大卡片数 | 每卡片最大条目 |
|------|------------|----------------|
| 1080p | 4 | 3 |
| 2K | 4-6 | 4 |
| 4K | 6-8 | 5 |

### 多卡片网格布局

```jsx
// 2 卡片 - 横向排列
<div className="grid-auto-fit grid-cols-2">

// 4 卡片 - 2x2 网格
<div className="grid-auto-fit grid-2x2">

// 3 卡片 - 横向排列
<div className="grid-auto-fit grid-1x3">

// 6 卡片 - 2x3 网格
<div className="grid-auto-fit grid-2x3">
```

### 卡片高度自适应

```jsx
// 卡片使用 card-fit 确保内容不溢出
<div className="card-fit rounded-xl bg-bg-card">
  <header className="p-4 border-b">标题</header>
  <div className="card-body p-4">
    {/* 内容区自动收缩 */}
  </div>
</div>
```

### 文字截断

```jsx
// 限制文字行数防止溢出
<p className="line-clamp-2">长文本...</p>
<h3 className="truncate">标题可能很长...</h3>
```

## 样式规范

### 圆角
- 大卡片: `rounded-xl` 或 `rounded-2xl`
- 小元素: `rounded-lg`
- 按钮/标签: `rounded-full` 或 `rounded-lg`

### 阴影与层次
- 玻璃态: `bg-white/10 backdrop-blur-md border border-white/20`
- 扁平态: `bg-bg-card shadow-sm border border-border-default`

### 字体大小
- 主标题: `text-4xl` 或 `text-5xl font-bold`
- 副标题: `text-xl` 或 `text-2xl font-medium`
- 正文: `text-base` 或 `text-lg`
- 辅助: `text-sm text-text-secondary`

## 组件结构

每个 Slide 文件必须遵循此模板：

```jsx
import { IconName } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SlideXX() {
  return (
    // ⚠️ 只用 slide-page，不加任何其他尺寸/padding 类
    <div className="slide-page">
      {/* 背景装饰 - absolute 定位 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 渐变光晕、网格等 */}
      </div>

      {/* 标题区 - shrink-0 防止被压缩 */}
      <header className="relative z-10 mb-6 shrink-0">
        <h1 className="text-4xl font-bold">标题</h1>
      </header>

      {/* 内容区 - 使用 slide-content 自动填充 */}
      <div className="slide-content relative z-10">
        {/* 卡片网格 */}
      </div>
    </div>
  );
}
```

### ⚠️ 常见错误

```jsx
// ❌ 错误：在 slide-page 里嵌套 h-full 容器
<div className="slide-page">
  <div className="h-full flex items-center justify-center">
    {/* 这会吞掉所有 padding！ */}
  </div>
</div>

// ✅ 正确：直接在 slide-page 里布局
<div className="slide-page">
  <header>...</header>
  <div className="slide-content flex items-center justify-center">
    {/* slide-content 会正确填充剩余空间 */}
  </div>
</div>
```

### 多卡片示例

```jsx
export default function SlideContenders() {
  return (
    <div className="slide-page">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      {/* 标题 - shrink-0 */}
      <header className="relative z-10 text-center mb-6 shrink-0">
        <h1 className="text-4xl font-bold">四强选手</h1>
        <p className="text-text-secondary">The Contenders</p>
      </header>

      {/* 内容 - slide-content + grid */}
      <div className="slide-content relative z-10 grid-auto-fit grid-2x2">
        {models.map(model => (
          <div key={model.id} className="card-fit glass rounded-xl p-4">
            <header className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20" />
              <h3 className="font-semibold">{model.name}</h3>
            </header>
            <div className="card-body space-y-2">
              <div>Speed: {model.speed}</div>
              <div>Context: {model.context}</div>
              <div>Strength: {model.strength}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 风格关键词参考

| 关键词 | 视觉表现 |
|--------|----------|
| 科技感 | 玻璃态、渐变边框、霓虹点缀 |
| 专业 | 扁平、清晰层次、适度留白 |
| 活力 | 明亮色彩、大标题、动感布局 |
| 简约 | 大量留白、细线条、单色调 |

## 动画指南

推荐使用 `framer-motion` 添加入场动画和微交互：

- ✅ 入场动画：fade, slide, scale
- ✅ Staggered reveals（延迟显示）
- ✅ Hover 状态变化
- ✅ 数字/进度动画

详细动画模式请参考 [aesthetics.md](aesthetics.md)。

## 禁止事项

1. ❌ 不要硬编码颜色值（如 `#3b82f6`）
2. ❌ 不要使用外部 CSS 文件
3. ❌ 不要使用 class components
4. ❌ 不要使用 Inter/Roboto/Arial 等通用字体
5. ❌ 只允许 lucide-react 和 framer-motion 作为额外依赖

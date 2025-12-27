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

1. **页面容器**: 全屏 `h-screen w-screen`，内容区使用 `max-w-6xl mx-auto`
2. **内边距**: 页面级 `p-8` 或 `p-12`，卡片级 `p-6`
3. **间距规模**: 优先使用 `gap-4`, `gap-6`, `gap-8`
4. **响应式**: 默认适配 1080p，自动缩放到 4K

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

每个 Slide 文件必须：

```jsx
// 必要的 import
import { IconName } from 'lucide-react';

export default function SlideXX() {
  return (
    <div className="h-full w-full p-8 flex flex-col">
      {/* 页面内容 */}
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

## 禁止事项

1. ❌ 不要硬编码颜色值（如 `#3b82f6`）
2. ❌ 不要使用外部 CSS 文件
3. ❌ 不要使用 class components
4. ❌ 不要添加复杂动画（简单 transition 可以）
5. ❌ 不要引入额外依赖（只用 lucide-react）

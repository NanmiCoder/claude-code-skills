---
name: slides-generator
description: Generate interactive presentation slides using React + Tailwind. Triggers on keywords like "slides", "presentation", "PPT", "demo", "benchmark".
---

# Slides Generator

Generate professional presentation slides through parallel subagent execution.

## Workflow

```
Step 1: 收集需求 + 确认大纲
Step 2: 创建项目 + 并行生成 slides
Step 3: 组装 + 启动
```

## Step 1: 收集需求 + 确认大纲

Ask questions to understand:
- **Content**: Title, number of slides, key points per slide
- **Style preference**: Tech / Professional / Vibrant / Minimal

Recommend a theme from [palettes.md](references/palettes.md) based on style keywords.

**Quick recommendations:**

| User says | Recommend |
|-----------|-----------|
| "Tech", "Modern" | dark-sapphire-blue (glass) |
| "Cyberpunk", "Neon" | cyberpunk (glass) |
| "Natural", "Organic" | summer-meadow (flat) |
| "Minimal", "Clean" | black-and-white (flat) |
| "Professional" | minimal-modern-light (flat) |

Present outline for confirmation:

```markdown
## Presentation Outline

**Title**: Model Engineering Capability Benchmark
**Theme**: dark-sapphire-blue (glass style)
**Output**: ./model-benchmark (reply with path to change)

**Slides**:
1. Hero - Title and overview
2. Framework - Evaluation dimensions
3. Task 1 - Backend development
4. Summary - Conclusions

**Confirm to generate?**
```

## Step 2: 创建项目 + 并行生成 slides

### 2a. Create project skeleton

```bash
# 1. Copy template
cp -r <skill-path>/assets/template <output-dir>
cd <output-dir>

# 2. Update tailwind.config.js with theme colors
# 3. Update index.html title
# 4. Ensure src/slides/ directory exists
```

### 2b. Dispatch parallel subagents

For each slide, dispatch a subagent. Read [design-guide.md](references/design-guide.md) first, then include its content in each subagent prompt.

**Subagent prompt template:**

```
You are generating slide ${number} for a presentation.

## Design Guide
${designGuideContent}

## Theme Colors (use these Tailwind variables, not hardcoded colors)
- primary-50 to primary-950, accent-50 to accent-950
- bg-base, bg-card, bg-elevated
- text-primary, text-secondary, text-muted
- border-default, border-subtle

## Style: ${style}
${style === 'glass' ?
  'Use glassmorphism: glass class or bg-white/10 backdrop-blur-md border-white/20' :
  'Use flat design: bg-bg-card shadow-sm border-border-default'}

## Slide Content
Type: ${slideType}
Title: ${title}
Key Points:
${keyPoints}

## Output
Write a complete JSX file to: src/slides/${filename}
- React function component with default export
- Import icons from lucide-react, animations from framer-motion
- Follow slide-page / slide-content structure from the design guide

${firstSlideCode ? `
## Reference (match this style)
\`\`\`jsx
${firstSlideCode}
\`\`\`` : ''}
```

**Execution:** Dispatch all subagents in parallel. After slide 01 is generated, pass its code as reference to subsequent slides.

## Step 3: 组装 + 启动

After all subagents complete:

1. **Update App.jsx** with slide imports:

```jsx
import Slide01 from './slides/01-hero';
import Slide02 from './slides/02-framework';
// ...

const SLIDES = [Slide01, Slide02, ...];

const NAV_ITEMS = [
  { slideIndex: 0, label: 'Hero' },
  { slideIndex: 1, label: 'Framework' },
  // ...
];
```

2. **Install and start:**

```bash
npm install && npm run dev
```

## Theme System

Themes are defined in [palettes.md](references/palettes.md). Each theme has:
- **ID**: Unique identifier
- **Tags**: Keywords for matching user preferences
- **Style**: `glass` or `flat`
- **Colors**: 5 base colors that expand to full palette

## Design Reference

See [design-guide.md](references/design-guide.md) for layout rules, animation patterns, typography, and style conventions. This file should be included in every subagent prompt.

## Project Structure

```
output-dir/
├── package.json
├── vite.config.js
├── tailwind.config.js      ← Theme colors
├── index.html              ← Title
├── src/
│   ├── main.jsx
│   ├── App.jsx             ← Slide imports & navigation
│   ├── index.css
│   ├── components/
│   │   └── Navigation.jsx
│   └── slides/
│       ├── 01-hero.jsx
│       ├── 02-framework.jsx
│       └── ...
```

# 输出目录交互设计

## 概述

优化 slides-generator skill，在项目生成前添加交互式目录选择功能，默认使用当前目录。

## 设计决策

| 决策点 | 选择 | 理由 |
|-------|------|------|
| 询问时机 | Step 3 大纲确认时 | 减少交互轮次，与其他配置一起确认 |
| 默认值格式 | `./项目名称` | 明确表达"当前目录下"的语义 |
| 自定义路径处理 | 自动拼接项目名称 | 用户指定"放哪"，保持项目名一致 |
| 交互方式 | 展示默认，用户可选修改 | 简洁，大多数用户直接确认即可 |

## 改动内容

### 1. Step 3 大纲确认模板

新增 `输出目录` 字段：

```markdown
## 确认生成大纲

**主题**：模型工程能力评测
**配色**：blue-professional（深蓝专业 #2563eb）
**输出目录**：./model-benchmark（回复路径可修改）

**页面结构**：
1. 首页 - 模型工程能力评测
...

**确认开始生成吗？**
```

**用户响应处理**：
- 回复"确认"/"OK"/"好" → 使用默认路径
- 回复路径（如 `/home/demos`）→ 使用 `用户路径/项目名称`

### 2. Step 6 项目生成

**命令变更**：

```bash
# 原来
cp -r <skill-path>/assets/template <项目名称>
cd <项目名称>

# 改为
cp -r <skill-path>/assets/template <输出目录>
cd <输出目录>
```

**路径处理规则**：

| 用户输入 | 项目名称 | 最终路径 |
|---------|---------|---------|
| （默认） | model-benchmark | `./model-benchmark` |
| `/home/demos` | model-benchmark | `/home/demos/model-benchmark` |
| `~/projects` | model-benchmark | `~/projects/model-benchmark` |
| `../other-folder` | model-benchmark | `../other-folder/model-benchmark` |

**边界处理**：
- 目标目录已存在 → 提示用户并询问是否覆盖
- 父目录不存在 → 自动创建（`mkdir -p`）

### 3. 示例更新

示例 1（LLM 评测）和示例 2（产品演示）的大纲确认部分添加输出目录字段。

## 不改动内容

- Step 1、Step 2 信息收集流程
- Step 7 浏览器验证流程
- 场景模板、评测任务模板、评分维度模板
- 项目结构说明、注意事项

## 改动位置汇总

| 文件 | 位置 | 改动 |
|-----|------|-----|
| SKILL.md | Step 3 大纲确认 | 新增输出目录字段说明 |
| SKILL.md | Step 6 项目生成 | 更新命令和路径处理规则 |
| SKILL.md | 示例 1 | 大纲添加输出目录 |
| SKILL.md | 示例 2 | 大纲添加输出目录 |

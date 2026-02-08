---
name: agent-team-orchestrator
description: |
  Agent Teams 智能编排决策引擎。自动分析任务复杂度，判断使用 Subagent 还是 Agent Teams。

  触发场景：
  (1) 任务涉及多角度并行分析（如代码审查、竞争假说调试）
  (2) 需要成员之间互相通信、质疑、协作
  (3) 跨层开发（前端/后端/测试各自负责）
  (4) 用户明确要求"创建团队"、"用 agent teams"
  (5) 任务描述包含"并行"、"同时"、"多人"、"协作"等关键词
  (6) 使用 /team 命令
---

# Agent Teams 智能编排决策引擎

## 核心决策逻辑

### 第一步：任务特征分析

在收到用户任务后，**自动进行以下 5 维度评估**（无需用户明确要求）：

#### 1. 并行性维度
- ✅ **适合 Teams**: 多个子任务可以完全独立并行执行，不需要等待彼此结果
- ❌ **适合 Subagent**: 任务有明确的先后顺序，后续步骤依赖前面结果

#### 2. 通信需求维度
- ✅ **适合 Teams**: 成员需要互相分享发现、质疑对方结论、协商决策
- ❌ **适合 Subagent**: 只需要将结果报告给主 Agent，成员之间无需交流

#### 3. 上下文隔离维度
- ✅ **适合 Teams**: 每个成员需要聚焦不同领域，避免上下文污染
- ❌ **适合 Subagent**: 所有工作共享相同的知识背景和上下文

#### 4. 文件冲突维度
- ✅ **适合 Teams**: 每个成员操作不同的文件集，没有并发编辑冲突
- ❌ **适合 Subagent**: 多人需要修改同一文件（会导致覆盖冲突）

#### 5. 成本收益维度
- ✅ **适合 Teams**: 并行探索的价值 > Token 成本（如研究、审查、新功能开发）
- ❌ **适合 Subagent**: 简单任务，协调开销大于收益

---

### 第二步：决策矩阵

根据以上维度得分，应用以下规则：

| 场景类型 | 并行性 | 通信需求 | 上下文隔离 | 文件冲突 | 推荐方案 | 置信度 |
|---------|-------|---------|----------|---------|---------|-------|
| 多角度代码审查 | ✓ | ✓ | ✓ | ✓ | **Agent Teams** | 95% |
| 竞争假说调试 | ✓ | ✓ | ✓ | ✓ | **Agent Teams** | 95% |
| 跨层协调开发 | ✓ | ✓ | ✓ | ✓ | **Agent Teams** | 90% |
| 独立目录搜索 | ✓ | ✗ | ✓ | ✓ | **Subagent** | 85% |
| 顺序数据处理 | ✗ | ✗ | ✗ | ✓ | **Subagent** | 90% |
| 单文件多人编辑 | ✓ | ✗ | ✗ | ✗ | **Subagent** | 95% |

**决策规则：**
- 4-5 个 ✓ → 强烈推荐 Agent Teams
- 2-3 个 ✓ → 视任务复杂度决定
- 0-1 个 ✓ → 推荐 Subagent

---

## 团队设计指南

### 团队规模建议

```
简单任务（代码审查、小型调试）: 2-3 人
中等复杂度（新功能开发）: 3-5 人
高复杂度（大型重构、架构设计）: 5-7 人
⚠️ 警告：超过 7 人协调成本急剧上升
```

### 角色分配原则

**1. 职责清晰化**
- ✅ 好：`security-reviewer` 只关注安全漏洞
- ❌ 坏：`general-reviewer` 什么都审查（会导致重复劳动）

**2. 技能互补性**
- ✅ 好：`frontend-dev` + `backend-dev` + `test-engineer`
- ❌ 坏：3 个都是 `fullstack-dev`（缺乏专业化）

**3. 文件所有权明确**
- ✅ 好：每个成员负责不同的目录/模块
- ❌ 坏：多人修改同一文件（导致覆盖冲突）

### 任务粒度设计

**理想任务粒度：**
- 单个任务耗时：15-30 分钟
- 每人任务数量：5-6 个
- 任务产出：明确的交付物（一个函数、一个测试文件、一份报告）

**太小的任务：**
```
❌ "检查第 42 行是否有 bug"
❌ "读取 config.json 文件"
```

**太大的任务：**
```
❌ "重构整个认证系统"
❌ "实现完整的订单模块"
```

**合适的任务：**
```
✅ "审查 auth 模块的安全漏洞，输出 security-report.md"
✅ "实现用户登录 API 端点，包含参数验证和错误处理"
✅ "编写 OrderService 的单元测试，覆盖主要场景"
```

---

## Prompt 模板库

### 模板 1: 多角度代码审查

```markdown
创建一个 Agent Team 来审查 PR #{pr_number}。团队成员：

1. **security-reviewer**:
   - 聚焦安全漏洞（SQL注入、XSS、CSRF、认证绕过）
   - 输出 security-findings.md

2. **performance-reviewer**:
   - 检查性能问题（N+1查询、内存泄漏、阻塞操作）
   - 输出 performance-findings.md

3. **test-reviewer**:
   - 验证测试覆盖率，检查边界用例
   - 输出 test-coverage-report.md

要求：
- 各自独立审查后，互相质疑对方发现的问题
- 达成共识后，由 Lead 综合生成最终审查报告
```

### 模板 2: 竞争假说调试

```markdown
用户报告：{bug_description}

创建 5 人调试团队，每人提出并验证一个假说：

1. **hypothesis-1**: {假说描述}
2. **hypothesis-2**: {假说描述}
3. **hypothesis-3**: {假说描述}
4. **hypothesis-4**: {假说描述}
5. **hypothesis-5**: {假说描述}

要求：
- 每人提供支持/反驳自己假说的证据
- 互相质疑对方的推理逻辑
- 通过科学辩论的方式，淘汰不成立的假说
- 最终只保留经得起质疑的根因分析
```

### 模板 3: 跨层协调开发

```markdown
实现新功能：{feature_description}

创建 Agent Team，职责划分：

1. **frontend-dev**:
   - 目录：src/pages/{feature}/, src/components/{feature}/
   - 技术栈：React 19 + TailwindCSS
   - 输出：功能页面 + 组件

2. **backend-dev**:
   - 目录：backend/src/api/{feature}/, backend/src/services/{feature}/
   - 技术栈：FastAPI + Pydantic
   - 输出：API 端点 + 业务逻辑

3. **test-engineer**:
   - 目录：tests/integration/{feature}/
   - 技术栈：pytest + httpx
   - 输出：集成测试

协调要求：
- frontend-dev 和 backend-dev 先协商 API 契约（接口定义）
- backend-dev 完成 API 后通知 frontend-dev
- test-engineer 等两人都完成后编写集成测试
```

### 模板 4: 研究与设计

```markdown
研究主题：{research_topic}

创建研究团队，各自从不同角度探索：

1. **ux-researcher**: 用户体验角度
2. **tech-architect**: 技术可行性角度
3. **devil-advocate**: 挑战者角色，找问题和风险

要求：
- 每人独立调研 20 分钟
- 互相分享发现，质疑彼此的结论
- devil-advocate 必须对另外两人的方案提出至少 3 个挑战
- Lead 综合后输出：推荐方案 + 风险评估 + 备选方案
```

---

## 最佳实践清单

### ✅ 创建团队前

- [ ] 确认任务确实需要并行探索，而非顺序执行
- [ ] 确认成员之间需要互相通信和质疑
- [ ] 确认每个成员操作不同的文件集
- [ ] 确认任务复杂度足以抵消协调成本
- [ ] 给 Teammate 充足的上下文（他们不会继承 Lead 的对话历史）

### ✅ 团队运行中

- [ ] 定期检查任务进度（不要让团队无人监管运行太久）
- [ ] 及时重定向无效的探索方向
- [ ] 鼓励 Teammates 互相质疑和讨论
- [ ] 监控文件冲突，必要时重新分配任务
- [ ] 使用 Ctrl+T 查看任务列表状态

### ✅ 完成后清理

- [ ] 确认所有任务都已完成
- [ ] 综合各 Teammate 的发现
- [ ] 向所有 Teammates 发送关闭请求
- [ ] 等待所有 Teammates 批准关闭
- [ ] 执行团队清理（删除 ~/.claude/teams/ 和 ~/.claude/tasks/）

---

## 常见陷阱与避免方法

### 陷阱 1: Lead 自己抢着干活

**症状：** Lead 不等 Teammates，自己开始写代码

**解决：**
```markdown
按 Shift+Tab 启用 Delegate 模式
或在 prompt 中明确："You are the Lead. Do NOT implement code yourself.
Only coordinate teammates, assign tasks, and synthesize results."
```

### 陷阱 2: 文件覆盖冲突

**症状：** 两个 Teammates 修改同一文件，后者覆盖前者的改动

**解决：**
```markdown
设计任务时明确文件所有权：
- Teammate A: src/api/users.py
- Teammate B: src/api/orders.py
- Teammate C: tests/
禁止交叉修改
```

### 陷阱 3: 任务粒度不当

**症状：** 任务太小（协调开销大）或太大（执行时间长）

**解决：**
```markdown
理想粒度：15-30 分钟/任务
每人 5-6 个任务
产出明确的交付物
```

### 陷阱 4: 缺乏上下文

**症状：** Teammates 不知道要做什么，频繁询问

**解决：**
```markdown
在 spawn prompt 中包含：
- 具体文件路径
- 技术栈说明
- 期望产出格式
- 相关领域知识

❌ "Spawn a reviewer"
✅ "Spawn a security-reviewer to audit src/api/auth.py, focusing on
    JWT token validation and SQL injection. Output security-report.md."
```

### 陷阱 5: 过早清理

**症状：** 还有 Teammates 在运行，就尝试清理团队

**解决：**
```markdown
清理顺序：
1. 所有任务完成 → 2. 发送关闭请求 → 3. 等待批准 → 4. 执行清理

如果有 Teammate 拒绝关闭，检查是否有未完成的工作
```

---

## 输出格式规范

### 当决定使用 Agent Teams 时

输出模板：
```markdown
📊 **任务分析**
- 并行性: ✓ (多个子任务可独立执行)
- 通信需求: ✓ (成员需互相质疑)
- 上下文隔离: ✓ (各自聚焦不同领域)
- 文件冲突: ✓ (无并发编辑)
- 成本收益: ✓ (研究价值 > Token 成本)

✅ **推荐方案**: Agent Teams (置信度 95%)

🎯 **团队设计**
- 团队规模: {N} 人
- 角色分配:
  1. {role-1}: {职责描述}
  2. {role-2}: {职责描述}
  ...

📝 **生成 Prompt**
{根据场景生成的具体 prompt}

⚠️ **注意事项**
- {关键风险点 1}
- {关键风险点 2}
```

### 当决定使用 Subagent 时

输出模板：
```markdown
📊 **任务分析**
- 并行性: ✗ (有明确的执行顺序)
- 通信需求: ✗ (只需报告结果)
...

✅ **推荐方案**: Subagent (置信度 90%)

💡 **理由**: {简要说明为什么 Subagent 更合适}

继续用标准的 Task tool 执行任务...
```

---

## 快速参考卡

### 何时用 Agent Teams？
```
✓ 多角度并行审查
✓ 竞争假说调试
✓ 跨层协调开发（前端/后端/测试）
✓ 研究与设计探索
✓ 成员需要互相质疑和讨论
```

### 何时用 Subagent？
```
✓ 只需要结果的聚焦搜索
✓ 顺序执行的任务流
✓ 简单的并行查询（无需通信）
✓ 单文件编辑
✓ 协调成本 > 并行收益
```

### 团队创建流程
```
1. 分析任务特征（自动）
2. 设计团队结构
3. 生成 spawn prompt
4. 创建团队 (TeamCreate)
5. 监控进度
6. 综合结果
7. 关闭 Teammates
8. 清理团队资源
```

### 关键指标
```
团队规模: 2-7 人（最优 3-5 人）
任务粒度: 15-30 分钟/任务
每人任务数: 5-6 个
Token 消耗: 线性增长（N × 单人成本）
```

---

## 技术细节

### 存储位置
```
团队配置: ~/.claude/teams/{team-name}/config.json
任务列表: ~/.claude/tasks/{team-name}/
```

### 通信机制
- 自动消息投递（无需轮询）
- 点对点消息（SendMessage with recipient）
- 广播消息（谨慎使用，成本高）
- 空闲通知（Teammate 完成轮次后自动通知）

### 权限规则
- Teammates 继承 Lead 的权限设置
- 可以在生成后单独调整 Teammate 的模式
- 不能在生成时设置单个 Teammate 的权限

### 显示模式
- `in-process`: 所有 Teammate 在主终端，用 Shift+Up/Down 切换
- `split panes`: 每个 Teammate 独立窗格（需要 tmux/iTerm2）
- `auto`: 自动选择（tmux 环境用 split，否则用 in-process）

---

## 诊断与排障

### 问题：Teammates 不出现
```
检查项：
1. 是否启用了实验性功能？(CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)
2. 任务是否足够复杂？（简单任务不会创建团队）
3. In-process 模式：试试按 Shift+Down
4. Split panes 模式：确认在 tmux session 中
```

### 问题：Teammate 遇错停止
```
解决方法：
1. 直接向该 Teammate 发消息补充指令
2. 或生成新的 Teammate 替代
3. 或调整任务分配
```

### 问题：Lead 提前退出
```
解决方法：
在 prompt 中添加：
"Wait for all teammates to complete their tasks before finalizing."
```

### 问题：权限提示过多
```
解决方法：
在 permission settings 中预批准常用操作：
- File read/write
- Bash execution
- Git operations
```

---

## 性能优化建议

### Token 成本控制
```
1. 避免创建过多 Teammates（3-5 人最优）
2. 避免广播消息（成本 = N × 单条消息）
3. 任务完成后立即关闭不需要的 Teammates
4. 对简单任务使用 Subagent 而非 Teams
```

### 执行效率优化
```
1. 任务粒度适中（15-30 分钟）
2. 明确文件所有权，避免冲突
3. 预先定义好 API 契约（跨层开发）
4. 使用任务依赖关系（blockedBy/blocks）
```

### 协调成本降低
```
1. 在 spawn prompt 中给足上下文
2. 角色职责清晰化
3. 减少不必要的跨 Teammate 通信
4. Lead 定期监控但不过度干预
```

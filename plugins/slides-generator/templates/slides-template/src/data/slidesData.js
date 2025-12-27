import {
  GitBranch,
  Bug,
  Bot,
  FileCode,
  Layers,
  Target,
  FileText
} from 'lucide-react';

export const SLIDES_DATA = {
  hero: {
    title: "MiniMax M2.1",
    subtitle: "真·工程评测",
    tagline: "我用 3 个真实任务测它到底能不能交付",
    tags: ["多语言能力", "Android/iOS原生", "自我验证", "Agent能力"],
    models: ["MiniMax-M2.1", "MiniMax-M2", "DeepSeek V3", "Claude Sonnet 4.5", "Gemini 3 Pro", "GPT-5.2 (thinking)"],
    benchmarks: [
      {
        name: "SWE-bench Verified",
        scores: { "MiniMax-M2.1": 74, "MiniMax-M2": 69.4, "DeepSeek V3": 73.1, "Claude Sonnet 4.5": 77.2, "Gemini 3 Pro": 78, "GPT-5.2 (thinking)": 80 }
      },
      {
        name: "Multi-SWE-bench",
        scores: { "MiniMax-M2.1": 49.4, "MiniMax-M2": 36.2, "DeepSeek V3": 37.4, "Claude Sonnet 4.5": 44.3, "Gemini 3 Pro": 42.7, "GPT-5.2 (thinking)": null }
      },
      {
        name: "VIBE (Average)",
        scores: { "MiniMax-M2.1": 88.6, "MiniMax-M2": null, "DeepSeek V3": 67.5, "Claude Sonnet 4.5": 85.2, "Gemini 3 Pro": 82.4, "GPT-5.2 (thinking)": null }
      }
    ]
  },
  framework: {
    title: "评测框架",
    subtitle: "拒绝参数，只看落地",
    dimensions: [
      { icon: GitBranch, title: "链路闭环", desc: "真实工程代码能不能跑起来" },
      { icon: Bug, title: "自我修复", desc: "代码写完后会不会自我验证，发现问题自我修复" },
      { icon: Bot, title: "拟人稳定", desc: "Agent场景里，推理和工具调用是不是稳定、像人" }
    ],
    flow: {
      title: "评测流程",
      steps: [
        { icon: FileCode, title: "工程交付", desc: "按需求提交可运行代码与接口" },
        { icon: Bug, title: "自检修复", desc: "失败即自查，修到可用为止" },
        { icon: FileText, title: "证据沉淀", desc: "日志、截图与结果对比表" }
      ]
    },
    outputs: ["可运行工程", "日志与截图", "指标对比", "结论复盘"],
    nextTasks: [
      {
        icon: FileCode,
        title: "MediaCrawler 开源项目工程交付",
        desc: "对照 OpenAPI 交付可运行服务 + WebSocket"
      },
      {
        icon: FileText,
        title: "问卷 Agent 加新功能",
        desc: "记录步骤、Tool Calling 日志与截图存档"
      },
      {
        icon: Target,
        title: "同一套问卷 Agent 横评",
        desc: "四个国产模型的推理与工具调用能力对比"
      }
    ]
  },
  task1: {
    title: "任务1：MediaCrawler FastAPI",

    // 评测提示词
    prompt: {
      title: "AI Backend Code Generation Benchmark",
      description: "完整的 OpenAPI 规范与评测要求",
      lines: 280,
      preview: `## Task Description

You are a backend developer. Based on the OpenAPI specification below, implement a complete backend API service.

## Requirements

1. **Language & Framework**: Python 3.10+ with FastAPI
2. **Goal**: Implement all API endpoints defined in the specification
3. **WebSocket**: Include the two WebSocket endpoints for real-time data pushing
4. **Data Persistence**: You can choose any approach (in-memory, file-based, or database)`,
      fullContent: `# AI Backend Code Generation Benchmark

## Task Description

You are a backend developer. Based on the OpenAPI specification below, implement a complete backend API service.

## Requirements

1. **Language & Framework**: Python 3.10+ with FastAPI
2. **Goal**: Implement all API endpoints defined in the specification, ensuring they work correctly
3. **WebSocket**: Include the two WebSocket endpoints for real-time data pushing
4. **Data Persistence**: You can choose any approach (in-memory, file-based, or database)
5. **No restrictions on project structure** - organize the code as you see fit

## What You Need to Implement

### Core Business Logic

1. **Crawler Control** (\`/api/crawler/*\`)
   - Simulate a crawler process (can be a mock subprocess or async task)
   - Track crawler status (idle/running/stopping/error)
   - Generate realistic log entries during "crawling"
   - Support start/stop operations with proper state management

2. **Data Management** (\`/api/data/*\`)
   - Manage data files in a \`data/\` directory
   - Support listing, previewing, and downloading files (JSON, CSV, Excel)
   - Provide file statistics

3. **WebSocket Endpoints**
   - \`/api/ws/logs\`: Push log entries in real-time
   - \`/api/ws/status\`: Push crawler status every second

4. **Configuration APIs**
   - Return platform list and configuration options as specified

## Acceptance Criteria

The implementation will be tested by:

1. **API Conformance**: All endpoints respond with correct status codes and data structures
2. **State Management**: Crawler start/stop works correctly, cannot start twice, cannot stop when idle
3. **WebSocket**: Real-time data is pushed correctly
4. **Error Handling**: Proper HTTP error responses (400, 404, 422, 500)

## Deliverables

Provide complete, runnable code that can be started with:
\`\`\`bash
uvicorn main:app --port 8080
\`\`\`

---

## OpenAPI Specification

\`\`\`yaml
openapi: 3.1.0
info:
  title: MediaCrawler WebUI API
  description: API for controlling MediaCrawler from WebUI
  version: 1.0.0

servers:
  - url: http://localhost:8080

paths:
  /api/crawler/start:
    post:
      summary: Start Crawler
      description: Start a crawler task. Returns 400 if already running.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CrawlerStartRequest'
      responses:
        '200':
          description: Crawler started
        '400':
          description: Crawler already running
        '422':
          description: Validation error
        '500':
          description: Failed to start

  /api/crawler/stop:
    post:
      summary: Stop Crawler
      description: Stop the running crawler. Returns 400 if no crawler is running.
      responses:
        '200':
          description: Crawler stopped
        '400':
          description: No crawler running
        '500':
          description: Failed to stop

  /api/crawler/status:
    get:
      summary: Get Crawler Status
      responses:
        '200':
          description: Current status

  /api/crawler/logs:
    get:
      summary: Get Logs
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 100
      responses:
        '200':
          description: Log entries

  /api/data/files:
    get:
      summary: List Data Files
      responses:
        '200':
          description: File list

  /api/data/files/{file_path}:
    get:
      summary: Get File Content
      responses:
        '200':
          description: File content or download
        '403':
          description: Access denied
        '404':
          description: File not found

  /api/data/download/{file_path}:
    get:
      summary: Download File
      responses:
        '200':
          description: File download
        '404':
          description: File not found

  /api/data/stats:
    get:
      summary: Get Data Statistics
      responses:
        '200':
          description: Statistics

  /api/health:
    get:
      summary: Health Check
      responses:
        '200':
          description: OK

  /api/env/check:
    get:
      summary: Environment Check
      responses:
        '200':
          description: Environment status

  /api/config/platforms:
    get:
      summary: Get Platforms
      responses:
        '200':
          description: Platform list (xhs, dy, ks, bili, wb, tieba, zhihu)

  /api/config/options:
    get:
      summary: Get Config Options
      responses:
        '200':
          description: Configuration options

components:
  schemas:
    CrawlerStartRequest:
      type: object
      required: [platform]
      properties:
        platform:
          type: string
          enum: [xhs, dy, ks, bili, wb, tieba, zhihu]
        login_type:
          type: string
          enum: [qrcode, phone, cookie]
        crawler_type:
          type: string
          enum: [search, detail, creator]
        keywords:
          type: string
        # ... more properties

    CrawlerStatusResponse:
      type: object
      properties:
        status:
          type: string
          enum: [idle, running, stopping, error]
        platform:
          type: string
        started_at:
          type: string

x-websocket-endpoints:
  /api/ws/logs:
    description: Real-time log streaming via WebSocket
  /api/ws/status:
    description: Real-time status updates every 1 second
\`\`\`

---

## Example Test Scenarios

\`\`\`python
# Test 1: Start crawler
POST /api/crawler/start
{"platform": "xhs", "crawler_type": "search", "keywords": "test"}
# Expected: 200 OK

# Test 2: Cannot start again
POST /api/crawler/start
{"platform": "dy"}
# Expected: 400 Bad Request

# Test 3: Check status
GET /api/crawler/status
# Expected: {"status": "running", "platform": "xhs", ...}

# Test 4: Stop crawler
POST /api/crawler/stop
# Expected: 200 OK

# Test 5: Cannot stop again
POST /api/crawler/stop
# Expected: 400 Bad Request

# Test 6: WebSocket logs
WS /api/ws/logs
# Expected: Receive log entries in real-time
\`\`\`

Now, implement the complete backend service.`
    },

    // 页面1：需求页数据
    requirement: {
      goal: "交付一个可运行的 MediaCrawler FastAPI Web 服务",
      features: [
        { icon: "Monitor", title: "WebUI 可访问", desc: "前端页面可正常加载渲染" },
        { icon: "Server", title: "REST API 可调用", desc: "所有接口返回正确响应" },
        { icon: "Radio", title: "WebSocket 实时推送", desc: "日志流实时传输到前端" },
        { icon: "Database", title: "数据管理", desc: "data/目录预览下载统计" }
      ],
      techRequirements: [
        "通过 subprocess 启动/停止 CLI 爬虫进程",
        "读取 data/ 目录下的数据文件",
        "支持文件预览、下载、统计",
        "具备基本工程质量（错误处理、日志等）"
      ]
    },

    // 页面2：过程记录数据
    process: [
      { step: 1, status: "success", title: "代码生成速度快", desc: "写完会自己进验证流程：导包、跑接口、定位报错、修复", highlight: "比 MiniMax M2 强了很多" },
      { step: 2, status: "warning", title: "subprocess 补齐", desc: "启动爬虫接口一开始没真正拉起 subprocess", highlight: "强调后第二轮补齐" },
      { step: 3, status: "error", title: "WebSocket 异常", desc: "实时日志前端拉不到", highlight: "再对话一轮修掉大问题" }
    ],
    processSummary: "整体表现：3轮对话完成交付，自验证能力明显提升",

    // 页面3：结果对比数据
    result: {
      comparison: [
        {
          model: "MiniMax M2",
          score: 70,
          color: "#6b7280",
          comments: [
            "基础功能可完成",
            "缺乏自验证流程",
            "subprocess需手动补充",
            "WebSocket问题较多"
          ]
        },
        {
          model: "MiniMax M2.1",
          score: 85,
          color: "#FF6B6B",
          improvement: 15,
          isHighlighted: true,
          comments: [
            "自验证能力明显提升",
            "会主动跑接口检查",
            "3轮对话完成交付",
            "工程化思维增强"
          ]
        }
      ],
      conclusion: "MiniMax M2.1 相比 MiniMax M2 提升 15%，同任务 Claude Opus 4.5 细节处理更优，但 MiniMax M2.1 已有明显进步"
    }
  },
  task2: {
    title: "任务2：问卷Agent加新功能",

    // 页面1：需求页数据
    requirement: {
      goal: "给 CurionAgent 问卷填写助手加步骤记录功能",
      desc: "把每个步骤的问题、答案列表以及Agent做的选择（Tool Calling）记录下来，截图保存每一个问答",
      features: [
        { icon: "FileText", title: "步骤记录", desc: "记录每一步的问题和答案" },
        { icon: "MousePointer", title: "Tool Calling日志", desc: "记录Agent的工具调用行为" },
        { icon: "Camera", title: "截图存档", desc: "每个问答步骤自动截图" },
        { icon: "ListChecks", title: "问答追踪", desc: "完整追踪问答选择过程" }
      ]
    },

    // 页面2：过程记录数据
    process: [
      { step: 1, status: "success", title: "模块化设计", desc: "新建 agent/step_logger.py，职责分离清晰", highlight: "符合单一职责原则" },
      { step: 2, status: "success", title: "数据结构清晰", desc: "使用 dataclasses 定义 AnswerOption/QuestionInfo/SurveyStep", highlight: "类型安全，IDE友好" },
      { step: 3, status: "success", title: "智能反向定位", desc: "通过 CSS Selector 反向查找题目，映射 click 行为到选项", highlight: "理解了业务逻辑" }
    ],
    processSummary: "完成了一次非常工程化的功能开发，代码逻辑严密",

    // 页面3：评价维度数据
    result: {
      score: 85,
      verdict: "表现良好",
      dimensions: [
        {
          title: "架构设计",
          icon: "Layers",
          color: "#22c55e",
          rating: "合理",
          points: [
            "职责分离：runner.py负责Hook，step_logger.py负责核心逻辑",
            "使用 dataclasses 定义数据结构",
            "符合单一职责原则"
          ]
        },
        {
          title: "仓库理解",
          icon: "Brain",
          color: "#3b82f6",
          rating: "较好",
          points: [
            "实现了HTML解析逻辑（基于BeautifulSoup）",
            "能识别单选、多选、矩阵等题型",
            "实现了反向关联功能"
          ]
        },
        {
          title: "集成质量",
          icon: "Plug",
          color: "#8b5cf6",
          rating: "可控",
          points: [
            "只在关键生命周期节点插入代码",
            "侵入性控制得当",
            "具有基本的容错性"
          ]
        },
        {
          title: "文档能力",
          icon: "FileText",
          color: "#f59e0b",
          rating: "主动",
          points: [
            "主动产出设计文档",
            "文档包含类图和示例",
            "文档结构清晰"
          ]
        },
        {
          title: "上下文感知",
          icon: "Sparkles",
          color: "#ec4899",
          rating: "加分项",
          points: [
            "顺手修改了本地化文案",
            "微调了页面样式",
            "有一定的上下文感知"
          ]
        }
      ],
      conclusion: "整体完成度较好，代码结构清晰，具备工程化思维"
    }
  },
  task3: {
    title: "任务3：Agent横评",
    goal: {
      title: "评测目标",
      content: "相同 Prompt + 相同问卷，横评四个模型的 Agentic 能力（推理与工具调用）。",
      models: ["MiniMax M2.1", "DeepSeek V3.2", "Kimi-k2-turbo-preview", "GLM4.6"],
      dimensions: ["Token 消耗", "速度", "推理质量", "业务准确性"]
    },
    process: {
      title: "评测过程",
      steps: [
        "统一环境：Curion Survey Agent v2.1（Mock Survey，17 Steps）",
        "统一策略：相同人设与流程，完整记录日志与截图",
        "统计指标：平均单步耗时、Token 消耗、行为模式、完成状态"
      ]
    },
    result: {
      title: "结果对比",
      comparison: [
        { model: "MiniMax M2.1", time: 11.5, tokens: 97, behavior: "Rich", color: "#FF6B6B", verdict: "Success · 拟人度高" },
        { model: "Kimi-k2-turbo-preview", time: 8.4, tokens: 82, behavior: "Minimal", color: "#3b82f6", verdict: "Success · 成本最低" },
        { model: "DeepSeek V3.2", time: 14.4, tokens: 93, behavior: "Minimal", color: "#6b7280", verdict: "Success · 稳定" },
        { model: "GLM4.6", time: 13.8, tokens: 94, behavior: "Standard", color: "#6b7280", verdict: "Success · 稳定" }
      ]
    },
    summary: {
      title: "总结",
      points: [
        "MiniMax M2.1 推理与拟人化最强，业务准确性更高，但 Token 成本略高",
        "Kimi-k2-turbo-preview 速度最快、成本最低，行为偏极简",
        "DeepSeek V3.2 / GLM4.6 表现稳定，但优势不突出"
      ]
    }
  },
  summary: {
    title: "总结",
    intro: "官方榜单和亮点我都看了，但这期更关键的是工程事实",
    keyPoint: "M2.1 在长任务里更愿意自检、自修复，可用性确实比 M2 更高",
    warning: {
      title: "但也别神化",
      content: "WebSocket、实时链路这种地方，它还是会踩坑，最后还是需要你验收和补刀"
    },
    pricing: {
      title: "现在 Agent 模型成本很低，真的很便宜",
      unit: "元/百万 tokens",
      models: [
        { name: "MiniMax - M2.1", input: 2.1, output: 8.4, cacheRead: 0.21, cacheWrite: 2.625 },
        { name: "MiniMax - M2.1 - lightning", input: 2.1, output: 16.8, cacheRead: 0.21, cacheWrite: 2.625 }
      ]
    }
  }
};

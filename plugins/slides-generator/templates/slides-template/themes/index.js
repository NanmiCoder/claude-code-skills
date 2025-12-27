/**
 * 幻灯片主题配置
 * 每个主题包含 10 个颜色变量，用于 Tailwind CSS
 */

export const THEMES = {
  // MiniMax 红色主题
  minimax: {
    name: "MiniMax",
    colors: {
      'primary-100': '#de283b',  // 主色 - 深红
      'primary-200': '#ff6366',  // 主色 - 浅红
      'primary-300': '#ffccc4',  // 主色 - 粉红背景
      'accent-100': '#25b1bf',   // 强调色 - 青色
      'accent-200': '#005461',   // 强调色 - 深青
      'text-100': '#1a1a1a',     // 主文字
      'text-200': '#404040',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#f5f5f5',       // 次背景
      'bg-300': '#cccccc',       // 边框
    }
  },

  // DeepSeek 蓝色主题
  deepseek: {
    name: "DeepSeek",
    colors: {
      'primary-100': '#2563eb',  // 主色 - 深蓝
      'primary-200': '#3b82f6',  // 主色 - 中蓝
      'primary-300': '#bfdbfe',  // 主色 - 浅蓝背景
      'accent-100': '#10b981',   // 强调色 - 绿色
      'accent-200': '#065f46',   // 强调色 - 深绿
      'text-100': '#0f172a',     // 主文字
      'text-200': '#475569',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#f1f5f9',       // 次背景
      'bg-300': '#cbd5e1',       // 边框
    }
  },

  // Claude 橙色主题
  claude: {
    name: "Claude",
    colors: {
      'primary-100': '#d97706',  // 主色 - 橙色
      'primary-200': '#f59e0b',  // 主色 - 浅橙
      'primary-300': '#fef3c7',  // 主色 - 淡黄背景
      'accent-100': '#7c3aed',   // 强调色 - 紫色
      'accent-200': '#5b21b6',   // 强调色 - 深紫
      'text-100': '#1c1917',     // 主文字
      'text-200': '#57534e',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#fafaf9',       // 次背景
      'bg-300': '#d6d3d1',       // 边框
    }
  },

  // OpenAI 绿色主题
  openai: {
    name: "OpenAI",
    colors: {
      'primary-100': '#10a37f',  // 主色 - OpenAI 绿
      'primary-200': '#34d399',  // 主色 - 浅绿
      'primary-300': '#d1fae5',  // 主色 - 淡绿背景
      'accent-100': '#1d4ed8',   // 强调色 - 蓝色
      'accent-200': '#1e3a8a',   // 强调色 - 深蓝
      'text-100': '#111827',     // 主文字
      'text-200': '#4b5563',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#f9fafb',       // 次背景
      'bg-300': '#d1d5db',       // 边框
    }
  },

  // Moonshot/Kimi 紫色主题
  moonshot: {
    name: "Moonshot",
    colors: {
      'primary-100': '#7c3aed',  // 主色 - 紫色
      'primary-200': '#a78bfa',  // 主色 - 浅紫
      'primary-300': '#ede9fe',  // 主色 - 淡紫背景
      'accent-100': '#ec4899',   // 强调色 - 粉色
      'accent-200': '#be185d',   // 强调色 - 深粉
      'text-100': '#1e1b4b',     // 主文字
      'text-200': '#6366f1',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#faf5ff',       // 次背景
      'bg-300': '#c4b5fd',       // 边框
    }
  },

  // 通用科技蓝主题
  'tech-blue': {
    name: "科技蓝",
    colors: {
      'primary-100': '#0ea5e9',  // 主色 - 天蓝
      'primary-200': '#38bdf8',  // 主色 - 浅蓝
      'primary-300': '#e0f2fe',  // 主色 - 淡蓝背景
      'accent-100': '#6366f1',   // 强调色 - 靛蓝
      'accent-200': '#4338ca',   // 强调色 - 深靛蓝
      'text-100': '#0c4a6e',     // 主文字
      'text-200': '#0369a1',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#f0f9ff',       // 次背景
      'bg-300': '#bae6fd',       // 边框
    }
  },

  // 中性灰主题
  neutral: {
    name: "中性灰",
    colors: {
      'primary-100': '#6b7280',  // 主色 - 灰色
      'primary-200': '#9ca3af',  // 主色 - 浅灰
      'primary-300': '#e5e7eb',  // 主色 - 淡灰背景
      'accent-100': '#3b82f6',   // 强调色 - 蓝色点缀
      'accent-200': '#1d4ed8',   // 强调色 - 深蓝
      'text-100': '#111827',     // 主文字
      'text-200': '#6b7280',     // 次文字
      'bg-100': '#ffffff',       // 主背景
      'bg-200': '#f9fafb',       // 次背景
      'bg-300': '#d1d5db',       // 边框
    }
  }
};

/**
 * 根据模型名称推荐主题
 */
export function recommendTheme(modelName) {
  const name = modelName.toLowerCase();

  if (name.includes('minimax') || name.includes('m2.1') || name.includes('abab')) {
    return 'minimax';
  }
  if (name.includes('deepseek') || name.includes('deep-seek')) {
    return 'deepseek';
  }
  if (name.includes('claude') || name.includes('anthropic')) {
    return 'claude';
  }
  if (name.includes('gpt') || name.includes('openai') || name.includes('chatgpt')) {
    return 'openai';
  }
  if (name.includes('kimi') || name.includes('moonshot')) {
    return 'moonshot';
  }

  return 'tech-blue'; // 默认使用科技蓝
}

/**
 * 生成 Tailwind 配置
 */
export function generateTailwindConfig(themeName) {
  const theme = THEMES[themeName] || THEMES['tech-blue'];

  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        'primary-100': '${theme.colors['primary-100']}',
        'primary-200': '${theme.colors['primary-200']}',
        'primary-300': '${theme.colors['primary-300']}',
        'accent-100': '${theme.colors['accent-100']}',
        'accent-200': '${theme.colors['accent-200']}',
        'text-100': '${theme.colors['text-100']}',
        'text-200': '${theme.colors['text-200']}',
        'bg-100': '${theme.colors['bg-100']}',
        'bg-200': '${theme.colors['bg-200']}',
        'bg-300': '${theme.colors['bg-300']}',
      },
    },
  },
  plugins: [],
}`;
}

export default THEMES;

/**
 * 幻灯片主题配置
 * 通用配色系统，不绑定特定品牌
 * 完整配色库参见: skills/slides-generator/themes/palettes.md
 */

export const THEMES = {
  // 红青对比主题
  'red-cyan-contrast': {
    name: "红青对比",
    tags: ["红色", "青色", "对比", "现代", "活力"],
    colors: {
      'primary-100': '#de283b',
      'primary-200': '#ff6366',
      'primary-300': '#ffccc4',
      'accent-100': '#25b1bf',
      'accent-200': '#005461',
      'text-100': '#1a1a1a',
      'text-200': '#404040',
      'bg-100': '#ffffff',
      'bg-200': '#f5f5f5',
      'bg-300': '#cccccc',
    }
  },

  // 深蓝专业主题
  'blue-professional': {
    name: "深蓝专业",
    tags: ["蓝色", "专业", "商务"],
    colors: {
      'primary-100': '#2563eb',
      'primary-200': '#3b82f6',
      'primary-300': '#bfdbfe',
      'accent-100': '#10b981',
      'accent-200': '#065f46',
      'text-100': '#0f172a',
      'text-200': '#475569',
      'bg-100': '#ffffff',
      'bg-200': '#f1f5f9',
      'bg-300': '#cbd5e1',
    }
  },

  // 橙色温暖主题
  'orange-warm': {
    name: "橙色温暖",
    tags: ["橙色", "温暖", "活力"],
    colors: {
      'primary-100': '#d97706',
      'primary-200': '#f59e0b',
      'primary-300': '#fef3c7',
      'accent-100': '#7c3aed',
      'accent-200': '#5b21b6',
      'text-100': '#1c1917',
      'text-200': '#57534e',
      'bg-100': '#ffffff',
      'bg-200': '#fafaf9',
      'bg-300': '#d6d3d1',
    }
  },

  // 奶油暖色主题
  'warm-cream': {
    name: "奶油暖色",
    tags: ["橙色", "温暖", "复古", "奶油", "品牌"],
    colors: {
      'primary-100': '#FF7F50',
      'primary-200': '#dd6236',
      'primary-300': '#8f1e00',
      'accent-100': '#8B4513',
      'accent-200': '#ffd299',
      'text-100': '#000000',
      'text-200': '#2c2c2c',
      'bg-100': '#F7EEDD',
      'bg-200': '#ede4d3',
      'bg-300': '#c4bcab',
    }
  },

  // 深色森林绿主题
  'dark-sage-green': {
    name: "深色森林绿",
    tags: ["深色", "绿色", "自然", "森林", "科技"],
    colors: {
      'primary-100': '#2E8B57',
      'primary-200': '#61bc84',
      'primary-300': '#c6ffe6',
      'accent-100': '#8FBC8F',
      'accent-200': '#345e37',
      'text-100': '#FFFFFF',
      'text-200': '#e0e0e0',
      'bg-100': '#1E1E1E',
      'bg-200': '#2d2d2d',
      'bg-300': '#454545',
    }
  },

  // 紫色浪漫主题
  'purple-elegant': {
    name: "紫色优雅",
    tags: ["紫色", "浪漫", "优雅"],
    colors: {
      'primary-100': '#7c3aed',
      'primary-200': '#a78bfa',
      'primary-300': '#ede9fe',
      'accent-100': '#ec4899',
      'accent-200': '#be185d',
      'text-100': '#1e1b4b',
      'text-200': '#6366f1',
      'bg-100': '#ffffff',
      'bg-200': '#faf5ff',
      'bg-300': '#c4b5fd',
    }
  },

  // 天蓝科技主题
  'tech-blue': {
    name: "科技蓝",
    tags: ["蓝色", "科技", "现代"],
    colors: {
      'primary-100': '#0ea5e9',
      'primary-200': '#38bdf8',
      'primary-300': '#e0f2fe',
      'accent-100': '#6366f1',
      'accent-200': '#4338ca',
      'text-100': '#0c4a6e',
      'text-200': '#0369a1',
      'bg-100': '#ffffff',
      'bg-200': '#f0f9ff',
      'bg-300': '#bae6fd',
    }
  },

  // 中性灰主题
  'neutral-gray': {
    name: "中性灰",
    tags: ["灰色", "中性", "对比"],
    colors: {
      'primary-100': '#6b7280',
      'primary-200': '#9ca3af',
      'primary-300': '#e5e7eb',
      'accent-100': '#3b82f6',
      'accent-200': '#1d4ed8',
      'text-100': '#111827',
      'text-200': '#6b7280',
      'bg-100': '#ffffff',
      'bg-200': '#f9fafb',
      'bg-300': '#d1d5db',
    }
  },

  // 深色蓝宝石主题
  'dark-sapphire': {
    name: "深蓝宝石",
    tags: ["深色", "蓝色", "专业", "科技"],
    colors: {
      'primary-100': '#1f3a5f',
      'primary-200': '#4d648d',
      'primary-300': '#3d5a80',
      'accent-100': '#cee8ff',
      'accent-200': '#a0c4e8',
      'text-100': '#cee8ff',
      'text-200': '#a0c4e8',
      'bg-100': '#0f1c2e',
      'bg-200': '#162438',
      'bg-300': '#1f3a5f',
    }
  },

  // 赛博朋克主题
  'cyberpunk': {
    name: "赛博朋克",
    tags: ["霓虹", "赛博朋克", "科幻", "未来"],
    colors: {
      'primary-100': '#ff6b6b',
      'primary-200': '#dd4d51',
      'primary-300': '#ff9999',
      'accent-100': '#00ffff',
      'accent-200': '#00999b',
      'text-100': '#ffffff',
      'text-200': '#cccccc',
      'bg-100': '#0f0f0f',
      'bg-200': '#1a1a1a',
      'bg-300': '#333333',
    }
  },

  // 霓虹紫主题
  'neon-purple': {
    name: "霓虹紫",
    tags: ["霓虹", "紫色", "夜店", "科幻"],
    colors: {
      'primary-100': '#6c35de',
      'primary-200': '#a364ff',
      'primary-300': '#cb80ff',
      'accent-100': '#ff00ff',
      'accent-200': '#b300b2',
      'text-100': '#ffffff',
      'text-200': '#d4d4d4',
      'bg-100': '#241b35',
      'bg-200': '#2d2345',
      'bg-300': '#373737',
    }
  },

  // 自然草地主题
  'summer-meadow': {
    name: "夏日草地",
    tags: ["自然", "夏季", "草地", "绿色"],
    colors: {
      'primary-100': '#8fbf9f',
      'primary-200': '#68a67d',
      'primary-300': '#b8d4c3',
      'accent-100': '#f18f01',
      'accent-200': '#833500',
      'text-100': '#2d4a3e',
      'text-200': '#4a6b5d',
      'bg-100': '#f5ecd7',
      'bg-200': '#ebe3ce',
      'bg-300': '#d4cbb8',
    }
  },

  // 金色奢华主题
  'gold-luxury': {
    name: "金色奢华",
    tags: ["金色", "奢华", "高端"],
    colors: {
      'primary-100': '#ffd700',
      'primary-200': '#ddb900',
      'primary-300': '#fff4b3',
      'accent-100': '#c49216',
      'accent-200': '#5e3b00',
      'text-100': '#ffd700',
      'text-200': '#ddb900',
      'bg-100': '#1e1e1e',
      'bg-200': '#2a2a2a',
      'bg-300': '#3a3a3a',
    }
  },

  // 中国风朱红主题
  'vermilion-chinese': {
    name: "中国朱红",
    tags: ["中国风", "朱红", "金色", "传统"],
    colors: {
      'primary-100': '#c74331',
      'primary-200': '#8b2f22',
      'primary-300': '#e8a089',
      'accent-100': '#f2c335',
      'accent-200': '#c2950c',
      'text-100': '#4a2c20',
      'text-200': '#6b4a3e',
      'bg-100': '#efd8bb',
      'bg-200': '#e5cba8',
      'bg-300': '#d4b894',
    }
  },

  // 极简黑白主题
  'minimal-bw': {
    name: "极简黑白",
    tags: ["极简", "黑白", "经典"],
    colors: {
      'primary-100': '#000000',
      'primary-200': '#333333',
      'primary-300': '#666666',
      'accent-100': '#7f7f7f',
      'accent-200': '#4a4a4a',
      'text-100': '#000000',
      'text-200': '#4a4a4a',
      'bg-100': '#ffffff',
      'bg-200': '#f5f5f5',
      'bg-300': '#e0e0e0',
    }
  },

  // 银行金融主题
  'banking-trust': {
    name: "金融信任",
    tags: ["专业", "银行", "金融", "信任"],
    colors: {
      'primary-100': '#0070c0',
      'primary-200': '#004e86',
      'primary-300': '#b3d4f0',
      'accent-100': '#ffc000',
      'accent-200': '#b38600',
      'text-100': '#1a1a1a',
      'text-200': '#4a4a4a',
      'bg-100': '#f5f5f5',
      'bg-200': '#ebebeb',
      'bg-300': '#d1d1d1',
    }
  }
};

/**
 * 根据标签匹配主题
 * @param {string[]} keywords - 用户需求关键词
 * @returns {string[]} - 匹配的主题ID列表（按匹配度排序）
 */
export function matchThemesByTags(keywords) {
  const normalizedKeywords = keywords.map(k => k.toLowerCase());
  const scores = [];

  for (const [themeId, theme] of Object.entries(THEMES)) {
    let score = 0;
    for (const keyword of normalizedKeywords) {
      for (const tag of theme.tags) {
        if (tag.toLowerCase().includes(keyword) || keyword.includes(tag.toLowerCase())) {
          score += 1;
        }
      }
    }
    if (score > 0) {
      scores.push({ themeId, score, name: theme.name });
    }
  }

  // 按匹配度排序
  scores.sort((a, b) => b.score - a.score);
  return scores.map(s => s.themeId);
}

/**
 * 获取主题列表（用于展示）
 */
export function getThemeList() {
  return Object.entries(THEMES).map(([id, theme]) => ({
    id,
    name: theme.name,
    tags: theme.tags,
    preview: theme.colors['primary-100']
  }));
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

/**
 * 从 palettes.md 的配色创建自定义主题
 * AI 使用此函数将5色推导为10色
 */
export function createCustomTheme(name, colors5, isDark = false) {
  // colors5: [bg, primary, secondary, accent, extra]
  const [bg, primary, secondary, accent, extra] = colors5;

  // 判断是否深色主题
  const isActuallyDark = isDark || isColorDark(bg);

  if (isActuallyDark) {
    return {
      name,
      colors: {
        'primary-100': primary,
        'primary-200': secondary,
        'primary-300': lightenColor(primary, 0.3),
        'accent-100': accent,
        'accent-200': darkenColor(accent, 0.2),
        'text-100': extra || '#ffffff',
        'text-200': lightenColor(extra || '#ffffff', -0.2),
        'bg-100': bg,
        'bg-200': lightenColor(bg, 0.05),
        'bg-300': lightenColor(bg, 0.15),
      }
    };
  } else {
    return {
      name,
      colors: {
        'primary-100': primary,
        'primary-200': secondary,
        'primary-300': lightenColor(primary, 0.5),
        'accent-100': accent,
        'accent-200': darkenColor(accent, 0.2),
        'text-100': darkenColor(bg, 0.9),
        'text-200': darkenColor(bg, 0.6),
        'bg-100': bg,
        'bg-200': darkenColor(bg, 0.03),
        'bg-300': darkenColor(bg, 0.15),
      }
    };
  }
}

// 辅助函数：判断颜色是否为深色
function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

// 辅助函数：提亮颜色
function lightenColor(hex, amount) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 255 * amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 255 * amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 255 * amount);
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// 辅助函数：加深颜色
function darkenColor(hex, amount) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) * (1 - amount));
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) * (1 - amount));
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) * (1 - amount));
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

export default THEMES;

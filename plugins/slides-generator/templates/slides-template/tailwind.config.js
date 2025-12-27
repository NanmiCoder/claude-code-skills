/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Primary colors - 主色调红色系
        'primary-100': '#de283b',
        'primary-200': '#ff6366',
        'primary-300': '#ffccc4',
        // Accent colors - 强调色青色系
        'accent-100': '#25b1bf',
        'accent-200': '#005461',
        // Text colors - 文字颜色
        'text-100': '#1a1a1a',
        'text-200': '#404040',
        // Background colors - 背景颜色
        'bg-100': '#ffffff',
        'bg-200': '#f5f5f5',
        'bg-300': '#cccccc',
      },
    },
  },
  plugins: [],
}

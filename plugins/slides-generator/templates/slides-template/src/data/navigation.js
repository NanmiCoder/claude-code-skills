import {
  Home,
  Target,
  Cpu,
  GitBranch,
  BarChart3,
  Trophy,
  FileText,
  GitMerge,
  Award
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'home', slideIndex: 0, icon: Home, label: "首页" },
  { id: 'framework', slideIndex: 1, icon: Target, label: "评测框架" },
  {
    id: 'task1',
    icon: Cpu,
    label: "任务1",
    children: [
      { id: 'task1-requirement', slideIndex: 2, icon: FileText, label: "需求" },
      { id: 'task1-process', slideIndex: 3, icon: GitMerge, label: "过程" },
      { id: 'task1-result', slideIndex: 4, icon: Award, label: "结果" }
    ]
  },
  {
    id: 'task2',
    icon: GitBranch,
    label: "任务2",
    children: [
      { id: 'task2-requirement', slideIndex: 5, icon: FileText, label: "需求" },
      { id: 'task2-process', slideIndex: 6, icon: GitMerge, label: "过程" },
      { id: 'task2-result', slideIndex: 7, icon: Award, label: "结果" }
    ]
  },
  {
    id: 'task3',
    icon: BarChart3,
    label: "任务3",
    children: [
      { id: 'task3-goal', slideIndex: 8, icon: FileText, label: "目标/过程" },
      { id: 'task3-result', slideIndex: 9, icon: Award, label: "结果/总结" }
    ]
  },
  { id: 'summary', slideIndex: 10, icon: Trophy, label: "总结" }
];

import { ChevronRight } from 'lucide-react';

export const ProcessFlowArrow = ({ delay = 0 }) => (
  <div
    className="flex items-center mx-6 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center">
      {/* 虚线 */}
      <div className="h-0.5 w-16 bg-gradient-to-r from-text-200/20 to-text-200/50" />
      {/* 箭头 */}
      <ChevronRight className="text-text-200/50 w-7 h-7 -ml-1" />
    </div>
  </div>
);

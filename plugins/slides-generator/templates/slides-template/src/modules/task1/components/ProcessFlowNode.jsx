import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { GlassCard } from '@/components';

const statusConfig = {
  success: {
    bgColor: 'bg-accent-100/10',
    borderColor: 'border-accent-100/40',
    iconColor: 'text-accent-100',
    highlightColor: '#25b1bf',
    icon: CheckCircle,
  },
  warning: {
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/40',
    iconColor: 'text-yellow-500',
    highlightColor: '#eab308',
    icon: AlertCircle,
  },
  error: {
    bgColor: 'bg-primary-100/10',
    borderColor: 'border-primary-100/40',
    iconColor: 'text-primary-100',
    highlightColor: '#de283b',
    icon: XCircle,
  },
};

export const ProcessFlowNode = ({
  step,
  status,
  title,
  desc,
  highlight,
  isActive = false,
  delay = 0,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className="flex flex-col items-center animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 节点圆圈 */}
      <div
        className={`
          relative w-28 h-28 rounded-full ${config.bgColor} ${config.borderColor}
          border-2 flex flex-col items-center justify-center
          transition-all duration-500 hover:scale-110
          ${isActive ? 'ring-4 ring-offset-4 ring-offset-bg-200' : ''}
        `}
        style={{
          boxShadow: isActive
            ? `0 0 40px ${config.highlightColor}40`
            : 'none',
          ringColor: config.highlightColor,
        }}
      >
        <Icon className={`w-9 h-9 ${config.iconColor} mb-1`} />
        <span className="font-mono text-lg font-bold text-text-100">{step}</span>
      </div>

      {/* 标题 */}
      <h4 className="font-bold text-text-100 text-xl mt-5 mb-2">{title}</h4>

      {/* 描述卡片 */}
      <GlassCard className="w-60 mt-2" glow="none">
        <div className="p-4">
          <p className="text-text-200 text-sm mb-3 leading-relaxed">{desc}</p>
          <p
            className="font-mono text-sm font-medium"
            style={{ color: config.highlightColor }}
          >
            {highlight}
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

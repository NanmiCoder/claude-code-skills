import { ArrowRight } from 'lucide-react';
import { GlassCard, ProgressBar } from '@/components';

export const ModelScoreCard = ({
  model,
  score,
  color,
  comments = [],
  improvement,
  isHighlighted = false,
  delay = 0,
}) => (
  <GlassCard
    className={`
      animate-fade-in-up h-full
      ${isHighlighted ? 'ring-2 ring-primary-100/40' : ''}
    `}
    glow={isHighlighted ? 'primary' : 'accent'}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-7">
      {/* 模型名称 */}
      <h4 className="font-mono text-lg text-text-100 mb-4">{model}</h4>

      {/* 大分数 */}
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-black text-5xl" style={{ color }}>
          {score}%
        </span>
        {improvement && (
          <span className="text-accent-100 font-mono text-lg font-bold animate-pulse">
            +{improvement}%
          </span>
        )}
      </div>

      {/* 进度条 */}
      <ProgressBar value={score} color={color} showValue={false} />

      {/* 评语列表 */}
      <ul className="mt-5 space-y-2.5">
        {comments.map((comment, i) => (
          <li key={i} className="flex items-start gap-2 text-text-200 text-sm">
            <ArrowRight
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color }}
            />
            <span>{comment}</span>
          </li>
        ))}
      </ul>
    </div>
  </GlassCard>
);

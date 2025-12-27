import { Trophy, TrendingUp } from 'lucide-react';
import { GlassCard, TechTag, ProgressBar } from '@/components';
import { SLIDES_DATA } from '@/data';
import { ModelScoreCard } from './components';

export const Task1ResultSlide = () => {
  const { result } = SLIDES_DATA.task1;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-10">
          <div className="bg-primary-100/10 p-4 rounded-xl">
            <Trophy className="text-primary-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="primary">TASK 01 / 结果</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">结果对比</h2>
          </div>
        </div>

        {/* 对比进度条总览 */}
        <GlassCard className="mb-8" glow="none">
          <div className="p-6">
            <h3 className="font-bold text-text-100 text-xl mb-5">分数总览</h3>
            <div className="space-y-4">
              {result.comparison.map((m, i) => (
                <div key={i} className="flex items-center gap-5">
                  <span className="w-36 font-mono text-text-200 text-sm">
                    {m.model}
                  </span>
                  <div className="flex-1">
                    <ProgressBar value={m.score} color={m.color} showValue={false} />
                  </div>
                  <span
                    className="font-bold text-xl w-14 text-right"
                    style={{ color: m.color }}
                  >
                    {m.score}%
                  </span>
                  {m.improvement && (
                    <span className="text-accent-100 font-mono text-sm animate-pulse w-12">
                      +{m.improvement}%
                    </span>
                  )}
                  {!m.improvement && <span className="w-12" />}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* 详细评语卡片 - 2列 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {result.comparison.map((m, i) => (
            <ModelScoreCard
              key={i}
              model={m.model}
              score={m.score}
              color={m.color}
              comments={m.comments}
              improvement={m.improvement}
              isHighlighted={m.isHighlighted}
              delay={i * 150}
            />
          ))}
        </div>

        {/* 结论高亮 */}
        <div className="flex justify-center">
          <GlassCard glow="primary" className="inline-block">
            <div className="px-8 py-4 flex items-center gap-4">
              <TrendingUp className="text-primary-100 w-7 h-7" />
              <p className="text-lg">
                <span className="text-primary-100 font-bold">
                  {result.conclusion}
                </span>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

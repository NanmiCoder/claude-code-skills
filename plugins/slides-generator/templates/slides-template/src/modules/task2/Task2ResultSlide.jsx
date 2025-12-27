import { GitBranch, Trophy, Layers, Brain, Plug, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard, TechTag, ProgressBar } from '@/components';
import { SLIDES_DATA } from '@/data';

const iconMap = {
  Layers,
  Brain,
  Plug,
  FileText,
  Sparkles,
};

export const Task2ResultSlide = () => {
  const { result } = SLIDES_DATA.task2;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1800px]">
        {/* 标题和总分 */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6 animate-fade-in-up">
            <div className="bg-accent-100/10 p-4 rounded-xl">
              <GitBranch className="text-accent-100 w-10 h-10" />
            </div>
            <div>
              <TechTag variant="accent">TASK 02 - 结果</TechTag>
              <h2 className="font-black text-text-100 text-5xl mt-2">五维度评价</h2>
            </div>
          </div>

          {/* 总分卡片 */}
          <GlassCard className="animate-scale-in" glow="primary">
            <div className="flex items-center gap-6 px-8 py-5">
              <Trophy className="text-primary-100 w-10 h-10" />
              <div>
                <p className="text-text-200/60 font-mono text-sm">综合评价</p>
                <p className="font-black text-primary-100 text-3xl">{result.verdict}</p>
              </div>
              <div className="bg-black/10 h-12 w-px mx-2"></div>
              <p className="font-black text-5xl bg-gradient-to-r from-primary-100 to-accent-100 bg-clip-text text-transparent">
                {result.score}%
              </p>
            </div>
          </GlassCard>
        </div>

        {/* 五维度评价卡片 */}
        <div className="grid grid-cols-5 gap-5 mb-8">
          {result.dimensions.map((dim, i) => {
            const Icon = iconMap[dim.icon];
            return (
              <GlassCard
                key={i}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${200 + i * 100}ms` }}
                glow="accent"
              >
                <div className="p-5 h-full flex flex-col">
                  {/* 头部 */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: `${dim.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: dim.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-text-100 text-lg">{dim.title}</h4>
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: dim.color }}
                      >
                        {dim.rating}
                      </span>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="mb-4">
                    <ProgressBar value={100} color={dim.color} showValue={false} />
                  </div>

                  {/* 评价点 */}
                  <ul className="space-y-2.5 flex-1">
                    {dim.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-text-200 text-sm">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: dim.color }}
                        />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* 结论 */}
        <GlassCard className="animate-fade-in-up" style={{ animationDelay: '800ms' }} glow="primary">
          <div className="p-6 text-center">
            <p className="text-text-100 text-xl">
              <span className="font-bold text-primary-100">结论：</span>
              {result.conclusion}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

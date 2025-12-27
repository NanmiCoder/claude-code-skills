import { Trophy, Timer, Coins, Brain, Sparkles } from 'lucide-react';
import { GlassCard, StatusBadge, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const Task3ResultSlide = () => {
  const { result, summary } = SLIDES_DATA.task3;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-10">
          <div className="bg-primary-100/10 p-4 rounded-xl">
            <Trophy className="text-primary-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="primary">TASK 03 - 结果</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">{result.title}</h2>
          </div>
        </div>

        {/* 结果对比 */}
        <GlassCard className="overflow-hidden mb-8" glow="accent">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left text-text-200 font-mono p-3 text-base">模型</th>
                  <th className="text-center text-text-200 font-mono p-3 text-base">
                    <div className="flex items-center justify-center gap-2">
                      <Timer className="w-4 h-4" /> 平均耗时
                    </div>
                  </th>
                  <th className="text-center text-text-200 font-mono p-3 text-base">
                    <div className="flex items-center justify-center gap-2">
                      <Coins className="w-4 h-4" /> Token (k)
                    </div>
                  </th>
                  <th className="text-center text-text-200 font-mono p-3 text-base">
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="w-4 h-4" /> 行为模式
                    </div>
                  </th>
                  <th className="text-right text-text-200 font-mono p-3 text-base">评价</th>
                </tr>
              </thead>
              <tbody>
                {result.comparison.map((item, i) => (
                  <tr key={i} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-bold text-text-100 text-lg">{item.model}</span>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <span className="font-mono text-xl" style={{ color: item.color }}>{item.time}s</span>
                    </td>
                    <td className="text-center p-3">
                      <span className="font-mono text-text-200 text-xl">{item.tokens}k</span>
                    </td>
                    <td className="text-center p-3">
                      <StatusBadge
                        status={
                          item.behavior === 'Rich'
                            ? 'success'
                            : item.behavior === 'Minimal'
                              ? 'info'
                              : 'warning'
                        }
                      >
                        {item.behavior}
                      </StatusBadge>
                    </td>
                    <td className="text-right p-3">
                      <span className="text-text-200 text-base">{item.verdict}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* 总结 */}
        <GlassCard glow="primary">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-100/10 p-2.5 rounded-lg">
                <Sparkles className="text-primary-100 w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-100 text-xl">{summary.title}</h3>
            </div>
            <ul className="space-y-3">
              {summary.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-text-200 text-base">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-100 flex-shrink-0"></span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

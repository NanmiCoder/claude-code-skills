import { GitBranch, Target, Code2, Trophy } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const Task2Slide = () => (
  <div className="h-full flex flex-col justify-center px-16">
    <div className="mx-auto w-full max-w-[1700px]">
      {/* 标题 */}
      <div className="flex items-center gap-6 mb-10">
        <div className="bg-accent-100/10 p-4 rounded-xl">
          <GitBranch className="text-accent-100 w-10 h-10" />
        </div>
        <div>
          <TechTag variant="accent">TASK 02</TechTag>
          <h2 className="font-black text-text-100 text-5xl mt-2">{SLIDES_DATA.task2.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* 目标 */}
        <div className="col-span-5">
          <GlassCard className="h-full" glow="primary">
            <div className="flex items-start gap-5 p-8">
              <div className="bg-primary-100/10 p-3 rounded-lg">
                <Target className="text-primary-100 w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary-100 text-2xl mb-3">{SLIDES_DATA.task2.goal.title}</h3>
                <p className="text-text-200 text-xl mb-5">{SLIDES_DATA.task2.goal.content}</p>
                <div className="flex flex-wrap gap-2">
                  {SLIDES_DATA.task2.goal.tags?.map((tag, i) => (
                    <TechTag key={i} variant="primary">{tag}</TechTag>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 过程：代码块样式 */}
        <div className="col-span-7">
          <GlassCard glow="accent">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="text-accent-100 w-7 h-7" />
                <h3 className="font-bold text-accent-200 text-2xl">工程化实现</h3>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {SLIDES_DATA.task2.process?.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-bg-200 border border-black/5 hover:border-accent-100/30 transition-all p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="text-accent-100 w-6 h-6" />
                        <span className="font-bold text-text-100 text-xl">{item.title}</span>
                      </div>
                      <p className="text-text-200 text-base">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 结果 */}
      <GlassCard glow="primary" className="mt-8">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <Trophy className="text-primary-100 w-10 h-10" />
              <div>
                <p className="text-text-200/60 font-mono text-base">评价</p>
                <p className="font-black text-primary-100 text-4xl">{SLIDES_DATA.task2.result.verdict}</p>
              </div>
            </div>
            <div className="bg-black/10 h-16 w-px"></div>
            <div className="flex gap-3">
              {SLIDES_DATA.task2.result.highlights?.map((h, i) => (
                <TechTag key={i} variant="primary">{h}</TechTag>
              ))}
            </div>
          </div>
          <p className="font-black bg-gradient-to-r from-primary-100 to-primary-200 bg-clip-text text-transparent text-5xl">
            {SLIDES_DATA.task2.result.score}
          </p>
        </div>
      </GlassCard>
    </div>
  </div>
);

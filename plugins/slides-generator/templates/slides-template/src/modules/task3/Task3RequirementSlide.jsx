import { BarChart3, Target, ListChecks } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const Task3RequirementSlide = () => {
  const { goal, process } = SLIDES_DATA.task3;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-10">
          <div className="bg-primary-100/10 p-4 rounded-xl">
            <BarChart3 className="text-primary-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="primary">TASK 03 - 目标</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">{SLIDES_DATA.task3.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 目标 */}
          <div className="col-span-6">
            <GlassCard glow="primary">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary-100/10 p-2.5 rounded-lg">
                    <Target className="text-primary-100 w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-text-100 text-xl">{goal.title}</h3>
                </div>
                <p className="text-text-200 text-base leading-relaxed">{goal.content}</p>

                <p className="text-text-200/60 font-mono text-xs mt-5 mb-2">模型</p>
                <div className="flex flex-wrap gap-2">
                  {goal.models.map((model) => (
                    <TechTag key={model} variant="primary">{model}</TechTag>
                  ))}
                </div>

                <p className="text-text-200/60 font-mono text-xs mt-4 mb-2">维度</p>
                <div className="flex flex-wrap gap-2">
                  {goal.dimensions.map((dim) => (
                    <TechTag key={dim} variant="default">{dim}</TechTag>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 过程 */}
          <div className="col-span-6">
            <GlassCard glow="accent">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent-100/10 p-2.5 rounded-lg">
                    <ListChecks className="text-accent-100 w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-text-100 text-xl">{process.title}</h3>
                </div>
                <ul className="space-y-3">
                  {process.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-text-200 text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-100 flex-shrink-0"></span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

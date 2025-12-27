import { GitBranch, Target, FileText, MousePointer, Camera, ListChecks } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

const iconMap = {
  FileText,
  MousePointer,
  Camera,
  ListChecks,
};

export const Task2RequirementSlide = () => {
  const { requirement } = SLIDES_DATA.task2;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-10 animate-fade-in-up">
          <div className="bg-accent-100/10 p-4 rounded-xl">
            <GitBranch className="text-accent-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="accent">TASK 02 - 需求</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">{SLIDES_DATA.task2.title}</h2>
          </div>
        </div>

        {/* 目标卡片 */}
        <GlassCard className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }} glow="primary">
          <div className="flex items-start gap-6 p-8">
            <div className="bg-primary-100/10 p-4 rounded-xl">
              <Target className="text-primary-100 w-9 h-9" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-primary-100 text-2xl mb-3">评测目标</h3>
              <p className="text-text-100 text-2xl font-semibold mb-3">{requirement.goal}</p>
              <p className="text-text-200 text-lg">{requirement.desc}</p>
            </div>
          </div>
        </GlassCard>

        {/* 功能需求网格 */}
        <div className="grid grid-cols-4 gap-6">
          {requirement.features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <GlassCard
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${200 + i * 100}ms` }}
                glow="accent"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent-100/10 p-3 rounded-lg">
                      <Icon className="text-accent-100 w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-text-100 text-xl">{feature.title}</h4>
                  </div>
                  <p className="text-text-200 text-base leading-relaxed">{feature.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* 底部提示词展示 */}
        <GlassCard className="mt-10 animate-fade-in-up" style={{ animationDelay: '600ms' }} glow="none">
          <div className="p-6">
            <p className="text-text-200/60 font-mono text-sm mb-2">提示词 (Prompt)</p>
            <p className="text-text-100 font-mono text-base leading-relaxed">
              "我现在要给我的agent加一个功能，这个功能是帮我们把每个步骤的问题、答案列表以及agent做的选择（tool calling）记录下来，截图保存每一个问答"
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

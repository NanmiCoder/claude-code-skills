import { Cpu, Target, Monitor, Server, Radio, Database, CheckCircle } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';
import { PromptCollapse } from './components';

const iconMap = {
  Monitor,
  Server,
  Radio,
  Database,
};

export const Task1RequirementSlide = () => {
  const { requirement, prompt } = SLIDES_DATA.task1;

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* 标题区 */}
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-primary-100/10 p-4 rounded-xl">
            <Cpu className="text-primary-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="primary">TASK 01 / 需求</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">
              {SLIDES_DATA.task1.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 左侧：目标 + 需求点 */}
          <div className="col-span-7 flex flex-col gap-5">
            {/* 主目标卡片 */}
            <GlassCard glow="primary">
              <div className="p-6 text-center">
                <Target className="text-primary-100 w-10 h-10 mx-auto mb-3" />
                <h3 className="font-bold text-text-100 text-xl mb-2">评测目标</h3>
                <p className="text-text-200 text-lg">{requirement.goal}</p>
              </div>
            </GlassCard>

            {/* 需求点网格 - 2x2 */}
            <div className="grid grid-cols-2 gap-4">
              {requirement.features.map((feature, i) => {
                const Icon = iconMap[feature.icon];
                return (
                  <GlassCard
                    key={i}
                    glow="accent"
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="p-4 text-center">
                      <Icon className="text-accent-100 w-8 h-8 mx-auto mb-2" />
                      <h4 className="font-bold text-text-100 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-text-200 text-xs">{feature.desc}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {/* 技术要求列表 */}
            <GlassCard glow="none">
              <div className="p-5">
                <h3 className="font-bold text-accent-200 text-base mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  技术要求
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {requirement.techRequirements.map((req, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-text-200 text-sm animate-fade-in-up"
                      style={{ animationDelay: `${(i + 4) * 100}ms` }}
                    >
                      <CheckCircle className="text-accent-100 w-4 h-4 flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 右侧：提示词卡片 - 与左侧高度接近 */}
          <div className="col-span-5">
            <PromptCollapse prompt={prompt} maxHeight="35.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

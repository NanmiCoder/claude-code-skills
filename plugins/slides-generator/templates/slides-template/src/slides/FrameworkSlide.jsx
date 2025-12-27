import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const FrameworkSlide = () => (
  <div className="h-full flex flex-col justify-center px-16">
    <div className="mx-auto w-full max-w-[1700px]">
      {/* 标题区 */}
      <div className="text-center mb-10">
        <TechTag variant="primary">METHODOLOGY</TechTag>
        <h2 className="font-black text-text-100 text-7xl mt-4">{SLIDES_DATA.framework.title}</h2>
        <p className="text-text-200 font-mono text-2xl mt-4">{SLIDES_DATA.framework.subtitle}</p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* 评测维度 */}
        <div className="col-span-7">
          <div className="grid grid-cols-3 gap-6">
            {SLIDES_DATA.framework.dimensions?.map((dim, i) => {
              const Icon = dim.icon;
              const glowTypes = ["primary", "accent", "primary"];
              const glowColors = ["#de283b", "#25b1bf", "#ff6366"];
              return (
                <GlassCard key={i} className="group cursor-pointer" glow={glowTypes[i]}>
                  <div className="flex flex-col p-8">
                    <div
                      className="flex items-center justify-center transition-all duration-300 group-hover:scale-110 w-16 h-16 rounded-2xl mb-6"
                      style={{
                        backgroundColor: `${glowColors[i]}15`,
                        boxShadow: `0 0 30px ${glowColors[i]}20`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: glowColors[i] }} />
                    </div>
                    <h3 className="font-bold text-text-100 text-2xl mb-3">{dim.title}</h3>
                    <p className="text-text-200 text-lg leading-relaxed mb-6">{dim.desc}</p>
                    <div className="h-4"></div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <GlassCard glow="none" className="mt-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-text-100 text-2xl">{SLIDES_DATA.framework.flow.title}</h3>
                <span className="font-mono text-text-200/70 text-sm">END-TO-END</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {SLIDES_DATA.framework.flow.steps?.map((step, i) => {
                  const StepIcon = step.icon;
                  const stepColors = ["#de283b", "#25b1bf", "#ff6366"];
                  const stepColor = stepColors[i] || "#de283b";
                  return (
                    <div key={i} className="bg-bg-200/70 border border-black/5 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-lg"
                          style={{ backgroundColor: `${stepColor}15` }}
                        >
                          <StepIcon className="w-4 h-4" style={{ color: stepColor }} />
                        </div>
                        <span className="font-mono text-xs text-text-200/70">{`STEP 0${i + 1}`}</span>
                      </div>
                      <h4 className="font-bold text-text-100 text-lg mb-2">{step.title}</h4>
                      <p className="text-text-200 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-text-200/70 text-sm">评测产出</span>
                {SLIDES_DATA.framework.outputs?.map((item, i) => (
                  <TechTag key={i} variant="default">{item}</TechTag>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 即将评测任务 */}
        <div className="col-span-5">
          <GlassCard glow="accent" className="h-full">
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <TechTag variant="accent">UP NEXT</TechTag>
                <span className="font-mono text-text-200/70 text-sm">3 TASKS</span>
              </div>
              <h3 className="font-black text-text-100 text-3xl mb-6">接下来三项评测任务</h3>
              <div className="space-y-4">
                {SLIDES_DATA.framework.nextTasks?.map((task, i) => {
                  const TaskIcon = task.icon;
                  const taskColors = ["#de283b", "#25b1bf", "#ff6366"];
                  const taskColor = taskColors[i] || "#de283b";
                  return (
                    <div key={i} className="bg-bg-200/70 border border-black/5 rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-xl"
                          style={{
                            backgroundColor: `${taskColor}15`,
                            boxShadow: `0 0 18px ${taskColor}25`
                          }}
                        >
                          <TaskIcon className="w-6 h-6" style={{ color: taskColor }} />
                        </div>
                        <div>
                          <p className="text-text-200/70 font-mono text-sm mb-1">{`任务 0${i + 1}`}</p>
                          <h4 className="font-bold text-text-100 text-xl mb-2">{task.title}</h4>
                          <p className="text-text-200 text-base leading-relaxed">{task.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-text-200/60 font-mono text-sm mt-6">
                评测不测写小游戏、画简单页面，专注真实工程场景
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
);

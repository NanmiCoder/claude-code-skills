import { useState, useEffect } from 'react';
import { GitBranch } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { ProcessFlowNode, ProcessFlowArrow } from '@/modules/task1/components';
import { SLIDES_DATA } from '@/data';

export const Task2ProcessSlide = () => {
  const { process, processSummary } = SLIDES_DATA.task2;
  const [activeStep, setActiveStep] = useState(1);

  // 自动轮播高亮
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % process.length) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [process.length]);

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-12 animate-fade-in-up">
          <div className="bg-accent-100/10 p-4 rounded-xl">
            <GitBranch className="text-accent-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="accent">TASK 02 - 过程</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">工程化实现过程</h2>
          </div>
        </div>

        {/* 水平流程图 */}
        <div className="flex items-start justify-center mb-12">
          {process.map((item, i) => (
            <div key={i} className="flex items-start">
              <ProcessFlowNode
                step={item.step}
                status={item.status}
                title={item.title}
                desc={item.desc}
                highlight={item.highlight}
                isActive={activeStep === item.step}
                delay={i * 200}
              />
              {i < process.length - 1 && <ProcessFlowArrow delay={i * 200 + 100} />}
            </div>
          ))}
        </div>

        {/* 总结 */}
        <GlassCard className="animate-fade-in-up" style={{ animationDelay: '800ms' }} glow="primary">
          <div className="p-8 text-center">
            <p className="font-bold text-text-100 text-2xl">{processSummary}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

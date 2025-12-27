import { useState, useEffect } from 'react';
import { GitMerge } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';
import { ProcessFlowNode, ProcessFlowArrow } from './components';

export const Task1ProcessSlide = () => {
  const { process, processSummary } = SLIDES_DATA.task1;
  const [activeStep, setActiveStep] = useState(0);

  // 自动轮播高亮效果
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % process.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [process.length]);

  return (
    <div className="h-full flex flex-col justify-center px-16">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* 标题 */}
        <div className="flex items-center gap-6 mb-14">
          <div className="bg-accent-100/10 p-4 rounded-xl">
            <GitMerge className="text-accent-100 w-10 h-10" />
          </div>
          <div>
            <TechTag variant="accent">TASK 01 / 过程</TechTag>
            <h2 className="font-black text-text-100 text-5xl mt-2">过程记录</h2>
          </div>
        </div>

        {/* 流程图容器 */}
        <div className="flex items-start justify-center mb-12">
          {process.map((item, i) => (
            <div key={i} className="flex items-start">
              <ProcessFlowNode
                step={item.step}
                status={item.status}
                title={item.title}
                desc={item.desc}
                highlight={item.highlight}
                isActive={activeStep === i}
                delay={i * 200}
              />
              {i < process.length - 1 && (
                <ProcessFlowArrow delay={(i + 1) * 200 + 100} />
              )}
            </div>
          ))}
        </div>

        {/* 底部总结 */}
        <div className="text-center">
          <GlassCard className="inline-block" glow="primary">
            <div className="px-8 py-4">
              <p className="text-text-200 font-mono text-lg">{processSummary}</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const HeroSlide = () => {
  const { models, benchmarks } = SLIDES_DATA.hero;

  // 找出每行最高分
  const getMaxScore = (scores) => {
    const values = Object.values(scores).filter(v => v !== null);
    return Math.max(...values);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden px-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-primary-200/15 rounded-full blur-[200px] animate-pulse"
             style={{ top: '15%', left: '20%', width: '500px', height: '500px' }}></div>
        <div className="absolute bg-accent-100/15 rounded-full blur-[200px] animate-pulse"
             style={{ bottom: '15%', right: '20%', width: '500px', height: '500px', animationDelay: '1s' }}></div>
        <div className="absolute bg-primary-300/20 rounded-full blur-[250px]"
             style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px' }}></div>
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(222,40,59,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(222,40,59,0.06) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 text-center max-w-[1600px] w-full">
        {/* 标签装饰 */}
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          {SLIDES_DATA.hero.tags?.map((tag, i) => (
            <TechTag key={i} variant={i % 2 === 0 ? "primary" : "accent"}>{tag}</TechTag>
          ))}
        </div>

        {/* 主标题 */}
        <h1 className="font-black tracking-tight text-[120px] leading-none mb-3 text-primary-100">
          {SLIDES_DATA.hero.title}
        </h1>
        <h2 className="font-black text-text-100 text-6xl mb-6">
          {SLIDES_DATA.hero.subtitle}
        </h2>

        {/* 副标题 */}
        <p className="text-text-200 font-mono text-xl mb-10">
          {SLIDES_DATA.hero.tagline}
        </p>

        {/* 基准测试表格 */}
        <GlassCard className="mx-auto" glow="primary">
          <div className="p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-text-200 font-mono text-base">Benchmark</th>
                  {models.map((model, i) => (
                    <th
                      key={model}
                      className={`py-3 px-4 text-center font-mono text-base ${
                        i === 0 ? 'text-primary-100 bg-primary-100/10 rounded-t-lg' : 'text-text-200'
                      }`}
                    >
                      {model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((bench, idx) => {
                  const maxScore = getMaxScore(bench.scores);
                  return (
                    <tr key={bench.name} className={idx < benchmarks.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="py-4 px-4 text-text-100 font-medium text-lg">{bench.name}</td>
                      {models.map((model, i) => {
                        const score = bench.scores[model];
                        const isMax = score === maxScore;
                        const isM21 = i === 0;
                        return (
                          <td
                            key={model}
                            className={`py-4 px-4 text-center text-xl font-mono ${
                              isM21 ? 'bg-primary-100/10 text-primary-100 font-bold' :
                              isMax ? 'text-green-400 font-bold' : 'text-text-200'
                            }`}
                          >
                            {score !== null ? score : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* VIBE 亮点展示 */}
        <div className="mt-8">
          {/* 标题 */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-primary-100 font-black text-2xl">VIBE</span>
            <span className="text-text-300">|</span>
            <span className="text-text-100 text-lg font-medium">衡量模型"从零到一"构建完整应用的全栈能力</span>
          </div>

          {/* 介绍文字 */}
          <p className="text-text-300 text-sm mb-4 max-w-[800px] mx-auto">
            全新基准，涵盖 Web、Simulation、Android、iOS、Backend 五大核心场景，通过 Agent-as-a-Verifier 范式自动评估交互逻辑与视觉美感
          </p>

          {/* 结论 */}
          <p className="text-text-200 text-base">
            MiniMax-M2.1 以平均 <span className="text-primary-100 font-bold">88.6</span> 分接近 Claude Opus 4.5，在几乎所有子集上显著优于 Claude Sonnet 4.5
          </p>
        </div>
      </div>
    </div>
  );
};

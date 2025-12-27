import { AlertTriangle, Coins } from 'lucide-react';
import { GlassCard, TechTag } from '@/components';
import { SLIDES_DATA } from '@/data';

export const SummarySlide = () => {
  const { pricing } = SLIDES_DATA.summary;

  return (
    <div className="h-full flex flex-col justify-center px-20">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* 标题 */}
        <div className="text-center mb-10">
          <TechTag variant="primary">CONCLUSION</TechTag>
          <h2 className="font-black text-text-100 text-7xl mt-4">{SLIDES_DATA.summary.title}</h2>
        </div>

        {/* 核心结论 */}
        <div className="text-center mb-8">
          <p className="text-text-300 text-xl mb-3">{SLIDES_DATA.summary.intro}</p>
          <p className="text-primary-100 font-bold text-3xl">{SLIDES_DATA.summary.keyPoint}</p>
        </div>

        {/* 警告提醒 */}
        <GlassCard className="mb-8">
          <div className="flex items-center gap-6 p-6">
            <div className="bg-amber-500/15 p-4 rounded-xl flex-shrink-0">
              <AlertTriangle className="text-amber-500 w-8 h-8" />
            </div>
            <div>
              <p className="text-amber-500 font-bold text-xl mb-1">{SLIDES_DATA.summary.warning.title}</p>
              <p className="text-text-200 text-lg">{SLIDES_DATA.summary.warning.content}</p>
            </div>
          </div>
        </GlassCard>

        {/* 价格表 */}
        <GlassCard glow="primary">
          <div className="p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Coins className="text-primary-100 w-7 h-7" />
              <p className="text-text-100 font-bold text-2xl">{pricing.title}</p>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-text-200 font-medium text-base text-left">模型</th>
                  <th className="py-3 px-4 text-text-200 font-medium text-base text-center">
                    <div>输入价格</div>
                    <div className="text-text-300 text-sm font-normal">{pricing.unit}</div>
                  </th>
                  <th className="py-3 px-4 text-text-200 font-medium text-base text-center">
                    <div>输出价格</div>
                    <div className="text-text-300 text-sm font-normal">{pricing.unit}</div>
                  </th>
                  <th className="py-3 px-4 text-text-200 font-medium text-base text-center">
                    <div>缓存读取</div>
                    <div className="text-text-300 text-sm font-normal">{pricing.unit}</div>
                  </th>
                  <th className="py-3 px-4 text-text-200 font-medium text-base text-center">
                    <div>缓存写入</div>
                    <div className="text-text-300 text-sm font-normal">{pricing.unit}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.models.map((model, idx) => (
                  <tr key={model.name} className={idx < pricing.models.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="py-5 px-4 text-text-100 font-medium text-lg">{model.name}</td>
                    <td className="py-5 px-4 text-center text-primary-100 font-black text-2xl">{model.input}</td>
                    <td className="py-5 px-4 text-center text-primary-100 font-black text-2xl">{model.output}</td>
                    <td className="py-5 px-4 text-center text-primary-100 font-black text-2xl">{model.cacheRead}</td>
                    <td className="py-5 px-4 text-center text-primary-100 font-black text-2xl">{model.cacheWrite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

import { Cpu, Target, Terminal, Trophy } from 'lucide-react';
import { GlassCard, StatusBadge, TechTag, ProgressBar } from '@/components';
import { SLIDES_DATA } from '@/data';

export const Task1Slide = () => (
  <div className="h-full flex flex-col justify-center px-16">
    <div className="mx-auto w-full max-w-[1700px]">
      {/* 标题 */}
      <div className="flex items-center gap-6 mb-10">
        <div className="bg-primary-100/10 p-4 rounded-xl">
          <Cpu className="text-primary-100 w-10 h-10" />
        </div>
        <div>
          <TechTag variant="primary">TASK 01</TechTag>
          <h2 className="font-black text-text-100 text-5xl mt-2">{SLIDES_DATA.task1.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* 左侧：目标 + 过程 */}
        <div className="col-span-7 flex flex-col gap-6">
          {/* 目标卡片 */}
          <GlassCard glow="primary">
            <div className="flex items-start gap-5 p-8">
              <div className="bg-primary-100/10 p-3 rounded-lg">
                <Target className="text-primary-100 w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary-100 text-2xl mb-3">{SLIDES_DATA.task1.goal.title}</h3>
                <p className="text-text-200 text-xl mb-4">{SLIDES_DATA.task1.goal.content}</p>
                <div className="flex flex-wrap gap-2">
                  {SLIDES_DATA.task1.goal.tags?.map((tag, i) => (
                    <TechTag key={i}>{tag}</TechTag>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* 过程：终端样式 */}
          <GlassCard glow="accent">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <Terminal className="text-accent-100 w-7 h-7" />
                <h3 className="font-bold text-accent-200 text-2xl">过程记录</h3>
              </div>
              <div className="flex flex-col gap-4">
                {SLIDES_DATA.task1.process?.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-bg-200 p-4 rounded-xl">
                    <StatusBadge status={item.status}>{item.status === 'success' ? '通过' : item.status === 'warning' ? '补充' : '异常'}</StatusBadge>
                    <div className="flex-1">
                      <p className="text-text-200 text-lg">{item.desc}</p>
                      <p className="font-mono text-base mt-1" style={{ color: item.status === 'success' ? '#25b1bf' : item.status === 'warning' ? '#eab308' : '#de283b' }}>
                        → {item.highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 右侧：结果 */}
        <div className="col-span-5">
          <GlassCard className="h-full" glow="primary">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="text-primary-100 w-7 h-7" />
                <h3 className="font-bold text-primary-100 text-2xl">结果对比</h3>
              </div>
              <div className="flex flex-col gap-7">
                {SLIDES_DATA.task1.result.comparison?.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-200 font-mono text-xl">{item.model}</span>
                      <span className="font-bold text-3xl" style={{ color: item.color }}>{item.score}%</span>
                    </div>
                    <ProgressBar value={item.score} color={item.color} showValue={false} />
                    {item.note && <p className="text-text-200/60 font-mono text-sm">{item.note}</p>}
                  </div>
                ))}
              </div>

              <div className="bg-primary-100/10 border border-primary-100/20 mt-8 p-5 rounded-xl">
                <p className="text-primary-100 font-mono text-xl">
                  📈 MiniMax M2.1 相比 MiniMax M2 提升 15%
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
);

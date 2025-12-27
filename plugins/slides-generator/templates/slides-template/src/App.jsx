import { useSlideNavigation } from './hooks/useSlideNavigation';
import { Sidebar, SlideController, BackgroundEffects } from './layout';
import { HeroSlide, FrameworkSlide, SummarySlide } from './slides';
import { Task1RequirementSlide, Task1ProcessSlide, Task1ResultSlide } from './modules/task1';
import { Task2RequirementSlide, Task2ProcessSlide, Task2ResultSlide } from './modules/task2';
import { Task3RequirementSlide, Task3ResultSlide } from './modules/task3';

const SLIDES = [
  HeroSlide,              // 0: 首页
  FrameworkSlide,         // 1: 评测框架
  Task1RequirementSlide,  // 2: 任务1 - 需求
  Task1ProcessSlide,      // 3: 任务1 - 过程
  Task1ResultSlide,       // 4: 任务1 - 结果
  Task2RequirementSlide,  // 5: 任务2 - 需求
  Task2ProcessSlide,      // 6: 任务2 - 过程
  Task2ResultSlide,       // 7: 任务2 - 结果
  Task3RequirementSlide,  // 8: 任务3 - 目标/过程
  Task3ResultSlide,       // 9: 任务3 - 结果/总结
  SummarySlide            // 10: 总结
];

export default function App() {
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlideNavigation(SLIDES.length);

  return (
    <div className="h-screen w-screen bg-bg-200 overflow-hidden flex">
      {/* 左侧导航栏 */}
      <Sidebar
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onSlideChange={goToSlide}
      />

      {/* 主内容区域 */}
      <main className="flex-1 h-full overflow-hidden relative">
        {SLIDES.map((Slide, i) => (
          <div
            key={i}
            className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
            style={{
              transform: `translateX(${(i - currentSlide) * 100}%)`,
              opacity: i === currentSlide ? 1 : 0.3
            }}
          >
            <Slide />
          </div>
        ))}
      </main>

      {/* 右下角浮动控制器 */}
      <SlideController
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {/* 背景装饰 */}
      <BackgroundEffects />
    </div>
  );
}

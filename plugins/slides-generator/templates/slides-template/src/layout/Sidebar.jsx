import { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '@/data';

export const Sidebar = ({ currentSlide, totalSlides, onSlideChange }) => {
  const [expandedItems, setExpandedItems] = useState({ task1: true }); // 默认展开任务1
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const activeGroup = NAV_ITEMS.find((item) =>
      item.children?.some((child) => child.slideIndex === currentSlide)
    );

    if (activeGroup) {
      setExpandedItems((prev) => {
        if (prev[activeGroup.id]) return prev;
        return { ...prev, [activeGroup.id]: true };
      });
    }
  }, [currentSlide]);

  // 检查当前slide是否在某个parent的children范围内
  const isChildSlideActive = (item) => {
    if (!item.children) return false;
    return item.children.some((child) => child.slideIndex === currentSlide);
  };

  return (
    <>
      {!isCollapsed && (
        <nav className="h-full w-20 bg-white/90 backdrop-blur-xl border-r border-black/5 flex flex-col items-center py-6 z-50 shadow-lg shadow-black/5">
          {/* Logo */}
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center w-14 h-14 rounded-xl mb-10 shadow-md">
            <span className="text-white font-black text-2xl">M</span>
          </div>

          {/* 导航项 */}
          <div className="flex-1 flex flex-col items-center gap-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems[item.id];
              const isGroupActive = hasChildren && isChildSlideActive(item);
              const isActive = !hasChildren && item.slideIndex === currentSlide;
              const showActive = isActive || (isGroupActive && !isExpanded);

              return (
                <div key={item.id} className="w-full flex flex-col items-center">
                  {/* 主导航项 */}
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.id);
                        // 点击时也跳转到第一个子页面
                        onSlideChange(item.children[0].slideIndex);
                      } else {
                        onSlideChange(item.slideIndex);
                      }
                    }}
                    className={`flex items-center justify-center transition-all duration-300 group relative w-12 h-12 rounded-xl ${
                      showActive
                        ? 'bg-primary-100/10 border border-primary-100/30'
                        : 'hover:bg-black/5 border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors ${
                        showActive
                          ? 'text-primary-100'
                          : 'text-text-200/50 group-hover:text-text-100'
                      }`}
                    />
                    {/* 展开指示器 */}
                    {hasChildren && (
                      <ChevronDown
                        className={`absolute -bottom-0.5 w-3 h-3 text-text-200/40 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 px-3 py-1.5 bg-text-100 text-white text-sm whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                      {item.label}
                    </span>
                  </button>

                  {/* 子导航 */}
                  {hasChildren && isExpanded && (
                    <div className="flex flex-col items-center gap-1 mt-1 mb-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = currentSlide === child.slideIndex;
                        return (
                          <button
                            key={child.id}
                            onClick={() => onSlideChange(child.slideIndex)}
                            className={`flex items-center justify-center transition-all duration-300 group relative w-9 h-9 rounded-lg ${
                              isChildActive
                                ? 'bg-accent-100/15 border border-accent-100/30'
                                : 'hover:bg-black/5 border border-transparent'
                            }`}
                          >
                            <ChildIcon
                              className={`w-4 h-4 transition-colors ${
                                isChildActive
                                  ? 'text-accent-100'
                                  : 'text-text-200/40 group-hover:text-text-100'
                              }`}
                            />
                            {/* Tooltip */}
                            <span className="absolute left-full ml-3 px-2 py-1 bg-text-100 text-white text-xs whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                              {child.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 进度指示器 */}
          <div className="flex flex-col gap-1.5 mt-4">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded transition-all duration-300 ${
                  i === currentSlide
                    ? 'h-6 bg-gradient-to-b from-primary-100 to-primary-200'
                    : 'h-1.5 bg-black/10'
                }`}
              />
            ))}
          </div>
        </nav>
      )}

      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="fixed left-4 bottom-6 w-8 h-8 rounded-lg border border-black/10 bg-white/80 text-text-200 hover:text-text-100 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-sm z-50"
        title={isCollapsed ? '展开侧边栏' : '隐藏侧边栏'}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </>
  );
};

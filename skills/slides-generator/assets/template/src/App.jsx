import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

// Slides will be imported here by the main agent
// Example: import Slide01 from './slides/01-hero';
// const SLIDES = [Slide01, Slide02, ...];

// Placeholder - will be replaced during generation
const SLIDES = [];
const NAV_ITEMS = [];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setSidebarOpen(false);
  };

  // Empty state
  if (SLIDES.length === 0) {
    return (
      <div className="h-screen w-screen bg-bg-base flex items-center justify-center">
        <div className="text-center text-text-secondary">
          <p className="text-xl mb-2">No slides yet</p>
          <p className="text-sm opacity-60">Slides will be generated here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-bg-base overflow-hidden flex">
      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-card/80 backdrop-blur-sm border border-border-default hover:bg-bg-card transition-colors"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-bg-card/95 backdrop-blur-md border-r border-border-default z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="pt-16 px-4">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(item.slideIndex)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                currentSlide === item.slideIndex
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'hover:bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden relative">
        {SLIDES.map((Slide, i) => (
          <div
            key={i}
            className="absolute inset-0 h-full w-full transition-all duration-500 ease-out"
            style={{
              transform: `translateX(${(i - currentSlide) * 100}%)`,
              opacity: i === currentSlide ? 1 : 0.3
            }}
          >
            <Slide />
          </div>
        ))}
      </main>

      {/* Bottom Controls */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-bg-card/80 backdrop-blur-sm border border-border-default hover:bg-bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="px-4 py-2 rounded-full bg-bg-card/80 backdrop-blur-sm border border-border-default">
          <span className="text-sm font-medium">
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === SLIDES.length - 1}
          className="p-3 rounded-full bg-bg-card/80 backdrop-blur-sm border border-border-default hover:bg-bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

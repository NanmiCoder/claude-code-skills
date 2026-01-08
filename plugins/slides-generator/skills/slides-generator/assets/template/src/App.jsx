import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Background from './components/Background';

// Slides will be imported here by the main agent
// Example: import Slide01 from './slides/01-hero';
// const SLIDES = [Slide01, Slide02, ...];

// Placeholder - will be replaced during generation
const SLIDES = [];
const NAV_ITEMS = [];

// Slide transition variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  })
};

const slideTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Navigate to specific slide
  const goToSlide = useCallback((index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Next slide
  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  // Previous slide
  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Empty state
  if (SLIDES.length === 0) {
    return (
      <div className="h-screen w-screen bg-bg-base flex items-center justify-center relative overflow-hidden">
        <Background variant="glow" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10"
        >
          <p className="text-xl mb-2 text-text-primary">No slides yet</p>
          <p className="text-sm text-text-muted">Slides will be generated here</p>
        </motion.div>
      </div>
    );
  }

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div className="h-screen w-screen bg-bg-base overflow-hidden relative">
      {/* Decorative Background */}
      <Background variant="glow" animate={true} />

      {/* Slide Content */}
      <main className="relative h-full w-full z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0 h-full w-full"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        navItems={NAV_ITEMS}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />
    </div>
  );
}

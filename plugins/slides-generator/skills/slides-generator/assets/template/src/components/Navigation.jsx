import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';

export default function Navigation({
  currentSlide,
  totalSlides,
  navItems,
  onPrev,
  onNext,
  onGoTo
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <>
      {/* Floating Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 px-2 py-2 rounded-2xl bg-bg-card/60 backdrop-blur-xl border border-border-subtle shadow-2xl shadow-black/20">
          {/* Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl hover:bg-bg-elevated/50 transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>

          {/* Prev Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="p-3 rounded-xl hover:bg-bg-elevated/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* Progress Indicator */}
          <div className="relative flex items-center gap-3 px-4">
            {/* Progress Bar Background */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border-subtle rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Slide Counter */}
            <span className="text-sm font-medium tabular-nums">
              <span className="text-text-primary">{currentSlide + 1}</span>
              <span className="text-text-muted mx-1">/</span>
              <span className="text-text-secondary">{totalSlides}</span>
            </span>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-xl hover:bg-bg-elevated/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </motion.button>

          {/* Keyboard Hints Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHints(!showHints)}
            className={`p-3 rounded-xl transition-colors ${
              showHints ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-bg-elevated/50'
            }`}
          >
            <Keyboard size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Keyboard Hints Tooltip */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-4 py-3 rounded-xl bg-bg-card/90 backdrop-blur-xl border border-border-subtle shadow-xl">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-bg-elevated text-text-secondary text-xs">←</kbd>
                  <kbd className="px-2 py-1 rounded bg-bg-elevated text-text-secondary text-xs">→</kbd>
                  <span className="text-text-muted">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-bg-elevated text-text-secondary text-xs">ESC</kbd>
                  <span className="text-text-muted">Close menu</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-80 max-h-96 overflow-y-auto"
            >
              <div className="p-2 rounded-2xl bg-bg-card/95 backdrop-blur-xl border border-border-subtle shadow-2xl">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onGoTo(item.slideIndex);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-all ${
                      currentSlide === item.slideIndex
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'hover:bg-bg-elevated/50 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-bg-elevated flex items-center justify-center text-xs font-medium">
                        {item.slideIndex + 1}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SlideController = ({ currentSlide, totalSlides, onPrev, onNext }) => {
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 z-50">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className={`backdrop-blur-xl border flex items-center justify-center transition-all w-10 h-10 rounded-lg ${
          currentSlide === 0
            ? 'bg-white/50 border-black/5 text-text-200/30 cursor-not-allowed'
            : 'bg-white/70 border-black/10 text-text-100 hover:bg-white hover:scale-105 shadow-sm'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="bg-white/20 backdrop-blur-sm border border-black/5 px-2.5 py-1 rounded-md">
        <span className="font-mono text-text-200/70 text-xs">
          <span className="text-text-100/80 font-semibold">{currentSlide + 1}</span>
          <span className="mx-1">/</span>
          <span>{totalSlides}</span>
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className={`backdrop-blur-xl border flex items-center justify-center transition-all w-10 h-10 rounded-lg ${
          currentSlide === totalSlides - 1
            ? 'bg-white/50 border-black/5 text-text-200/30 cursor-not-allowed'
            : 'bg-white/70 border-black/10 text-text-100 hover:bg-white hover:scale-105 shadow-sm'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

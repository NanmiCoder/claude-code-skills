import { motion, AnimatePresence } from 'framer-motion';

// Transition variants
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  elegant: {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -10 }
  }
};

const transitionConfig = {
  type: 'spring',
  damping: 30,
  stiffness: 300
};

export default function SlideTransition({
  children,
  slideKey,
  variant = 'elegant',
  className = ''
}) {
  const selectedVariant = variants[variant] || variants.elegant;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
        transition={transitionConfig}
        className={`h-full w-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for staggered children animations
export function useStaggerAnimation(delay = 0.1) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  return { container, item };
}

// Pre-built animation components
export function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, delay = 0, direction = 'up', className = '' }) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', damping: 25, stiffness: 300 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover animation wrapper
export function HoverScale({ children, scale = 1.02, className = '' }) {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

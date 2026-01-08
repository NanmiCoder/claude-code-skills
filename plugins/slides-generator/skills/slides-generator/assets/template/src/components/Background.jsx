import { motion } from 'framer-motion';

export default function Background({
  variant = 'glow',
  animate = true,
  className = ''
}) {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-base via-bg-base to-bg-elevated" />

      {/* Variant-specific decorations */}
      {variant === 'glow' && <GlowEffect animate={animate} />}
      {variant === 'grid' && <GridPattern />}
      {variant === 'mesh' && <MeshGradient animate={animate} />}
      {variant === 'minimal' && <MinimalAccent />}

      {/* Noise texture overlay */}
      <NoiseOverlay />
    </div>
  );
}

// Floating glow orbs
function GlowEffect({ animate }) {
  return (
    <>
      {/* Primary glow - top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary-500/20 blur-[120px]"
        animate={animate ? {
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Accent glow - bottom right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-500/15 blur-[120px]"
        animate={animate ? {
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1]
        } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Secondary glow - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-primary-400/10 blur-[100px]"
        animate={animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </>
  );
}

// Subtle grid pattern
function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  );
}

// Animated mesh gradient
function MeshGradient({ animate }) {
  return (
    <>
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/20 blur-[150px]"
        animate={animate ? {
          x: [0, 100, 0],
          y: [0, 50, 0]
        } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-400/15 blur-[130px]"
        animate={animate ? {
          x: [0, -80, 0],
          y: [0, -60, 0]
        } : {}}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-primary-300/10 blur-[100px]"
        animate={animate ? {
          scale: [1, 1.3, 1]
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

// Minimal single accent
function MinimalAccent() {
  return (
    <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-primary-500/5 to-transparent" />
  );
}

// Noise texture overlay
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    />
  );
}

// Export individual components for custom compositions
export { GlowEffect, GridPattern, MeshGradient, MinimalAccent, NoiseOverlay };

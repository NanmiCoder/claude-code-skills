export const GlassCard = ({ children, className = "", glow = "accent", onClick, style }) => {
  const glowColors = {
    accent: "hover:shadow-[0_0_30px_rgba(37,177,191,0.25)]",
    primary: "hover:shadow-[0_0_30px_rgba(222,40,59,0.2)]",
    none: ""
  };

  return (
    <div
      onClick={onClick}
      style={style}
      className={`backdrop-blur-xl bg-white/80 border border-black/5 shadow-lg shadow-black/5 transition-all duration-500 rounded-2xl ${glowColors[glow]} ${className}`}
    >
      {children}
    </div>
  );
};

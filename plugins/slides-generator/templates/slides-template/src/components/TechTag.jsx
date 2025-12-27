export const TechTag = ({ children, variant = "accent" }) => {
  const variants = {
    accent: "bg-accent-100/10 text-accent-200 border-accent-100/30",
    primary: "bg-primary-100/10 text-primary-100 border-primary-100/30",
    default: "bg-bg-300/30 text-text-200 border-bg-300/50"
  };

  return (
    <span className={`px-4 py-2 rounded-lg text-sm font-mono border ${variants[variant]}`}>
      {children}
    </span>
  );
};

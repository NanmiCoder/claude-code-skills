export const ProgressBar = ({ value, max = 100, color = "#de283b", label, showValue = true }) => (
  <div className="mb-2">
    {label && (
      <div className="flex justify-between text-base font-mono mb-1">
        <span className="text-text-200">{label}</span>
        {showValue && <span className="text-text-100">{value}/{max}</span>}
      </div>
    )}
    <div className="bg-black/10 overflow-hidden h-2 rounded">
      <div
        className="h-full transition-all duration-1000 rounded"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}40`
        }}
      />
    </div>
  </div>
);

import { CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export const StatusBadge = ({ status, children }) => {
  const styles = {
    success: "bg-accent-100/15 text-accent-200 border-accent-100/30",
    warning: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    error: "bg-primary-100/15 text-primary-100 border-primary-100/30",
    info: "bg-accent-100/15 text-accent-200 border-accent-100/30"
  };

  const icons = {
    success: CheckCircle2,
    warning: AlertCircle,
    error: AlertCircle,
    info: Zap
  };

  const Icon = icons[status] || Zap;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono border ${styles[status]}`}>
      <Icon className="w-4 h-4" />
      {children}
    </span>
  );
};

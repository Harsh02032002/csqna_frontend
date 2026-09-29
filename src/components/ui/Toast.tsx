import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'warning' | 'info';

export interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    error: {
      bg: 'bg-rose-50/95 border-rose-200 text-rose-900',
      iconBg: 'bg-rose-100 text-rose-600',
      titleColor: 'text-rose-700',
      Icon: AlertCircle,
      defaultTitle: 'Validation Error',
    },
    success: {
      bg: 'bg-emerald-50/95 border-emerald-200 text-emerald-900',
      iconBg: 'bg-emerald-100 text-emerald-600',
      titleColor: 'text-emerald-700',
      Icon: CheckCircle2,
      defaultTitle: 'Success',
    },
    warning: {
      bg: 'bg-amber-50/95 border-amber-200 text-amber-900',
      iconBg: 'bg-amber-100 text-amber-600',
      titleColor: 'text-amber-700',
      Icon: AlertTriangle,
      defaultTitle: 'Warning',
    },
    info: {
      bg: 'bg-blue-50/95 border-blue-200 text-blue-900',
      iconBg: 'bg-blue-100 text-blue-600',
      titleColor: 'text-blue-700',
      Icon: Info,
      defaultTitle: 'Information',
    },
  }[type];

  const IconComponent = config.Icon;

  return (
    <div className={`fixed top-6 right-6 z-[9999] max-w-md w-full rounded-2xl border p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-5 fade-in ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl shrink-0 ${config.iconBg}`}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="flex-1 pt-0.5">
          <h4 className={`text-xs font-black uppercase tracking-wider mb-0.5 ${config.titleColor}`}>
            {title || config.defaultTitle}
          </h4>
          <p className="text-xs font-semibold leading-relaxed opacity-90">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

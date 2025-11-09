'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
};

export function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  change,
  iconColor = 'text-blue-500',
  iconBg = 'bg-blue-100 dark:bg-blue-500/20',
  subtitle
}: MetricCardProps) {
  return (
    <Card className="glass-effect p-4 hover:shadow-2xl transition-all duration-300 border-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("p-2 rounded-xl", iconBg)}>
              <Icon className={cn("w-4 h-4", iconColor)} />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
            {unit && <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
            change >= 0
              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
    </Card>
  );
}

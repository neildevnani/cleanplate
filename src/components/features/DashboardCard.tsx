'use client';

import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  iconColor = 'text-primary-500',
  onClick,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn('cursor-pointer group', className)}
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.isPositive ? 'text-primary-400' : 'text-red-400'
                  )}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">from last week</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors',
              iconColor
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

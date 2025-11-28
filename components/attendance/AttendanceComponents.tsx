
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Calendar } from 'lucide-react';

// --- Sparkline ---
// A simple SVG sparkline for monitoring trends without heavy chart libraries
export const Sparkline: React.FC<{ data: number[]; color?: string; height?: number }> = ({ data, color = '#1DCD9F', height = 40 }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// --- Summary Card ---
interface SummaryCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtext, icon, trend }) => (
  <div className="bg-gloov-card border border-gloov-border p-4 rounded-xl shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</span>
      {icon && <div className="text-gloov-teal">{icon}</div>}
    </div>
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-gloov-teal' : 'text-red-400'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trend === 'up' ? '+2.4%' : '-1.1%'}</span>
        </div>
      )}
    </div>
  </div>
);

// --- KPI Ring ---
export const KPIRing: React.FC<{ percentage: number; label: string }> = ({ percentage, label }) => {
  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg border border-gloov-border">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="#333"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            fill="transparent"
          />
          <circle
            stroke="#1DCD9F"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <span className="absolute text-xs font-bold text-white">{percentage}%</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="text-xs text-gray-500">Monthly Avg</p>
      </div>
    </div>
  );
};

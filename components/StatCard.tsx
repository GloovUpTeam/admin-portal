import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'flat';
  change?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, change, icon }) => {
  return (
    <div className="bg-gloov-card rounded-xl p-6 shadow-md border border-gloov-border hover:border-gloov-teal/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-gray-800/50 text-gloov-teal border border-gloov-border">
            {icon}
          </div>
        )}
      </div>
      
      {trend && change && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`
            flex items-center font-medium
            ${trend === 'up' ? 'text-gloov-teal' : trend === 'down' ? 'text-functional-error' : 'text-gray-500'}
          `}>
            {trend === 'up' && <ArrowUpRight size={16} className="mr-1" />}
            {trend === 'down' && <ArrowDownRight size={16} className="mr-1" />}
            {trend === 'flat' && <Minus size={16} className="mr-1" />}
            {change}
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
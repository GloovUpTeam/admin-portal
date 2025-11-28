
import React from 'react';
import { PayrollRecord, Employee } from '../../services/mockAttendanceData';
import { Download, Shield, Lock } from 'lucide-react';
import StatusBadge from '../StatusBadge';

interface PayrollViewerProps {
  payroll: PayrollRecord[];
  employees: Employee[];
  onExport: () => void;
}

export const PayrollViewer: React.FC<PayrollViewerProps> = ({ payroll, employees, onExport }) => {
  return (
    <div className="bg-gloov-card border border-gloov-border rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gloov-border flex justify-between items-center bg-gradient-to-r from-gloov-card to-black/40">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={16} className="text-gray-500" />
            Payroll Data
          </h3>
          <p className="text-xs text-gray-500">Read-only view • Encrypted</p>
        </div>
        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-lg border border-gray-700 transition-colors"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Month</th>
              <th className="px-6 py-4 text-right">Base</th>
              <th className="px-6 py-4 text-right">Bonus</th>
              <th className="px-6 py-4 text-right">Deductions</th>
              <th className="px-6 py-4 text-right font-bold text-white">Net Pay</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {payroll.map(record => {
              const emp = employees.find(e => e.id === record.employeeId);
              return (
                <tr key={record.id} className="hover:bg-gloov-hover transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-200">{emp?.name || record.employeeId}</td>
                  <td className="px-6 py-4 text-gray-400">{record.month} {record.year}</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400">${record.baseSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-green-400">+{record.bonuses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-red-400">-{record.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-white text-lg">${record.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={record.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gloov-border bg-black/20 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Shield size={12} />
            Access is logged for security purposes.
        </p>
      </div>
    </div>
  );
};

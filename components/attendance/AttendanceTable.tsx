
import React from 'react';
import { AttendanceRecord, Employee } from '../../services/mockAttendanceData';
import StatusBadge from '../StatusBadge';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  employees: Employee[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, employees }) => {
  return (
    <div className="bg-gloov-card border border-gloov-border rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-gray-400 font-medium border-b border-gloov-border">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4 text-right">Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {records.map(record => {
              const emp = employees.find(e => e.id === record.employeeId);
              return (
                <tr key={record.id} className="hover:bg-gloov-hover transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp?.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-800" />
                      <div>
                        <p className="font-medium text-gray-200">{emp?.name}</p>
                        <p className="text-xs text-gray-500">{emp?.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{record.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={record.status} /></td>
                  <td className="px-6 py-4 font-mono text-gray-500 group-hover:text-gray-300">{record.checkIn || '--:--'}</td>
                  <td className="px-6 py-4 font-mono text-gray-500 group-hover:text-gray-300">{record.checkOut || '--:--'}</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300">{record.hoursWorked ? `${record.hoursWorked}h` : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

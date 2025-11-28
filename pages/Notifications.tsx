import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock } from 'lucide-react';

const Notifications: React.FC = () => {
  const [preferences, setPreferences] = useState([
    { id: '1', type: 'Email', label: 'Project Updates', enabled: true },
    { id: '2', type: 'Email', label: 'New Ticket Alerts', enabled: true },
    { id: '3', type: 'Push', label: 'Mentioned in Comment', enabled: true },
    { id: '4', type: 'WhatsApp', label: 'Urgent System Alerts', enabled: false },
    { id: '5', type: 'Email', label: 'Weekly Performance Report', enabled: true },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prefs => prefs.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage how and when you receive alerts</p>
      </div>

      <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border overflow-hidden">
        <div className="p-6 border-b border-gloov-border">
            <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <Bell size={18} className="text-gloov-teal" />
                Alert Preferences
            </h3>
        </div>
        <div className="divide-y divide-gray-800">
            {preferences.map((pref) => (
                <div key={pref.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gloov-hover transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${pref.type === 'Email' ? 'bg-blue-900/30 text-blue-400' : pref.type === 'WhatsApp' ? 'bg-green-900/30 text-green-400' : 'bg-purple-900/30 text-purple-400'}`}>
                            {pref.type === 'Email' && <Mail size={18} />}
                            {pref.type === 'WhatsApp' && <Smartphone size={18} />}
                            {pref.type === 'Push' && <Bell size={18} />}
                        </div>
                        <div>
                            <p className="font-medium text-gray-200">{pref.label}</p>
                            <p className="text-xs text-gray-500">Via {pref.type}</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={pref.enabled}
                            onChange={() => togglePreference(pref.id)}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gloov-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gloov-teal"></div>
                    </label>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-gloov-card rounded-xl shadow-md border border-gloov-border p-6">
        <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-gloov-teal" />
            <h3 className="font-semibold text-gray-200">Digest Schedule</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Daily Summary</label>
                <select className="w-full bg-black/20 border border-gloov-border rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-gloov-teal">
                    <option>09:00 AM</option>
                    <option>05:00 PM</option>
                    <option>Turn off</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Weekly Report</label>
                <select className="w-full bg-black/20 border border-gloov-border rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-gloov-teal">
                    <option>Monday Morning</option>
                    <option>Friday Afternoon</option>
                    <option>Sunday Evening</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
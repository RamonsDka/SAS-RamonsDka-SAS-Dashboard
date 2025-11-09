'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const generateMockData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
    value: Math.floor(Math.random() * (max - min) + min)
  }));
};

export function CPUHistoryChart() {
  const [data, setData] = useState(generateMockData(24, 20, 80));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.floor(Math.random() * 60 + 20)
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CPU Usage History</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last 12 hours</p>
        </div>
        <select className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm border-0 focus:ring-2 focus:ring-blue-500">
          <option>12 Hours</option>
          <option>24 Hours</option>
          <option>7 Days</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#colorCpu)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function RAMUsageChart() {
  const [data, setData] = useState(generateMockData(24, 30, 75));

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">RAM Usage</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Memory consumption</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function TemperatureChart() {
  const [data, setData] = useState(generateMockData(24, 45, 75));

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Temperature</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">System temperature</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fill="url(#colorTemp)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function NetworkTrafficChart() {
  const data = [
    { day: 'Mon', upload: 4, download: 24 },
    { day: 'Tue', upload: 3, download: 13 },
    { day: 'Wed', upload: 2, download: 20 },
    { day: 'Thu', upload: 2.7, download: 29 },
    { day: 'Fri', upload: 1.8, download: 18 },
    { day: 'Sat', upload: 2.3, download: 23 },
    { day: 'Sun', upload: 3.4, download: 34 },
  ];

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Network Traffic</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Weekly overview</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar dataKey="upload" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="download" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

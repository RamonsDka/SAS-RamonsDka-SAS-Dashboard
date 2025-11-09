'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle, Play, Square, RefreshCw } from 'lucide-react';
import Image from 'next/image';

type DockerApp = {
  name: string;
  status: 'running' | 'stopped' | 'restarting';
  cpu: number;
  memory: number;
  icon?: string;
};

const mockApps: DockerApp[] = [
  { name: 'Plex', status: 'running', cpu: 12, memory: 2048, icon: '🎬' },
  { name: 'Nextcloud', status: 'running', cpu: 8, memory: 1024, icon: '☁️' },
  { name: 'Pi-hole', status: 'running', cpu: 2, memory: 256, icon: '🛡️' },
  { name: 'Home Assistant', status: 'running', cpu: 5, memory: 512, icon: '🏠' },
  { name: 'Portainer', status: 'stopped', cpu: 0, memory: 0, icon: '🐳' },
  { name: 'Jellyfin', status: 'running', cpu: 15, memory: 1536, icon: '📺' },
];

export function DockerApps() {
  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Docker Containers</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mockApps.filter(a => a.status === 'running').length} running</p>
        </div>
        <button className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {mockApps.map((app, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{app.icon}</div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{app.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>CPU: {app.cpu}%</span>
                  <span>•</span>
                  <span>RAM: {app.memory}MB</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Circle
                className={`w-2 h-2 ${
                  app.status === 'running' ? 'fill-green-500 text-green-500' :
                  app.status === 'stopped' ? 'fill-red-500 text-red-500' :
                  'fill-yellow-500 text-yellow-500'
                }`}
              />
              <Badge variant={app.status === 'running' ? 'default' : 'secondary'} className="capitalize">
                {app.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function SystemProcesses() {
  const processes = [
    { name: 'systemd', pid: 1, cpu: 0.1, memory: 8.2 },
    { name: 'dockerd', pid: 1234, cpu: 2.3, memory: 124.5 },
    { name: 'nginx', pid: 5678, cpu: 1.5, memory: 45.2 },
    { name: 'postgres', pid: 9012, cpu: 3.2, memory: 256.8 },
    { name: 'node', pid: 3456, cpu: 12.4, memory: 512.3 },
  ];

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">System Processes</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Top processes by CPU</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-700">
          <span>Process</span>
          <span>PID</span>
          <span>CPU %</span>
          <span>Memory</span>
        </div>
        {processes.map((proc, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-4 text-sm py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg px-2 transition-colors">
            <span className="font-medium text-slate-900 dark:text-white truncate">{proc.name}</span>
            <span className="text-slate-600 dark:text-slate-400">{proc.pid}</span>
            <span className="text-slate-600 dark:text-slate-400">{proc.cpu}%</span>
            <span className="text-slate-600 dark:text-slate-400">{proc.memory}MB</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

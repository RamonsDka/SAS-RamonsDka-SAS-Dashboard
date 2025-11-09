'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { MetricCard } from '@/components/metric-card';
import { CPUHistoryChart, RAMUsageChart, TemperatureChart, NetworkTrafficChart } from '@/components/system-charts';
import { DockerApps, SystemProcesses } from '@/components/docker-apps';
import { CalendarWidget } from '@/components/calendar-widget';
import { Terminal } from '@/components/terminal';
import { FileBrowser, DiskUsage } from '@/components/file-browser';
import { NotesWidget, AlarmsWidget } from '@/components/notes-alarms';
import { SystemUpdates } from '@/components/system-updates';
import {
  Cpu,
  MemoryStick,
  Thermometer,
  Network,
  HardDrive,
  Zap,
  Activity,
  Server
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 62,
    temperature: 58,
    network: 125,
    diskUsed: 650,
    diskTotal: 1000,
    uptime: '15d 7h 23m',
    cores: 8,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.max(40, Math.min(85, prev.ram + (Math.random() - 0.5) * 5)),
        temperature: Math.max(45, Math.min(75, prev.temperature + (Math.random() - 0.5) * 3)),
        network: Math.max(50, Math.min(200, prev.network + (Math.random() - 0.5) * 20)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="mt-6 space-y-6">
          {/* System Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={Cpu}
              label="CPU Usage"
              value={metrics.cpu.toFixed(1)}
              unit="%"
              change={2.5}
              iconColor="text-blue-500"
              iconBg="bg-blue-100 dark:bg-blue-500/20"
              subtitle={`${metrics.cores} cores active`}
            />
            <MetricCard
              icon={MemoryStick}
              label="RAM Usage"
              value={metrics.ram.toFixed(1)}
              unit="%"
              change={-1.2}
              iconColor="text-green-500"
              iconBg="bg-green-100 dark:bg-green-500/20"
              subtitle="16GB total"
            />
            <MetricCard
              icon={Thermometer}
              label="Temperature"
              value={metrics.temperature.toFixed(1)}
              unit="°C"
              iconColor="text-orange-500"
              iconBg="bg-orange-100 dark:bg-orange-500/20"
              subtitle="Normal range"
            />
            <MetricCard
              icon={Network}
              label="Network"
              value={metrics.network.toFixed(0)}
              unit="Mbps"
              change={5.3}
              iconColor="text-purple-500"
              iconBg="bg-purple-100 dark:bg-purple-500/20"
              subtitle="Active connections"
            />
          </div>

          {/* System Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              icon={HardDrive}
              label="Disk Space"
              value={metrics.diskUsed}
              unit={`/ ${metrics.diskTotal}GB`}
              iconColor="text-yellow-500"
              iconBg="bg-yellow-100 dark:bg-yellow-500/20"
              subtitle={`${((metrics.diskUsed / metrics.diskTotal) * 100).toFixed(0)}% used`}
            />
            <MetricCard
              icon={Zap}
              label="System Uptime"
              value={metrics.uptime}
              iconColor="text-green-500"
              iconBg="bg-green-100 dark:bg-green-500/20"
              subtitle="Since last reboot"
            />
            <MetricCard
              icon={Server}
              label="Docker Containers"
              value={6}
              unit="running"
              iconColor="text-blue-500"
              iconBg="bg-blue-100 dark:bg-blue-500/20"
              subtitle="2 stopped"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CPUHistoryChart />
            <RAMUsageChart />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemperatureChart />
            <NetworkTrafficChart />
          </div>

          {/* Docker Apps and Processes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DockerApps />
            <SystemProcesses />
          </div>

          {/* Calendar and Disk Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalendarWidget />
            <DiskUsage />
          </div>

          {/* File Browser and Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FileBrowser />
            <SystemUpdates />
          </div>

          {/* Notes and Alarms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NotesWidget />
            <AlarmsWidget />
          </div>

          {/* Terminal */}
          <Terminal />
        </div>
      </div>
    </div>
  );
}

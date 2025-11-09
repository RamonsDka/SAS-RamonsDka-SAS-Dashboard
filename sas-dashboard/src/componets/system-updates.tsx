'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Clock, CheckCircle } from 'lucide-react';

type Update = {
  name: string;
  currentVersion: string;
  newVersion: string;
  size: string;
  type: 'system' | 'docker' | 'casaos';
};

const mockUpdates: Update[] = [
  { name: 'Ubuntu Server', currentVersion: '22.04.3', newVersion: '22.04.4', size: '245 MB', type: 'system' },
  { name: 'Docker Engine', currentVersion: '24.0.6', newVersion: '24.0.7', size: '85 MB', type: 'docker' },
  { name: 'Plex Container', currentVersion: '1.32.5', newVersion: '1.32.6', size: '450 MB', type: 'docker' },
  { name: 'CasaOS', currentVersion: '0.4.4', newVersion: '0.4.5', size: '120 MB', type: 'casaos' },
];

export function SystemUpdates() {
  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">System Updates</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mockUpdates.length} updates available</p>
        </div>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700">
          <RefreshCw className="w-4 h-4" />
          Check Updates
        </Button>
      </div>

      <div className="space-y-3">
        {mockUpdates.map((update, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">{update.name}</h4>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  update.type === 'system' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                  update.type === 'docker' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                  'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                }`}>
                  {update.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span>{update.currentVersion} → {update.newVersion}</span>
                <span>•</span>
                <span>{update.size}</span>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="gap-2">
              <Download className="w-4 h-4" />
              Update
            </Button>
          </div>
        ))}
      </div>

      {/* Scheduled Updates */}
      <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="font-semibold text-blue-900 dark:text-blue-400">Scheduled Updates</h4>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Automatic updates scheduled for Sunday 3:00 AM
        </p>
        <Button size="sm" variant="ghost" className="mt-2 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20">
          Configure Schedule
        </Button>
      </div>
    </Card>
  );
}

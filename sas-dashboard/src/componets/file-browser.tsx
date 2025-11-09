'use client';

import { Card } from '@/components/ui/card';
import { Folder, File, Search, ChevronRight, HardDrive } from 'lucide-react';
import { useState } from 'react';

type FileItem = {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
};

const mockFiles: FileItem[] = [
  { name: 'home', type: 'folder' },
  { name: 'var', type: 'folder' },
  { name: 'etc', type: 'folder' },
  { name: 'docker-compose.yml', type: 'file', size: '2.3 KB', modified: '2 hours ago' },
  { name: 'config.json', type: 'file', size: '1.5 KB', modified: '1 day ago' },
  { name: 'logs', type: 'folder' },
];

export function FileBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath] = useState('/');

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">File Browser</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            {currentPath}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>

      {/* File List */}
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {filteredFiles.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {item.type === 'folder' ? (
                <Folder className="w-5 h-5 text-blue-500" />
              ) : (
                <File className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                {item.size && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.size} • {item.modified}</p>
                )}
              </div>
            </div>
            {item.type === 'folder' && (
              <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DiskUsage() {
  const disks = [
    { name: 'System (sda1)', total: 1000, used: 650, color: 'bg-blue-500' },
    { name: 'Data (sdb1)', total: 2000, used: 1200, color: 'bg-green-500' },
    { name: 'Backup (sdc1)', total: 500, used: 120, color: 'bg-yellow-500' },
  ];

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Disk Usage</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Storage overview</p>
        </div>
      </div>
      <div className="space-y-4">
        {disks.map((disk, idx) => {
          const percentage = (disk.used / disk.total) * 100;
          return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{disk.name}</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {disk.used}GB / {disk.total}GB ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${disk.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bell, StickyNote, Trash2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  timestamp: string;
};

type Alarm = {
  id: string;
  title: string;
  time: string;
  type: 'warning' | 'info' | 'critical';
  active: boolean;
};

export function NotesWidget() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Server Maintenance',
      content: 'Update Docker containers this weekend',
      color: 'bg-yellow-100 dark:bg-yellow-500/20',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Backup Reminder',
      content: 'Check backup integrity monthly',
      color: 'bg-blue-100 dark:bg-blue-500/20',
      timestamp: '1 day ago',
    },
  ]);

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notes</h3>
        </div>
        <Button size="sm" variant="ghost" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Note
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-xl ${note.color} border-l-4 border-yellow-500 group relative`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{note.title}</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">{note.content}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{note.timestamp}</p>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AlarmsWidget() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: '1', title: 'High CPU Usage', time: '5 mins ago', type: 'warning', active: true },
    { id: '2', title: 'Backup Completed', time: '1 hour ago', type: 'info', active: true },
    { id: '3', title: 'Disk Space Low', time: '3 hours ago', type: 'critical', active: true },
    { id: '4', title: 'Docker Container Stopped', time: '1 day ago', type: 'warning', active: false },
  ]);

  const dismissAlarm = (id: string) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id ? { ...alarm, active: false } : alarm
    ));
  };

  const getAlarmColor = (type: Alarm['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-500/20 border-red-500 text-red-900 dark:text-red-400';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-500/20 border-yellow-500 text-yellow-900 dark:text-yellow-400';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-500/20 border-blue-500 text-blue-900 dark:text-blue-400';
    }
  };

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Alarms</h3>
          <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
            {alarms.filter(a => a.active).length}
          </span>
        </div>
        <Button size="sm" variant="ghost" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Alarm
        </Button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`p-3 rounded-xl border-l-4 flex items-start justify-between ${getAlarmColor(alarm.type)} ${
              !alarm.active ? 'opacity-50' : ''
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{alarm.title}</h4>
                {!alarm.active && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
              <p className="text-xs mt-1">{alarm.time}</p>
            </div>
            {alarm.active && (
              <button
                onClick={() => dismissAlarm(alarm.id)}
                className="px-3 py-1 text-xs font-medium bg-white/50 dark:bg-black/20 rounded-lg hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

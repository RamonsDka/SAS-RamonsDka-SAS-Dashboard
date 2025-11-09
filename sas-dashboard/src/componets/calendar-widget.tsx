'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Bell } from 'lucide-react';
import { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

type Event = {
  id: string;
  title: string;
  time: string;
  type: 'event' | 'alarm' | 'update';
  color: string;
};

export function CalendarWidget() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState<Event[]>([
    { id: '1', title: 'System Backup', time: '14:00', type: 'event', color: 'bg-blue-500' },
    { id: '2', title: 'Security Scan', time: '18:00', type: 'alarm', color: 'bg-red-500' },
    { id: '3', title: 'Docker Update', time: '22:00', type: 'update', color: 'bg-green-500' },
  ]);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <Card className="glass-effect p-6 border-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Calendar</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{format(currentDate, 'MMMM yyyy')}</p>
        </div>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, idx) => {
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(day)}
              className={`p-3 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg'
                  : isToday
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="text-xs font-medium">{format(day, 'EEE')}</div>
              <div className="text-lg font-bold">{format(day, 'd')}</div>
            </button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Today's Events</h4>
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className={`w-1 h-12 rounded-full ${event.color}`}></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 dark:text-white">{event.title}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
              </div>
            </div>
            <Bell className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </Card>
  );
}

'use client';

import {
  Home,
  Search,
  Calendar,
  Users,
  Menu,
  Server,
  FileText,
  Moon,
  Sun,
  LogOut,
  Bell,
  Settings,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');

  const navItems: NavItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', href: 'home', active: currentPage === 'home' },
    { icon: <Search className="w-5 h-5" />, label: 'Explore', href: 'explore', active: currentPage === 'explore' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', href: 'calendar', active: currentPage === 'calendar' },
    { icon: <Users className="w-5 h-5" />, label: 'Community', href: 'community', active: currentPage === 'community' },
    { icon: <Server className="w-5 h-5" />, label: 'Servers', href: 'servers', active: currentPage === 'servers' },
    { icon: <Activity className="w-5 h-5" />, label: 'Monitor', href: 'monitor', active: currentPage === 'monitor' },
  ];

  return (
    <div className="flex flex-col h-screen w-24 glass-effect rounded-3xl m-4 p-4">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 mt-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
          <Server className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => setCurrentPage(item.href)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-3 rounded-2xl transition-all duration-200",
              item.active
                ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/50"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            )}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="flex items-center justify-center p-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

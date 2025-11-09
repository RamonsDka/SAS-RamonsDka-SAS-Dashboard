'use client';

import { Bell, Calendar as CalendarIcon, Upload, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import Image from 'next/image';

export function Header() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState('Admin');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        localStorage.setItem('userImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-between p-6">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              SAS Dashboard
            </span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">RDKTECH</p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Hello, {userName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
          </div>

          {/* Avatar with Upload */}
          <div className="relative group">
            <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-800 shadow-lg cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {userImage ? (
                <AvatarImage src={userImage} alt={userName} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                  <User className="w-6 h-6" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-5 h-5 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Calendar Icon */}
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
          <CalendarIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 relative">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </div>
  );
}

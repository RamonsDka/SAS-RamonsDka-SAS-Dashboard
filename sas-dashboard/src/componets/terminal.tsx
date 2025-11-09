'use client';

import { Card } from '@/components/ui/card';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Terminal() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output'; text: string }>>([
    { type: 'output', text: 'SAS Dashboard Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, { type: 'command', text: `$ ${trimmedCmd}` }]);

    // Simulate command execution
    let output = '';
    switch (trimmedCmd.toLowerCase()) {
      case 'help':
        output = 'Available commands: help, clear, status, docker ps, df -h, uptime, whoami';
        break;
      case 'clear':
        setHistory([]);
        setCommand('');
        return;
      case 'status':
        output = 'System Status: Online\nCPU: 45%\nRAM: 62%\nUptime: 15 days';
        break;
      case 'docker ps':
        output = 'CONTAINER ID   IMAGE          STATUS\nabc123        plex:latest    Up 15 days\ndef456        nextcloud      Up 15 days';
        break;
      case 'df -h':
        output = 'Filesystem      Size  Used Avail Use%\n/dev/sda1       1.0T  650G  350G  65%';
        break;
      case 'uptime':
        output = '15 days, 7:23:45';
        break;
      case 'whoami':
        output = 'admin';
        break;
      default:
        output = `Command not found: ${trimmedCmd}`;
    }

    setHistory(prev => [...prev, { type: 'output', text: output }]);
    setCommand('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <Card className={`glass-effect border-0 transition-all duration-300 ${isExpanded ? 'col-span-2' : ''}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-green-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Terminal</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-4 bg-slate-900 dark:bg-black font-mono text-sm">
        <div ref={terminalRef} className="space-y-1 max-h-64 overflow-y-auto mb-2">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={item.type === 'command' ? 'text-green-400' : 'text-slate-300'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(command);
              }
            }}
            className="flex-1 bg-transparent text-slate-300 outline-none"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </Card>
  );
}

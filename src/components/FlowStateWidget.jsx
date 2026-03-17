import { useState, useEffect } from 'react';
import { siteData } from '../config/siteData.js';

export function FlowStateWidget() {
  const { statusText, pomodoro } = siteData.flowState;
  const [timeLeft, setTimeLeft] = useState(pomodoro.workDuration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col gap-3 p-5 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden group shadow-inner">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
          </span>
          <span className="text-sm font-mono text-green-400 tracking-wider uppercase font-bold">Deep Work Flow State</span>
        </div>
        <div className="font-mono text-2xl font-black tracking-widest text-[#4af626] drop-shadow-[0_0_8px_rgba(74,246,38,0.8)]">
          {minutes}:{seconds}
        </div>
      </div>
      {/* Terminal line: truncated single-line with CSS cursor */}
      <div className="text-sm font-mono text-gray-300 mt-1 overflow-hidden whitespace-nowrap truncate terminal-cursor">
        <span className="text-purple-400 font-bold mr-2">root@rainbow:~ $</span>
        <span>{statusText}</span>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-6 -bottom-6 text-9xl text-white/[0.02] pointer-events-none mix-blend-overlay break-words w-full overflow-hidden leading-none font-mono tracking-tighter">
        FLOW
      </div>

      <style>{`
        .terminal-cursor::after {
          content: '█';
          color: white;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

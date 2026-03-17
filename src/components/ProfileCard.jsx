import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils";
import { siteData } from "../config/siteData.js";
import { FlowStateWidget } from "./FlowStateWidget.jsx";
import { Live2DEyeTracker } from "./Live2DEyeTracker.jsx";
import { TiltCard } from "./TiltCard.jsx";

export function ProfileCard() {
  const [text, setText] = useState("");
  const fullText = siteData.profile.description;
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Compact Card */}
      <TiltCard className={cn(
        "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 cursor-pointer",
        "flex flex-col items-center justify-center p-8 lg:p-12",
        "bg-white/45 dark:bg-[#1e1e1e]/50 backdrop-blur-2xl",
        "border border-white/60 dark:border-white/10 rounded-3xl z-10",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
      )}>
        <motion.div layoutId="profile-container" className="w-full h-full flex flex-col items-center justify-center" onClick={toggleExpand}>
          <motion.img 
            layoutId="profile-avatar"
            src={siteData.profile.avatar} 
            alt="Avatar" 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-white/60 shadow-xl object-cover mb-4"
          />
          <motion.h1 
            layoutId="profile-name"
            className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400"
          >
            {siteData.profile.name}
          </motion.h1>
          <motion.p className="text-md md:text-lg text-gray-800 dark:text-gray-300 font-bold h-8 flex items-center">
            {text}<span className="animate-pulse inline-block w-2 bg-indigo-500 h-5 ml-1"></span>
          </motion.p>
          <div className="absolute top-6 left-6 text-xs font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-500/50 bg-white/20 dark:bg-black/20 rounded-full px-4 py-1.5 tracking-wider backdrop-blur-md">
            🚀 核心架构重构中
          </div>
          <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-black/5 text-black/50 hover:bg-black/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </motion.div>
      </TiltCard>

      {/* Expanded Modal Bento Box */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            {/* Self-contained overlay: bg-black/80, no blur on content */}
            <div className="absolute inset-0 bg-black/80" onClick={toggleExpand} />
            
            {/* Content panel: solid background, z-10 above overlay */}
            <motion.div 
              layoutId="profile-container"
              className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1a2e] border border-white/30 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl custom-scrollbar flex flex-col focus:outline-none"
            >
              <button 
                onClick={toggleExpand}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all z-50 text-xl font-bold shadow-lg"
              >
                ✕
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                {/* Left Column: Avatar & Vitals */}
                <div className="col-span-1 flex flex-col items-center gap-6 p-8 bg-white/20 dark:bg-black/20 rounded-3xl border border-white/20 shadow-inner">
                  <motion.img 
                    layoutId="profile-avatar"
                    src={siteData.profile.avatar} 
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-[6px] border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.4)] object-cover"
                  />
                  <motion.h1 
                    layoutId="profile-name"
                    className="text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
                  >
                    {siteData.profile.name}
                  </motion.h1>
                  <p className="text-gray-900 dark:text-gray-300 text-center font-medium text-lg leading-relaxed">
                    {siteData.profile.details.bio}
                  </p>
                  
                  <div className="flex flex-col gap-3 w-full mt-4">
                    <div className="flex items-center gap-2 group">
                      <a href={`mailto:${siteData.profile.details.contact.email}`} className="flex-[0.35] flex justify-center items-center py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/40 hover:to-purple-600/40 border border-purple-500/30 transition-all font-mono text-sm font-bold shadow-lg text-purple-900 dark:text-purple-200">
                        SYS.MAIL
                      </a>
                      <span className="flex-[0.65] break-all text-sm font-mono text-purple-800 dark:text-purple-300 bg-white/10 dark:bg-black/20 px-4 py-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-inner group-hover:border-purple-500/50 transition-colors">
                        {siteData.profile.details.contact.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <a href={siteData.profile.details.contact.github} target="_blank" rel="noreferrer" className="flex-[0.35] flex justify-center items-center py-3 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/40 hover:to-indigo-600/40 border border-indigo-500/30 transition-all font-mono text-sm font-bold shadow-lg text-indigo-900 dark:text-indigo-200">
                        GIT.HUB
                      </a>
                      <span className="flex-[0.65] break-all text-xs font-mono text-indigo-800 dark:text-indigo-300 bg-white/10 dark:bg-black/20 px-4 py-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-inner group-hover:border-indigo-500/50 transition-colors">
                        {siteData.profile.details.contact.github.replace('https://', '')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Right Column: Dashboards */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                  {/* Flow State */}
                  <div className="w-full">
                    {siteData.flowState.active && <FlowStateWidget />}
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                    {/* Live 2D Tracker */}
                    <Live2DEyeTracker />

                    {/* Quick Stats Panel */}
                    <div className="bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-inner">
                       <div className="text-xs font-mono text-gray-500 tracking-widest mb-4">SYSTEM VITALS</div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-end border-b border-white/10 pb-2">
                             <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">ARCH.LEVEL</span>
                             <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Junior</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/10 pb-2">
                             <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">UPTIME</span>
                             <span className="text-2xl font-black text-purple-600 dark:text-purple-400">2 YRS</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">PRIMARY OS</span>
                             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">Windows</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

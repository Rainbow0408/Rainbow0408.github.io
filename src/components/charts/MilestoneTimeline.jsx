import { motion } from 'framer-motion';
import { siteData } from '../../config/siteData.js';

export function MilestoneTimeline() {
  const { milestones } = siteData;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-16 py-12 px-4">
       <div className="text-center mb-16 relative z-10">
         <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-sm inline-block">
            成长时间轴
         </h2>
         <p className="font-mono text-gray-500 dark:text-gray-400 mt-2 tracking-[0.2em] uppercase text-sm">Milestone Timeline</p>
       </div>
       
       <div className="relative">
          {/* Center Line for MD and above */}
          <div className="hidden md:block absolute left-1/2 -ml-[2px] w-1 h-full bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent rounded-full" />
          
          {/* Left Line for small screens */}
          <div className="md:hidden absolute left-4 -ml-[2px] w-1 h-full bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent rounded-full" />

          {milestones.map((milestone, idx) => (
             <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: idx * 0.1 }}
                className={`mb-16 flex flex-col md:flex-row justify-between items-center w-full relative z-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
             >
                {/* Empty spacer for alternating layout */}
                <div className="hidden md:block md:w-[45%]" />
                
                {/* Center Node */}
                <motion.div 
                   className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white dark:border-[#1a1a2e] shadow-[0_0_20px_rgba(99,102,241,0.8)] z-20"
                   whileHover={{ scale: 1.2, rotate: 180 }}
                   transition={{ type: "spring" }}
                >
                   <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
                
                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-[45%]">
                   <div className={`p-8 bg-white/10 dark:bg-[#1e1e30]/50 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 relative overflow-hidden group ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {/* Decorative glowing orb inside card */}
                      <div className={`absolute top-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${idx % 2 === 0 ? '-right-10' : '-left-10'}`} />
                      
                      <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-3xl font-mono mb-3 drop-shadow-md tracking-wider">
                         {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-3">
                         {milestone.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-400 text-base leading-relaxed">
                         {milestone.description}
                      </p>
                   </div>
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}

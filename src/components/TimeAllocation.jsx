import { motion } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";

export function TimeAllocation({ className }) {
  const { timeAllocation } = siteData;

  if (!timeAllocation || timeAllocation.length === 0) return null;

  // Calculate SVG Pie Chart properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;
  
  // Prepare segments with their dash limits
  const segments = timeAllocation.map((item) => {
    const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += (item.percent / 100) * circumference;
    
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
      className={cn("w-full relative z-20 h-full", className)}
    >
      <div className={cn(
        "p-6 h-full rounded-3xl bg-white/20 backdrop-blur-xl",
        "border border-white/50 shadow-xl flex flex-col items-center"
      )}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800 self-start w-full">
          投入分布
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full flex-grow">
          {/* Pie Chart SVG */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 drop-shadow-lg">
              {segments.map((segment, index) => (
                <motion.circle
                  key={segment.id}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={segment.color || "#8b5cf6"}
                  strokeWidth="30"
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  whileInView={{ strokeDasharray: segment.strokeDasharray }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="hover:stroke-opacity-80 transition-all cursor-pointer"
                />
              ))}
              {/* Inner Circle for Donut effect */}
              <circle cx="80" cy="80" r="45" className="fill-white/40 backdrop-blur-md" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-800 font-bold text-lg drop-shadow-sm">Life</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center gap-4 w-full sm:w-auto">
            {timeAllocation.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 w-full bg-white/30 px-4 py-2 rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default"
              >
                <div 
                  className="w-4 h-4 rounded-full shadow-inner" 
                  style={{ backgroundColor: item.color || "#8b5cf6" }} 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-600">{item.percent}%</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils";

export function ModelCard({ model, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layoutId={`card-${model.id}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5, 
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="group relative rounded-3xl"
    >
      <Link 
        to={`/model/${model.id}`} 
        className={cn(
          "block h-full w-full relative",
          "bg-white/45 dark:bg-[#1e1e1e]/50 backdrop-blur-2xl",
          "border border-white/60 dark:border-white/10 rounded-3xl",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
          "overflow-hidden p-6 md:p-8 flex flex-col items-center justify-center text-center",
          "transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.7)]"
        )}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-60"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(99, 102, 241, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <motion.div 
          className="relative z-10 w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="text-4xl mb-4">✨</div>
          <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-800 to-indigo-500 dark:from-blue-200 dark:to-cyan-400">
            {model.name}
          </h2>
        </motion.div>
      </Link>
    </motion.div>
  );
}

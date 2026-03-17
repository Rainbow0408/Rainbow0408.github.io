import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "../utils";

export function ProfileCard() {
  const [text, setText] = useState("");
  const fullText = "重度C/C++用户，人工智能与网络安全开发者";
  const cardRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.y * -0.05,
        rotateY: mousePosition.x * 0.05,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
        "relative flex flex-col items-center justify-center p-8 lg:p-12",
        "bg-white/45 dark:bg-[#1e1e1e]/50 backdrop-blur-2xl",
        "border border-white/60 dark:border-white/10 rounded-3xl",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
        "overflow-hidden transition-shadow duration-500 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.7)]"
      )}
      style={{ perspective: 1000 }}
    >
      <div className="absolute top-6 left-6 text-xs font-bold text-indigo-600 dark:text-blue-400 border border-indigo-600 dark:border-blue-400 bg-white/20 dark:bg-black/20 rounded-full px-4 py-1.5 tracking-wider backdrop-blur-md">
        🚀 网站前期开发中
      </div>

      <motion.img 
        src="/avatar.jpg" 
        alt="Avatar" 
        className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-white/60 dark:border-white/20 shadow-xl object-cover mb-4 mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
      />
      
      <motion.h1 
        className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-400 dark:to-cyan-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Rainbow
      </motion.h1>
      
      <motion.p 
        className="text-md md:text-lg text-gray-700 dark:text-gray-300 font-medium h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {text}<span className="animate-pulse">_</span>
      </motion.p>
    </motion.div>
  );
}

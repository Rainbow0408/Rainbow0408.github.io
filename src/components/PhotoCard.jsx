import { motion } from "framer-motion";

export function PhotoCard({ photo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 1.5 + (index * 0.1), 
        duration: 0.6, 
        type: "spring", 
        damping: 20 
      }}
      whileHover="hover"
      className="relative break-inside-avoid mb-6 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-white/10 group cursor-pointer"
    >
      <motion.img
        variants={{
          hover: { scale: 1.1 }
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        src={photo.url}
        alt={photo.title}
        className="w-full h-auto object-cover block"
      />
      
      {/* Dark gradient overlay on hover */}
      <motion.div
        variants={{
          hover: { opacity: 1 }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6"
      >
        <h3 className="text-white font-bold text-xl drop-shadow-md">
          {photo.title}
        </h3>
      </motion.div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { ProfileCard } from "./ProfileCard.jsx";
import { ModelCard } from "./ModelCard.jsx";

export function BentoGrid({ models }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
        <ProfileCard />
        
        {models.map((model, idx) => (
          <ModelCard key={model.id} model={model} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

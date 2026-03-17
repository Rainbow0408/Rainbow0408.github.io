import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils";

export function EntranceBlur() {
  const [isBlurred, setIsBlurred] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isBlurred) return;
      setIsBlurred(false);
      
      // Animate the blur down to 0 and fade out the overlay
      controls.start({
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0,0,0,0)",
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
      }).then(() => {
        // After animation, hide the element completely to not block clicks
        controls.set({ display: "none" });
      });

      // Cleanup listeners
      window.removeEventListener("mousemove", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("mousemove", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isBlurred, controls]);

  return (
    <motion.div
      initial={{ 
        backdropFilter: "blur(25px)", 
        backgroundColor: "rgba(0,0,0,0.1)" 
      }}
      animate={controls}
      className={cn(
        "fixed inset-0 z-[100] pointer-events-none",
        "flex items-center justify-center"
      )}
    >
      {/* Optional: We can add a subtle "Move mouse to focus" pulsing text here if desired, but minimalism suggests we leave it off */}
    </motion.div>
  );
}

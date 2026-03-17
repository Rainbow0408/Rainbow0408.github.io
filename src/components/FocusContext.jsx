import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FocusContext = createContext();

export function FocusProvider({ children }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FocusContext.Provider value={{ isFocused, setIsFocused }}>
      {children}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="fixed inset-0 z-[40] pointer-events-none backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </FocusContext.Provider>
  );
}

export const useFocus = () => useContext(FocusContext);

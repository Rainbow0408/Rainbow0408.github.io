import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function PhysicsCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Smooth springs for cursor position
  const cursorX = useSpring(-100, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(-100, { stiffness: 600, damping: 30 });

  useEffect(() => {
    // Detect touch device
    const touchMediaQuery = window.matchMedia('(hover: none)');
    setIsTouchDevice(touchMediaQuery.matches);

    if (touchMediaQuery.matches) return;

    const updateMouseInfo = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorX.set(x);
      cursorY.set(y);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('.interactive-card') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMouseInfo);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide native cursor globally
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMouseInfo);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-400 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : 1,
          opacity: 0.9,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-purple-300/60 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../config/siteData';
import { cn } from '../utils';

export function MusicPlayer() {
  const { playlist } = siteData.musicPlayer;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const currentSong = playlist[currentIdx];

  // Initialize audio tag
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback prevented:", e));
      }
    }
  }, [currentIdx, currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback prevented:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  if (!playlist || playlist.length === 0) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />
      <motion.div
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full sm:rounded-2xl transition-all duration-300",
          "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl",
          "flex items-center overflow-hidden"
        )}
        initial={false}
        animate={{
          width: isExpanded ? 'auto' : '48px',
          height: isExpanded ? 'auto' : '48px',
          borderRadius: isExpanded ? '16px' : '9999px',
        }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(true)}
            >
              <Music className={cn("w-5 h-5", isPlaying ? "animate-pulse text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400")} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center space-x-4 p-3 pr-4 w-[280px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center cursor-pointer relative overflow-hidden group shadow-md"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white z-10" />
                ) : (
                  <Play className="w-4 h-4 text-white z-10 ml-0.5" />
                )}
                <div className={cn("absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors", currentSong?.image ? "" : "hidden")} />
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {currentSong?.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {currentSong?.artist}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <button onClick={handlePrev} className="hover:text-indigo-500 hover:scale-110 transition-transform">
                  <SkipBack className="w-4 h-4" />
                </button>
                <button onClick={handleNext} className="hover:text-indigo-500 hover:scale-110 transition-transform">
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 dark:bg-gray-700/50">
                <div
                  className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

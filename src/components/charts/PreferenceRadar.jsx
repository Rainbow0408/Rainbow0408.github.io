import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../../config/siteData.js';
import { TiltCard } from '../TiltCard.jsx';

// ── Modal renderers per category type ──

function GamesDetail({ items }) {
  const maxHours = Math.max(...items.map(i => i.hours));
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <span className="w-44 shrink-0 text-right font-mono font-bold text-sm text-gray-700 dark:text-gray-200 truncate">{item.name}</span>
          <div className="flex-1 h-7 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.hours / maxHours) * 100}%` }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-xs font-mono font-bold text-gray-600 dark:text-gray-300">
              {item.hours.toLocaleString()}h
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MoviesDetail({ items }) {
  return (
    <div className="space-y-6">
      {items.map((cat, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-black text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
            <span className="w-2 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 inline-block" />
            {cat.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.list.map((movie, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/30 text-sm font-bold text-gray-800 dark:text-gray-100 shadow-sm">
                {movie}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MusicDetail({ items }) {
  const colors = [
    "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
  ];
  return (
    <div className="space-y-8">
      {items.map((group, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-black text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            {group.artist}
            <span className="ml-2 text-xs font-mono text-gray-400 dark:text-gray-500">{group.songs.length} tracks</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.songs.map((song, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${colors[idx % colors.length]} text-sm font-medium text-gray-800 dark:text-gray-100 shadow-sm`}>
                {song}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ──

export function PreferenceRadar() {
  const { radarCharts } = siteData;
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = Object.keys(radarCharts);

  const getOption = (categoryKey) => {
    const data = radarCharts[categoryKey];
    return {
      radar: {
        indicator: data.indicators,
        radius: '75%',
        center: ['50%', '55%'],
        splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.06)'] } },
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.15)" } },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        name: { textStyle: { color: "#fff", fontSize: 12, fontWeight: "bold", textShadowBlur: 2, textShadowColor: '#000' } }
      },
      series: [{
        type: 'radar',
        data: [{
          value: data.data,
          name: data.title,
          areaStyle: { color: 'rgba(236, 72, 153, 0.4)' },
          lineStyle: { color: '#06b6d4', width: 4 },
          itemStyle: { color: '#0ea5e9', borderWidth: 2 }
        }]
      }],
      tooltip: { show: true }
    };
  };

  const subtitles = { games: "GAME STATS", movies: "WATCHLIST", music: "PLAYLIST" };

  const renderDetail = (key) => {
    const items = radarCharts[key].items;
    if (key === 'games') return <GamesDetail items={items} />;
    if (key === 'movies') return <MoviesDetail items={items} />;
    if (key === 'music') return <MusicDetail items={items} />;
    return null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 relative z-10 w-full">
        {categories.map((key) => (
          <TiltCard key={key} className="col-span-1 p-6 bg-white/10 dark:bg-black/20 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center group cursor-pointer transition-all hover:bg-white/20" style={{ perspective: 1000 }}>
             <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-purple-500 mb-2" style={{ transform: "translateZ(30px)" }}>
                {radarCharts[key].title}
             </div>
             <div className="w-full h-56 relative" onClick={() => setActiveCategory(key)} style={{ transform: "translateZ(10px)" }}>
                <ReactECharts 
                  option={getOption(key)} 
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-2xl">
                   <div className="flex items-center gap-2 bg-indigo-500/80 px-4 py-2 rounded-full text-white font-mono text-sm border border-indigo-400">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                     查看详情
                   </div>
                </div>
             </div>
          </TiltCard>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12"
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setActiveCategory(null)} />

            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-3xl bg-white dark:bg-[#111827] border border-white/30 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <button 
                onClick={() => setActiveCategory(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 text-black dark:text-white transition-all z-50 text-xl font-bold"
              >✕</button>
              
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/></svg>
                </div>
                <div>
                  <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 m-0">
                    {radarCharts[activeCategory].title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mt-1 uppercase tracking-widest">
                    {subtitles[activeCategory]}
                  </p>
                </div>
              </div>
              
              {renderDetail(activeCategory)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

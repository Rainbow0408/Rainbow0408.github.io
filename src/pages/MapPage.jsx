import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";
import * as d3 from "d3-geo";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function MapPage() {
  const { footprintMap } = siteData;
  const [activeNode, setActiveNode] = useState(null);
  const [chinaGeoData, setChinaGeoData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/china-cities.json')
      .then(res => res.json())
      .then(data => setChinaGeoData(data))
      .catch(err => console.error("Error loading map data:", err));
  }, []);

  // SVG dimensions for the map coordinate space
  const mapWidth = 800;
  const mapHeight = 600;

  // Create a projection fitting China into the 800x600 viewBox
  const projection = useMemo(() => {
    return d3.geoMercator()
      .center([104.195397, 35.86166])
      .scale(800)
      .translate([mapWidth / 2, mapHeight / 2]);
  }, []);

  const pathGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

  // Extract features (cities/provinces depending on the geojson)
  const features = chinaGeoData?.features || [];

  // Match footprint cities to geo features
  const getFootprintData = (featureName) => {
    if (!featureName) return null;
    return footprintMap.find(fp => featureName.includes(fp.city) || fp.city.includes(featureName));
  };

  if (!footprintMap || footprintMap.length === 0 || !chinaGeoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">地图数据加载中...</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen pb-24 pt-12 px-4 sm:px-6 z-20"
    >
      <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-8 z-30 relative">
          <Link 
            to="/"
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-md transition-all",
              "bg-white/20 hover:bg-white/40 border border-white/40 shadow-lg text-gray-800 font-semibold"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 drop-shadow-sm">
            足迹地图探索
          </h1>
        </div>

        <div className={cn(
          "flex-grow p-4 sm:p-6 rounded-3xl bg-white/20 backdrop-blur-xl",
          "border border-white/50 shadow-xl relative overflow-visible flex flex-col"
        )}>
          {/* Map Container */}
          <div ref={containerRef} className="relative w-full flex-grow flex items-center justify-center bg-gradient-to-br from-indigo-50/20 to-purple-50/20 rounded-2xl border border-white/30 p-2 sm:p-4 isolate">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full max-h-[700px]"
              style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))" }}
            >
              <g>
                {features.map((feature, i) => {
                  const fpData = getFootprintData(feature.properties.name);
                  const isVisited = !!fpData;

                  return (
                    <motion.path
                      key={`path-${i}`}
                      d={pathGenerator(feature)}
                      className={cn(
                        "stroke-[0.5] transition-colors duration-300 cursor-pointer outline-none",
                        isVisited 
                          ? "fill-indigo-500/80 stroke-indigo-200 hover:fill-indigo-400" 
                          : "fill-white/30 stroke-white/50 hover:fill-white/50"
                      )}
                      onMouseEnter={() => {
                        if (isVisited) setActiveNode({ ...fpData, centroid: pathGenerator.centroid(feature) });
                      }}
                      onMouseLeave={() => setActiveNode(null)}
                      onClick={() => {
                        if (isVisited) setActiveNode(activeNode?.city === fpData.city ? null : { ...fpData, centroid: pathGenerator.centroid(feature) });
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.005, duration: 0.5 }}
                    />
                  );
                })}
              </g>
              
              {/* Draw glowing dots at centroids of visited cities */}
              <g className="pointer-events-none">
                {features.map((feature, i) => {
                  const fpData = getFootprintData(feature.properties.name);
                  if (fpData) {
                    const [cx, cy] = pathGenerator.centroid(feature);
                    if (isNaN(cx) || isNaN(cy)) return null;
                    
                    const isActive = activeNode?.city === fpData.city;
                    
                    return (
                      <g key={`marker-${i}`}>
                        <circle cx={cx} cy={cy} r={3} className="fill-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                        <circle cx={cx} cy={cy} r={6} className="fill-indigo-300/50 animate-ping" />
                        {isActive && (
                          <line 
                            x1={cx} 
                            y1={cy} 
                            x2={mapWidth - 10} 
                            y2={mapHeight / 2} 
                            stroke="url(#lineGradient)" 
                            strokeWidth="2" 
                            strokeDasharray="4 4" 
                            className="opacity-60"
                          />
                        )}
                      </g>
                    );
                  }
                  return null;
                })}
              </g>

              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Right side floating Panel for active city */}
            <AnimatePresence>
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-56 sm:w-64 p-3 rounded-2xl backdrop-blur-3xl shadow-2xl border border-white/40 pointer-events-none",
                    "bg-white/80"
                  )}
                >
                  {activeNode.image && (
                    <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-3 isolate bg-gray-200">
                      <img src={activeNode.image} alt={activeNode.city} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-white font-bold text-sm tracking-widest drop-shadow-md">{activeNode.city}</span>
                    </div>
                  )}
                  {!activeNode.image && (
                    <div className="relative w-full h-12 rounded-xl overflow-hidden mb-3 isolate bg-indigo-500/20 flex flex-col justify-center px-3 border border-indigo-500/30">
                       <span className="text-indigo-800 font-bold text-sm tracking-widest">{activeNode.city}</span>
                       <span className="text-[10px] text-gray-500">等待照片上传...</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-700 leading-relaxed font-medium min-h-[40px]">
                    {activeNode.description || "这里还没有留下记忆描述。"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

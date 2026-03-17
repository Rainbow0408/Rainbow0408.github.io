import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";
import * as d3 from "d3-geo";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export function FootprintMap({ className }) {
  const { footprintMap } = siteData;
  const [chinaGeoData, setChinaGeoData] = useState(null);

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
  // Note: Depending on the geojson, properties.name might have "市" suffix.
  // We'll do a simple includes match since user inputs like "北京" can match "北京市"
  const getFootprintData = (featureName) => {
    if (!featureName) return null;
    return footprintMap.find(fp => featureName.includes(fp.city));
  };

  if (!footprintMap || footprintMap.length === 0 || !chinaGeoData) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
      className={cn("w-full relative z-20 h-full", className)}
    >
      <div className={cn(
        "p-4 sm:p-6 h-full rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-xl",
        "border border-white/50 dark:border-white/10 shadow-xl relative overflow-visible flex flex-col"
      )}>
        <div className="flex justify-between items-center mb-2 sm:mb-4 relative z-30">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            足迹地图
          </h2>
          <Link to="/map" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 group bg-white/50 px-3 py-1.5 rounded-full shadow-sm">
            探寻回忆 <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        
        {/* Map Container */}
        <Link to="/map" className="relative w-full flex-grow flex items-center justify-center bg-gradient-to-br from-indigo-50/20 to-purple-50/20 rounded-2xl border border-white/30 p-2 sm:p-4 isolate group overflow-hidden cursor-pointer shadow-inner">
          
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl flex items-center justify-center">
             <span className="bg-white/90 text-indigo-800 font-bold px-4 py-2 rounded-xl shadow-lg backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">进入独立地图展示</span>
          </div>
          
          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            className="w-full h-full max-h-[500px]"
            style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))" }}
          >
            <g>
              {features.map((feature, i) => {
                const fpData = getFootprintData(feature.properties.name);
                const isVisited = !!fpData;

                return (
                  <motion.path
                    d={pathGenerator(feature)}
                    className={cn(
                      "stroke-[0.5] transition-colors duration-300 outline-none relative z-0",
                      isVisited 
                        ? "fill-indigo-500/80 stroke-indigo-200" 
                        : "fill-white/30 stroke-white/50"
                    )}
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
                  
                  return (
                    <g key={`marker-${i}`}>
                      <circle cx={cx} cy={cy} r={2} className="fill-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                      <circle cx={cx} cy={cy} r={5} className="fill-indigo-300/50 animate-ping" />
                    </g>
                  );
                }
                return null;
              })}
            </g>
          </svg>
        </Link>
      </div>
    </motion.section>
  );
}

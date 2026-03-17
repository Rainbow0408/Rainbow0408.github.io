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
    fetch(`${import.meta.env.BASE_URL}china-cities.json`)
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

  // Municipality districts mapping
  const municipalities = {
    "北京": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"],
    "上海": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"],
    "重庆": ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "长寿区", "江津区", "合川区", "永川区", "南川区", "綦江县", "大足县", "潼南县", "铜梁县", "璧山县", "荣昌县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "黔江区", "武隆区", "开州区", "梁平区", "武隆县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"]
  };

  // City-to-province mapping for province-level entries
  const cityToProvince = {
    "哈尔滨": "黑龙江", "青岛": "山东", "日照": "山东",
    "盐城": "江苏", "徐州": "江苏", "扬州": "江苏", "苏州": "江苏", "南京": "江苏",
    "长沙": "湖南", "武汉": "湖北", "西安": "陕西", "桂林": "广西",
    "昆明": "云南", "大理": "云南", "丽江": "云南",
    "厦门": "福建", "福州": "福建",
    "九江": "江西", "恩施": "湖北",
    "成都": "四川", "宜昌": "湖北", "荆州": "湖北"
  };

  const getFootprintData = (featureName) => {
    if (!featureName) return null;
    
    // 1. Check if it's a district of a municipality
    for (const [muni, districts] of Object.entries(municipalities)) {
      if (districts.includes(featureName)) {
        return footprintMap.find(fp => fp.city === muni);
      }
    }

    // 2. Direct match
    const direct = footprintMap.find(fp => featureName.includes(fp.city) || fp.city.includes(featureName.replace(/省|市|自治区|壮族|维吾尔|回族/g, '')));
    if (direct) return direct;

    // 3. Province match
    const cleanName = featureName.replace(/省|市|自治区|壮族|维吾尔|回族/g, '');
    return footprintMap.find(fp => cityToProvince[fp.city] === cleanName);
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
        "p-4 sm:p-6 h-full rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-sm md:backdrop-blur-xl will-change-transform",
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
                const featureName = feature.properties.name;
                const fpData = getFootprintData(featureName);
                if (fpData) {
                  // For municipalities, only show one dot (at a specific "center" district)
                  const isMuni = Object.keys(municipalities).includes(fpData.city);
                  const isCenterDistrict = featureName === "渝中区" || featureName === "东城区" || featureName === "黄浦区";
                  
                  if (isMuni && !isCenterDistrict) return null;

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

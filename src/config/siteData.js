export const siteData = {
  // 全局背景配置 (纯色/渐变 或 图片URL)
  // 如果提供了 light/dark 图片，将覆盖默认的渐变背景
  background: {
    lightImage: "", // e.g. "/bg-light.jpg"
    darkImage: "",  // e.g. "/bg-dark.jpg"
  },

  // 个人资料配置
  profile: {
    name: "Ra1nb0w",
    avatar: "/avatar.jpg",
    description: "重度C/C++用户，人工智能与网络安全开发者",
    portfolioLabel: "Portfolio"
  },

  // 动漫集配置 (替换原有的PhotoWall图片)
  animeGallery: [
    { id: 1, imageUrl: "/images/1.jpg" },
    { id: 2, imageUrl: "/images/2.png" },
    { id: 3, imageUrl: "/images/3.png" },
    { id: 4, imageUrl: "/images/4.png", isCover: true },
    { id: 5, imageUrl: "/images/5.png" },
    { id: 6, imageUrl: "/images/6.png" },
  ],

  // 足迹地图配置
  // user requested: 哈尔滨 北京 青岛 日照 盐城 徐州 扬州 苏州 南京 上海 长沙 武汉 西安 桂林 昆明 大理 丽江 厦门 福州 九江 重庆 成都
  footprintMap: [
    { city: "哈尔滨", image: "", description: "" },
    { city: "北京", image: "", description: "" },
    { city: "青岛", image: "", description: "" },
    { city: "日照", image: "", description: "" },
    { city: "盐城", image: "", description: "" },
    { city: "徐州", image: "", description: "" },
    { city: "扬州", image: "", description: "" },
    { city: "苏州", image: "", description: "" },
    { city: "南京", image: "", description: "" },
    { city: "上海", image: "", description: "" },
    { city: "长沙", image: "", description: "" },
    { city: "武汉", image: "", description: "" },
    { city: "西安", image: "", description: "" },
    { city: "桂林", image: "", description: "" },
    { city: "昆明", image: "", description: "" },
    { city: "大理", image: "", description: "" },
    { city: "丽江", image: "", description: "" },
    { city: "厦门", image: "", description: "" },
    { city: "福州", image: "", description: "" },
    { city: "九江", image: "", description: "" },
    { city: "重庆", image: "", description: "" },
    { city: "成都", image: "", description: "" }
  ],

  // 迷你音乐播放器配置
  musicPlayer: {
    playlist: [
      { id: 1, title: "Dream", artist: "Unknown", url: "/music/dream.mp3" },
      { id: 2, title: "Love", artist: "Unknown", url: "/music/love.mp3" },
      { id: 3, title: "Mrs", artist: "Unknown", url: "/music/mrs.mp3" },
      { id: 4, title: "Only", artist: "Unknown", url: "/music/only.mp3" },
      { id: 5, title: "Tbdr", artist: "Unknown", url: "/music/tbdr.mp3" },
      { id: 6, title: "Toutou", artist: "Unknown", url: "/music/toutou.mp3" },
    ]
  },

  // 时间轴/投入分布统计配置
  timeAllocation: [
    { id: "study", label: "学习", percent: 25, color: "#8a2be2" },
    { id: "games", label: "网络游戏", percent: 25, color: "#4169e1" },
    { id: "sleep", label: "睡眠", percent: 40, color: "#00ced1" },
    { id: "chat", label: "社交媒体", percent: 10, color: "#ff1493" },
  ]
};

export const siteData = {
  // --- 原有基础配置 (保持兼容) ---
  background: {
    video: "/images/backgroundvideos/snowfall.mp4",
    lightImage: "",
    darkImage: "",
  },

  profile: {
    name: "Ra1nb0w",
    avatar: "/avatar.jpg",
    description: "重度C/C++用户，人工智能与网络安全开发者",
    portfolioLabel: "Portfolio",
    details: {
      bio: "当年万里觅封侯，匹马戍梁州",
      contact: {
        email: "1913838868@qq.com",
        github: "https://github.com/Rainbow0408?tab=repositories"
      }
    }
  },

  animeGallery: [
    { id: 1, imageUrl: "/images/animephotos/1.jpg" },
    { id: 2, imageUrl: "/images/animephotos/2.png" },
    { id: 3, imageUrl: "/images/animephotos/3.png" },
    { id: 4, imageUrl: "/images/animephotos/4.png", isCover: true },
    { id: 5, imageUrl: "/images/animephotos/5.png" },
    { id: 6, imageUrl: "/images/animephotos/6.png" },
    { id: 7, imageUrl: "/images/animephotos/7.png" },
    { id: 8, imageUrl: "/images/animephotos/8.png" },
    { id: 9, imageUrl: "/images/animephotos/9.png" },
    { id: 10, imageUrl: "/images/animephotos/10.png" },
    { id: 11, imageUrl: "/images/animephotos/11.png" },
    { id: 12, imageUrl: "/images/animephotos/12.png" },
    { id: 13, imageUrl: "/images/animephotos/13.png" },
    { id: 14, imageUrl: "/images/animephotos/14.png" },
    { id: 15, imageUrl: "/images/animephotos/15.png" },
    { id: 16, imageUrl: "/images/animephotos/16.png" },
    { id: 17, imageUrl: "/images/animephotos/17.png" },
    { id: 18, imageUrl: "/images/animephotos/18.png" },
    { id: 19, imageUrl: "/images/animephotos/19.png" },
    { id: 20, imageUrl: "/images/animephotos/20.png" },
    { id: 21, imageUrl: "/images/animephotos/21.png" },
    { id: 22, imageUrl: "/images/animephotos/22.png" },
    { id: 23, imageUrl: "/images/animephotos/23.png" },
    { id: 24, imageUrl: "/images/animephotos/24.png" },
  ],

  footprintMap: [
    { city: "哈尔滨", image: "/images/cityphotos/哈尔滨.jpg", description: "俄罗斯风格的建筑十分好看" },
    { city: "北京", image: "/images/cityphotos/北京.jpg", description: "和妹妹拍了格格照" },
    { city: "青岛", image: "/images/cityphotos/青岛.jpg", description: "与明明的1000天在青岛度过" },
    { city: "日照", image: "/images/cityphotos/日照.jpg", description: "俩人第一次去海边呀" },
    { city: "盐城", image: "/images/cityphotos/盐城.jpg", description: "家里迎来这位新成员" },
    { city: "徐州", image: "/images/cityphotos/徐州.jpg", description: "第一张照片，不太敢亲密的" },
    { city: "扬州", image: "/images/cityphotos/扬州.jpg", description: "我们扬州的瘦西湖！" },
    { city: "苏州", image: "/images/cityphotos/苏州.jpg", description: "东方之门宏伟壮丽" },
    { city: "南京", image: "", description: "" },
    { city: "上海", image: "/images/cityphotos/上海.jpg", description: "买了东方明珠同款的冰淇淋" },
    { city: "长沙", image: "/images/cityphotos/长沙.jpg", description: "最爱的雕塑，最敬仰的领袖" },
    { city: "武汉", image: "/images/cityphotos/武汉.jpg", description: "武汉长江大桥边" },
    { city: "西安", image: "/images/cityphotos/西安.jpg", description: "来西安当然要看兵马俑啦" },
    { city: "桂林", image: "/images/cityphotos/桂林.jpg", description: "给明明拍的特色名族服装！" },
    { city: "昆明", image: "/images/cityphotos/昆明.jpg", description: "春城的地标" },
    { city: "大理", image: "/images/cityphotos/大理.jpg", description: "洱海的水特别的蓝" },
    { city: "丽江", image: "/images/cityphotos/丽江.jpg", description: "玉龙雪山下" },
    { city: "厦门", image: "/images/cityphotos/厦门.jpg", description: "第一次来到南方海" },
    { city: "福州", image: "/images/cityphotos/福州.jpg", description: "福州的天蓝蓝的" },
    { city: "九江", image: "/images/cityphotos/九江.jpg", description: "不识庐山真面目" },
    { city: "重庆", image: "/images/cityphotos/重庆.jpg", description: "嘞是雾都" },
    { city: "成都", image: "/images/cityphotos/成都.jpg", description: "成都的大熊猫" },
    { city: "恩施", image: "/images/cityphotos/恩施.jpg", description: "恩施地心谷" }
  ],

  musicPlayer: {
    playlist: [
      { id: 1, title: "那些你很冒险的梦", url: "/music/dream.mp3" },
      { id: 2, title: "修炼爱情", url: "/music/love.mp3" },
      { id: 3, title: "麦恩莉", url: "/music/mrs.mp3" },
      { id: 4, title: "唯一", url: "/music/only.mp3" },
      { id: 5, title: "特别的人", url: "/music/tbdr.mp3" },
      { id: 6, title: "头头是道", url: "/music/toutou.mp3" },
    ]
  },

  // --- 史诗级重构新增配置 ---

  // 1. 沉浸式心流自习室 (Flow State Widget)
  flowState: {
    active: true,
    statusText: 'tail -f /dev/mind | grep "deep_focus" --color=auto',
    pomodoro: { workDuration: 25, breakDuration: 5 } // 番茄钟分钟数
  },

  // 2. 看板娘视线追踪交互配置 (Live2D Tracking)
  live2d: {
    enable: true,
    modelPath: "/live2d/model.json", // 预留模型路径
    expressions: { "C/C++": "serious", "AI": "thinking" } // 悬浮不同技能节点触发的表情
  },

  // 3. 偏好多维雷达图 (Game/Movie/Music Radar Charts)
  radarCharts: {
    games: {
      title: "游戏偏好",
      indicators: [
        { name: '射击 (FPS)', max: 100 },
        { name: '角色扮演 (RPG)', max: 100 },
        { name: '动作 (ACT)', max: 100 },
        { name: '竞技 (MOBA)', max: 100 },
        { name: '模拟 (SIM)', max: 100 }
      ],
      data: [85, 90, 70, 60, 50],
      // 文本驱动：游戏名 + 时长
      items: [
        { name: "CS:GO", hours: 2000 },
        { name: "Apex Legends", hours: 1600 },
        { name: "瓦罗兰特 (Valorant)", hours: 800 },
        { name: "艾尔登法环", hours: 300 },
        { name: "看门狗", hours: 300 },
        { name: "其他单机与网游", hours: 500 }
      ]
    },
    movies: {
      title: "电影偏好",
      indicators: [
        { name: '动作 (Action)', max: 100 },
        { name: '科幻 (Sci-Fi)', max: 100 },
        { name: '剧情 (Drama)', max: 100 },
        { name: '动画 (Anime)', max: 100 },
        { name: '喜剧 (Comedy)', max: 100 }
      ],
      data: [80, 95, 85, 70, 75],
      // 文本驱动：分类 + 电影列表
      items: [
        { category: "科幻电影", list: ["复仇者联盟", "星际穿越", "头号玩家", "黑客帝国", "流浪地球"] },
        { category: "动作电影", list: ["警察故事", "A计划", "黄飞鸿", "霍元甲", "倚天屠龙记"] },
        { category: "剧情电影", list: ["喜剧之王", "少林足球", "功夫", "飞驰人生"] }
      ]
    },
    music: {
      title: "音乐偏好",
      indicators: [
        { name: 'Pop', max: 100 },
        { name: 'R&B', max: 100 },
        { name: 'Ballad', max: 100 },
        { name: 'Rap', max: 100 },
        { name: 'Rock', max: 100 }
      ],
      data: [90, 80, 70, 60, 50],
      // 文本驱动：歌手 + 曲目列表
      items: [
        { artist: "薛之谦", songs: ["动物世界", "那是你离开北京的生活", "丑八怪", "天外来物", "演员", "认真的雪", "方圆几里", "我好像在哪见过你", "绅士"] },
        { artist: "林俊杰", songs: ["新地球", "交换余生", "背对背拥抱", "浪漫血液", "修炼爱情", "爱不会绝迹", "当你", "关键词", "那些你很冒险的梦", "黑夜问白天", "不潮不用花钱", "可惜没如果", "心墙", "达尔文", "Always Online"] },
        { artist: "方大同", songs: ["爱爱爱", "特别的人", "听", "梦蝴蝶", "红豆", "Love Song", "麦恩莉"] },
        { artist: "王以太 / 艾热", songs: ["头头是道", "别怕变老"] }
      ]
    }
  },

  // 4. 生命周期投入面积图 (Time Stacked Area Chart)
  lifecycleChart: {
    xAxisLabels: ["12岁", "15岁", "18岁", "20岁", "22岁"],
    datasets: [
      { name: "代码与AI研究", data: [0, 5, 10, 15, 20], color: "#8a2be2" },
      { name: "学业", data: [20, 20, 30, 25, 30], color: "#00ced1" },
      { name: "游戏与虚拟世界", data: [60, 55, 40, 40, 30], color: "#4169e1" },
      { name: "生活与旅游", data: [20, 20, 20, 20, 20], color: "#ff1493" }
    ]
  },

  // 5. 架构师成长时间轴 (Milestone Timeline)
  milestones: [
    { year: "7岁", title: "知识启蒙", description: "初次接触电脑，推开了数字世界的大门。", icon: "monitor" },
    { year: "17岁", title: "情感锚点", description: "遇到了明明，开启甜蜜恋爱之旅。", icon: "heart" },
    { year: "18岁", title: "步入殿堂", description: "考入大学，正式开始系统性的计算机科学学习。", icon: "book" },
    { year: "20岁", title: "底层觉醒", description: "接触 C 语言，开始理解内存、指针与底层系统的艺术。", icon: "chip" },
    { year: "21岁", title: "拥抱前沿", description: "接触大模型 AI 与 Agent 技术，探索人工智能与底层安全的结合边界。", icon: "bot" },
    { year: "22岁+", title: "期待未来", description: "积极探索未来。", icon: "rocket" }
  ],

  // 6. 动态技能树 (Tech Tree)
  techTree: [
    // 根节点
    { id: "root", label: "核心技术栈", category: "root", status: "unlocked", parent: null },

    // 分支一：C/C++
    { id: "cpp", label: "C/C++", category: "core", status: "unlocked", parent: "root" },
    { id: "memory", label: "内存管理与指针", category: "core", status: "unlocked", parent: "cpp" },
    { id: "stl", label: "STL 源码剖析", category: "core", status: "unlocked", parent: "cpp" },
    { id: "oop", label: "面向对象编程 (OOP)", category: "core", status: "unlocked", parent: "cpp" },
    { id: "concurrency", label: "多线程并发控制", category: "core", status: "unlocked", parent: "cpp" },

    // 分支二：人工智能
    { id: "ai", label: "人工智能", category: "ai", status: "training", parent: "root" },
    { id: "ml", label: "机器学习基础 (ML)", category: "ai", status: "training", parent: "ai" },
    { id: "cnn", label: "卷积神经网络 (CNN)", category: "ai", status: "training", parent: "ai" },
    { id: "rnn", label: "循环神经网络 (RNN)", category: "ai", status: "training", parent: "ai" },
    { id: "transformer", label: "Transformer 架构", category: "ai", status: "training", parent: "ai" },

    // 分支三：前端开发
    { id: "frontend", label: "前端开发", category: "frontend", status: "locked", parent: "root" },
    { id: "html_css", label: "HTML/CSS 骨架", category: "frontend", status: "locked", parent: "frontend" },
    { id: "js", label: "JavaScript 逻辑", category: "frontend", status: "locked", parent: "frontend" },
    { id: "framework", label: "现代化视图框架", category: "frontend", status: "locked", parent: "frontend" },

    // 分支四：后端开发
    { id: "backend", label: "后端开发", category: "backend", status: "locked", parent: "root" },
    { id: "mysql", label: "关系型数据库 (MySQL)", category: "backend", status: "locked", parent: "backend" },
    { id: "redis", label: "非关系型缓存 (Redis)", category: "backend", status: "locked", parent: "backend" },
    { id: "tcp_ip", label: "TCP/IP 网络协议", category: "backend", status: "locked", parent: "backend" }
  ]
};

import os

def build_project_index():
    base_dir = '.'
    project_list = []

    for item_name in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item_name)
        if not os.path.isdir(item_path) or item_name.startswith('.'):
            continue
        if os.path.exists(os.path.join(item_path, 'index.html')):
            display_name = item_name.replace('-', ' ').title()
            project_list.append((item_name, display_name))

    project_list.sort()

    # 注入高级 CSS 样式：毛玻璃特效与流光动态背景
    html_head = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>可视化模型合集 | 我的个人网站</title>
    <style>
        :root {
            --bg-color: #e0c3fc;
            --text-color: #333333;
            --card-bg: rgba(255, 255, 255, 0.45); /* 毛玻璃透明度 */
            --border-color: rgba(255, 255, 255, 0.6);
            --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            --hover-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.25);
            --transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* 自动侦测深色模式并切换赛博朋克深邃配色 */
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #0f2027;
                --text-color: #ffffff;
                --card-bg: rgba(30, 30, 30, 0.5);
                --border-color: rgba(255, 255, 255, 0.1);
                --shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
                --hover-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.7);
            }
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            color: var(--text-color);
            background: var(--bg-color);
            background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
            background-size: 200% 200%;
            animation: gradientBG 15s ease infinite; /* 触发流光背景 */
            background-attachment: fixed;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-image: linear-gradient(120deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            }
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        header {
            text-align: center;
            margin: 5rem 0 4rem 0;
            padding: 0 2rem;
            z-index: 10;
        }

        header h1 {
            font-size: 2.8rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            text-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            padding: 0 2rem 5rem 2rem;
            box-sizing: border-box;
            z-index: 10;
        }

        .card {
            background: var(--card-bg);
            backdrop-filter: blur(16px); /* 纯原生毛玻璃滤镜 */
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            text-decoration: none;
            color: var(--text-color);
            box-shadow: var(--shadow);
            transition: var(--transition);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: var(--hover-shadow);
            border-color: rgba(255, 255, 255, 0.8);
        }

        .card-icon {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card:hover .card-icon {
            transform: scale(1.2) rotate(8deg);
        }
        
        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>我的可视化世界</h1>
        <p>基于底层逻辑与算法的数据驱动型模型</p>
    </header>
    <div class="grid-container">"""

    # CDN 直接注入看板娘，全自动加载，无需任何本地依赖
    html_tail = """
    </div>
    
    <script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
</body>
</html>"""

    html_cards = ""
    for folder_name, display_name in project_list:
        html_cards += f"""
        <a href="./{folder_name}/index.html" class="card">
            <div class="card-icon">✨</div>
            <h2 class="card-title">{display_name}</h2>
        </a>"""

    full_html = html_head + html_cards + html_tail

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"[Success] 自动化扫描完成。共收录 {len(project_list)} 个模型项目，已生成最新的【毛玻璃+看板娘】炫酷主页。")

if __name__ == '__main__':
    build_project_index()
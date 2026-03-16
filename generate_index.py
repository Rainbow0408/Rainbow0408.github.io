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

    html_head = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>可视化模型与底层架构 | 我的个人网站</title>
    <style>
        :root {
            --bg-color: #e0c3fc;
            --text-color: #333333;
            --card-bg: rgba(255, 255, 255, 0.45);
            --border-color: rgba(255, 255, 255, 0.6);
            --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            --hover-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.25);
            --transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

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
            animation: gradientBG 15s ease infinite;
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

        /* 核心逻辑：平滑过渡入口动画 */
        .animate-item {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }

        @keyframes fadeUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* 个人信息面板样式 */
        .profile-section {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 3rem 4rem;
            margin-top: 5rem;
            text-align: center;
            box-shadow: var(--shadow);
            max-width: 600px;
            width: 80%;
        }

        .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid var(--border-color);
            margin-bottom: 1.5rem;
            box-shadow: var(--shadow);
            object-fit: cover;
        }

        .profile-name {
            font-size: 2.2rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
        }

        .profile-bio {
            font-size: 1.1rem;
            opacity: 0.8;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .skill-tags {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .skill-tag {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid var(--border-color);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        header {
            text-align: center;
            margin: 4rem 0 3rem 0;
            padding: 0 2rem;
        }

        header h2 {
            font-size: 2.2rem;
            font-weight: 700;
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            padding: 0 2rem 5rem 2rem;
            box-sizing: border-box;
        }

        .card {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
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
        
        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="profile-section animate-item delay-1">
        <img src="https://avatars.githubusercontent.com/u/9919?s=280&v=4" alt="Avatar" class="avatar">
        <h1 class="profile-name">Rainbow0408</h1>
        <p class="profile-bio">专注于底层系统、C/C++ 与人工智能架构的开发者。极度理性的数据驱动型学习者。</p>
        <div class="skill-tags">
            <span class="skill-tag">C / C++</span>
            <span class="skill-tag">系统底层架构</span>
            <span class="skill-tag">算法可视化</span>
        </div>
    </div>

    <header class="animate-item delay-2">
        <h2>我的可视化模型</h2>
    </header>

    <div class="grid-container animate-item delay-3">"""

    html_tail = """
    </div>
    
    <script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
</body>
</html>"""

    html_cards = ""
    for folder_name, display_name in project_list:
        html_cards += f"""
        <a href="./{folder_name}/index.html" class="card">
            <h2 class="card-title">✨ {display_name}</h2>
        </a>"""

    full_html = html_head + html_cards + html_tail

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"[Success] 已注入个人信息面板与平滑级联过渡动画。")

if __name__ == '__main__':
    build_project_index()
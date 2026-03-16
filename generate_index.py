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
    <title>Rainbow 的个人网站</title>
    <style>
        :root {
            --bg-color: #e0c3fc;
            --text-color: #333333;
            --card-bg: rgba(255, 255, 255, 0.45);
            --border-color: rgba(255, 255, 255, 0.6);
            --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            --hover-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.25);
            --accent-color: #0366d6;
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
                --accent-color: #58a6ff;
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
            body { background-image: linear-gradient(120deg, #0f2027 0%, #203a43 50%, #2c5364 100%); }
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .animate-item {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
        }

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
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .dev-tag {
            font-size: 0.85rem;
            color: var(--accent-color);
            border: 1px solid var(--accent-color);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            letter-spacing: 1px;
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
            letter-spacing: 0.5px;
        }

        .profile-bio {
            font-size: 1.1rem;
            opacity: 0.8;
            margin-bottom: 2rem;
            line-height: 1.6;
            max-width: 90%;
        }

        .toggle-btn {
            background: var(--accent-color);
            color: #ffffff;
            border: none;
            padding: 0.8rem 2.5rem;
            border-radius: 30px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }

        .toggle-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            filter: brightness(1.1);
        }

        .grid-container {
            display: none; /* 初始状态剥离文档流 */
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            padding: 0 2rem 5rem 2rem;
            box-sizing: border-box;
            margin-top: 3rem;
        }

        /* 纯原生类名切换控制物理状态 */
        .grid-container.show { display: grid; }
        .grid-container.visible { opacity: 1; transform: translateY(0); }

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
    <div class="profile-section animate-item">
        <div class="dev-tag">🚀 网站前期开发中</div>
        <img src="./avatar.jpg" alt="Avatar" class="avatar">
        <h1 class="profile-name">Rainbow</h1>
        <p class="profile-bio">重度C/C++用户，人工智能与网络安全开发者</p>
        <button id="toggleBtn" class="toggle-btn">展示可视化模型</button>
    </div>

    <div id="modelGrid" class="grid-container">"""

    html_tail = """
    </div>
    
    <script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
    <script>
        // 利用极简的原生闭包逻辑监听按钮状态
        const btn = document.getElementById('toggleBtn');
        const grid = document.getElementById('modelGrid');
        
        btn.addEventListener('click', () => {
            if (!grid.classList.contains('show')) {
                // 1. 恢复文档流渲染
                grid.classList.add('show');
                // 2. 利用微小宏任务延时触发 CSS 的平移和透明度补间动画
                setTimeout(() => grid.classList.add('visible'), 10);
                btn.textContent = '收起可视化模型';
            } else {
                // 1. 触发淡出动画
                grid.classList.remove('visible');
                // 2. 严格等待 500ms（对齐 CSS 的 transition 时长）后彻底移除元素节点
                setTimeout(() => grid.classList.remove('show'), 500); 
                btn.textContent = '展示可视化模型';
            }
        });
    </script>
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

    print(f"[Success] UI 逻辑层更新：信息与头像配置已就绪，原生折叠动画已挂载。")

if __name__ == '__main__':
    build_project_index()
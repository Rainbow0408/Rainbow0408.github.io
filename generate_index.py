import os

def build_project_index():
    base_dir = '.'
    project_list = []

    # 遍历并验证子目录
    for item_name in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item_name)
        if not os.path.isdir(item_path) or item_name.startswith('.'):
            continue
        if os.path.exists(os.path.join(item_path, 'index.html')):
            display_name = item_name.replace('-', ' ').title()
            project_list.append((item_name, display_name))

    project_list.sort()

    # 构建带原生 CSS 样式的 HTML 头部
    # 利用 CSS Variables 实现极其丝滑的亮/暗色主题自适应
    html_head = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>可视化模型合集 | 我的个人网站</title>
    <style>
        :root {
            --bg-color: #f4f7f6;
            --text-color: #333333;
            --card-bg: #ffffff;
            --accent-color: #0366d6;
            --border-color: rgba(0, 0, 0, 0.08);
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            --hover-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* 自动侦测操作系统的深色模式并切换配色 */
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #121212;
                --text-color: #e0e0e0;
                --card-bg: #1e1e1e;
                --accent-color: #58a6ff;
                --border-color: rgba(255, 255, 255, 0.08);
                --shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                --hover-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
            }
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        header {
            text-align: center;
            margin: 5rem 0 4rem 0;
            padding: 0 2rem;
        }

        header h1 {
            font-size: 2.75rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 1rem;
        }

        header p {
            font-size: 1.15rem;
            opacity: 0.7;
            font-weight: 300;
        }

        /* 响应式网格容器 */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            padding: 0 2rem 5rem 2rem;
            box-sizing: border-box;
        }

        /* 卡片物理悬浮属性 */
        .card {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
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
            position: relative;
            overflow: hidden;
        }

        /* 悬浮交互：微距 Y 轴平移与阴影加深 */
        .card:hover {
            transform: translateY(-8px);
            box-shadow: var(--hover-shadow);
            border-color: var(--accent-color);
        }

        .card-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
        }

        .card:hover .card-icon {
            transform: scale(1.1);
        }

        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--accent-color);
            margin: 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>可视化模型合集</h1>
        <p>基于底层逻辑与算法的数据驱动型前端展现</p>
    </header>
    <div class="grid-container">"""

    html_tail = """
    </div>
</body>
</html>"""

    # 动态组装各个项目的 DOM 结构
    html_cards = ""
    for folder_name, display_name in project_list:
        # 默认赋予一个模块化的 Icon，保持严谨和极简
        html_cards += f"""
        <a href="./{folder_name}/index.html" class="card">
            <div class="card-icon">⚙️</div>
            <h2 class="card-title">{display_name}</h2>
        </a>"""

    full_html = html_head + html_cards + html_tail

    # 覆盖生成新的 index.html
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"[Success] 自动化扫描完成。共收录 {len(project_list)} 个模型项目，已生成最新的【极简卡片式】导航主页。")

if __name__ == '__main__':
    build_project_index()
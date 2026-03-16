import os

def build_project_index():
    base_dir = '.'
    project_list = []

    # 遍历当前目录下的所有项
    for item_name in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item_name)

        # 过滤掉隐藏目录（如 .git）和非文件夹项
        if not os.path.isdir(item_path) or item_name.startswith('.'):
            continue

        # 严格验证是否为有效的前端项目（必须包含入口文件 index.html）
        if os.path.exists(os.path.join(item_path, 'index.html')):
            # 将文件夹名（如 game-of-life）的连字符替换为空格，并按词首字母大写
            display_name = item_name.replace('-', ' ').title()
            project_list.append((item_name, display_name))

    # 按字母顺序排序，确保每次生成的列表结构具有稳定性
    project_list.sort()

    # 构建 HTML 结构
    html_content = [
        "<!DOCTYPE html>",
        "<html lang=\"zh-CN\">",
        "<head>",
        "    <meta charset=\"UTF-8\">",
        "    <title>我的可视化模型合集</title>",
        "    <style>",
        "        body { font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }",
        "        ul { line-height: 2; font-size: 1.1rem; }",
        "        a { text-decoration: none; color: #0366d6; }",
        "        a:hover { text-decoration: underline; }",
        "    </style>",
        "</head>",
        "<body>",
        "    <h1>欢迎来到我的个人网站</h1>",
        "    <p>这里存放了我写的一些简易可视化模型：</p>",
        "    <ul>"
    ]

    # 动态插入各个项目的超链接
    for folder_name, display_name in project_list:
        html_content.append(f"        <li><a href=\"./{folder_name}/index.html\">{display_name}</a></li>")

    html_content.extend([
        "    </ul>",
        "</body>",
        "</html>"
    ])

    # 覆盖写入根目录的 index.html
    with open('index.html', 'w', encoding='utf-8') as file_obj:
        file_obj.write('\n'.join(html_content))

    print(f"[Success] 自动化扫描完成。共收录 {len(project_list)} 个模型项目，已生成最新的 index.html。")

if __name__ == '__main__':
    build_project_index()
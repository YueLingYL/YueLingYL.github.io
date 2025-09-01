# To-Do List App

一个现代化的待办事项管理应用，使用React和TypeScript开发，具有优雅的UI设计和完整的功能体验。

## 🚀 功能特性

- ✅ 添加、编辑、删除待办事项
- ✅ 标记待办事项为已完成/未完成
- ✅ 过滤功能（全部/未完成/已完成）
- ✅ 清除已完成待办事项
- 💾 本地存储功能，刷新页面数据不丢失
- 📱 响应式设计，适配各种设备
- 🎨 现代化UI设计，流畅的动画效果

## 🛠️ 技术栈

- **前端框架**: React 18
- **编程语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS3
- **本地存储**: localStorage

## 📦 安装和运行

### 前提条件

确保您的计算机上安装了以下软件：
- [Node.js](https://nodejs.org/) (v14.0或更高版本)
- [npm](https://www.npmjs.com/)、[yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io/)

### 安装依赖

```bash
# 使用npm
npm install

# 或使用yarn

yarn install

# 或使用pnpm
pnpm install
```

### 开发模式运行

```bash
# 使用npm
npm run dev

# 或使用yarn

yarn dev

# 或使用pnpm
pnpm dev
```

然后在浏览器中访问 `http://localhost:5173`

### 构建生产版本

```bash
# 使用npm
npm run build

# 或使用yarn

yarn build

# 或使用pnpm
pnpm build
```

构建后的文件将位于 `dist` 目录中

### 预览生产版本

```bash
# 使用npm
npm run preview

# 或使用yarn

yarn preview

# 或使用pnpm
pnpm preview
```

## 💡 使用说明

1. 在输入框中输入待办事项，按Enter键或点击"添加"按钮添加
2. 点击复选框或待办事项文本可以切换完成状态
3. 点击待办事项旁的"编辑"按钮可以修改待办事项内容
4. 点击"删除"按钮可以删除待办事项
5. 使用底部的过滤器可以查看全部、未完成或已完成的待办事项
6. 点击"清除已完成"按钮可以删除所有已完成的待办事项

## 📝 项目结构

```
├── src/
│   ├── main.tsx         # React应用入口
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   └── index.css        # 全局样式
├── public/
│   └── vite.svg         # Vite图标
├── index.html           # HTML入口文件
├── package.json         # 项目依赖和脚本
├── tsconfig.json        # TypeScript配置
├── tsconfig.node.json   # Node TypeScript配置
├── vite.config.ts       # Vite配置
└── .gitignore           # Git忽略规则
```

## 🔧 开发指南

### 代码规范

该项目使用ESLint进行代码质量检查，执行以下命令运行lint检查：

```bash
# 使用npm
npm run lint

# 或使用yarn

yarn lint

# 或使用pnpm
pnpm lint
```

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License

## 🎯 设计理念

这个待办事项应用注重用户体验和界面美观，采用了现代化的设计风格和流畅的交互效果。应用提供了完整的待办事项管理功能，同时确保了数据的本地持久化存储，让用户可以方便地管理日常任务。
# Tailwind CSS 配置修复指南

## 解决 "Unknown at rule @tailwind" 错误

这个错误通常意味着您的开发环境无法识别Tailwind CSS的指令。以下是解决方案：

## 方案一：VSCode 设置（已配置）

我们已经在项目中添加了 `.vscode/settings.json` 文件，其中包含以下配置：

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

这将禁用VSCode的默认CSS验证器，它通常不理解Tailwind的指令。

## 方案二：安装VSCode插件

请确保安装以下VSCode插件：

1. **Tailwind CSS IntelliSense** - 提供Tailwind CSS的智能提示
2. **PostCSS Language Support** - 支持PostCSS语法

## 方案三：重新安装依赖

如果上述方案不起作用，请尝试重新安装项目依赖：

```bash
# 删除现有的node_modules和包锁文件
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install
```

## 方案四：确保正确导入Tailwind

检查您的`globals.css`文件，确保它包含以下内容：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 方案五：更新PostCSS配置

如果仍然有问题，请修改`postcss.config.js`文件：

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
}
```

您可能需要额外安装：

```bash
npm install --save-dev postcss-import
```

## 方案六：检查Tailwind配置

确保您的`tailwind.config.js`文件包含正确的内容路径：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
  // 其他配置...
}
```

## 重新启动开发服务器

完成以上步骤后，重新启动您的开发服务器：

```bash
npm run dev
```

这应该可以解决"Unknown at rule @tailwind"错误。如果问题仍然存在，请检查您的IDE或编辑器是否有特定的CSS验证器插件可能干扰了Tailwind CSS的处理。 
# Stagewise 开发工具栏集成说明

## 🎯 集成状态

✅ **已完成的集成步骤：**

1. **包安装**: 已安装 `@stagewise/toolbar@^0.2.1`
2. **配置文件**: 创建了 `stagewise.config.js` 配置
3. **主页面集成**: 在 `index.html` 和 `script.js` 中集成了工具栏
4. **开发环境检测**: 仅在开发模式下启用工具栏
5. **备选方案**: 提供了 `SimpleDevToolbar` 作为后备工具栏

## 🚀 如何使用

### 启动开发服务器
```bash
npm run dev
# 或
python3 -m http.server 8080
```

### 访问页面
- 主页面: http://localhost:8080
- 测试页面: http://localhost:8080/test-stagewise.html

### 工具栏功能
- **自动检测**: 工具栏只在开发环境（localhost/127.0.0.1）下显示
- **元素选择**: 点击工具栏中的"选择元素"按钮来选择页面元素
- **网格显示**: 显示/隐藏页面网格辅助线
- **元素信息**: 显示选中元素的详细信息

## 🛠️ 技术实现

### 1. 开发环境检测
```javascript
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '0.0.0.0' ||
                      window.location.port !== '' ||
                      window.location.protocol === 'file:';
```

### 2. 工具栏初始化
```javascript
// 尝试加载 Stagewise
const { initToolbar } = await import('./node_modules/@stagewise/toolbar/dist/index.js');
const { stagewiseConfig } = await import('./stagewise.config.js');
initToolbar(stagewiseConfig);
```

### 3. 备选方案
如果 Stagewise 加载失败，会自动启用 `SimpleDevToolbar` 备选工具栏。

## 📁 相关文件

- `stagewise.config.js` - Stagewise 配置文件
- `dev-toolbar.js` - 备选开发工具栏实现
- `script.js` - 工具栏初始化逻辑
- `test-stagewise.html` - 测试页面
- `package.json` - 包依赖配置

## 🔧 故障排除

### 如果工具栏没有显示：
1. 确保访问的是 localhost 地址
2. 检查浏览器控制台是否有错误信息
3. 确认开发服务器正在运行
4. 查看是否有备选工具栏启动的日志

### 常见错误解决：
- **模块导入失败**: 备选工具栏会自动启动
- **CSS 加载失败**: 工具栏功能不受影响
- **权限问题**: 确保有读取 node_modules 的权限

## 📋 功能清单

- [x] 开发环境检测
- [x] Stagewise 工具栏集成
- [x] 备选工具栏实现
- [x] 元素选择功能
- [x] 网格显示功能
- [x] 元素信息显示
- [x] 生产环境排除
- [x] 错误处理和降级

## 🎨 自定义配置

可以在 `stagewise.config.js` 中修改工具栏配置：

```javascript
export const stagewiseConfig = {
  plugins: [
    // 在这里添加自定义插件
  ],
  development: {
    enabled: true,
    autoConnect: true
  }
};
```

---

**注意**: 工具栏仅在开发模式下工作，不会包含在生产构建中。 
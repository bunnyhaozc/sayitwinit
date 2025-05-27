// Stagewise工具栏配置
export const stagewiseConfig = {
  plugins: [],
  // 开发模式配置
  development: {
    enabled: true,
    autoConnect: true
  }
};

// 检查是否为开发环境
export const isDevelopment = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname === '0.0.0.0' ||
         window.location.port !== '' ||
         window.location.protocol === 'file:';
}; 
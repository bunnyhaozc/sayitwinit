// 简单的开发工具栏 - Stagewise备选方案
class SimpleDevToolbar {
    constructor() {
        this.isVisible = false;
        this.selectedElement = null;
        this.init();
    }

    init() {
        this.createToolbar();
        this.attachEventListeners();
        console.log('🛠️ 简单开发工具栏已启动');
    }

    createToolbar() {
        // 创建工具栏容器
        this.toolbar = document.createElement('div');
        this.toolbar.id = 'simple-dev-toolbar';
        this.toolbar.style.cssText = `
            position: fixed;
            top: 50px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #333;
            border-radius: 8px;
            padding: 10px;
            z-index: 10000;
            color: white;
            font-family: monospace;
            font-size: 12px;
            max-width: 300px;
            display: none;
        `;

        // 工具栏内容
        this.toolbar.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 10px;">
                <strong>🛠️ 开发工具</strong>
                <button id="close-toolbar" style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">✕</button>
            </div>
            <div style="margin-bottom: 10px;">
                <button id="toggle-inspector" style="background: #dc2626; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                    🔍 选择元素
                </button>
                <button id="toggle-grid" style="background: #7c3aed; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                    📐 网格
                </button>
            </div>
            <div id="element-info" style="background: #1a1a1a; padding: 8px; border-radius: 4px; display: none;">
                <div><strong>选中元素:</strong></div>
                <div id="element-details"></div>
            </div>
        `;

        document.body.appendChild(this.toolbar);

        // 创建切换按钮
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.innerHTML = '🛠️';
        this.toggleBtn.style.cssText = `
            position: fixed;
            top: 50px;
            right: 10px;
            background: linear-gradient(135deg, #dc2626 0%, #7c3aed 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            z-index: 9999;
            font-size: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(this.toggleBtn);
    }

    attachEventListeners() {
        // 切换工具栏显示
        this.toggleBtn.addEventListener('click', () => {
            this.isVisible = !this.isVisible;
            this.toolbar.style.display = this.isVisible ? 'block' : 'none';
            this.toggleBtn.style.display = this.isVisible ? 'none' : 'block';
        });

        // 关闭工具栏
        document.getElementById('close-toolbar').addEventListener('click', () => {
            this.isVisible = false;
            this.toolbar.style.display = 'none';
            this.toggleBtn.style.display = 'block';
        });

        // 元素选择器
        document.getElementById('toggle-inspector').addEventListener('click', () => {
            this.toggleInspector();
        });

        // 网格切换
        document.getElementById('toggle-grid').addEventListener('click', () => {
            this.toggleGrid();
        });
    }

    toggleInspector() {
        if (this.inspectorActive) {
            this.deactivateInspector();
        } else {
            this.activateInspector();
        }
    }

    activateInspector() {
        this.inspectorActive = true;
        document.body.style.cursor = 'crosshair';
        
        this.inspectorHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target === this.toolbar || this.toolbar.contains(e.target)) return;
            
            this.selectElement(e.target);
            this.deactivateInspector();
        };

        document.addEventListener('click', this.inspectorHandler, true);
        document.getElementById('toggle-inspector').textContent = '🎯 点击选择';
    }

    deactivateInspector() {
        this.inspectorActive = false;
        document.body.style.cursor = '';
        document.removeEventListener('click', this.inspectorHandler, true);
        document.getElementById('toggle-inspector').textContent = '🔍 选择元素';
    }

    selectElement(element) {
        // 清除之前的选择
        if (this.selectedElement) {
            this.selectedElement.style.outline = '';
        }

        // 选择新元素
        this.selectedElement = element;
        element.style.outline = '2px solid #dc2626';

        // 显示元素信息
        const info = document.getElementById('element-info');
        const details = document.getElementById('element-details');
        
        details.innerHTML = `
            <div>标签: ${element.tagName.toLowerCase()}</div>
            <div>类名: ${element.className || '无'}</div>
            <div>ID: ${element.id || '无'}</div>
            <div>文本: ${element.textContent?.substring(0, 50) || '无'}${element.textContent?.length > 50 ? '...' : ''}</div>
        `;
        
        info.style.display = 'block';
    }

    toggleGrid() {
        if (document.getElementById('dev-grid')) {
            document.getElementById('dev-grid').remove();
        } else {
            this.showGrid();
        }
    }

    showGrid() {
        const grid = document.createElement('div');
        grid.id = 'dev-grid';
        grid.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background-image: 
                linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        `;
        document.body.appendChild(grid);
    }
}

// 导出到全局
window.SimpleDevToolbar = SimpleDevToolbar; 
// 全局变量
let selectedTone = 'professional';

// DOM元素
const interviewInput = document.getElementById('interview-input');
const generateBtn = document.getElementById('generate-btn');
const btnText = document.getElementById('btn-text');
const loadingText = document.getElementById('loading-text');
const tagBtns = document.querySelectorAll('.tag-btn');
const exampleBtns = document.querySelectorAll('.example-btn');

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addInputEnhancements();
});

// 初始化事件监听器
function initializeEventListeners() {
    // 语气标签点击事件
    tagBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectTone(this);
        });
    });

    // 示例按钮点击事件
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            insertExample(this.textContent.trim());
        });
    });

    // 生成按钮点击事件
    generateBtn.addEventListener('click', function() {
        generateAnswer();
    });

    // 输入框回车键事件
    interviewInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateAnswer();
        }
    });

    // 输入框实时验证
    interviewInput.addEventListener('input', function() {
        validateInput();
    });
}

// 选择语气
function selectTone(selectedBtn) {
    // 移除所有选中状态
    tagBtns.forEach(btn => {
        btn.classList.remove('tag-selected');
        btn.classList.add('tag-unselected');
    });

    // 添加选中状态
    selectedBtn.classList.remove('tag-unselected');
    selectedBtn.classList.add('tag-selected');

    // 更新选中的语气
    selectedTone = selectedBtn.dataset.tone;

    // 添加点击动画
    selectedBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        selectedBtn.style.transform = 'scale(1)';
    }, 150);
}

// 插入示例
function insertExample(example) {
    const examples = {
        '自我介绍': '北京，产品经理，简单介绍一下自己',
        '项目经验': '上海，前端工程师，描述一个技术项目的经验',
        '优缺点分析': '深圳，运营专员，说说你的优缺点',
        '职业规划': '广州，UI设计师，谈谈你的职业规划'
    };

    const fullExample = examples[example] || `${example}相关的面试问题`;
    interviewInput.value = fullExample;
    
    // 添加聚焦效果
    interviewInput.focus();
    validateInput();

    // 添加动画效果
    interviewInput.style.transform = 'scale(1.02)';
    setTimeout(() => {
        interviewInput.style.transform = 'scale(1)';
    }, 200);
}

// 验证输入
function validateInput() {
    const input = interviewInput.value.trim();
    const isValid = input.length >= 5;

    if (isValid) {
        generateBtn.disabled = false;
        generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        interviewInput.classList.remove('border-red-500');
        interviewInput.classList.add('border-green-500');
    } else {
        generateBtn.disabled = true;
        generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
        interviewInput.classList.remove('border-green-500');
        if (input.length > 0) {
            interviewInput.classList.add('border-red-500');
        }
    }
}

// 生成答案
async function generateAnswer() {
    const input = interviewInput.value.trim();
    
    if (input.length < 5) {
        showInputError('请输入至少5个字符的问题描述');
        return;
    }

    // 开始加载状态
    setLoadingState(true);

    try {
        // 模拟AI生成过程
        await simulateAIGeneration(input, selectedTone);
        
        // 跳转到结果页面
        const params = new URLSearchParams({
            question: input,
            tone: selectedTone,
            timestamp: Date.now()
        });
        
        window.location.href = `result.html?${params.toString()}`;
        
    } catch (error) {
        console.error('生成答案时出错:', error);
        showError('生成过程中出现错误，请稍后重试');
        setLoadingState(false);
    }
}

// 模拟AI生成过程
function simulateAIGeneration(input, tone) {
    return new Promise((resolve) => {
        // 模拟不同的生成时间
        const generationTime = Math.random() * 2000 + 1500; // 1.5-3.5秒
        
        // 模拟进度更新
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            updateLoadingProgress(progress);
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            resolve();
        }, generationTime);
    });
}

// 设置加载状态
function setLoadingState(isLoading) {
    if (isLoading) {
        btnText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        generateBtn.disabled = true;
        generateBtn.classList.add('opacity-75');
        
        // 添加脉冲动画
        generateBtn.style.animation = 'pulse 2s infinite';
    } else {
        btnText.classList.remove('hidden');
        loadingText.classList.add('hidden');
        generateBtn.disabled = false;
        generateBtn.classList.remove('opacity-75');
        generateBtn.style.animation = '';
    }
}

// 更新加载进度
function updateLoadingProgress(progress) {
    const messages = [
        '🧠 AI正在理解您的问题...',
        '🔍 分析面试场景和要求...',
        '✍️ 生成个性化回答...',
        '🎯 优化回答结构和语气...',
        '✅ 即将完成生成...'
    ];
    
    const messageIndex = Math.floor((progress / 100) * messages.length);
    const currentMessage = messages[Math.min(messageIndex, messages.length - 1)];
    
    loadingText.textContent = currentMessage;
}

// 显示输入错误
function showInputError(message) {
    interviewInput.classList.add('border-red-500');
    interviewInput.placeholder = message;
    
    setTimeout(() => {
        interviewInput.classList.remove('border-red-500');
        interviewInput.placeholder = '例如：北京产品经理职位，请介绍一个项目经验';
    }, 3000);
}

// 显示错误信息
function showError(message) {
    // 创建错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    errorDiv.innerHTML = `
        <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // 显示动画
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 4000);
}

// 添加输入增强功能
function addInputEnhancements() {
    // 智能提示功能
    const suggestions = [
        '北京产品经理职位，请介绍一个项目经验',
        '上海前端工程师，说说你的技术栈',
        '深圳运营专员，描述一次成功的运营活动',
        '广州UI设计师，展示你的设计思路',
        '杭州数据分析师，分享一次数据驱动的决策',
        '请介绍一下你自己',
        '你的优缺点是什么？',
        '为什么选择我们公司？',
        '你的职业规划是什么？',
        '描述一次团队合作的经历'
    ];

    // 输入框获得焦点时的动画
    interviewInput.addEventListener('focus', function() {
        this.parentElement.parentElement.classList.add('transform', 'scale-105');
    });

    interviewInput.addEventListener('blur', function() {
        this.parentElement.parentElement.classList.remove('transform', 'scale-105');
    });

    // 添加输入建议（简化版）
    interviewInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            // 这里可以添加更复杂的建议逻辑
            validateInput();
        }
    });
}

// 语气映射
const toneDescriptions = {
    'professional': '正式专业 - 适合企业面试，语言规范严谨',
    'enthusiastic': '热情积极 - 展现活力和热情，适合创业公司',
    'humble': '谦虚务实 - 低调谦逊，适合传统行业面试',
    'confident': '自信果断 - 展现领导力，适合管理岗位',
    'friendly': '友好亲和 - 温和友善，适合团队协作岗位'
};

// 为语气按钮添加提示
tagBtns.forEach(btn => {
    const tone = btn.dataset.tone;
    const description = toneDescriptions[tone];
    
    btn.title = description;
    
    // 添加悬停效果
    btn.addEventListener('mouseenter', function() {
        if (!this.classList.contains('tag-selected')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter 快速生成
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateAnswer();
    }
    
    // 数字键选择语气
    if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key) - 1;
        if (tagBtns[index]) {
            selectTone(tagBtns[index]);
        }
    }
});

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // 自动聚焦到输入框
    setTimeout(() => {
        interviewInput.focus();
    }, 800);
}); 
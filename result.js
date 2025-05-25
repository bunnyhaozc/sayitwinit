// 全局变量
let currentQuestion = '';
let currentTone = '';

// 预设回答模板
const answerTemplates = {
    'professional': {
        chinese: {
            '自我介绍': '我是一名经验丰富的{职位}，具有{年数}年的行业经验。在{城市}的职业发展过程中，我专注于{专业领域}，并在{具体成就}方面取得了显著成果。我的核心竞争力包括{技能1}、{技能2}和{技能3}。在之前的工作中，我成功{具体案例}，为公司创造了{价值}。我相信我的专业背景和实践经验能够为贵公司带来价值。',
            '项目经验': '在我担任{城市}某{公司类型}的{职位}期间，我主导了一个{项目类型}项目，该项目显著提升了{价值指标}。这个项目从概念到上线历时{时间}，涉及{团队规模}和{技术难点}。项目背景是{背景描述}，我制定了详细的{方案类型}，明确了{目标}。执行过程中，我{执行描述}，确保{质量保证}。项目成果：{具体数据}，{影响描述}。这个项目锻炼了我的{能力提升}，为我未来发展奠定了坚实基础。'
        },
        english: {
            '自我介绍': 'I am an experienced {position} with {years} years of industry expertise. Throughout my career development in {city}, I have specialized in {professional field} and achieved significant results in {specific achievements}. My core competencies include {skill1}, {skill2}, and {skill3}. In my previous roles, I successfully {specific case}, creating {value} for the company. I believe my professional background and practical experience can bring substantial value to your organization.',
            '项目经验': 'During my tenure as a {position} at a {company type} in {city}, I spearheaded a {project type} project that significantly enhanced {value metrics}. This project took {time period} from conception to launch, involving {team scale} and {technical challenges}. The project background was {background description}. I developed a detailed {solution type}, clearly defining {objectives}. During execution, I {execution description}, ensuring {quality assurance}. Project results: {specific data}, {impact description}. This project strengthened my {capability enhancement} and laid a solid foundation for my future development.'
        }
    }
};

// DOM元素
const questionTitle = document.getElementById('question-title');
const chineseAnswer = document.getElementById('chinese-answer');
const englishAnswer = document.getElementById('english-answer');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadQuestionFromURL();
    generateAnswers();
    addPageAnimations();
});

// 从URL参数加载问题
function loadQuestionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    currentQuestion = urlParams.get('question') || '北京，产品经理，项目经验';
    currentTone = urlParams.get('tone') || 'professional';
    
    // 更新页面标题
    questionTitle.textContent = currentQuestion;
    
    // 更新语气显示
    const toneText = getToneText(currentTone);
    const toneElement = document.querySelector('.text-gray-400');
    if (toneElement) {
        toneElement.innerHTML = `语气：${toneText} • 生成时间：刚刚`;
    }
}

// 获取语气文本
function getToneText(tone) {
    const toneMap = {
        'professional': '正式专业',
        'enthusiastic': '热情积极',
        'humble': '谦虚务实',
        'confident': '自信果断',
        'friendly': '友好亲和'
    };
    return toneMap[tone] || '正式专业';
}

// 生成答案
function generateAnswers() {
    const { chineseText, englishText } = generateAnswerText(currentQuestion, currentTone);
    
    // 创建段落结构
    chineseAnswer.innerHTML = formatAnswer(chineseText);
    englishAnswer.innerHTML = formatAnswer(englishText);
    
    // 添加打字机效果
    setTimeout(() => {
        addTypewriterEffect();
    }, 500);
}

// 生成答案文本
function generateAnswerText(question, tone) {
    // 解析问题
    const { city, position, questionType } = parseQuestion(question);
    
    // 根据问题类型和语气生成内容
    const chineseText = generateChineseAnswer(city, position, questionType, tone);
    const englishText = generateEnglishAnswer(city, position, questionType, tone);
    
    return { chineseText, englishText };
}

// 解析问题
function parseQuestion(question) {
    const parts = question.split(/[，,]/);
    const city = parts[0] || '北京';
    const position = parts[1] || '产品经理';
    const questionType = parts[2] || '项目经验';
    
    return { city, position, questionType };
}

// 生成中文答案
function generateChineseAnswer(city, position, questionType, tone) {
    if (questionType.includes('项目') || questionType.includes('经验')) {
        return `在我担任${city}某知名科技公司${position}期间，我主导了一个革命性的移动应用项目，该项目显著提升了用户体验和商业价值。这个项目从概念到上线历时8个月，涉及跨部门协作和复杂的技术挑战。

项目背景：我们发现现有产品的用户流失率较高，通过深入的用户调研和数据分析，确定了用户体验优化的关键痛点。我制定了详细的产品路线图，明确了核心功能优先级和里程碑目标。

执行过程：我与设计团队紧密协作制定了新的交互设计标准，与工程团队进行技术方案评估，确保功能实现的可行性。同时建立了敏捷开发流程，每两周进行一次迭代评审，及时调整产品方向。

项目成果：产品上线后6个月内，用户留存率提升了40%，日活跃用户增长35%，应用内转化率提升25%。更重要的是，用户满意度评分从3.2提升到4.6，获得了市场的广泛认可。

这个项目不仅锻炼了我的产品策划能力，更重要的是提升了我在团队协作、数据驱动决策和用户体验设计方面的专业技能，为我未来在产品管理领域的发展奠定了坚实基础。`;
    } else if (questionType.includes('介绍') || questionType.includes('自我')) {
        return `我是一名具有5年${position}经验的专业人士，主要在${city}地区发展。在职业生涯中，我专注于用户体验设计和产品策略规划，在多个成功项目中担任核心角色。

专业背景：我拥有计算机科学学士学位，并持续学习最新的行业技术和方法论。在过去的工作中，我成功领导了多个跨职能团队，具备优秀的沟通协调能力和问题解决能力。

核心技能：包括产品生命周期管理、用户研究、数据分析、敏捷开发方法、团队领导和项目管理。我熟练使用各种产品设计和分析工具，能够从用户需求到技术实现进行全链路思考。

职业成就：在之前的公司中，我负责的产品线年收入增长了60%，用户满意度始终保持在行业领先水平。我还建立了完善的产品评估体系，大幅提升了团队的工作效率。

我相信我的专业技能和实践经验能够为贵公司带来价值，期待能够在新的平台上继续我的职业发展。`;
    } else {
        return generateDefaultAnswer(city, position, questionType, tone, 'chinese');
    }
}

// 生成英文答案
function generateEnglishAnswer(city, position, questionType, tone) {
    if (questionType.includes('项目') || questionType.includes('经验')) {
        return `During my tenure as a ${position} at a leading tech company in ${city}, I spearheaded a revolutionary mobile application project that significantly enhanced user experience and business value. This project took 8 months from conception to launch, involving cross-departmental collaboration and complex technical challenges.

Project Background: We identified high user churn rates in our existing product. Through comprehensive user research and data analysis, I pinpointed key pain points in user experience optimization. I developed a detailed product roadmap, clearly defining core feature priorities and milestone objectives.

Execution Process: I collaborated closely with the design team to establish new interaction design standards and worked with the engineering team to evaluate technical solutions, ensuring feature feasibility. I also implemented an agile development process with bi-weekly iteration reviews to adjust product direction promptly.

Project Results: Within 6 months post-launch, user retention increased by 40%, daily active users grew by 35%, and in-app conversion rates improved by 25%. More importantly, user satisfaction scores increased from 3.2 to 4.6, earning widespread market recognition.

This project not only strengthened my product planning capabilities but also enhanced my professional skills in team collaboration, data-driven decision making, and user experience design, laying a solid foundation for my future development in product management.`;
    } else if (questionType.includes('介绍') || questionType.includes('自我')) {
        return `I am a professional ${position} with 5 years of experience, primarily developing my career in ${city}. Throughout my career, I have focused on user experience design and product strategy planning, serving key roles in multiple successful projects.

Professional Background: I hold a Bachelor's degree in Computer Science and continuously learn the latest industry technologies and methodologies. In my previous work, I have successfully led multiple cross-functional teams, demonstrating excellent communication, coordination, and problem-solving abilities.

Core Skills: Including product lifecycle management, user research, data analysis, agile development methodologies, team leadership, and project management. I am proficient in various product design and analysis tools, capable of full-cycle thinking from user requirements to technical implementation.

Professional Achievements: In my previous company, the product line I managed achieved 60% annual revenue growth, with user satisfaction consistently maintaining industry-leading levels. I also established a comprehensive product evaluation system, significantly improving team efficiency.

I believe my professional skills and practical experience can bring substantial value to your company, and I look forward to continuing my career development on this new platform.`;
    } else {
        return generateDefaultAnswer(city, position, questionType, tone, 'english');
    }
}

// 生成默认答案
function generateDefaultAnswer(city, position, questionType, tone, language) {
    if (language === 'chinese') {
        return `关于${questionType}的问题，基于我在${city}担任${position}的经验，我认为这是一个很有意义的话题。在我的职业发展过程中，我始终秉持专业、负责的态度，不断学习和成长。

我的经验告诉我，成功的关键在于持续学习、团队协作和用户导向的思维方式。无论面对什么挑战，我都会以积极的心态去应对，并从中汲取宝贵的经验教训。

我相信每个挑战都是成长的机会，每次合作都是学习的过程。这种心态帮助我在职业道路上不断进步，也让我能够为团队和公司创造更大的价值。

未来，我希望能够继续在这个领域深耕，为行业发展贡献自己的力量，同时也期待在新的环境中获得更多的成长机会。`;
    } else {
        return `Regarding the question about ${questionType}, based on my experience as a ${position} in ${city}, I believe this is a very meaningful topic. Throughout my professional development, I have always maintained a professional and responsible attitude, continuously learning and growing.

My experience has taught me that the key to success lies in continuous learning, team collaboration, and user-oriented thinking. No matter what challenges I face, I approach them with a positive attitude and extract valuable lessons from them.

I believe every challenge is an opportunity for growth, and every collaboration is a learning process. This mindset has helped me continuously improve in my career path and enables me to create greater value for teams and companies.

In the future, I hope to continue developing in this field, contributing to industry advancement while looking forward to more growth opportunities in new environments.`;
    }
}

// 格式化答案
function formatAnswer(text) {
    // 将文本分段并格式化
    const paragraphs = text.split('\n\n');
    return paragraphs.map(para => {
        // 处理加粗文本
        const formattedPara = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<p>${formattedPara}</p>`;
    }).join('');
}

// 添加打字机效果
function addTypewriterEffect() {
    const elements = document.querySelectorAll('.answer-card p');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 复制文本功能 - 全局函数
window.copyText = function(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('复制成功！', 'success');
    }).catch(() => {
        // 备用复制方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showToast('复制成功！', 'success');
    });
}

// 保存答案 - 全局函数
window.saveAnswer = function() {
    const data = {
        question: currentQuestion,
        tone: currentTone,
        chineseAnswer: chineseAnswer.innerText,
        englishAnswer: englishAnswer.innerText,
        timestamp: new Date().toISOString()
    };
    
    // 保存到localStorage
    const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers') || '[]');
    savedAnswers.unshift(data);
    
    // 限制保存数量
    if (savedAnswers.length > 50) {
        savedAnswers.splice(50);
    }
    
    localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));
    showToast('保存成功！', 'success');
}

// 重新生成答案 - 全局函数
window.regenerateAnswer = function() {
    showToast('正在重新生成...', 'info');
    
    // 添加loading效果
    const answers = document.querySelectorAll('.answer-card');
    answers.forEach(answer => {
        answer.style.opacity = '0.5';
        answer.style.pointerEvents = 'none';
    });
    
    setTimeout(() => {
        generateAnswers();
        answers.forEach(answer => {
            answer.style.opacity = '1';
            answer.style.pointerEvents = 'auto';
        });
        showToast('重新生成完成！', 'success');
    }, 2000);
}

// 分享答案 - 全局函数
window.shareAnswer = function() {
    if (navigator.share) {
        navigator.share({
            title: '包你过面试 - AI生成的面试回答',
            text: `问题：${currentQuestion}\n\n${chineseAnswer.innerText.substring(0, 100)}...`,
            url: window.location.href
        }).then(() => {
            showToast('分享成功！', 'success');
        });
    } else {
        // 备用分享方法
        const shareText = `问题：${currentQuestion}\n\n${chineseAnswer.innerText}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('答案已复制到剪贴板，可以分享了！', 'success');
        });
    }
}

// 显示提示信息
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // 设置不同类型的样式
    const toastDiv = toast.querySelector('div');
    toastDiv.className = 'px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2';
    
    switch (type) {
        case 'success':
            toastDiv.classList.add('bg-green-600', 'text-white');
            break;
        case 'error':
            toastDiv.classList.add('bg-red-600', 'text-white');
            break;
        case 'info':
            toastDiv.classList.add('bg-blue-600', 'text-white');
            break;
        default:
            toastDiv.classList.add('bg-gray-600', 'text-white');
    }
    
    // 显示动画
    toast.style.transform = 'translateX(0)';
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
    }, 3000);
}

// 添加页面动画
function addPageAnimations() {
    // 页面加载动画
    const elements = document.querySelectorAll('.card-gradient, .answer-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
}

// 添加相关推荐点击事件
document.addEventListener('click', function(e) {
    if (e.target.closest('.card-gradient h4')) {
        const questionCard = e.target.closest('.card-gradient');
        const newQuestion = questionCard.querySelector('h4').textContent;
        
        // 跳转到新问题
        const params = new URLSearchParams({
            question: `北京，产品经理，${newQuestion}`,
            tone: currentTone,
            timestamp: Date.now()
        });
        
        window.location.href = `result.html?${params.toString()}`;
    }
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + C 复制中文答案
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.target.closest('input, textarea')) {
        e.preventDefault();
        copyText('chinese-answer');
    }
    
    // Ctrl/Cmd + S 保存答案
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveAnswer();
    }
    
    // R键重新生成
    if (e.key === 'r' || e.key === 'R') {
        regenerateAnswer();
    }
}); 
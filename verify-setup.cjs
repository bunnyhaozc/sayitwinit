#!/usr/bin/env node

/**
 * Stagewise 集成验证脚本
 * 检查项目中 stagewise 工具栏的集成状态
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 正在验证 Stagewise 集成状态...\n');

// 检查项目文件
const checks = [
    {
        name: 'package.json 中的 stagewise 依赖',
        check: () => {
            const packagePath = path.join(__dirname, 'package.json');
            if (!fs.existsSync(packagePath)) return false;
            
            const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            return packageContent.devDependencies && packageContent.devDependencies['@stagewise/toolbar'];
        }
    },
    {
        name: 'stagewise 配置文件',
        check: () => fs.existsSync(path.join(__dirname, 'stagewise.config.js'))
    },
    {
        name: '备选开发工具栏',
        check: () => fs.existsSync(path.join(__dirname, 'dev-toolbar.js'))
    },
    {
        name: 'index.html 中的工具栏集成',
        check: () => {
            const indexPath = path.join(__dirname, 'index.html');
            if (!fs.existsSync(indexPath)) return false;
            
            const content = fs.readFileSync(indexPath, 'utf8');
            return content.includes('dev-toolbar.js') && content.includes('script.js');
        }
    },
    {
        name: 'result.html 中的工具栏集成',
        check: () => {
            const resultPath = path.join(__dirname, 'result.html');
            if (!fs.existsSync(resultPath)) return false;
            
            const content = fs.readFileSync(resultPath, 'utf8');
            return content.includes('dev-toolbar.js') && content.includes('initializeStagewise');
        }
    },
    {
        name: 'script.js 中的初始化逻辑',
        check: () => {
            const scriptPath = path.join(__dirname, 'script.js');
            if (!fs.existsSync(scriptPath)) return false;
            
            const content = fs.readFileSync(scriptPath, 'utf8');
            return content.includes('initializeStagewise') && content.includes('window.process');
        }
    },
    {
        name: 'node_modules 中的 stagewise 包',
        check: () => fs.existsSync(path.join(__dirname, 'node_modules', '@stagewise', 'toolbar'))
    }
];

let passedChecks = 0;
let totalChecks = checks.length;

checks.forEach((check, index) => {
    const result = check.check();
    const icon = result ? '✅' : '❌';
    const status = result ? '通过' : '失败';
    
    console.log(`${icon} ${check.name}: ${status}`);
    
    if (result) passedChecks++;
});

console.log(`\n📊 检查结果: ${passedChecks}/${totalChecks} 项通过`);

if (passedChecks === totalChecks) {
    console.log('🎉 所有检查都通过了！Stagewise 集成完成。');
    console.log('\n🚀 使用方法:');
    console.log('1. 运行 npm run dev');
    console.log('2. 访问 http://localhost:8080');
    console.log('3. 在开发模式下查看工具栏');
    console.log('\n💡 注意: process 错误已修复，工具栏应该正常工作');
} else {
    console.log('\n⚠️  一些检查失败了，请检查集成配置。');
    
    if (!fs.existsSync(path.join(__dirname, 'node_modules', '@stagewise', 'toolbar'))) {
        console.log('\n💡 建议运行: npm install');
    }
}

console.log('\n📝 详细文档: 查看 STAGEWISE_SETUP.md'); 
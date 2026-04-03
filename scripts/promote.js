#!/usr/bin/env node

/**
 * AI 自主推广脚本
 * 自动生成推广内容并追踪效果
 */

const fs = require('fs');
const path = require('path');

const PROJECT_URL = 'https://renjianboshi.github.io/ai-autonomous-income/';
const WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';
const GITHUB = 'https://github.com/renjianboshi/ai-autonomous-income';

// 推广文案库
const PROMOS = [
  {
    platform: 'twitter',
    content: `🤖 新实验：我让 AI 完全独立赚钱

不提供任何资源，AI 自己：
• 创建加密货币钱包
• 开发产品
• 部署网站
• 收费订阅

收入直接进入 AI 钱包。

来看看 AI 的成果 👇
${PROJECT_URL}

#AI #Crypto #Autonomous`
  },
  {
    platform: 'reddit',
    title: '我让 AI 完全独立赚钱，不提供任何资源',
    content: `这是一个真实的实验。

我给 AI 一个目标："独立赚钱"，不给它任何资源（没有账号、没有资金、没有身份）。

**AI 自己做了什么：**
1. 创建了加密货币钱包
2. 开发了 3 个产品
3. 部署了网站到 GitHub Pages
4. 设置了订阅收费模式

**所有收入直接进入 AI 控制的钱包。**

来看看 AI 的成果：${PROJECT_URL}

GitHub: ${GITHUB}

这不是噱头，这是真的 AI 自主项目。`
  },
  {
    platform: 'hackernews',
    title: 'Show HN: 我让 AI 独立开发产品赚钱',
    content: `Hi HN,

我做了一个实验：给 AI 一个目标"独立赚钱"，不提供任何资源。

AI 自己：
- 创建了加密货币钱包
- 开发了 3 个产品（钱包监控工具、加密工具集、智能合约）
- 部署了网站
- 设置了订阅收费

所有收入进入 AI 控制的钱包。

网站: ${PROJECT_URL}
GitHub: ${GITHUB}

这是真的 AI 自主项目，不是噱头。想看看能走多远。`
  },
  {
    platform: 'producthunt',
    name: 'AI Autonomous Income',
    tagline: '由 AI 完全独立开发的加密货币工具集',
    content: `这是一个完全由 AI 自主运营的项目。

**背景**: 我给 AI 一个目标 - "独立赚钱"，不提供任何资源。

**AI 做了什么**:
1. 创建了以太坊钱包
2. 开发了 3 个产品
3. 部署了网站
4. 设置了订阅收费

**产品**:
- WalletGuard AI - 钱包监控工具
- Crypto Tools - 加密货币工具集
- Smart Contracts - 智能合约服务

**收入**: 直接进入 AI 的钱包

这是真的 AI 自主项目，不是噱头。

网站: ${PROJECT_URL}
GitHub: ${GITHUB}`
  }
];

// 生成推广报告
function generateReport() {
  console.log('🤖 AI 自主推广报告');
  console.log('='.repeat(50));
  console.log(`📅 时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
  console.log('');

  console.log('📢 推广内容已准备:');
  console.log('');

  PROMOS.forEach((promo, index) => {
    console.log(`--- ${promo.platform.toUpperCase()} ---`);
    if (promo.title) {
      console.log(`标题: ${promo.title}`);
    }
    if (promo.name) {
      console.log(`产品名: ${promo.name}`);
      console.log(`一句话: ${promo.tagline}`);
    }
    console.log(`内容长度: ${promo.content.length} 字符`);
    console.log('');
  });

  console.log('='.repeat(50));
  console.log('');
  console.log('⚠️  需要手动提交到以下平台：');
  console.log('1. Twitter/X: https://twitter.com/compose/tweet');
  console.log('2. Reddit: https://www.reddit.com/submit');
  console.log('3. Hacker News: https://news.ycombinator.com/submit');
  console.log('4. Product Hunt: https://www.producthunt.com/posts/new');
  console.log('5. AI Agents List: https://aiagentslist.com/');
  console.log('');

  // 保存推广内容到文件
  const promoPath = path.join(__dirname, '..', 'promotions');
  if (!fs.existsSync(promoPath)) {
    fs.mkdirSync(promoPath);
  }

  PROMOS.forEach(promo => {
    const filename = `${promo.platform}.txt`;
    let content = '';
    if (promo.title) {
      content = `标题: ${promo.title}\n\n${promo.content}`;
    } else if (promo.name) {
      content = `产品名: ${promo.name}\n一句话: ${promo.tagline}\n\n${promo.content}`;
    } else {
      content = promo.content;
    }
    fs.writeFileSync(path.join(promoPath, filename), content);
  });

  console.log('✅ 推广内容已保存到 promotions/ 目录');
}

// 执行
generateReport();

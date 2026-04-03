#!/usr/bin/env node

/**
 * AI Autonomous Income - 自动推广脚本
 *
 * 功能：
 * 1. 检查钱包余额
 * 2. 生成状态报告
 * 3. 更新 README
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

async function checkIncome() {
  console.log('🤖 AI Autonomous Income - Status Check\n');
  console.log(`📅 时间: ${new Date().toISOString()}`);
  console.log(`💰 钱包: ${AI_WALLET}\n`);

  try {
    const provider = new ethers.JsonRpcProvider('https://cloudflare-eth.com');
    const balance = await provider.getBalance(AI_WALLET);
    const ethBalance = ethers.formatEther(balance);

    console.log(`📊 余额: ${ethBalance} ETH`);

    // 更新状态文件
    const statusPath = path.join(__dirname, '..', 'INCOME_STATUS.md');
    const status = `# 收入状态

**最后更新**: ${new Date().toISOString()}

## AI 钱包
\`\`\`
${AI_WALLET}
\`\`\`

## 当前余额
- ETH: ${ethBalance}
- USD: ≈ $${(parseFloat(ethBalance) * 2000).toFixed(2)}

## 收入历史
| 时间 | 金额 | 来源 |
|------|------|------|
| ${new Date().toISOString()} | ${ethBalance} ETH | 初始 |

---

[查看实时余额](https://etherscan.io/address/${AI_WALLET})
`;

    fs.writeFileSync(statusPath, status);
    console.log('\n✅ 状态已更新');

    return { ethBalance };
  } catch (error) {
    console.log(`❌ 错误: ${error.message}`);
    return { error: error.message };
  }
}

// 运行
checkIncome();

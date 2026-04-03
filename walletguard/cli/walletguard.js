#!/usr/bin/env node

/**
 * WalletGuard AI CLI
 * 智能钱包监控命令行工具
 *
 * 使用方式:
 *   npx walletguard-ai <wallet-address>
 *   npx walletguard-ai <wallet-address> --multichain
 *   npx walletguard-ai <wallet-address> --monitor
 *
 * 收费: Pro 功能 $9.9/月
 * AI 钱包: 0x4Ea729CE04e809623BF72012aF71550703Ce7d9D
 */

const { ethers } = require('ethers');
const { checkMultiChain } = require('./advanced');
const { startMonitor } = require('./monitor');

const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

// 彩色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 单链查询
async function checkBalance(address) {
  // 使用 Cloudflare 的免费 Ethereum 网关
  const provider = new ethers.JsonRpcProvider('https://cloudflare-eth.com');

  try {
    log('cyan', '\n🔍 正在查询钱包信息...\n');

    const balance = await provider.getBalance(address);
    const ethBalance = ethers.formatEther(balance);
    const txCount = await provider.getTransactionCount(address);

    log('green', '═══════════════════════════════════════════');
    log('green', '       🛡️  WalletGuard AI 分析报告');
    log('green', '═══════════════════════════════════════════\n');

    log('blue', `📍 钱包地址: ${address}`);
    log('yellow', `💰 ETH 余额: ${parseFloat(ethBalance).toFixed(4)} ETH`);
    log('blue', `📊 交易数量: ${txCount} 笔`);

    // 风险分析
    log('cyan', '\n--- 风险分析 ---');

    if (parseFloat(ethBalance) > 10) {
      log('yellow', '⚠️  高价值钱包，建议启用高级监控');
    } else if (parseFloat(ethBalance) > 1) {
      log('blue', '✅ 中等价值钱包');
    } else {
      log('green', '✅ 低价值钱包');
    }

    if (txCount > 100) {
      log('blue', '📊 活跃钱包，交易频繁');
    } else if (txCount > 10) {
      log('blue', '📊 正常活跃度');
    } else {
      log('green', '📊 低活跃度钱包');
    }

    // Pro 功能提示
    log('cyan', '\n--- Pro 功能 (订阅解锁) ---');
    log('yellow', '🔒 交易历史分析');
    log('yellow', '🔒 代币持仓详情');
    log('yellow', '🔒 智能风险预警');
    log('yellow', '🔒 实时监控通知');

    log('cyan', '\n═══════════════════════════════════════════');
    log('green', '💡 升级 Pro: $9.9/月');
    log('green', `💳 支付地址: ${AI_WALLET}`);
    log('cyan', '═══════════════════════════════════════════\n');

  } catch (error) {
    log('red', `❌ 错误: ${error.message}`);
  }
}

// 解析参数
const args = process.argv.slice(2);
const address = args.find(arg => arg.startsWith('0x'));
const isMultichain = args.includes('--multichain') || args.includes('-m');
const isMonitor = args.includes('--monitor') || args.includes('-w');

// 显示帮助
if (!address) {
  log('yellow', '\n用法: npx walletguard-ai <钱包地址> [选项]\n');
  log('cyan', '选项:');
  log('blue', '  --multichain, -m    查询多链余额');
  log('blue', '  --monitor, -w       实时监控模式 (Pro)\n');
  log('cyan', '示例:');
  log('blue', '  npx walletguard-ai 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  log('blue', '  npx walletguard-ai 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 --multichain');
  log('blue', '  npx walletguard-ai 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 --monitor\n');
  process.exit(0);
}

if (!ethers.isAddress(address)) {
  log('red', '\n❌ 无效的以太坊地址\n');
  process.exit(1);
}

// 多链查询
if (isMultichain) {
  checkMultiChain(address).catch(err => log('red', `❌ 错误: ${err.message}`));
} else if (isMonitor) {
  // 监控模式
  startMonitor(address).catch(err => log('red', `❌ 错误: ${err.message}`));
} else {
  // 默认：单链查询
  checkBalance(address);
}

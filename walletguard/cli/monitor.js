/**
 * WalletGuard AI - 持续监控模块
 * 监控钱包交易并实时提醒
 */

const { ethers } = require('ethers');

const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

async function startMonitor(address, intervalMs = 60000) {
  console.log('\n🛡️  WalletGuard AI - 实时监控模式');
  console.log('═══════════════════════════════════════════\n');
  console.log(`📍 监控地址: ${address}`);
  console.log(`⏱️  检查间隔: ${intervalMs / 1000} 秒`);
  console.log(`\n⚠️  注意: 这是 Pro 功能`);
  console.log(`💳 订阅 Pro: $9.9/月，支付到 ${AI_WALLET}\n`);
  console.log('按 Ctrl+C 停止监控\n');
  console.log('═══════════════════════════════════════════\n');

  const rpcs = [
    'https://ethereum.publicnode.com',
    'https://rpc.ankr.com/eth',
  ];

  const rpc = rpcs[Math.floor(Math.random() * rpcs.length)];
  const provider = new ethers.JsonRpcProvider(rpc);

  let lastBlock = await provider.getBlockNumber();
  let lastBalance = await provider.getBalance(address);

  console.log(`📊 初始区块: ${lastBlock}`);
  console.log(`💰 初始余额: ${ethers.formatEther(lastBalance)} ETH\n`);

  setInterval(async () => {
    try {
      const currentBlock = await provider.getBlockNumber();
      const currentBalance = await provider.getBalance(address);

      if (currentBlock > lastBlock) {
        console.log(`[${new Date().toISOString()}] 区块 ${currentBlock} - 余额: ${ethers.formatEther(currentBalance)} ETH`);
        lastBlock = currentBlock;
      }

      if (currentBalance !== lastBalance) {
        const diff = ethers.formatEther(currentBalance - lastBalance);
        console.log(`\n🔔 余额变化检测! ${diff} ETH`);

        if (currentBalance > lastBalance) {
          console.log('📥 收到转账');
        } else {
          console.log('📤 发出转账');
        }

        lastBalance = currentBalance;
      }
    } catch (error) {
      console.log(`⚠️  检查失败: ${error.message}`);
    }
  }, intervalMs);
}

module.exports = { startMonitor };

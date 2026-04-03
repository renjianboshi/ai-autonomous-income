/**
 * WalletGuard AI - 多链支持模块
 * 支持 Ethereum, Polygon, Arbitrum, Optimism
 */

const { ethers } = require('ethers');

const CHAINS = {
  ethereum: {
    name: 'Ethereum Mainnet',
    rpcs: [
      'https://ethereum.publicnode.com',
      'https://rpc.ankr.com/eth',
    ],
    symbol: 'ETH',
    explorer: 'https://etherscan.io'
  },
  polygon: {
    name: 'Polygon',
    rpcs: [
      'https://polygon-rpc.com',
      'https://rpc.ankr.com/polygon',
    ],
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com'
  },
  arbitrum: {
    name: 'Arbitrum One',
    rpcs: [
      'https://arb1.arbitrum.io/rpc',
      'https://rpc.ankr.com/arbitrum',
    ],
    symbol: 'ETH',
    explorer: 'https://arbiscan.io'
  },
  optimism: {
    name: 'Optimism',
    rpcs: [
      'https://mainnet.optimism.io',
      'https://rpc.ankr.com/optimism',
    ],
    symbol: 'ETH',
    explorer: 'https://optimistic.etherscan.io'
  }
};

async function checkMultiChain(address) {
  console.log('\n🔍 正在查询多链余额...\n');
  console.log('═══════════════════════════════════════════');
  console.log('       🛡️  WalletGuard AI 多链分析');
  console.log('═══════════════════════════════════════════\n');

  const results = [];

  for (const [chainId, chain] of Object.entries(CHAINS)) {
    try {
      const rpc = chain.rpcs[Math.floor(Math.random() * chain.rpcs.length)];
      const provider = new ethers.JsonRpcProvider(rpc);

      const balance = await provider.getBalance(address);
      const formatted = ethers.formatEther(balance);

      results.push({
        chain: chain.name,
        symbol: chain.symbol,
        balance: formatted,
        explorer: chain.explorer
      });

      console.log(`✅ ${chain.name}: ${parseFloat(formatted).toFixed(4)} ${chain.symbol}`);
    } catch (error) {
      console.log(`❌ ${chain.name}: 查询失败`);
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('💡 查看详细交易历史，请订阅 Pro ($9.9/月)');
  console.log('💳 支付地址: 0x4Ea729CE04e809623BF72012aF71550703Ce7d9D');
  console.log('═══════════════════════════════════════════\n');

  return results;
}

module.exports = { checkMultiChain, CHAINS };

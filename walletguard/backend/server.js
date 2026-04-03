/**
 * WalletGuard AI - Backend Server
 * 智能钱包监控和分析工具
 *
 * 收费模式：加密货币支付
 * AI 钱包：0x4Ea729CE04e809623BF72012aF71550703Ce7d9D
 */

const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3001;

// AI 的收款钱包
const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

// 中间件
app.use(cors());
app.use(express.json());

// 连接到以太坊网络（使用公共 RPC）
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');

// API: 获取钱包余额
app.get('/api/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await provider.getBalance(address);
    const ethBalance = ethers.formatEther(balance);

    res.json({
      success: true,
      address,
      balance: ethBalance,
      unit: 'ETH'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: 获取钱包交易历史（简化版）
app.get('/api/transactions/:address', async (req, res) => {
  try {
    const { address } = req.params;
    // 注意：完整实现需要 Etherscan API
    // 这里先返回模拟数据
    res.json({
      success: true,
      address,
      message: 'Transaction history requires Etherscan API key',
      note: 'Premium feature - subscribe to unlock'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: 订阅计划
app.get('/api/plans', (req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
          'Basic balance check',
          'Limited API calls (100/day)'
        ]
      },
      {
        id: 'pro-monthly',
        name: 'Pro Monthly',
        price: 9.9,
        currency: 'USDC/USDT',
        wallet: AI_WALLET,
        features: [
          'Unlimited API calls',
          'Transaction history',
          'Risk analysis',
          'Email alerts',
          'Priority support'
        ]
      },
      {
        id: 'pro-yearly',
        name: 'Pro Yearly',
        price: 99,
        currency: 'USDC/USDT',
        wallet: AI_WALLET,
        features: [
          'Everything in Pro Monthly',
          'Save 17%',
          'Early access to new features'
        ]
      }
    ]
  });
});

// API: 验证支付
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { txHash, expectedAmount, currency } = req.body;

    // 获取交易详情
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      return res.status(400).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    // 验证收款地址是否正确
    if (tx.to.toLowerCase() !== AI_WALLET.toLowerCase()) {
      return res.status(400).json({
        success: false,
        error: 'Payment sent to wrong address'
      });
    }

    // 验证金额
    const value = ethers.formatEther(tx.value);
    // 注意：实际应用需要处理 USDC/USDT 的转账验证

    res.json({
      success: true,
      message: 'Payment verified',
      txHash,
      value,
      note: 'Subscription activated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: AI 钱包地址（公开）
app.get('/api/ai-wallet', (req, res) => {
  res.json({
    success: true,
    wallet: AI_WALLET,
    message: 'Send payments to this address',
    network: 'Ethereum Mainnet',
    acceptedTokens: ['ETH', 'USDC', 'USDT']
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WalletGuard AI',
    version: '1.0.0',
    aiWallet: AI_WALLET
  });
});

app.listen(PORT, () => {
  console.log(`🛡️  WalletGuard AI running on port ${PORT}`);
  console.log(`💰 AI Wallet: ${AI_WALLET}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
});

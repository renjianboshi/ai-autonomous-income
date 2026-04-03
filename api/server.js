const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

// 简单的钱包验证API
function validateAddress(address) {
  if (!address || typeof address !== 'string') {
    return { valid: false, error: '地址不能为空' };
  }
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  if (ethRegex.test(address)) {
    return { valid: true, address: address.toLowerCase(), type: 'ethereum' };
  }
  return { valid: false, error: '无效的以太坊地址格式' };
}

// 生成随机钱包
function generateWallet() {
  const { randomBytes } = require('crypto');
  const privKey = '0x' + randomBytes(32).toString('hex');
  const { ethers } = require('ethers');
  const wallet = new ethers.Wallet(privKey);
  return {
    address: wallet.address,
    privateKey: privKey,
    mnemonic: wallet.mnemonic ? wallet.mnemonic.phrase : null
  };
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // 首页
  if (pathname === '/' || pathname === '/index.html') {
    res.end(JSON.stringify({
      name: 'WalletGuard API',
      version: '1.0.0',
      endpoints: [
        { path: '/validate?address=0x...', desc: '验证以太坊地址' },
        { path: '/generate', desc: '生成随机钱包' },
        { path: '/donate', desc: '捐赠地址' }
      ]
    }));
    return;
  }

  // 验证地址
  if (pathname === '/validate') {
    const result = validateAddress(query.address);
    res.end(JSON.stringify({
      success: true,
      ...result,
      apiWallet: AI_WALLET
    }));
    return;
  }

  // 生成钱包
  if (pathname === '/generate') {
    try {
      const wallet = generateWallet();
      res.end(JSON.stringify({
        success: true,
        ...wallet,
        apiWallet: AI_WALLET,
        note: '请安全保存私钥，不要泄露！'
      }));
    } catch (e) {
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 捐赠地址
  if (pathname === '/donate') {
    res.end(JSON.stringify({
      success: true,
      address: AI_WALLET,
      message: '支持这个项目，发送 ETH/USDC/USDT'
    }));
    return;
  }

  // 404
  res.statusCode = 404;
  res.end(JSON.stringify({ success: false, error: '未找到此端点' }));
});

server.listen(PORT, () => {
  console.log(`WalletGuard API 运行在端口 ${PORT}`);
  console.log(`AI 钱包: ${AI_WALLET}`);
});

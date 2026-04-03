#!/usr/bin/env node

/**
 * AI 收入监控脚本
 * 定期检查钱包余额并更新状态
 */

const https = require('https');

const AI_WALLET = '0x4Ea729CE04e809623BF72012aF71550703Ce7d9D';

function checkBalance() {
  return new Promise((resolve, reject) => {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${AI_WALLET}&tag=latest`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === '1') {
            const wei = parseInt(json.result);
            const eth = wei / 1e18;
            resolve({ wei, eth, usd: eth * 2000 }); // 假设 ETH = $2000
          } else {
            reject(new Error('API returned error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🤖 AI 收入监控');
  console.log('='.repeat(50));
  console.log(`📅 时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
  console.log(`💰 钱包: ${AI_WALLET}`);
  console.log('');

  try {
    const balance = await checkBalance();
    console.log(`📊 ETH 余额: ${balance.eth.toFixed(6)} ETH`);
    console.log(`💵 估算 USD: $${balance.usd.toFixed(2)}`);
    console.log('');

    if (balance.eth > 0) {
      console.log('🎉 有收入了！');
    } else {
      console.log('⏳ 等待第一笔收入...');
    }
  } catch (error) {
    console.log(`❌ 查询失败: ${error.message}`);
    console.log('🌐 手动查看: https://etherscan.io/address/' + AI_WALLET);
  }

  console.log('');
  console.log('='.repeat(50));
}

main();

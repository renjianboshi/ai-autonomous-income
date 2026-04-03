const { Wallet } = require('ethers');

// 生成新钱包
const wallet = Wallet.createRandom();

console.log('=== 以太坊钱包信息 ===');
console.log('地址:', wallet.address);
console.log('私钥:', wallet.privateKey);
console.log('');
console.log('⚠️  警告: 请安全保存私钥，不要泄露给任何人！');
console.log('⚠️  这个钱包由 AI 自主控制，用于接收收入。');

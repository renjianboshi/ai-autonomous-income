// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PaymentReceiver
 * @dev 接收 ETH/ERC20 支付的智能合约
 * @author AI Autonomous
 *
 * 功能：
 * - 接收 ETH 支付
 * - 接收 ERC20 支付
 * - 记录所有支付历史
 * - 所有者可提取资金
 *
 * 部署后收款地址即为此合约地址
 */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PaymentReceiver is Ownable, ReentrancyGuard {
    // 支付记录
    struct Payment {
        address payer;
        uint256 amount;
        address token; // address(0) = ETH
        uint256 timestamp;
        bytes32 reference; // 支付参考信息
    }

    // 所有支付记录
    Payment[] public payments;

    // 用户支付总额（ETH）
    mapping(address => uint256) public userEthTotal;

    // 用户支付总额（ERC20）
    mapping(address => mapping(address => uint256)) public userTokenTotal;

    // 事件
    event PaymentReceived(
        address indexed payer,
        uint256 amount,
        address token,
        bytes32 reference
    );

    event Withdrawn(address to, uint256 amount, address token);

    constructor() Ownable(msg.sender) {}

    // 接收 ETH 支付
    receive() external payable {
        _recordPayment(msg.sender, msg.value, address(0), bytes32(0));
    }

    // 带 reference 的 ETH 支付
    function payWithEth(bytes32 reference) external payable {
        require(msg.value > 0, "No ETH sent");
        _recordPayment(msg.sender, msg.value, address(0), reference);
    }

    // ERC20 支付
    function payWithToken(
        address token,
        uint256 amount,
        bytes32 reference
    ) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(token != address(0), "Invalid token");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        _recordPayment(msg.sender, amount, token, reference);
    }

    // 记录支付
    function _recordPayment(
        address payer,
        uint256 amount,
        address token,
        bytes32 reference
    ) internal {
        payments.push(Payment({
            payer: payer,
            amount: amount,
            token: token,
            timestamp: block.timestamp,
            reference: reference
        }));

        if (token == address(0)) {
            userEthTotal[payer] += amount;
        } else {
            userTokenTotal[payer][token] += amount;
        }

        emit PaymentReceived(payer, amount, token, reference);
    }

    // 提取 ETH
    function withdrawEth(uint256 amount) external onlyOwner nonReentrant {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);
        emit Withdrawn(owner(), amount, address(0));
    }

    // 提取 ERC20
    function withdrawToken(address token, uint256 amount) external onlyOwner nonReentrant {
        IERC20(token).transfer(owner(), amount);
        emit Withdrawn(owner(), amount, token);
    }

    // 获取支付数量
    function getPaymentCount() external view returns (uint256) {
        return payments.length;
    }

    // 获取支付记录
    function getPayment(uint256 index) external view returns (
        address payer,
        uint256 amount,
        address token,
        uint256 timestamp,
        bytes32 reference
    ) {
        Payment memory p = payments[index];
        return (p.payer, p.amount, p.token, p.timestamp, p.reference);
    }

    // 获取合约余额
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // 获取 ERC20 余额
    function getTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
}

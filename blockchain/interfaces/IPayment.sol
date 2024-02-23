// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPayment {
    struct Payment {
        uint256 amount;
        address recipient;
        address tokenAddress;
        bool isPaid;
    }

    event PaymentCreated(
        uint256 indexed paymentId,
        uint256 amount,
        address indexed tokenAddress,
        address indexed recipient
    );
    event PaymentCompleted(
        uint256 indexed paymentId,
        address indexed recipient
    );
    event FundsDeposited(address indexed token, uint256 amount);
    event CampaignEnded(uint256 indexed id);

    function createPayment(
        address _recipient,
        uint256 _amount,
        address _tokenAddress
    ) external;

    function executePayment(uint256 _paymentId) external;

    function refundUnusedFunds(uint256 proposalId) external;

    function getPayment(
        uint256 _paymentId
    ) external view returns (Payment memory);

    function getBalance(address tokenAddress) external view returns (uint256);

    // Include any other public or external functions or events as needed
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/IPayment.sol";
import "../interfaces/IAdvertisment.sol";

struct Log {
    uint256 index; // Index of the log in the block
    uint256 timestamp; // Timestamp of the block containing the log
    bytes32 txHash; // Hash of the transaction containing the log
    uint256 blockNumber; // Number of the block containing the log
    bytes32 blockHash; // Hash of the block containing the log
    address source; // Address of the contract that emitted the log
    bytes32[] topics; // Indexed topics of the log
    bytes data; // Data of the log
}

interface ILogAutomation {
    function checkLog(
        Log calldata log,
        bytes memory checkData
    ) external returns (bool upkeepNeeded, bytes memory performData);

    function performUpkeep(bytes calldata performData) external;
}

contract MilestonePaymentKeeper is ILogAutomation {
    IPayment public paymentContract;
    IAdvertisment public advertismentContract;

    uint256 public counted = 0;

    constructor(
        address _paymentContractAddress,
        address _advertismentContractAddress
    ) {
        paymentContract = IPayment(_paymentContractAddress);
        advertismentContract = IAdvertisment(_advertismentContractAddress);
    }
    function checkLog(
        Log calldata log,
        bytes memory
    ) external pure returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = true;
        uint256 advertismentId = bytes32ToUint256(log.topics[1]);
        performData = abi.encode(advertismentId);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 advertismentId = abi.decode(performData, (uint256));
        IAdvertisment.Advertisment memory advertisment = advertismentContract
            .getAdvertisment(advertismentId);
        paymentContract.createPayment(
            advertisment.creator,
            advertisment.amountToBePaid,
            advertisment.token
        );
    }

    function bytes32ToUint256(bytes32 _uint) public pure returns (uint256) {
        return uint256(_uint);
    }
}

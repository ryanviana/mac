// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/IClickCountFunction.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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

contract ActiveAdsKeeper is ILogAutomation {
    //mocked values for fuji and chainlink functions
    bytes32 private constant DON_ID =
        0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;
    bytes private constant ENCRYPTED_SECRETS_URLS = "0x";
    uint8 private constant DON_HOSTED_SECRETS_SLOT_ID = 0;
    uint64 private constant DON_HOSTED_SECRETS_VERSION = 0;
    bytes[] private BYTES_ARGS = new bytes[](0);
    uint64 private constant SUBSCRIPTION_ID = 4235;
    uint32 private constant GAS_LIMIT = 300000;

    IClickCountFunction public clickCountFunction;

    uint256 public counted = 0;

    constructor(address _clickCountFunctionAddress) {
        clickCountFunction = IClickCountFunction(_clickCountFunctionAddress);
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
        // Convert uint256 to string
        uint256 advertismentId = abi.decode(performData, (uint256));
        string memory advertismentIdString = Strings.toString(advertismentId);
        string[] memory args = new string[](1);
        args[0] = advertismentIdString;

        clickCountFunction.sendRequest(
            ENCRYPTED_SECRETS_URLS,
            DON_HOSTED_SECRETS_SLOT_ID,
            DON_HOSTED_SECRETS_VERSION,
            args,
            BYTES_ARGS,
            SUBSCRIPTION_ID,
            GAS_LIMIT,
            DON_ID
        );
    }

    function bytes32ToUint256(bytes32 _uint) public pure returns (uint256) {
        return uint256(_uint);
    }
}

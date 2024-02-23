// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IClickCountFunction {
    // Function to send a simple request
    function sendRequest(
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external returns (bytes32 requestId);

    // Function to send a pre-encoded CBOR request
    function sendRequestCBOR(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external returns (bytes32 requestId);

    // Getter for retrieving the source
    function source() external view returns (string memory);

    // Getter for retrieving the last request ID
    function s_lastRequestId() external view returns (bytes32);

    // Getter for retrieving the last response
    function s_lastResponse() external view returns (bytes memory);

    // Getter for retrieving the last error
    function s_lastError() external view returns (bytes memory);

    // Getter for retrieving click counts
    function clicks(uint256 proposalId) external view returns (uint256);
}

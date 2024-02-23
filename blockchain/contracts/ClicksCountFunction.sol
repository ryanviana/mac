// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "../interfaces/IAdvertisment.sol";

contract ClickCountFunction is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    IAdvertisment public advertismentContract;

    string public source;
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // Mapping to store click count for each proposalId
    mapping(uint256 => uint256) public clicks;

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event MilestoneReached(uint256 indexed proposalId, uint256 amountToPay);

    constructor(
        address router,
        address _advertismentContractAddress,
        string memory _source
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        advertismentContract = IAdvertisment(_advertismentContractAddress);
        source = _source;
    }

    /**
     * @notice Send a simple request
     * @param encryptedSecretsUrls Encrypted URLs where to fetch user secrets
     * @param donHostedSecretsSlotID Don hosted secrets slotId
     * @param donHostedSecretsVersion Don hosted secrets version
     * @param args List of arguments accessible from within the source code
     * @param bytesArgs Array of bytes arguments, represented as hex strings
     * @param subscriptionId Billing ID
     */
    function sendRequest(
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    /**
     * @notice Send a pre-encoded CBOR request
     * @param request CBOR-encoded request data
     * @param subscriptionId Billing ID
     * @param gasLimit The maximum amount of gas the request can consume
     * @param donID ID of the job to be invoked
     * @return requestId The ID of the sent request
     */
    function sendRequestCBOR(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        s_lastRequestId = _sendRequest(
            request,
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    /**
     * @notice Store latest result/error
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        s_lastError = err;

        (uint256 currentClicksCount, uint256 advertismentId) = abi.decode(
            response,
            (uint256, uint256)
        );

        //GET ADS INFO

        IAdvertisment.Advertisment memory advertisment = advertismentContract
            .getAdvertisment(advertismentId);

        uint256 milestone = advertisment.milestoneThreshold;
        uint256 CPM = advertisment.CPM;

        // CALCULATE AMOUNT TO PAY

        uint256 lastClicksCount = clicks[advertismentId];
        uint256 unpaidClicks = lastClicksCount % milestone;
        uint256 newClicks = currentClicksCount - lastClicksCount;
        uint256 totalUnpaidClicks = unpaidClicks + newClicks;
        uint256 newMilestonesReached = totalUnpaidClicks / milestone;
        uint256 amountToPay = newMilestonesReached * CPM;

        //SET NEW INFO

        clicks[advertismentId] = currentClicksCount;

        advertismentContract.setClicks(advertismentId, currentClicksCount);
        advertismentContract.setAmountToBePaid(advertismentId, amountToPay);

        //EMIT LOGS

        emit MilestoneReached(advertismentId, amountToPay);
        emit Response(requestId, s_lastResponse, s_lastError);
    }
}

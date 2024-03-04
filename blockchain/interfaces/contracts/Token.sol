// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Token", "TTT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function mintToken(address _wallet, uint256 _tokenAmount) public {
        _mint(_wallet, _tokenAmount);
    }
}

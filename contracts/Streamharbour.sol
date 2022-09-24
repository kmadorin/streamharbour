// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Streamharbour {
    using SafeERC20 for IERC20;

    event DonationNative(address indexed from, address indexed to, uint256 amount, string message);
    event Donation(address indexed from, address indexed to, address indexed asset, uint256 amount, string message);

    function donate(address to, address asset, uint256 amount, string memory message) external {
        IERC20(asset).transferFrom(msg.sender, to, amount);
        emit Donation(msg.sender, to, asset, amount, message);
    }

    fallback() external payable {
        address _to;
        string memory _message;

        (_to, _message) = abi.decode(msg.data, (address, string));

        (bool _sent, bytes memory _data) = _to.call{value: msg.value}("");

        require(_sent, "Failed to send Ether");

        emit DonationNative(msg.sender, _to, msg.value, _message);
    }
}

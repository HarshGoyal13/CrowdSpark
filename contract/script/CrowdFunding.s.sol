// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CampingnDonater} from "../src/CrowdFunding.sol";

contract CounterScript is Script {
    CampingnDonater public donation;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        donation = new CampingnDonater();

        vm.stopBroadcast();
    }
}

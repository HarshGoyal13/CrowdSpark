// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CampingnDonater} from "../src/CrowdFunding.sol";

contract CampaignTest is Test {
    CampingnDonater public donator;
    address public donatorAddress = address(0x123); // Mock donator address for testing

    function setUp() public {
        donator = new CampingnDonater();
    }

    function test_createCampaign() public {
  
        donator.createCampign("Test Campaign", "Description", 300 ether, "image_url");

        // Retrieve all campaigns
        CampingnDonater.Campign[] memory campaigns = donator.getAllCampigns();
        
        // Assert that the campaign has been created

        assertEq(campaigns[0].title, "Test Campaign", "Campaign title mismatch");
        assertEq(campaigns[0].description, "Description", "Campaign description mismatch");
        assertEq(campaigns[0].target, 300 ether, "Campaign target mismatch");
        assertEq(campaigns[0].amountCollected, 0, "Initial amount collected should be 0");
        assertEq(campaigns[0].image, "image_url", "Campaign image mismatch");
    }

    function test_donateCampaign() public {
        uint256 donationAmount = 10 ether;
        // Give the donator some ether to make the donation
        vm.deal(donatorAddress, 10 ether);
        // Prank the donation from the donator address
        vm.prank(donatorAddress);
        donator.donateCampaign{value: donationAmount}(0);
    }

    function test_getAllCampaigns() public {

        donator.createCampign("Test Campaign", "Description", 300 ether, "image_url");

        // Retrieve all campaigns and assert the correct number
        CampingnDonater.Campign[] memory campaigns = donator.getAllCampigns();
        assertEq(campaigns.length, 1, "Expected one campaign");
        
        // Optionally, log details for debugging
        console.log("Campaign Title:", campaigns[0].title);
        console.log("Campaign Amount Collected:", campaigns[0].amountCollected);
    }
}

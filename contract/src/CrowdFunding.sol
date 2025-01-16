// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract CampingnDonater {

    struct Campign {
        uint256 _Id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    struct DonarImpact{
        address owner;
        string donarImpactImage;
        string donarImpactDescription;
    }

    mapping (uint => DonarImpact) public impact;
    mapping (uint256 => Campign) public campagins;

    modifier onGoingCampaign(uint256 id){
        require(campagins[id].deadline > block.timestamp, "Deadline has Croosed" );
        _;
    }
    modifier onlyOwner(uint256 id){
        require(campagins[id].owner == msg.sender, "You are not owner" );
        _;
    }

    event DonorImpactSet( address indexed owner, string impactDescription);
    event CampaignCreated(uint256 campaignId, address indexed owner, string impactDescription);
    event donate(uint256 campaignId, address indexed owner, address indexed donar);
    event ownerWithdraw(uint256 campaignId, address indexed owner, uint amount);

    uint256 public nextCampingId = 0;
    uint256 public nextImpactId = 0;


    function createCampign( string memory _title, string memory _description, uint256 _target , string memory _image) public {

        Campign storage campign = campagins[nextCampingId];

        campign.owner = msg.sender;
        campign._Id = nextCampingId;
        campign.title = _title;
        campign.description = _description;
        campign.target = _target;
        campign.deadline = block.timestamp + 7 * 24 * 60 * 60; // 7 days in seconds

        campign.image = _image;

        nextCampingId++;

        emit CampaignCreated(nextCampingId-1, msg.sender, _description);

    }

function donateCampaign(uint256 id) public payable  {
    uint256 donationAmount = msg.value;
    Campign storage campaign = campagins[id];
    require(campagins[id].deadline > block.timestamp, "Deadline has Croosed" );
    require(donationAmount > 0, "Donation amount must be greater than zero");


   
    (bool success, ) = payable(address(this)).call{value: donationAmount}("");
    require(success, "Failed to transfer donation to the owner");
 
   
    campaign.donators.push(msg.sender);
    campaign.donations.push(donationAmount);

campaign.amountCollected += msg.value;
  
    emit donate(id, campaign.owner, msg.sender);
}


function refundSpecific(uint256 campaignId) public {
    Campign storage campaign = campagins[campaignId]; // Get the campaign by ID
    require(campaign.deadline < block.timestamp," Deadline not crossed");
    // Check if the user is a donor
    bool isDonator = false;
    uint donationAmount = 0;
    for (uint i = 0; i < campaign.donators.length; i++) {
        if (campaign.donators[i] == msg.sender) {
            isDonator = true;
            donationAmount = campaign.donations[i]; // Get the donation amount
            break;
        }
    }

    require(isDonator, "You are not a donor for this campaign"); // Ensure the caller is a donor
    require(donationAmount > 0, "No donation found for this address"); // Ensure there's an amount to refund


    payable(msg.sender).transfer(donationAmount);
}



    function getDonators(uint256 id) public view returns(address[] memory, uint[] memory)  {
        return (campagins[id].donators, campagins[id].donations );
    }
        


function getAllCampigns() public view returns(Campign[] memory) {
    Campign[] memory allCampign = new Campign[](nextCampingId);

    for(uint256 i = 0; i < nextCampingId; i++) {
        allCampign[i] = campagins[i];
    }
    return allCampign;
}
 
    
    function getCampaignStatus(uint256 id) public view returns (string memory) {
    Campign storage campagin = campagins[id];

    if (campagin.deadline < block.timestamp) {
        if (campagin.amountCollected >= campagin.target) {
            return "Campaign Successful";
        } else {
            return "Campaign Failed";
        }
    }
    return "Campaign Ongoing";
}



function setDonorImpactImage(address ownerAddress, string memory _image, string memory _impactDescription) public {
    bool campaignOwnerExists = false;

    // Check if the provided address is the owner of any campaign
    for (uint i = 0; i < nextCampingId; i++) {
        if (campagins[i].owner == ownerAddress) {
            campaignOwnerExists = true;
            break;
        }
    }

    // If the owner address is not associated with any campaign, revert
    require(campaignOwnerExists, "Owner address did not create any campaign");

    // Set the donor impact for the ownerAddress
    impact[nextImpactId] = DonarImpact({
        owner: ownerAddress,
        donarImpactImage: _image,
        donarImpactDescription: _impactDescription
    });
    nextImpactId++; // Increment the impact ID for the next entry
    emit DonorImpactSet(ownerAddress, _impactDescription); // Emit an event (optional)
}

  function getAllImpact() public view returns (DonarImpact[] memory) {
        DonarImpact[] memory impacts = new DonarImpact[](nextImpactId);
        
        for (uint256 i = 0; i < nextImpactId; i++) {
            impacts[i] = impact[i];
        }
        
        return impacts;
    }

function withDrawOwner(uint256 id) public payable onlyOwner(id){
    Campign storage campagin = campagins[id];
    require(campagin.deadline < block.timestamp, "Deadline Not Crossed");
    require(campagin.amountCollected > 0, "No funds to withdraw");
    (bool success, ) = payable(campagin.owner).call{value: campagin.amountCollected}("");
    require(success, "Withdraw not done");
}


 receive() external payable {
    
 }

 fallback() external payable {
    payable(msg.sender).transfer(msg.value);
 }

}



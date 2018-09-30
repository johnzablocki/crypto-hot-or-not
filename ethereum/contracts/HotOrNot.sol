pragma solidity ^0.4.24;

contract HotOrNotFactory {
    address[] public deployedHotOrNots;

    function createHotOrNot(uint minVoteAmount, uint maxVoterCount, string image) public {
        address newHotOrNot = new HotOrNot(minVoteAmount, maxVoterCount, image, msg.sender);
        deployedHotOrNots.push(newHotOrNot);
    }

    function getDeployedHotOrNots() public view returns (address[]) {
        return deployedHotOrNots;
    }
}

contract HotOrNot {

    struct Vote {
        uint yesAmount;
        uint noAmount;
    }

    uint private _minVoteAmount;
    uint private _maxVoterCount;
    address private _owner;
    uint private _voterCount;

    string public imageURL;
    uint public yesAmount;
    uint public noAmount;
    bool public isClosed;
    mapping(address => Vote) public voters;

    constructor(uint minVoteAmount, uint maxVoterCount, string image, address owner) public {
        imageURL = image;
        _minVoteAmount = minVoteAmount;
        _maxVoterCount = maxVoterCount;
        _owner = owner;
    }

    function voteYes() public payable requireMinimum requireOpen {
        yesAmount += msg.value;
        voters[msg.sender] = Vote({
            yesAmount: msg.value,
            noAmount: 0
        });
        closeIfMaxVoters();
    }

    function voteNo() public payable requireMinimum requireOpen {
        noAmount += msg.value;
        voters[msg.sender] = Vote({
            yesAmount: 0,
            noAmount: msg.value
        });
        closeIfMaxVoters();
    }

    function closeIfMaxVoters() private {
        _voterCount++;
        if (_voterCount == _maxVoterCount) {
            isClosed = true;

            if (yesAmount > noAmount) {
                _owner.transfer(yesAmount);
            }
        }
    }

    function getDetails() public view returns (uint, uint, string) {
        return (yesAmount, noAmount, imageURL);
    }

    modifier requireOpen() {
        require(!isClosed, "Already closed");
        _;
    }

    modifier requireMinimum() {
        require(msg.value > _minVoteAmount, "Vote did not meet minimum");
        _;
    }
}

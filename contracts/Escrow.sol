// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Web3MarketplaceEscrow
 * @dev A simple escrow contract for digital goods.
 * Logic: Buyer deposits -> Funds Locked -> Seller delivers -> Buyer confirms -> Funds Released.
 * Includes auto-release after 48 hours if no dispute.
 */
contract Web3MarketplaceEscrow {
    
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, DISPUTED, REFUNDED }
    
    struct Transaction {
        address buyer;
        address seller;
        uint256 amount;
        State state;
        uint256 createdAt;
        uint256 autoReleaseTime;
    }
    
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;
    
    address public admin;
    uint256 public constant AUTO_RELEASE_DELAY = 48 hours;
    uint256 public feePercent = 3; // 3% fee

    event TransactionCreated(uint256 indexed id, address buyer, address seller, uint256 amount);
    event ItemDelivered(uint256 indexed id);
    event FundsReleased(uint256 indexed id, address seller, uint256 amount);
    event DisputeOpened(uint256 indexed id);

    constructor() {
        admin = msg.sender;
    }

    function createTransaction(address _seller) external payable {
        require(msg.value > 0, "Amount must be > 0");
        require(_seller != address(0), "Invalid seller");

        transactionCount++;
        transactions[transactionCount] = Transaction({
            buyer: msg.sender,
            seller: _seller,
            amount: msg.value,
            state: State.AWAITING_DELIVERY,
            createdAt: block.timestamp,
            autoReleaseTime: block.timestamp + AUTO_RELEASE_DELAY
        });

        emit TransactionCreated(transactionCount, msg.sender, _seller, msg.value);
    }

    function confirmDelivery(uint256 _id) external {
        Transaction storage txn = transactions[_id];
        require(msg.sender == txn.buyer, "Only buyer can confirm");
        require(txn.state == State.AWAITING_DELIVERY, "Invalid state");

        _releaseFunds(_id);
    }

    function autoRelease(uint256 _id) external {
        Transaction storage txn = transactions[_id];
        require(txn.state == State.AWAITING_DELIVERY, "Invalid state");
        require(block.timestamp >= txn.autoReleaseTime, "Too early");

        _releaseFunds(_id);
    }

    function openDispute(uint256 _id) external {
        Transaction storage txn = transactions[_id];
        require(msg.sender == txn.buyer || msg.sender == txn.seller, "Only parties can dispute");
        require(txn.state == State.AWAITING_DELIVERY, "Invalid state");

        txn.state = State.DISPUTED;
        emit DisputeOpened(_id);
    }

    function resolveDispute(uint256 _id, bool releaseToSeller) external {
        require(msg.sender == admin, "Only admin");
        Transaction storage txn = transactions[_id];
        require(txn.state == State.DISPUTED, "Not disputed");

        if (releaseToSeller) {
            _releaseFunds(_id);
        } else {
            txn.state = State.REFUNDED;
            payable(txn.buyer).transfer(txn.amount);
        }
    }

    function _releaseFunds(uint256 _id) internal {
        Transaction storage txn = transactions[_id];
        txn.state = State.COMPLETE;

        uint256 fee = (txn.amount * feePercent) / 100;
        uint256 sellerAmount = txn.amount - fee;

        payable(admin).transfer(fee);
        payable(txn.seller).transfer(sellerAmount);

        emit FundsReleased(_id, txn.seller, sellerAmount);
    }
}

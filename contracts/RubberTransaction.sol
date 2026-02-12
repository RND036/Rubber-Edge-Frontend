// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title RubberTransaction
 * @dev Smart contract for recording rubber transactions between farmers and buyers
 * @notice Part of the RubberEdge supply chain management system
 */
contract RubberTransaction {
    // ============================================
    // ENUMS
    // ============================================
    
    enum TransactionStatus {
        Pending,     // 0 - Transaction initiated
        Confirmed,   // 1 - Confirmed by both parties
        Completed,   // 2 - Payment and delivery completed
        Cancelled,   // 3 - Transaction cancelled
        Disputed     // 4 - Under dispute
    }
    
    // ============================================
    // STRUCTS
    // ============================================
    
    struct Transaction {
        bytes32 transactionId;
        uint256 farmerId;
        uint256 buyerId;
        uint256 amount;          // Amount in kg
        uint256 pricePerKg;      // Price per kg in smallest unit
        uint256 totalValue;      // Total transaction value
        string gradeId;          // Rubber grade
        string location;         // Transaction location
        uint256 timestamp;
        TransactionStatus status;
        address recorder;
    }
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    // All transactions
    mapping(bytes32 => Transaction) public transactions;
    
    // Transaction IDs list
    bytes32[] public transactionIds;
    
    // Transactions by farmer
    mapping(uint256 => bytes32[]) public farmerTransactions;
    
    // Transactions by buyer
    mapping(uint256 => bytes32[]) public buyerTransactions;
    
    // Owner
    address public owner;
    
    // Authorized recorders
    mapping(address => bool) public authorizedRecorders;
    
    // Transaction counter for unique IDs
    uint256 private transactionCounter;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event TransactionRecorded(
        bytes32 indexed transactionId,
        uint256 indexed farmerId,
        uint256 indexed buyerId,
        uint256 amount,
        uint256 pricePerKg,
        string gradeId,
        uint256 timestamp
    );
    
    event TransactionStatusUpdated(
        bytes32 indexed transactionId,
        TransactionStatus status,
        uint256 timestamp
    );
    
    event RecorderAuthorized(address indexed recorder, bool authorized);
    
    // ============================================
    // MODIFIERS
    // ============================================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedRecorders[msg.sender],
            "Not authorized"
        );
        _;
    }
    
    modifier transactionExists(bytes32 _transactionId) {
        require(transactions[_transactionId].timestamp != 0, "Transaction not found");
        _;
    }
    
    // ============================================
    // CONSTRUCTOR
    // ============================================
    
    constructor() {
        owner = msg.sender;
        authorizedRecorders[msg.sender] = true;
    }
    
    // ============================================
    // ADMIN FUNCTIONS
    // ============================================
    
    function setAuthorizedRecorder(address _recorder, bool _authorized) external onlyOwner {
        authorizedRecorders[_recorder] = _authorized;
        emit RecorderAuthorized(_recorder, _authorized);
    }
    
    // ============================================
    // TRANSACTION RECORDING
    // ============================================
    
    /**
     * @dev Record a new transaction
     * @param _farmerId Farmer's ID
     * @param _buyerId Buyer's ID
     * @param _amount Amount in kg
     * @param _pricePerKg Price per kg
     * @param _gradeId Rubber grade
     * @param _location Transaction location
     * @return transactionId The unique transaction identifier
     */
    function recordTransaction(
        uint256 _farmerId,
        uint256 _buyerId,
        uint256 _amount,
        uint256 _pricePerKg,
        string memory _gradeId,
        string memory _location
    ) external onlyAuthorized returns (bytes32 transactionId) {
        require(_farmerId > 0, "Invalid farmer ID");
        require(_buyerId > 0, "Invalid buyer ID");
        require(_amount > 0, "Amount must be positive");
        require(_pricePerKg > 0, "Price must be positive");
        require(bytes(_gradeId).length > 0, "Grade ID required");
        
        // Generate unique transaction ID
        transactionCounter++;
        transactionId = keccak256(abi.encodePacked(
            _farmerId,
            _buyerId,
            block.timestamp,
            transactionCounter
        ));
        
        uint256 totalValue = _amount * _pricePerKg;
        
        Transaction memory newTx = Transaction({
            transactionId: transactionId,
            farmerId: _farmerId,
            buyerId: _buyerId,
            amount: _amount,
            pricePerKg: _pricePerKg,
            totalValue: totalValue,
            gradeId: _gradeId,
            location: _location,
            timestamp: block.timestamp,
            status: TransactionStatus.Pending,
            recorder: msg.sender
        });
        
        transactions[transactionId] = newTx;
        transactionIds.push(transactionId);
        farmerTransactions[_farmerId].push(transactionId);
        buyerTransactions[_buyerId].push(transactionId);
        
        emit TransactionRecorded(
            transactionId,
            _farmerId,
            _buyerId,
            _amount,
            _pricePerKg,
            _gradeId,
            block.timestamp
        );
        
        return transactionId;
    }
    
    /**
     * @dev Update transaction status
     * @param _transactionId Transaction identifier
     * @param _status New status
     */
    function updateTransactionStatus(
        bytes32 _transactionId,
        TransactionStatus _status
    ) external onlyAuthorized transactionExists(_transactionId) {
        transactions[_transactionId].status = _status;
        
        emit TransactionStatusUpdated(
            _transactionId,
            _status,
            block.timestamp
        );
    }
    
    // ============================================
    // TRANSACTION RETRIEVAL
    // ============================================
    
    /**
     * @dev Get transaction details
     * @param _transactionId Transaction identifier
     * @return The transaction details
     */
    function getTransaction(bytes32 _transactionId) 
        external 
        view 
        transactionExists(_transactionId) 
        returns (Transaction memory) 
    {
        return transactions[_transactionId];
    }
    
    /**
     * @dev Get all transactions for a farmer
     * @param _farmerId Farmer's ID
     * @return Array of transaction IDs
     */
    function getFarmerTransactions(uint256 _farmerId) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return farmerTransactions[_farmerId];
    }
    
    /**
     * @dev Get all transactions for a buyer
     * @param _buyerId Buyer's ID
     * @return Array of transaction IDs
     */
    function getBuyerTransactions(uint256 _buyerId) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return buyerTransactions[_buyerId];
    }
    
    /**
     * @dev Verify if a transaction exists and is valid
     * @param _transactionId Transaction identifier
     * @return isValid Whether the transaction is valid
     */
    function verifyTransaction(bytes32 _transactionId) 
        external 
        view 
        returns (bool isValid) 
    {
        return transactions[_transactionId].timestamp != 0;
    }
    
    /**
     * @dev Get total transaction count
     * @return Total number of transactions
     */
    function getTotalTransactionCount() external view returns (uint256) {
        return transactionIds.length;
    }
    
    /**
     * @dev Get transactions with pagination
     * @param _offset Starting index
     * @param _limit Number of records
     * @return Array of transactions
     */
    function getTransactionsPaginated(
        uint256 _offset,
        uint256 _limit
    ) external view returns (Transaction[] memory) {
        uint256 totalCount = transactionIds.length;
        
        if (_offset >= totalCount) {
            return new Transaction[](0);
        }
        
        uint256 remaining = totalCount - _offset;
        uint256 resultCount = _limit < remaining ? _limit : remaining;
        
        Transaction[] memory result = new Transaction[](resultCount);
        
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = transactions[transactionIds[_offset + i]];
        }
        
        return result;
    }
}

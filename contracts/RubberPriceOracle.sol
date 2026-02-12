// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title RubberPriceOracle
 * @dev Smart contract for recording and retrieving rubber prices on-chain
 * @notice This contract is part of the RubberEdge supply chain management system
 */
contract RubberPriceOracle {
    // ============================================
    // STRUCTS
    // ============================================
    
    struct PriceRecord {
        string gradeId;      // e.g., "RSS1", "RSS2", "LATEX"
        uint256 price;       // Price in smallest unit (e.g., 88500 = 885.00 LKR)
        uint256 timestamp;   // Unix timestamp
        address recorder;    // Address that recorded the price
    }
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    // All price records
    PriceRecord[] public priceHistory;
    
    // Latest price index for each grade
    mapping(string => uint256) public latestPriceIndex;
    
    // Count of prices per grade
    mapping(string => uint256) public priceCountByGrade;
    
    // Owner of the contract
    address public owner;
    
    // Authorized recorders
    mapping(address => bool) public authorizedRecorders;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event PriceRecorded(
        string indexed gradeId,
        uint256 price,
        uint256 timestamp,
        address indexed recorder
    );
    
    event RecorderAuthorized(address indexed recorder, bool authorized);
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // ============================================
    // MODIFIERS
    // ============================================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedRecorders[msg.sender],
            "Not authorized to record prices"
        );
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
    
    /**
     * @dev Authorize or revoke a recorder
     * @param _recorder Address to authorize
     * @param _authorized Whether to authorize or revoke
     */
    function setAuthorizedRecorder(address _recorder, bool _authorized) external onlyOwner {
        authorizedRecorders[_recorder] = _authorized;
        emit RecorderAuthorized(_recorder, _authorized);
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param _newOwner Address of the new owner
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
    
    // ============================================
    // PRICE RECORDING
    // ============================================
    
    /**
     * @dev Record a single price
     * @param _gradeId Rubber grade identifier
     * @param _price Price in smallest unit
     */
    function recordPrice(string memory _gradeId, uint256 _price) external onlyAuthorized {
        require(bytes(_gradeId).length > 0, "Grade ID cannot be empty");
        require(_price > 0, "Price must be greater than zero");
        
        PriceRecord memory newRecord = PriceRecord({
            gradeId: _gradeId,
            price: _price,
            timestamp: block.timestamp,
            recorder: msg.sender
        });
        
        priceHistory.push(newRecord);
        latestPriceIndex[_gradeId] = priceHistory.length - 1;
        priceCountByGrade[_gradeId]++;
        
        emit PriceRecorded(_gradeId, _price, block.timestamp, msg.sender);
    }
    
    /**
     * @dev Record multiple prices in a batch
     * @param _gradeIds Array of grade identifiers
     * @param _prices Array of prices
     */
    function batchRecordPrices(
        string[] memory _gradeIds,
        uint256[] memory _prices
    ) external onlyAuthorized {
        require(_gradeIds.length == _prices.length, "Arrays must have same length");
        require(_gradeIds.length > 0, "Arrays cannot be empty");
        
        for (uint256 i = 0; i < _gradeIds.length; i++) {
            require(bytes(_gradeIds[i]).length > 0, "Grade ID cannot be empty");
            require(_prices[i] > 0, "Price must be greater than zero");
            
            PriceRecord memory newRecord = PriceRecord({
                gradeId: _gradeIds[i],
                price: _prices[i],
                timestamp: block.timestamp,
                recorder: msg.sender
            });
            
            priceHistory.push(newRecord);
            latestPriceIndex[_gradeIds[i]] = priceHistory.length - 1;
            priceCountByGrade[_gradeIds[i]]++;
            
            emit PriceRecorded(_gradeIds[i], _prices[i], block.timestamp, msg.sender);
        }
    }
    
    // ============================================
    // PRICE RETRIEVAL
    // ============================================
    
    /**
     * @dev Get the latest price for a grade
     * @param _gradeId Rubber grade identifier
     * @return price The latest price
     * @return timestamp When the price was recorded
     * @return recorder Who recorded the price
     */
    function getLatestPrice(string memory _gradeId) external view returns (
        uint256 price,
        uint256 timestamp,
        address recorder
    ) {
        require(priceCountByGrade[_gradeId] > 0, "No prices recorded for this grade");
        
        uint256 index = latestPriceIndex[_gradeId];
        PriceRecord memory record = priceHistory[index];
        
        return (record.price, record.timestamp, record.recorder);
    }
    
    /**
     * @dev Get price history for a grade
     * @param _gradeId Rubber grade identifier
     * @param _count Number of records to return (0 for all)
     * @return records Array of price records
     */
    function getPriceHistory(
        string memory _gradeId,
        uint256 _count
    ) external view returns (PriceRecord[] memory records) {
        uint256 gradeCount = priceCountByGrade[_gradeId];
        
        if (gradeCount == 0) {
            return new PriceRecord[](0);
        }
        
        uint256 resultCount = _count == 0 || _count > gradeCount ? gradeCount : _count;
        records = new PriceRecord[](resultCount);
        
        uint256 found = 0;
        // Iterate backwards for most recent first
        for (uint256 i = priceHistory.length; i > 0 && found < resultCount; i--) {
            if (keccak256(bytes(priceHistory[i - 1].gradeId)) == keccak256(bytes(_gradeId))) {
                records[found] = priceHistory[i - 1];
                found++;
            }
        }
        
        return records;
    }
    
    /**
     * @dev Get all price records
     * @return All price records
     */
    function getAllPriceRecords() external view returns (PriceRecord[] memory) {
        return priceHistory;
    }
    
    /**
     * @dev Get total number of price records
     * @return Total count
     */
    function getTotalPriceCount() external view returns (uint256) {
        return priceHistory.length;
    }
    
    /**
     * @dev Get price record at specific index
     * @param _index Index in the price history
     * @return The price record
     */
    function getPriceAt(uint256 _index) external view returns (PriceRecord memory) {
        require(_index < priceHistory.length, "Index out of bounds");
        return priceHistory[_index];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SupplyChainRegistry
 * @dev Smart contract for rubber supply chain traceability
 * @notice Tracks rubber from harvest through processing and delivery
 */
contract SupplyChainRegistry {
    // ============================================
    // STRUCTS
    // ============================================
    
    struct Batch {
        bytes32 batchId;
        uint256 farmerId;
        uint256 quantity;           // kg
        string gradeId;
        string originLocation;
        uint256 harvestTimestamp;
        string currentStage;
        bool isActive;
        address creator;
    }
    
    struct StageRecord {
        string stage;
        string location;
        string notes;
        uint256 timestamp;
        address recorder;
    }
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    // Batches
    mapping(bytes32 => Batch) public batches;
    bytes32[] public batchIds;
    
    // Stage history for each batch
    mapping(bytes32 => StageRecord[]) public batchStages;
    
    // Batches by farmer
    mapping(uint256 => bytes32[]) public farmerBatches;
    
    // Owner and authorization
    address public owner;
    mapping(address => bool) public authorizedRecorders;
    
    // Batch counter
    uint256 private batchCounter;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event HarvestRecorded(
        bytes32 indexed batchId,
        uint256 indexed farmerId,
        uint256 quantity,
        string gradeId,
        uint256 timestamp
    );
    
    event StageRecorded(
        bytes32 indexed batchId,
        string stage,
        string location,
        uint256 timestamp
    );
    
    event BatchCompleted(
        bytes32 indexed batchId,
        uint256 timestamp
    );
    
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
    
    modifier batchExists(bytes32 _batchId) {
        require(batches[_batchId].harvestTimestamp != 0, "Batch not found");
        _;
    }
    
    modifier batchActive(bytes32 _batchId) {
        require(batches[_batchId].isActive, "Batch is not active");
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
    }
    
    // ============================================
    // HARVEST RECORDING
    // ============================================
    
    /**
     * @dev Record a new harvest (creates a new batch)
     * @param _farmerId Farmer's ID
     * @param _quantity Quantity in kg
     * @param _gradeId Rubber grade
     * @param _location Harvest location
     * @return batchId The unique batch identifier
     */
    function recordHarvest(
        uint256 _farmerId,
        uint256 _quantity,
        string memory _gradeId,
        string memory _location
    ) external onlyAuthorized returns (bytes32 batchId) {
        require(_farmerId > 0, "Invalid farmer ID");
        require(_quantity > 0, "Quantity must be positive");
        require(bytes(_gradeId).length > 0, "Grade ID required");
        require(bytes(_location).length > 0, "Location required");
        
        // Generate unique batch ID
        batchCounter++;
        batchId = keccak256(abi.encodePacked(
            _farmerId,
            block.timestamp,
            batchCounter
        ));
        
        Batch memory newBatch = Batch({
            batchId: batchId,
            farmerId: _farmerId,
            quantity: _quantity,
            gradeId: _gradeId,
            originLocation: _location,
            harvestTimestamp: block.timestamp,
            currentStage: "Harvested",
            isActive: true,
            creator: msg.sender
        });
        
        batches[batchId] = newBatch;
        batchIds.push(batchId);
        farmerBatches[_farmerId].push(batchId);
        
        // Record initial stage
        batchStages[batchId].push(StageRecord({
            stage: "Harvested",
            location: _location,
            notes: "Initial harvest recorded",
            timestamp: block.timestamp,
            recorder: msg.sender
        }));
        
        emit HarvestRecorded(
            batchId,
            _farmerId,
            _quantity,
            _gradeId,
            block.timestamp
        );
        
        return batchId;
    }
    
    // ============================================
    // STAGE RECORDING
    // ============================================
    
    /**
     * @dev Record a new stage in the supply chain
     * @param _batchId Batch identifier
     * @param _stage Stage name
     * @param _location Current location
     * @param _notes Additional notes
     */
    function recordStage(
        bytes32 _batchId,
        string memory _stage,
        string memory _location,
        string memory _notes
    ) external onlyAuthorized batchExists(_batchId) batchActive(_batchId) {
        require(bytes(_stage).length > 0, "Stage required");
        require(bytes(_location).length > 0, "Location required");
        
        batches[_batchId].currentStage = _stage;
        
        batchStages[_batchId].push(StageRecord({
            stage: _stage,
            location: _location,
            notes: _notes,
            timestamp: block.timestamp,
            recorder: msg.sender
        }));
        
        // Check if batch should be marked as completed
        if (
            keccak256(bytes(_stage)) == keccak256(bytes("Delivered")) ||
            keccak256(bytes(_stage)) == keccak256(bytes("Exported"))
        ) {
            batches[_batchId].isActive = false;
            emit BatchCompleted(_batchId, block.timestamp);
        }
        
        emit StageRecorded(_batchId, _stage, _location, block.timestamp);
    }
    
    // ============================================
    // BATCH RETRIEVAL
    // ============================================
    
    /**
     * @dev Get batch information
     * @param _batchId Batch identifier
     * @return Batch details
     */
    function getBatchInfo(bytes32 _batchId) 
        external 
        view 
        batchExists(_batchId) 
        returns (Batch memory) 
    {
        return batches[_batchId];
    }
    
    /**
     * @dev Get all stages for a batch
     * @param _batchId Batch identifier
     * @return Array of stage records
     */
    function getBatchHistory(bytes32 _batchId) 
        external 
        view 
        batchExists(_batchId) 
        returns (StageRecord[] memory) 
    {
        return batchStages[_batchId];
    }
    
    /**
     * @dev Get all batches for a farmer
     * @param _farmerId Farmer's ID
     * @return Array of batch IDs
     */
    function getFarmerBatches(uint256 _farmerId) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return farmerBatches[_farmerId];
    }
    
    /**
     * @dev Get number of stages for a batch
     * @param _batchId Batch identifier
     * @return Number of stages
     */
    function getStageCount(bytes32 _batchId) 
        external 
        view 
        batchExists(_batchId) 
        returns (uint256) 
    {
        return batchStages[_batchId].length;
    }
    
    /**
     * @dev Get total number of batches
     * @return Total batch count
     */
    function getTotalBatchCount() external view returns (uint256) {
        return batchIds.length;
    }
    
    /**
     * @dev Verify batch origin
     * @param _batchId Batch identifier
     * @return farmerId The farmer ID
     * @return location Origin location
     * @return timestamp Harvest timestamp
     */
    function verifyOrigin(bytes32 _batchId) 
        external 
        view 
        batchExists(_batchId) 
        returns (
            uint256 farmerId,
            string memory location,
            uint256 timestamp
        ) 
    {
        Batch memory batch = batches[_batchId];
        return (batch.farmerId, batch.originLocation, batch.harvestTimestamp);
    }
    
    /**
     * @dev Get active batches count
     * @return Number of active batches
     */
    function getActiveBatchCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < batchIds.length; i++) {
            if (batches[batchIds[i]].isActive) {
                count++;
            }
        }
        return count;
    }
}

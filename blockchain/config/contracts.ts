// blockchain/config/contracts.ts
// Smart Contract Addresses and ABIs for RubberEdge

import { ACTIVE_NETWORK, POLYGON_AMOY, POLYGON_MAINNET, ETH_SEPOLIA } from './network';

// Contract addresses for different networks
const CONTRACT_ADDRESSES: Record<number, {
  rubberPriceOracle: string;
  rubberTransaction: string;
  supplyChainRegistry: string;
  farmerRegistry: string;
}> = {
  // Ethereum Sepolia Testnet addresses (easier to get free tokens!)
  [11155111]: {
    rubberPriceOracle: '0xD93012faF7F8CE3af0511E64394DBA5c44fFB839', // ✅ Deployed!
    rubberTransaction: '0xf448b4f8b04B79844c731Aa5c1961053D9360604', // ✅ Deployed!
    supplyChainRegistry: '0x6bDD79E7cfD7F82ac95042B4cC3D2cd5BcC45D1d', // ✅ Deployed!
    farmerRegistry: '0x0000000000000000000000000000000000000000', // Optional
  },
  // Polygon Amoy Testnet addresses
  [80002]: {
    rubberPriceOracle: '0xf448b4f8b04B79844c731Aa5c1961053D9360604', // ✅ Deployed!
    rubberTransaction: '0x0000000000000000000000000000000000000000',
    supplyChainRegistry: '0x0000000000000000000000000000000000000000',
    farmerRegistry: '0x0000000000000000000000000000000000000000',
  },
  // Polygon Mainnet addresses (for production)
  [137]: {
    rubberPriceOracle: '0x0000000000000000000000000000000000000000',
    rubberTransaction: '0x0000000000000000000000000000000000000000',
    supplyChainRegistry: '0x0000000000000000000000000000000000000000',
    farmerRegistry: '0x0000000000000000000000000000000000000000',
  },
};

// Get current contract addresses based on active network
export const getContractAddresses = () => {
  return CONTRACT_ADDRESSES[ACTIVE_NETWORK.chainId];
};

// ABIs for smart contracts
export const RUBBER_PRICE_ORACLE_ABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'gradeId', type: 'string' },
      { indexed: false, name: 'price', type: 'uint256' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
      { indexed: true, name: 'recorder', type: 'address' },
    ],
    name: 'PriceRecorded',
    type: 'event',
  },
  // Functions
  {
    inputs: [
      { name: '_gradeId', type: 'string' },
      { name: '_price', type: 'uint256' },
    ],
    name: 'recordPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_gradeId', type: 'string' },
      { name: '_prices', type: 'uint256[]' },
      { name: '_timestamps', type: 'uint256[]' },
    ],
    name: 'batchRecordPrices',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_gradeId', type: 'string' }],
    name: 'getLatestPrice',
    outputs: [
      { name: 'price', type: 'uint256' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'recorder', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_gradeId', type: 'string' },
      { name: '_count', type: 'uint256' },
    ],
    name: 'getPriceHistory',
    outputs: [
      {
        components: [
          { name: 'gradeId', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'recorder', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllPriceRecords',
    outputs: [
      {
        components: [
          { name: 'gradeId', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'recorder', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const RUBBER_TRANSACTION_ABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'transactionId', type: 'bytes32' },
      { indexed: true, name: 'farmerId', type: 'uint256' },
      { indexed: true, name: 'buyerId', type: 'uint256' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'pricePerKg', type: 'uint256' },
      { indexed: false, name: 'gradeId', type: 'string' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'TransactionRecorded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'transactionId', type: 'bytes32' },
      { indexed: false, name: 'status', type: 'uint8' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'TransactionStatusUpdated',
    type: 'event',
  },
  // Functions
  {
    inputs: [
      { name: '_farmerId', type: 'uint256' },
      { name: '_buyerId', type: 'uint256' },
      { name: '_amount', type: 'uint256' },
      { name: '_pricePerKg', type: 'uint256' },
      { name: '_gradeId', type: 'string' },
      { name: '_location', type: 'string' },
    ],
    name: 'recordTransaction',
    outputs: [{ name: 'transactionId', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_transactionId', type: 'bytes32' },
      { name: '_status', type: 'uint8' },
    ],
    name: 'updateTransactionStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_transactionId', type: 'bytes32' }],
    name: 'getTransaction',
    outputs: [
      {
        components: [
          { name: 'transactionId', type: 'bytes32' },
          { name: 'farmerId', type: 'uint256' },
          { name: 'buyerId', type: 'uint256' },
          { name: 'amount', type: 'uint256' },
          { name: 'pricePerKg', type: 'uint256' },
          { name: 'totalValue', type: 'uint256' },
          { name: 'gradeId', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'status', type: 'uint8' },
          { name: 'recorder', type: 'address' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_farmerId', type: 'uint256' }],
    name: 'getFarmerTransactions',
    outputs: [{ name: '', type: 'bytes32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_buyerId', type: 'uint256' }],
    name: 'getBuyerTransactions',
    outputs: [{ name: '', type: 'bytes32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_transactionId', type: 'bytes32' }],
    name: 'verifyTransaction',
    outputs: [{ name: 'isValid', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const SUPPLY_CHAIN_REGISTRY_ABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'batchId', type: 'bytes32' },
      { indexed: true, name: 'farmerId', type: 'uint256' },
      { indexed: false, name: 'quantity', type: 'uint256' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'HarvestRecorded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'batchId', type: 'bytes32' },
      { indexed: false, name: 'stage', type: 'string' },
      { indexed: false, name: 'location', type: 'string' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'StageRecorded',
    type: 'event',
  },
  // Functions
  {
    inputs: [
      { name: '_farmerId', type: 'uint256' },
      { name: '_quantity', type: 'uint256' },
      { name: '_gradeId', type: 'string' },
      { name: '_location', type: 'string' },
    ],
    name: 'recordHarvest',
    outputs: [{ name: 'batchId', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_batchId', type: 'bytes32' },
      { name: '_stage', type: 'string' },
      { name: '_location', type: 'string' },
      { name: '_notes', type: 'string' },
    ],
    name: 'recordStage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_batchId', type: 'bytes32' }],
    name: 'getBatchHistory',
    outputs: [
      {
        components: [
          { name: 'stage', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'notes', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'recorder', type: 'address' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_batchId', type: 'bytes32' }],
    name: 'getBatchInfo',
    outputs: [
      {
        components: [
          { name: 'batchId', type: 'bytes32' },
          { name: 'farmerId', type: 'uint256' },
          { name: 'quantity', type: 'uint256' },
          { name: 'gradeId', type: 'string' },
          { name: 'originLocation', type: 'string' },
          { name: 'harvestTimestamp', type: 'uint256' },
          { name: 'currentStage', type: 'string' },
          { name: 'isActive', type: 'bool' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const FARMER_REGISTRY_ABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'farmerId', type: 'uint256' },
      { indexed: false, name: 'dataHash', type: 'bytes32' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'FarmerRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'farmerId', type: 'uint256' },
      { indexed: false, name: 'verified', type: 'bool' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'FarmerVerified',
    type: 'event',
  },
  // Functions
  {
    inputs: [
      { name: '_farmerId', type: 'uint256' },
      { name: '_dataHash', type: 'bytes32' },
    ],
    name: 'registerFarmer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_farmerId', type: 'uint256' },
      { name: '_verified', type: 'bool' },
    ],
    name: 'verifyFarmer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_farmerId', type: 'uint256' }],
    name: 'getFarmerInfo',
    outputs: [
      { name: 'dataHash', type: 'bytes32' },
      { name: 'isVerified', type: 'bool' },
      { name: 'registrationTimestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_farmerId', type: 'uint256' },
      { name: '_dataHash', type: 'bytes32' },
    ],
    name: 'verifyFarmerData',
    outputs: [{ name: 'isValid', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];

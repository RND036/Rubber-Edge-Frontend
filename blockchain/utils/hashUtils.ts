// blockchain/utils/hashUtils.ts
// Utility functions for hashing and cryptographic operations

import { Platform } from 'react-native';

// Simple hash function for data integrity (non-cryptographic)
// For production, use ethers.js keccak256
export const simpleHash = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

// Generate a unique ID based on input data
export const generateUniqueId = (prefix: string, data: object): string => {
  const timestamp = Date.now();
  const dataString = JSON.stringify(data) + timestamp;
  const hash = simpleHash(dataString);
  return `${prefix}_${hash}_${timestamp}`;
};

// Create a hash of farmer data for on-chain storage
export const hashFarmerData = (farmerData: {
  name: string;
  nicNumber: string;
  farmLocation: string;
  district: string;
}): string => {
  const dataString = `${farmerData.name}|${farmerData.nicNumber}|${farmerData.farmLocation}|${farmerData.district}`;
  return '0x' + simpleHash(dataString).padStart(64, '0');
};

// Create a hash of transaction data
export const hashTransactionData = (txData: {
  farmerId: number;
  buyerId: number;
  amount: number;
  pricePerKg: number;
  gradeId: string;
  timestamp: number;
}): string => {
  const dataString = `${txData.farmerId}|${txData.buyerId}|${txData.amount}|${txData.pricePerKg}|${txData.gradeId}|${txData.timestamp}`;
  return '0x' + simpleHash(dataString).padStart(64, '0');
};

// Verify data against a stored hash
export const verifyDataHash = (data: string, expectedHash: string): boolean => {
  const computedHash = '0x' + simpleHash(data).padStart(64, '0');
  return computedHash.toLowerCase() === expectedHash.toLowerCase();
};

// Convert string to bytes32 format
export const stringToBytes32 = (str: string): string => {
  const hex = Buffer.from(str).toString('hex');
  return '0x' + hex.padEnd(64, '0');
};

// Convert bytes32 to string
export const bytes32ToString = (bytes32: string): string => {
  const hex = bytes32.replace('0x', '').replace(/0+$/, '');
  return Buffer.from(hex, 'hex').toString();
};

// Generate batch ID for supply chain
export const generateBatchId = (farmerId: number, timestamp: number): string => {
  const data = `batch_${farmerId}_${timestamp}`;
  return '0x' + simpleHash(data).padStart(64, '0');
};

// Validate Ethereum address format
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Validate transaction hash format
export const isValidTxHash = (hash: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
};

// Truncate address for display
export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

// Truncate transaction hash for display
export const truncateTxHash = (hash: string, startChars = 10, endChars = 8): string => {
  if (!hash) return '';
  if (hash.length <= startChars + endChars) return hash;
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
};

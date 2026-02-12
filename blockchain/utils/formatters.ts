// blockchain/utils/formatters.ts
// Formatting utilities for blockchain data display

import { ACTIVE_NETWORK } from '../config/network';
import { TransactionStatus } from '../types/blockchain.types';

// ============================================
// PRICE FORMATTERS
// ============================================

// Convert blockchain price (integer) to display format
export const formatPrice = (price: number | bigint, decimals: number = 2): string => {
  const numPrice = typeof price === 'bigint' ? Number(price) : price;
  // Prices stored as integers (88500 = 885.00 LKR)
  const actualPrice = numPrice / 100;
  return actualPrice.toLocaleString('en-LK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Convert display price to blockchain format (integer)
export const priceToBlockchain = (price: number): number => {
  return Math.round(price * 100);
};

// Convert blockchain price (integer) back to display format
export const priceFromBlockchain = (price: number | bigint): number => {
  const numPrice = typeof price === 'bigint' ? Number(price) : price;
  return numPrice / 100;
};

// Format price with currency
export const formatPriceWithCurrency = (price: number | bigint, currency: string = 'LKR'): string => {
  return `${currency} ${formatPrice(price)}`;
};

// ============================================
// AMOUNT FORMATTERS
// ============================================

// Format rubber amount (kg)
export const formatAmount = (amount: number | bigint): string => {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  return `${numAmount.toLocaleString()} kg`;
};

// Format large numbers with abbreviations
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// ============================================
// DATE/TIME FORMATTERS
// ============================================

// Format blockchain timestamp to readable date
export const formatTimestamp = (timestamp: number | bigint): string => {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  // Blockchain timestamps are in seconds, JS uses milliseconds
  const date = new Date(ts * 1000);
  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format timestamp to relative time (e.g., "2 hours ago")
export const formatRelativeTime = (timestamp: number | bigint): string => {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  const now = Math.floor(Date.now() / 1000);
  const diff = now - ts;

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  
  return formatTimestamp(ts);
};

// Format date only
export const formatDate = (timestamp: number | bigint): string => {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  const date = new Date(ts * 1000);
  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ============================================
// ADDRESS FORMATTERS
// ============================================

// Format Ethereum address for display
export const formatAddress = (address: string, length: number = 8): string => {
  if (!address || address.length < 10) return address || '';
  const start = address.slice(0, length);
  const end = address.slice(-4);
  return `${start}...${end}`;
};

// Format full address with copy indicator
export const formatAddressWithNetwork = (address: string): string => {
  return `${formatAddress(address)} (${ACTIVE_NETWORK.name})`;
};

// ============================================
// TRANSACTION FORMATTERS
// ============================================

// Format transaction hash for display
export const formatTxHash = (hash: string, length: number = 12): string => {
  if (!hash || hash.length < 14) return hash || '';
  const start = hash.slice(0, length);
  const end = hash.slice(-6);
  return `${start}...${end}`;
};

// Get transaction status label
export const getStatusLabel = (status: TransactionStatus): string => {
  const labels: Record<TransactionStatus, string> = {
    [TransactionStatus.PENDING]: 'Pending',
    [TransactionStatus.CONFIRMED]: 'Confirmed',
    [TransactionStatus.COMPLETED]: 'Completed',
    [TransactionStatus.CANCELLED]: 'Cancelled',
    [TransactionStatus.DISPUTED]: 'Disputed',
  };
  return labels[status] || 'Unknown';
};

// Get transaction status color
export const getStatusColor = (status: TransactionStatus): string => {
  const colors: Record<TransactionStatus, string> = {
    [TransactionStatus.PENDING]: '#F59E0B', // Yellow
    [TransactionStatus.CONFIRMED]: '#3B82F6', // Blue
    [TransactionStatus.COMPLETED]: '#10B981', // Green
    [TransactionStatus.CANCELLED]: '#EF4444', // Red
    [TransactionStatus.DISPUTED]: '#8B5CF6', // Purple
  };
  return colors[status] || '#6B7280';
};

// ============================================
// GAS FORMATTERS
// ============================================

// Format gas amount
export const formatGas = (gas: bigint | number): string => {
  const numGas = typeof gas === 'bigint' ? Number(gas) : gas;
  return numGas.toLocaleString();
};

// Format gas price in Gwei
export const formatGasPrice = (gasPrice: bigint): string => {
  const gwei = Number(gasPrice) / 1e9;
  return `${gwei.toFixed(2)} Gwei`;
};

// Format MATIC balance
export const formatMaticBalance = (balance: bigint | string): string => {
  const wei = typeof balance === 'string' ? BigInt(balance) : balance;
  const matic = Number(wei) / 1e18;
  return `${matic.toFixed(4)} MATIC`;
};

// ============================================
// RUBBER GRADE FORMATTERS
// ============================================

// Get grade display name
export const getGradeDisplayName = (gradeId: string): string => {
  const gradeNames: Record<string, string> = {
    RSS1: 'RSS-1 (Premium)',
    RSS2: 'RSS-2 (Standard)',
    RSS3: 'RSS-3 (General)',
    RSS4: 'RSS-4 (Industrial)',
    RSS5: 'RSS-5 (Basic)',
    LATEX: 'Fresh Latex',
    CREPE: 'Crepe Rubber',
  };
  return gradeNames[gradeId] || gradeId;
};

// Get grade color
export const getGradeColor = (gradeId: string): string => {
  const colors: Record<string, string> = {
    RSS1: '#059669', // Emerald
    RSS2: '#0891B2', // Cyan
    RSS3: '#2563EB', // Blue
    RSS4: '#7C3AED', // Violet
    RSS5: '#DC2626', // Red
    LATEX: '#D97706', // Amber
    CREPE: '#65A30D', // Lime
  };
  return colors[gradeId] || '#6B7280';
};

// ============================================
// BLOCK FORMATTERS
// ============================================

// Format block number
export const formatBlockNumber = (blockNumber: number | bigint): string => {
  const num = typeof blockNumber === 'bigint' ? Number(blockNumber) : blockNumber;
  return `#${num.toLocaleString()}`;
};

// ============================================
// EXPLORER LINKS
// ============================================

// Get explorer link for transaction
export const getExplorerTxLink = (txHash: string): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/tx/${txHash}`;
};

// Get explorer link for address
export const getExplorerAddressLink = (address: string): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/address/${address}`;
};

// Get explorer link for block
export const getExplorerBlockLink = (blockNumber: number): string => {
  return `${ACTIVE_NETWORK.explorerUrl}/block/${blockNumber}`;
};

// blockchain/services/web3Service.ts
// Service for web3 wallet management and blockchain interactions

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletInfo } from '../types/blockchain.types';
import { ethers } from 'ethers';

// Storage keys
const WALLET_KEY = '@rubberedge_wallet';
const WALLET_BALANCE_KEY = '@rubberedge_wallet_balance';

class Web3Service {
  private walletInfo: WalletInfo | null = null;
  private isConnected = false;

  // ============================================
  // WALLET MANAGEMENT
  // ============================================

  async loadWallet(): Promise<WalletInfo | null> {
    try {
      const storedWallet = await AsyncStorage.getItem(WALLET_KEY);
      if (storedWallet) {
        this.walletInfo = JSON.parse(storedWallet);
        this.isConnected = true;
        return this.walletInfo;
      }
    } catch (error) {
      console.error('Failed to load wallet:', error);
    }
    return null;
  }

  async createWallet(): Promise<{
    wallet: WalletInfo;
    mnemonic: string;
    privateKey: string;
  }> {
    try {
      // Generate a wallet using ethers.js
      const wallet = ethers.Wallet.createRandom();
      const mnemonic = wallet.mnemonic?.phrase || '';
      const privateKey = wallet.privateKey;
      const address = wallet.address;

      const walletInfo: WalletInfo = {
        address,
        balance: '0',
        isConnected: true,
        network: 'polygon-amoy',
        chainId: 80002,
      };

      // Store wallet
      await AsyncStorage.setItem(WALLET_KEY, JSON.stringify(walletInfo));
      this.walletInfo = walletInfo;
      this.isConnected = true;

      return {
        wallet: walletInfo,
        mnemonic,
        privateKey,
      };
    } catch (error: any) {
      console.error('Failed to create wallet:', error);
      throw new Error(error.message || 'Failed to create wallet');
    }
  }

  async importWallet(privateKey: string): Promise<WalletInfo | null> {
    try {
      // Validate and derive address from private key using ethers.js
      const wallet = new ethers.Wallet(privateKey);
      const address = wallet.address;

      const walletInfo: WalletInfo = {
        address,
        balance: '0',
        isConnected: true,
        network: 'polygon-amoy',
        chainId: 80002,
      };

      // Store wallet
      await AsyncStorage.setItem(WALLET_KEY, JSON.stringify(walletInfo));
      this.walletInfo = walletInfo;
      this.isConnected = true;

      return walletInfo;
    } catch (error: any) {
      console.error('Failed to import wallet:', error);
      return null;
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      await AsyncStorage.removeItem(WALLET_KEY);
      this.walletInfo = null;
      this.isConnected = false;
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }

  // ============================================
  // WALLET INFO
  // ============================================

  getWalletAddress(): string | null {
    return this.walletInfo?.address || null;
  }

  getWalletInfo(): WalletInfo | null {
    return this.walletInfo || null;
  }

  isWalletConnected(): boolean {
    return this.isConnected && !!this.walletInfo;
  }

  async getBalance(): Promise<string> {
    try {
      if (!this.walletInfo) {
        return '0';
      }

      // In production, fetch from blockchain
      // For now, return cached balance
      const cachedBalance = await AsyncStorage.getItem(WALLET_BALANCE_KEY);
      return cachedBalance || '0';
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }

  async updateBalance(newBalance: string): Promise<void> {
    try {
      await AsyncStorage.setItem(WALLET_BALANCE_KEY, newBalance);
      if (this.walletInfo) {
        this.walletInfo.balance = newBalance;
      }
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  }

  // ============================================
  // TRANSACTION SIGNING
  // ============================================

  async sendTransaction(
    contractAddress: string,
    functionData: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      if (!this.isWalletConnected()) {
        return {
          success: false,
          error: 'Wallet not connected',
        };
      }

      // In production, use ethers.js to sign and send transaction
      // For now, simulate successful transaction
      const txHash = ethers.keccak256(
        ethers.toBeHex(`${contractAddress}${functionData}${Date.now()}`)
      );

      return {
        success: true,
        txHash,
      };
    } catch (error: any) {
      console.error('Failed to send transaction:', error);
      return {
        success: false,
        error: error.message || 'Failed to send transaction',
      };
    }
  }

  async signMessage(message: string): Promise<string | null> {
    try {
      if (!this.isWalletConnected()) {
        return null;
      }

      // Sign message with wallet (in production, use actual private key)
      const messageHash = ethers.hashMessage(message);
      return messageHash;
    } catch (error) {
      console.error('Failed to sign message:', error);
      return null;
    }
  }

  // ============================================
  // PENDING TRANSACTIONS
  // ============================================

  async getPendingTransactions(): Promise<any[]> {
    try {
      const pending = await AsyncStorage.getItem('@rubberedge_pending_txs');
      return pending ? JSON.parse(pending) : [];
    } catch (error) {
      console.error('Failed to get pending transactions:', error);
      return [];
    }
  }

  async addPendingTransaction(tx: any): Promise<void> {
    try {
      const pending = await this.getPendingTransactions();
      pending.push({ ...tx, addedAt: Date.now() });
      await AsyncStorage.setItem('@rubberedge_pending_txs', JSON.stringify(pending));
    } catch (error) {
      console.error('Failed to add pending transaction:', error);
    }
  }

  async removePendingTransaction(txHash: string): Promise<void> {
    try {
      const pending = await this.getPendingTransactions();
      const filtered = pending.filter(tx => tx.txHash !== txHash);
      await AsyncStorage.setItem('@rubberedge_pending_txs', JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to remove pending transaction:', error);
    }
  }

  async clearPendingTransactions(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@rubberedge_pending_txs');
    } catch (error) {
      console.error('Failed to clear pending transactions:', error);
    }
  }

  // ============================================
  // NETWORK INFO
  // ============================================

  getNetworkInfo(): {
    name: string;
    chainId: number;
    rpcUrl: string;
    explorerUrl: string;
    isTestnet: boolean;
  } {
    // Import ACTIVE_NETWORK from config
    const { ACTIVE_NETWORK } = require('../config/network');
    
    return {
      name: ACTIVE_NETWORK.name,
      chainId: ACTIVE_NETWORK.chainId,
      rpcUrl: ACTIVE_NETWORK.rpcUrl,
      explorerUrl: ACTIVE_NETWORK.explorerUrl,
      isTestnet: ACTIVE_NETWORK.isTestnet,
    };
  }

  getExplorerUrl(txHash: string): string {
    const { ACTIVE_NETWORK } = require('../config/network');
    return `${ACTIVE_NETWORK.explorerUrl}/tx/${txHash}`;
  }
}


export const web3Service = new Web3Service();
export default web3Service;

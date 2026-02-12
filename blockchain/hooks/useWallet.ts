// blockchain/hooks/useWallet.ts
// React hook for wallet management

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { web3Service } from '../services/web3Service';
import { WalletInfo } from '../types/blockchain.types';

const STORAGE_KEYS = {
  WALLET: 'blockchain_wallet',
};

interface UseWalletReturn {
  wallet: WalletInfo | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  createWallet: () => Promise<{ address: string; mnemonic: string; privateKey: string }>;
  importWallet: (privateKey: string) => Promise<boolean>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useWallet = (): UseWalletReturn => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConnected = wallet !== null && wallet.address.length > 0;

  // Load wallet on mount
  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedWallet = await AsyncStorage.getItem(STORAGE_KEYS.WALLET);
      if (storedWallet) {
        const walletData = JSON.parse(storedWallet);
        setWallet(walletData);
        await web3Service.loadWallet();
      }
    } catch (err: any) {
      console.error('Failed to load wallet:', err);
      setError(err.message || 'Failed to load wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await web3Service.createWallet();
      setWallet(result.wallet);

      await AsyncStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(result.wallet));

      return {
        address: result.wallet.address,
        mnemonic: result.mnemonic,
        privateKey: result.privateKey,
      };
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to create wallet';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importWallet = useCallback(async (privateKey: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const walletInfo = await web3Service.importWallet(privateKey);
      if (walletInfo) {
        setWallet(walletInfo);
        await AsyncStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(walletInfo));
        return true;
      }

      setError('Failed to import wallet');
      return false;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to import wallet';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await web3Service.disconnectWallet();
      setWallet(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.WALLET);
    } catch (err: any) {
      console.error('Failed to disconnect wallet:', err);
      setError(err.message || 'Failed to disconnect wallet');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      
      if (wallet) {
        const balance = await web3Service.getBalance();
        setWallet({ ...wallet, balance });
      }
    } catch (err: any) {
      console.error('Failed to refresh wallet:', err);
      setError(err.message || 'Failed to refresh wallet');
    }
  }, [wallet]);

  return {
    wallet,
    isConnected,
    isLoading,
    error,
    createWallet,
    importWallet,
    disconnect,
    refresh,
  };
};

export default useWallet;

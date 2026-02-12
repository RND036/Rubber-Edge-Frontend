// app/wallet-settings.tsx
// Screen for managing blockchain wallet settings

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  StatusBar,
  Switch,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useWallet } from '../blockchain/hooks/useWallet';
import { useBlockchain } from '../blockchain/hooks/useBlockchain';
import WalletConnect from '../components/blockchain/WalletConnect';
import { ACTIVE_NETWORK, POLYGON_AMOY, POLYGON_MAINNET } from '../blockchain/config/network';

// Menu item type
interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string | boolean;
  badge?: string;
  badgeColor?: string;
  action?: () => void | Promise<void>;
  actionLabel?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  toggle?: boolean;
  onToggle?: (value: boolean) => void;
  isLoading?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const WalletSettingsScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  
  const { wallet, isConnected, refresh: refreshWallet, disconnect } = useWallet();
  const { 
    pendingTxCount, 
    syncOfflineData,
    getNetworkInfo,
  } = useBlockchain();

  const [refreshing, setRefreshing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const networkInfo = getNetworkInfo();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshWallet();
    setRefreshing(false);
  }, [refreshWallet]);

  const handleSync = async () => {
    if (pendingTxCount === 0) {
      Alert.alert(t.walletSettings.noPendingData, t.walletSettings.allDataSynced);
      return;
    }

    if (!isConnected) {
      Alert.alert(t.walletSettings.walletNotConnected, t.walletSettings.connectWalletToSync);
      return;
    }

    setIsSyncing(true);
    try {
      const result = await syncOfflineData();
      Alert.alert(
        t.walletSettings.syncComplete,
        `${t.walletSettings.syncedRecords} ${result.prices.synced + result.transactions.synced} ${t.walletSettings.records}.\n` +
        `${t.walletSettings.failedRecords}: ${result.prices.failed + result.transactions.failed} ${t.walletSettings.records}.`
      );
    } catch (error) {
      Alert.alert(t.walletSettings.syncFailed, t.walletSettings.syncFailedDesc);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportKey = () => {
    Alert.alert(
      t.walletSettings.exportPrivateKeyTitle,
      t.walletSettings.exportPrivateKeyWarning,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.walletSettings.export,
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              t.walletSettings.privateKeyTitle,
              t.walletSettings.contactSupportForExport,
              [{ text: t.common.ok }]
            );
          },
        },
      ]
    );
  };

  const menuItems: MenuSection[] = [
    {
      title: t.walletSettings.networkSettings,
      items: [
        {
          icon: 'globe-outline' as const,
          label: t.walletSettings.activeNetwork,
          value: networkInfo.name,
          badge: networkInfo.isTestnet ? t.walletSettings.testnet : t.walletSettings.mainnet,
          badgeColor: networkInfo.isTestnet ? '#F59E0B' : '#10B981',
        },
        {
          icon: 'link-outline' as const,
          label: t.walletSettings.rpcUrl,
          value: networkInfo.rpcUrl.substring(0, 30) + '...',
        },
        {
          icon: 'document-text-outline' as const,
          label: t.walletSettings.chainId,
          value: networkInfo.chainId.toString(),
        },
      ],
    },
    {
      title: t.walletSettings.dataSync,
      items: [
        {
          icon: 'cloud-upload-outline' as const,
          label: t.walletSettings.pendingRecords,
          value: `${pendingTxCount} ${t.walletSettings.records}`,
          action: handleSync,
          actionLabel: isSyncing ? t.walletSettings.syncing : t.walletSettings.syncNow,
          isLoading: isSyncing,
        },
        {
          icon: 'sync-outline' as const,
          label: t.walletSettings.autoSync,
          toggle: true,
          value: autoSync,
          onToggle: setAutoSync,
        },
      ],
    },
    {
      title: t.walletSettings.security,
      items: [
        {
          icon: 'key-outline' as const,
          label: t.walletSettings.exportPrivateKey,
          action: handleExportKey,
          actionIcon: 'chevron-forward' as const,
        },
        {
          icon: 'shield-checkmark-outline' as const,
          label: t.walletSettings.biometricLock,
          toggle: true,
          value: false,
          onToggle: () => Alert.alert(t.walletSettings.comingSoon, t.walletSettings.biometricComingSoonDesc),
        },
      ],
    },
    {
      title: t.walletSettings.quickActions,
      items: [
        {
          icon: 'time-outline' as const,
          label: t.walletSettings.transactionHistory,
          action: () => router.push('/blockchain-history'),
          actionIcon: 'chevron-forward' as const,
        },
        {
          icon: 'search-outline' as const,
          label: t.walletSettings.verifyTransaction,
          action: () => router.push('/verify-transaction'),
          actionIcon: 'chevron-forward' as const,
        },
        {
          icon: 'open-outline' as const,
          label: t.walletSettings.blockExplorer,
          action: () => {
            Linking.openURL(networkInfo.explorerUrl);
          },
          actionIcon: 'chevron-forward' as const,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1B5E20', '#2E7D32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{t.walletSettings.headerTitle}</Text>
            <Text style={styles.headerSubtitle}>{t.walletSettings.headerSubtitle}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1B5E20']} />
        }
      >
        {/* Wallet Section */}
        <View style={styles.walletSection}>
          <Text style={styles.sectionTitle}>{t.walletSettings.wallet}</Text>
          <WalletConnect />
          {/* Wallet Balance Display */}
          {wallet && (
            <View style={{ marginTop: 12, marginBottom: 4 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#1B5E20' }}>
                {networkInfo.chainId === 11155111
                  ? `$${Number(wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETH`
                  : `${Number(wallet.balance).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ${(networkInfo as any).currency?.symbol || 'MATIC'}`}
              </Text>
            </View>
          )}
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={item.action}
                  disabled={!item.action && !item.toggle}
                  activeOpacity={item.action ? 0.7 : 1}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name={item.icon} size={20} color="#1B5E20" />
                    </View>
                    <View>
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                      {item.value && typeof item.value === 'string' && (
                        <Text style={styles.menuItemValue}>{item.value}</Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.menuItemRight}>
                    {item.badge && (
                      <View style={[styles.badge, { backgroundColor: item.badgeColor + '20' }]}>
                        <Text style={[styles.badgeText, { color: item.badgeColor }]}>
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    {item.actionLabel && (
                      <TouchableOpacity
                        style={[styles.actionButton, item.isLoading && styles.actionButtonDisabled]}
                        onPress={item.action}
                        disabled={item.isLoading}
                      >
                        <Text style={styles.actionButtonText}>{item.actionLabel}</Text>
                      </TouchableOpacity>
                    )}
                    {item.toggle && (
                      <Switch
                        value={item.value as boolean}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                        thumbColor={item.value ? '#1B5E20' : '#9CA3AF'}
                      />
                    )}
                    {item.actionIcon && (
                      <Ionicons name={item.actionIcon} size={20} color="#9CA3AF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        {isConnected && (
          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>{t.walletSettings.dangerZone}</Text>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={() => {
                Alert.alert(
                  t.walletSettings.disconnectWalletTitle,
                  t.walletSettings.disconnectWalletWarning,
                  [
                    { text: t.common.cancel, style: 'cancel' },
                    { text: t.walletSettings.disconnect, style: 'destructive', onPress: disconnect },
                  ]
                );
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.dangerButtonText}>{t.walletSettings.disconnectWallet}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t.walletSettings.footerPoweredBy}
          </Text>
          <Text style={styles.footerVersion}>
            {t.walletSettings.footerVersion}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },

  // Wallet Section
  walletSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  // Menu Section
  menuSection: {
    marginBottom: 24,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  menuItemValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  // Danger Section
  dangerSection: {
    marginBottom: 24,
  },
  dangerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  dangerButtonText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
  },
  footerVersion: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default WalletSettingsScreen;

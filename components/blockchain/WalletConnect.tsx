// components/blockchain/WalletConnect.tsx
// Wallet connection and management UI component

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWallet } from '../../blockchain/hooks/useWallet';
import { ACTIVE_NETWORK } from '../../blockchain/config/network';

interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const {
    wallet,
    isConnected,
    isLoading,
    formattedAddress,
    formattedBalance,
    networkName,
    createWallet,
    importWallet,
    disconnect,
    copyAddress,
    openInExplorer,
  } = useWallet();

  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [importLoading, setImportLoading] = useState(false);

  const handleCreateWallet = async () => {
    const success = await createWallet();
    if (success) {
      setShowModal(false);
      onConnect?.();
    }
  };

  const handleImportWallet = async () => {
    if (!privateKey.trim()) {
      Alert.alert('Error', 'Please enter a private key');
      return;
    }

    setImportLoading(true);
    const success = await importWallet(privateKey.trim());
    setImportLoading(false);

    if (success) {
      setShowImportModal(false);
      setShowModal(false);
      setPrivateKey('');
      onConnect?.();
    }
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Wallet',
      'Are you sure you want to disconnect your wallet? Make sure you have backed up your private key.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await disconnect();
            onDisconnect?.();
          },
        },
      ]
    );
  };

  // Connected wallet view
  if (isConnected && wallet) {
    return (
      <View style={styles.connectedContainer}>
        <View style={styles.walletCard}>
          <LinearGradient
            colors={['#1B5E20', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCardGradient}
          >
            <View style={styles.walletHeader}>
              <View style={styles.walletIcon}>
                <Ionicons name="wallet" size={24} color="white" />
              </View>
              <View style={styles.networkBadge}>
                <View style={styles.networkDot} />
                <Text style={styles.networkText}>{networkName}</Text>
              </View>
            </View>

            <View style={styles.walletInfo}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balance}>{formattedBalance}</Text>
            </View>

            <View style={styles.addressContainer}>
              <Text style={styles.address}>{formattedAddress}</Text>
              <View style={styles.addressActions}>
                <TouchableOpacity onPress={copyAddress} style={styles.addressAction}>
                  <Ionicons name="copy-outline" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInExplorer} style={styles.addressAction}>
                  <Ionicons name="open-outline" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.disconnectText}>Disconnect Wallet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Not connected view
  return (
    <>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => setShowModal(true)}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#1B5E20', '#2E7D32']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.connectGradient}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="wallet-outline" size={20} color="white" />
              <Text style={styles.connectText}>Connect Blockchain Wallet</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Connect Options Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Connect Wallet</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
                <Text style={styles.infoText}>
                  A blockchain wallet allows you to record transactions permanently on the
                  Polygon network for transparency and verification.
                </Text>
              </View>

              <TouchableOpacity style={styles.optionButton} onPress={handleCreateWallet}>
                <View style={styles.optionIcon}>
                  <Ionicons name="add-circle-outline" size={28} color="#1B5E20" />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>Create New Wallet</Text>
                  <Text style={styles.optionSubtitle}>
                    Generate a new blockchain wallet
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setShowImportModal(true)}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="key-outline" size={28} color="#1B5E20" />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>Import Existing Wallet</Text>
                  <Text style={styles.optionSubtitle}>
                    Use your private key to import
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <View style={styles.networkInfo}>
                <Text style={styles.networkInfoTitle}>Network: {ACTIVE_NETWORK.name}</Text>
                <Text style={styles.networkInfoSubtitle}>
                  {ACTIVE_NETWORK.isTestnet
                    ? 'This is a test network. No real funds required.'
                    : 'This is the main network. Real funds will be used.'}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Import Wallet Modal */}
      <Modal
        visible={showImportModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowImportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Import Wallet</Text>
              <TouchableOpacity onPress={() => setShowImportModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={[styles.infoBox, styles.warningBox]}>
                <Ionicons name="warning-outline" size={20} color="#D97706" />
                <Text style={styles.warningText}>
                  Never share your private key with anyone. We will never ask for it outside
                  this app.
                </Text>
              </View>

              <Text style={styles.inputLabel}>Private Key</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your private key (0x...)"
                value={privateKey}
                onChangeText={setPrivateKey}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={[
                  styles.importButton,
                  !privateKey.trim() && styles.importButtonDisabled,
                ]}
                onPress={handleImportWallet}
                disabled={!privateKey.trim() || importLoading}
              >
                {importLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.importButtonText}>Import Wallet</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Compact wallet status indicator
export const WalletStatusIndicator: React.FC<{
  onPress?: () => void;
}> = ({ onPress }) => {
  const { isConnected, formattedAddress, isLoading } = useWallet();

  if (isLoading) {
    return (
      <View style={styles.statusIndicator}>
        <ActivityIndicator size="small" color="#1B5E20" />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.statusIndicator} onPress={onPress}>
      <View
        style={[
          styles.statusDot,
          isConnected ? styles.statusDotConnected : styles.statusDotDisconnected,
        ]}
      />
      <Text style={styles.statusText}>
        {isConnected ? formattedAddress : 'Not Connected'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Connected wallet styles
  connectedContainer: {
    marginVertical: 16,
  },
  walletCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  walletCardGradient: {
    padding: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  networkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  networkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  walletInfo: {
    marginBottom: 16,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  balance: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  address: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  addressActions: {
    flexDirection: 'row',
    gap: 12,
  },
  addressAction: {
    padding: 4,
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
    gap: 8,
  },
  disconnectText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },

  // Connect button styles
  connectButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  connectGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  connectText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalBody: {
    padding: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  warningBox: {
    backgroundColor: '#FFFBEB',
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  networkInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  networkInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  networkInfoSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Import modal styles
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
  },
  importButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  importButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  importButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Status indicator styles
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotConnected: {
    backgroundColor: '#10B981',
  },
  statusDotDisconnected: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
});

export default WalletConnect;

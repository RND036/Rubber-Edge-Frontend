// components/blockchain/TransactionHash.tsx
// Component to display transaction hash with copy and explorer link

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatTxHash, getExplorerTxLink } from '../../blockchain/utils/formatters';

interface TransactionHashProps {
  txHash: string;
  label?: string;
  showFull?: boolean;
  showActions?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: object;
}

const TransactionHash: React.FC<TransactionHashProps> = ({
  txHash,
  label = 'Transaction Hash',
  showFull = false,
  showActions = true,
  size = 'medium',
  style,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Note: In production, use @react-native-clipboard/clipboard
      // await Clipboard.setString(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      Alert.alert('Copied', 'Transaction hash copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy');
    }
  };

  const handleOpenExplorer = async () => {
    try {
      const url = getExplorerTxLink(txHash);
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Could not open blockchain explorer');
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return {
          label: styles.labelLarge,
          hash: styles.hashLarge,
          icon: 20,
        };
      case 'small':
        return {
          label: styles.labelSmall,
          hash: styles.hashSmall,
          icon: 14,
        };
      default:
        return {
          label: styles.labelMedium,
          hash: styles.hashMedium,
          icon: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const displayHash = showFull ? txHash : formatTxHash(txHash);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, sizeStyles.label]}>{label}</Text>}
      
      <View style={styles.hashContainer}>
        <View style={styles.hashWrapper}>
          <Ionicons 
            name="cube-outline" 
            size={sizeStyles.icon} 
            color="#6B7280" 
          />
          <Text 
            style={[styles.hash, sizeStyles.hash]} 
            numberOfLines={1}
            selectable
          >
            {displayHash}
          </Text>
        </View>

        {showActions && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              <Ionicons
                name={copied ? 'checkmark' : 'copy-outline'}
                size={sizeStyles.icon}
                color={copied ? '#059669' : '#6B7280'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOpenExplorer}
              activeOpacity={0.7}
            >
              <Ionicons
                name="open-outline"
                size={sizeStyles.icon}
                color="#3B82F6"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

// Compact inline version
export const TransactionHashInline: React.FC<{
  txHash: string;
  onPress?: () => void;
}> = ({ txHash, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Linking.openURL(getExplorerTxLink(txHash)).catch(console.error);
    }
  };

  return (
    <TouchableOpacity style={styles.inlineContainer} onPress={handlePress}>
      <Ionicons name="cube-outline" size={12} color="#3B82F6" />
      <Text style={styles.inlineHash}>{formatTxHash(txHash, 8)}</Text>
      <Ionicons name="open-outline" size={10} color="#3B82F6" />
    </TouchableOpacity>
  );
};

// Full transaction details card
export const TransactionDetailsCard: React.FC<{
  txHash: string;
  blockNumber?: number;
  timestamp?: number;
  status?: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
}> = ({ txHash, blockNumber, timestamp, status = 'confirmed', gasUsed }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#059669';
    }
  };

  const getStatusIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'failed':
        return 'close-circle-outline';
      default:
        return 'checkmark-circle-outline';
    }
  };

  return (
    <View style={styles.detailsCard}>
      <View style={styles.detailsHeader}>
        <View style={styles.detailsTitle}>
          <Ionicons name="cube" size={20} color="#1B5E20" />
          <Text style={styles.detailsTitleText}>Blockchain Record</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons name={getStatusIcon()} size={14} color={getStatusColor()} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>

      <TransactionHash txHash={txHash} label="Transaction Hash" size="small" />

      <View style={styles.detailsRow}>
        {blockNumber && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Block</Text>
            <Text style={styles.detailValue}>#{blockNumber.toLocaleString()}</Text>
          </View>
        )}
        {timestamp && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {new Date(timestamp * 1000).toLocaleString()}
            </Text>
          </View>
        )}
        {gasUsed && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Gas Used</Text>
            <Text style={styles.detailValue}>{parseInt(gasUsed).toLocaleString()}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.explorerButton}
        onPress={() => Linking.openURL(getExplorerTxLink(txHash))}
      >
        <Text style={styles.explorerButtonText}>View on Explorer</Text>
        <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    color: '#6B7280',
    marginBottom: 4,
  },
  labelSmall: {
    fontSize: 11,
  },
  labelMedium: {
    fontSize: 12,
  },
  labelLarge: {
    fontSize: 14,
  },
  hashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  hashWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  hash: {
    fontFamily: 'monospace',
    color: '#374151',
    flex: 1,
  },
  hashSmall: {
    fontSize: 11,
  },
  hashMedium: {
    fontSize: 13,
  },
  hashLarge: {
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },

  // Inline styles
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inlineHash: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#3B82F6',
  },

  // Details card styles
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
  },
  explorerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    gap: 6,
  },
  explorerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
});

export default TransactionHash;

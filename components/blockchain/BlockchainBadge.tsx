// components/blockchain/BlockchainBadge.tsx
// Visual badge component showing blockchain verification status

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatTxHash, getExplorerTxLink } from '../../blockchain/utils/formatters';

interface BlockchainBadgeProps {
  txHash?: string;
  isVerified?: boolean;
  showHash?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: object;
  onPress?: () => void;
}

const BlockchainBadge: React.FC<BlockchainBadgeProps> = ({
  txHash,
  isVerified = true,
  showHash = false,
  size = 'small',
  style,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (txHash) {
      const url = getExplorerTxLink(txHash);
      Linking.openURL(url).catch(console.error);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return {
          container: styles.containerLarge,
          icon: 20,
          text: styles.textLarge,
        };
      case 'medium':
        return {
          container: styles.containerMedium,
          icon: 16,
          text: styles.textMedium,
        };
      default:
        return {
          container: styles.containerSmall,
          icon: 12,
          text: styles.textSmall,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  if (!isVerified && !txHash) {
    return (
      <View style={[styles.badgePending, sizeStyles.container, style]}>
        <Ionicons name="time-outline" size={sizeStyles.icon} color="#F59E0B" />
        <Text style={[styles.badgeTextPending, sizeStyles.text]}>Pending</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.badgeVerified, sizeStyles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={!txHash}
    >
      <Ionicons name="shield-checkmark" size={sizeStyles.icon} color="#059669" />
      <Text style={[styles.badgeTextVerified, sizeStyles.text]}>
        {showHash && txHash ? formatTxHash(txHash, 8) : 'On-Chain ✓'}
      </Text>
      {txHash && (
        <Ionicons name="open-outline" size={sizeStyles.icon - 2} color="#059669" />
      )}
    </TouchableOpacity>
  );
};

// Compact version for list items
export const BlockchainBadgeCompact: React.FC<{
  isOnChain: boolean;
  txHash?: string;
}> = ({ isOnChain, txHash }) => {
  const handlePress = () => {
    if (txHash) {
      Linking.openURL(getExplorerTxLink(txHash)).catch(console.error);
    }
  };

  if (!isOnChain) {
    return (
      <View style={styles.compactBadgeOffline}>
        <View style={styles.compactDot} />
        <Text style={styles.compactTextOffline}>Local</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.compactBadge} onPress={handlePress}>
      <View style={[styles.compactDot, styles.compactDotOnline]} />
      <Text style={styles.compactText}>On-Chain</Text>
    </TouchableOpacity>
  );
};

// Animated verification badge
export const BlockchainVerifiedAnimation: React.FC<{
  visible: boolean;
  onComplete?: () => void;
}> = ({ visible, onComplete }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(2000),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        scaleAnim.setValue(0);
        onComplete?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.verifiedAnimation,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.verifiedAnimationInner}>
        <Ionicons name="checkmark-circle" size={48} color="#059669" />
        <Text style={styles.verifiedAnimationText}>Recorded on Blockchain!</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Verified badge styles
  badgeVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeTextVerified: {
    color: '#059669',
    fontWeight: '600',
    marginHorizontal: 4,
  },

  // Pending badge styles
  badgePending: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  badgeTextPending: {
    color: '#D97706',
    fontWeight: '600',
    marginHorizontal: 4,
  },

  // Size variations
  containerSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 2,
  },
  containerMedium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  containerLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  textSmall: {
    fontSize: 10,
  },
  textMedium: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 14,
  },

  // Compact badge
  compactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactBadgeOffline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  compactDotOnline: {
    backgroundColor: '#059669',
  },
  compactText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
  },
  compactTextOffline: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Animated verification
  verifiedAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  verifiedAnimationInner: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  verifiedAnimationText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
});

export default BlockchainBadge;

// app/verify-transaction.tsx
// Screen for verifying blockchain transactions by transaction ID or hash

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { transactionService } from '../blockchain/services/transactionService';
import { RubberTransaction } from '../blockchain/types/blockchain.types';
import { TransactionDetailsCard } from '../components/blockchain/TransactionHash';

const VerifyTransactionScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState<RubberTransaction | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [explorerUrl, setExplorerUrl] = useState<string>('');

    const handleVerify = async () => {
        if (!searchQuery.trim()) {
            Alert.alert('Error', 'Please enter a transaction ID or hash');
            return;
        }

        setLoading(true);
        setTransaction(null);
        setIsValid(null);

        try {
            // Try verifying by transaction ID first
            let result = await transactionService.verifyTransaction(searchQuery.trim());

            // If not found, try by transaction hash
            if (!result.isValid && searchQuery.startsWith('0x')) {
                result = await transactionService.verifyByTxHash(searchQuery.trim());
            }

            setIsValid(result.isValid);
            setTransaction(result.transaction || null);
            setExplorerUrl(result.explorerUrl || '');

            if (!result.isValid) {
                Alert.alert('Not Found', 'No transaction found with this ID or hash');
            }
        } catch (error: any) {
            console.error('Verification error:', error);
            Alert.alert('Error', 'Failed to verify transaction');
        } finally {
            setLoading(false);
        }
    };

    const renderTransactionDetails = () => {
        if (!transaction) return null;

        return (
            <View style={styles.resultCard}>
                <View style={styles.successHeader}>
                    <Ionicons name="checkmark-circle" size={48} color="#059669" />
                    <Text style={styles.successTitle}>Transaction Verified</Text>
                    <Text style={styles.successSubtitle}>
                        This transaction is valid and recorded on the blockchain
                    </Text>
                </View>

                {transaction.txHash && (
                    <TransactionDetailsCard
                        txHash={transaction.txHash}
                        blockNumber={transaction.blockNumber}
                        timestamp={transaction.timestamp}
                        status={
                            transaction.status === 0
                                ? 'pending'
                                : transaction.status === 1
                                    ? 'confirmed'
                                    : 'confirmed'
                        }
                    />
                )}

                <View style={styles.detailsSection}>
                    <DetailRow
                        icon="cube-outline"
                        label="Transaction ID"
                        value={transaction.transactionId.substring(0, 16) + '...'}
                        copyable
                    />
                    <DetailRow
                        icon="person-outline"
                        label="Farmer ID"
                        value={`#${transaction.farmerId}`}
                    />
                    <DetailRow
                        icon="business-outline"
                        label="Buyer ID"
                        value={`#${transaction.buyerId}`}
                    />
                    <DetailRow
                        icon="scale-outline"
                        label="Amount"
                        value={`${transaction.amount} kg`}
                    />
                    <DetailRow
                        icon="cash-outline"
                        label="Price per KG"
                        value={`LKR ${transaction.pricePerKg.toFixed(2)}`}
                    />
                    <DetailRow
                        icon="cash-outline"
                        label="Total Value"
                        value={`LKR ${transaction.totalValue.toLocaleString()}`}
                    />
                    <DetailRow
                        icon="ribbon-outline"
                        label="Grade"
                        value={transaction.gradeId}
                    />
                    <DetailRow
                        icon="location-outline"
                        label="Location"
                        value={transaction.location}
                    />
                    <DetailRow
                        icon="time-outline"
                        label="Timestamp"
                        value={new Date(transaction.timestamp * 1000).toLocaleString()}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verify Transaction</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle-outline" size={24} color="#3B82F6" />
                    <Text style={styles.infoText}>
                        Enter a transaction ID or blockchain hash to verify its authenticity and view details
                    </Text>
                </View>

                <View style={styles.searchSection}>
                    <Text style={styles.label}>Transaction ID or Hash</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter transaction ID or 0x... hash"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
                                <Text style={styles.verifyButtonText}>Verify Transaction</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {isValid !== null && (
                    isValid ? (
                        renderTransactionDetails()
                    ) : (
                        <View style={styles.errorCard}>
                            <Ionicons name="close-circle-outline" size={48} color="#EF4444" />
                            <Text style={styles.errorTitle}>Transaction Not Found</Text>
                            <Text style={styles.errorSubtitle}>
                                No transaction found with this ID or hash
                            </Text>
                        </View>
                    )
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow: React.FC<{
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    copyable?: boolean;
}> = ({ icon, label, value, copyable }) => (
    <View style={styles.detailRow}>
        <View style={styles.detailRowLeft}>
            <Ionicons name={icon} size={16} color="#6B7280" />
            <Text style={styles.detailLabel}>{label}</Text>
        </View>
        <Text style={styles.detailValue} numberOfLines={1}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#1E40AF',
        lineHeight: 20,
    },
    searchSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 16,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#1F2937',
    },
    verifyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D7A4F',
        borderRadius: 8,
        paddingVertical: 14,
        gap: 8,
    },
    verifyButtonDisabled: {
        opacity: 0.6,
    },
    verifyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    successHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#059669',
        marginTop: 12,
    },
    successSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
        textAlign: 'center',
    },
    detailsSection: {
        marginTop: 20,
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    detailRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    detailLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        maxWidth: '50%',
    },
    errorCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#EF4444',
        marginTop: 12,
    },
    errorSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
        textAlign: 'center',
    },
});

export default VerifyTransactionScreen;

// app/blockchain-history.tsx
// Screen to view all blockchain records

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useBlockchain } from '../blockchain/hooks/useBlockchain';
import BlockchainBadge from '../components/blockchain/BlockchainBadge';
import TransactionHash, { TransactionDetailsCard } from '../components/blockchain/TransactionHash';
import {
  PriceRecord,
  RubberTransaction,
  BatchInfo,
} from '../blockchain/types/blockchain.types';
import {
  formatPrice,
  formatAmount,
  formatTimestamp,
  formatRelativeTime,
  getGradeDisplayName,
  getGradeColor,
  getStatusLabel,
  getStatusColor,
} from '../blockchain/utils/formatters';

type TabType = 'prices' | 'transactions' | 'batches';

const BlockchainHistoryScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  
  const {
    isConnected,
    wallet,
    pendingTxCount,
    getNetworkInfo,
  } = useBlockchain();

  const [activeTab, setActiveTab] = useState<TabType>('prices');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [priceRecords, setPriceRecords] = useState<PriceRecord[]>([]);
  const [transactions, setTransactions] = useState<RubberTransaction[]>([]);
  const [batches, setBatches] = useState<BatchInfo[]>([]);

  const networkInfo = getNetworkInfo();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { priceRecordService } = await import('../blockchain/services/priceRecordService');
      const { transactionService } = await import('../blockchain/services/transactionService');
      const { supplyChainService } = await import('../blockchain/services/supplyChainService');

      const [prices, txs, batchList] = await Promise.all([
        priceRecordService.getAllPriceRecords(),
        transactionService.getAllTransactions(),
        supplyChainService.getAllBatches(),
      ]);

      setPriceRecords(prices);
      setTransactions(txs);
      setBatches(batchList);
    } catch (error) {
      console.error('Failed to load blockchain data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const renderPriceItem = ({ item }: { item: PriceRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={[styles.gradeTag, { backgroundColor: getGradeColor(item.gradeId) + '20' }]}>
          <Text style={[styles.gradeTagText, { color: getGradeColor(item.gradeId) }]}>
            {item.gradeId}
          </Text>
        </View>
        <BlockchainBadge txHash={item.txHash} size="small" />
      </View>
      
      <View style={styles.recordContent}>
        <Text style={styles.priceValue}>LKR {formatPrice(item.price * 100)}</Text>
        <Text style={styles.recordTime}>{formatRelativeTime(item.timestamp)}</Text>
      </View>

      {item.txHash && (
        <TransactionHash txHash={item.txHash} size="small" showActions />
      )}
    </View>
  );

  const renderTransactionItem = ({ item }: { item: RubberTransaction }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.txParties}>
          <Text style={styles.partyLabel}>Farmer #{item.farmerId}</Text>
          <Ionicons name="arrow-forward" size={16} color="#6B7280" />
          <Text style={styles.partyLabel}>Buyer #{item.buyerId}</Text>
        </View>
        <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusTagText, { color: getStatusColor(item.status) }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.txDetails}>
        <View style={styles.txDetailItem}>
          <Text style={styles.txDetailLabel}>Amount</Text>
          <Text style={styles.txDetailValue}>{formatAmount(item.amount)}</Text>
        </View>
        <View style={styles.txDetailItem}>
          <Text style={styles.txDetailLabel}>Grade</Text>
          <Text style={styles.txDetailValue}>{item.gradeId}</Text>
        </View>
        <View style={styles.txDetailItem}>
          <Text style={styles.txDetailLabel}>Total</Text>
          <Text style={styles.txDetailValue}>LKR {item.totalValue.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.recordFooter}>
        <Text style={styles.recordTime}>{formatRelativeTime(item.timestamp)}</Text>
        {item.txHash && <BlockchainBadge txHash={item.txHash} size="small" />}
      </View>
    </View>
  );

  const renderBatchItem = ({ item }: { item: BatchInfo }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.batchIdContainer}>
          <Ionicons name="cube-outline" size={16} color="#1B5E20" />
          <Text style={styles.batchId}>{item.batchId.slice(0, 10)}...</Text>
        </View>
        <View style={[styles.statusTag, { backgroundColor: item.isActive ? '#10B98120' : '#6B728020' }]}>
          <Text style={[styles.statusTagText, { color: item.isActive ? '#10B981' : '#6B7280' }]}>
            {item.isActive ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>

      <View style={styles.batchInfo}>
        <Text style={styles.batchStage}>{item.currentStage}</Text>
        <Text style={styles.batchDetails}>
          {item.quantity} kg • {item.gradeId} • Farmer #{item.farmerId}
        </Text>
      </View>

      <View style={styles.stageProgress}>
        {item.stages.slice(0, 4).map((stage, index) => (
          <View key={index} style={styles.stageItem}>
            <View style={[styles.stageDot, index < item.stages.length && styles.stageDotActive]} />
            <Text style={styles.stageName} numberOfLines={1}>{stage.stage}</Text>
          </View>
        ))}
        {item.stages.length > 4 && (
          <Text style={styles.moreStages}>+{item.stages.length - 4} more</Text>
        )}
      </View>

      <Text style={styles.recordTime}>{formatRelativeTime(item.harvestTimestamp)}</Text>
    </View>
  );

  const tabs: { key: TabType; label: string; icon: keyof typeof Ionicons.glyphMap; count: number }[] = [
    { key: 'prices', label: 'Prices', icon: 'trending-up', count: priceRecords.length },
    { key: 'transactions', label: 'Transactions', icon: 'swap-horizontal', count: transactions.length },
    { key: 'batches', label: 'Supply Chain', icon: 'git-branch-outline', count: batches.length },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1B5E20', '#2E7D32']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Blockchain Records</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{networkInfo.name}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{priceRecords.length + transactions.length + batches.length}</Text>
            <Text style={styles.statLabel}>Total Records</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pendingTxCount}</Text>
            <Text style={styles.statLabel}>Pending Sync</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.connectionDot, isConnected && styles.connectionDotActive]} />
            <Text style={styles.statLabel}>{isConnected ? 'Connected' : 'Offline'}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? '#1B5E20' : '#6B7280'}
            />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
            <View style={[styles.tabBadge, activeTab === tab.key && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === tab.key && styles.tabBadgeTextActive]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1B5E20" />
          <Text style={styles.loadingText}>Loading blockchain records...</Text>
        </View>
      ) : activeTab === 'prices' ? (
        <FlatList
          data={priceRecords}
          renderItem={renderPriceItem}
          keyExtractor={(item, index) => item.txHash || index.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1B5E20']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Records Found</Text>
              <Text style={styles.emptySubtitle}>Price records will appear here once recorded</Text>
            </View>
          }
        />
      ) : activeTab === 'transactions' ? (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => item.transactionId || index.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1B5E20']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Records Found</Text>
              <Text style={styles.emptySubtitle}>Transactions will appear here once recorded</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={batches}
          renderItem={renderBatchItem}
          keyExtractor={(item, index) => item.batchId || index.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1B5E20']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Records Found</Text>
              <Text style={styles.emptySubtitle}>Supply chain batches will appear here</Text>
            </View>
          }
        />
      )}
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
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  connectionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    marginBottom: 4,
  },
  connectionDotActive: {
    backgroundColor: '#4ADE80',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#ECFDF5',
  },
  tabText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1B5E20',
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: '#1B5E20',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabBadgeTextActive: {
    color: 'white',
  },

  // List
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },

  // Record Card
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordContent: {
    marginBottom: 12,
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  recordTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
  },
  gradeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Transaction specific
  txParties: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  partyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  txDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txDetailItem: {
    flex: 1,
  },
  txDetailLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  txDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Batch specific
  batchIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  batchId: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#1B5E20',
    fontWeight: '500',
  },
  batchInfo: {
    marginBottom: 12,
  },
  batchStage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  batchDetails: {
    fontSize: 13,
    color: '#6B7280',
  },
  stageProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  stageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  stageDotActive: {
    backgroundColor: '#1B5E20',
  },
  stageName: {
    fontSize: 10,
    color: '#6B7280',
    maxWidth: 60,
  },
  moreStages: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500',
  },
});

export default BlockchainHistoryScreen;

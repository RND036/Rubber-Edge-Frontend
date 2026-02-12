import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import buyerPricesApi, { BuyerPriceInput } from '../services/buyerPricesApi';
import { usePriceRecords } from '../blockchain/hooks/usePriceRecords';

interface CustomGrade {
  id: string;
  name: string;
  price: string;
}

interface Prices {
  rss3: string;
  tsr20: string;
  latex: string;
  crepe: string;
}

export default function UpdatePricesScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  
  // Blockchain hook for recording prices
  const { recordPrice, isLoading: isRecordingBlockchain } = usePriceRecords();
  
  const [prices, setPrices] = useState<Prices>({
    rss3: '',
    tsr20: '',
    latex: '',
    crepe: '',
  });

  const [customGrades, setCustomGrades] = useState<CustomGrade[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingPrices, setFetchingPrices] = useState(true);
  const [effectiveFromDate, setEffectiveFromDate] = useState<Date>(new Date());
  const [effectiveToDate, setEffectiveToDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7); // Default to 7 days validity
    return tomorrow;
  });
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [activeDatePicker, setActiveDatePicker] = useState<'from' | 'to'>('from');

  // Fetch existing prices on component mount
  useEffect(() => {
    fetchLatestPrices();
  }, []);

  const fetchLatestPrices = async () => {
    try {
      setFetchingPrices(true);
      const response = await buyerPricesApi.getMyLatestPrices();
      
      if (response.success && response.prices) {
        const newPrices: Prices = { rss3: '', tsr20: '', latex: '', crepe: '' };
        const customGradesList: CustomGrade[] = [];
        
        response.prices.forEach((item) => {
          if (item.grade === 'custom') {
            customGradesList.push({
              id: `custom_${item.id}`,
              name: item.custom_grade_name || '',
              price: item.price
            });
          } else if (item.grade in newPrices) {
            newPrices[item.grade as keyof Prices] = item.price;
          }
        });
        
        setPrices(newPrices);
        setCustomGrades(customGradesList);
        
        // Set notes from the first price if available
        if (response.prices.length > 0 && response.prices[0].notes) {
          setNotes(response.prices[0].notes);
        }
      }
    } catch (error: any) {
      console.error('Error fetching prices:', error);
      Alert.alert(
        t.common.error, 
        error.message || t.buyer.failedToLoadPrices
      );
    } finally {
      setFetchingPrices(false);
    }
  };

  const handlePriceChange = (grade: keyof Prices, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setPrices(prev => ({ ...prev, [grade]: numericValue }));
  };

  const handleCustomPriceChange = (id: string, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setCustomGrades(prev => 
      prev.map(grade => 
        grade.id === id ? { ...grade, price: numericValue } : grade
      )
    );
  };

  const addCustomGrade = () => {
    const newId = `custom_${Date.now()}`;
    setCustomGrades(prev => [...prev, { id: newId, name: '', price: '' }]);
  };

  const removeCustomGrade = (id: string) => {
    setCustomGrades(prev => prev.filter(grade => grade.id !== id));
  };

  const updateCustomGradeName = (id: string, name: string) => {
    setCustomGrades(prev => 
      prev.map(grade => 
        grade.id === id ? { ...grade, name } : grade
      )
    );
  };

  const handleSubmit = () => {
    const hasStandardPrice = Object.values(prices).some(price => price !== '');
    const hasCustomPrice = customGrades.some(grade => grade.name && grade.price);
    
    if (!hasStandardPrice && !hasCustomPrice) {
      Alert.alert(t.common.error, t.buyer.pleaseEnterAtLeastOnePrice);
      return;
    }

    const incompleteCustom = customGrades.some(grade => 
      (grade.name && !grade.price) || (!grade.name && grade.price)
    );
    
    if (incompleteCustom) {
      Alert.alert(t.common.error, t.buyer.pleaseCompleteAllCustomGradeFields);
      return;
    }

    const isToday = effectiveFromDate.toDateString() === new Date().toDateString();
    const effectiveFromStr = effectiveFromDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const effectiveToStr = effectiveToDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const durationDays = Math.ceil((effectiveToDate.getTime() - effectiveFromDate.getTime()) / (1000 * 60 * 60 * 24));

    Alert.alert(
      t.buyer.confirmPriceUpdate,
      isToday 
        ? `${t.buyer.sureUpdatePrices}\n\n${t.buyer.from}: ${effectiveFromStr}\n${t.buyer.to}: ${effectiveToStr}\n(${durationDays} ${t.buyer.days})\n\n${t.buyer.visibleToFarmersImmediately}`
        : `${t.buyer.sureUpdatePrices}\n\n${t.buyer.from}: ${effectiveFromStr}\n${t.buyer.to}: ${effectiveToStr}\n(${durationDays} ${t.buyer.days})\n\n${t.buyer.willBecomeActiveOnStartDate}`,
      [
        { text: t.common.cancel, style: 'cancel' },
        { 
          text: t.common.ok, 
          onPress: () => submitPricesToBackend()
        },
      ]
    );
  };

  const submitPricesToBackend = async () => {
    setLoading(true);
    
    try {
      const pricesArray: BuyerPriceInput[] = [];
      const formattedEffectiveFrom = effectiveFromDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const formattedEffectiveTo = effectiveToDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      // Add standard grades
      Object.entries(prices).forEach(([grade, price]) => {
        if (price && parseFloat(price) > 0) {
          pricesArray.push({
            grade,
            price: parseFloat(price),
            effective_from: formattedEffectiveFrom,
            effective_to: formattedEffectiveTo
          });
        }
      });
      
      // Add custom grades
      customGrades.forEach(grade => {
        if (grade.name && grade.price && parseFloat(grade.price) > 0) {
          pricesArray.push({
            grade: 'custom',
            custom_grade_name: grade.name,
            price: parseFloat(grade.price),
            effective_from: formattedEffectiveFrom,
            effective_to: formattedEffectiveTo
          });
        }
      });

      const response = await buyerPricesApi.bulkUpdatePrices({
        prices: pricesArray,
        notes: notes || undefined,
        effective_from: formattedEffectiveFrom,
        effective_to: formattedEffectiveTo
      });

      if (response.success) {
        // Also record prices to blockchain for transparency
        let blockchainSuccess = 0;
        let blockchainFailed = 0;
        
        for (const priceData of pricesArray) {
          try {
            const gradeId = priceData.grade === 'custom' 
              ? priceData.custom_grade_name || 'CUSTOM' 
              : priceData.grade.toUpperCase();
            
            // Convert price to smallest unit (multiply by 100 for 2 decimal places)
            const priceInSmallestUnit = Math.round(priceData.price * 100);
            
            await recordPrice({
              gradeId: gradeId,
              price: priceInSmallestUnit,
            });
            blockchainSuccess++;
          } catch (blockchainError) {
            console.log('Blockchain recording failed for', priceData.grade, blockchainError);
            blockchainFailed++;
          }
        }
        
        const blockchainMessage = blockchainSuccess > 0 
          ? `\n\n🔗 Blockchain: ${blockchainSuccess} prices recorded permanently.`
          : '';
        
        Alert.alert(
          t.common.success, 
          (response.message || t.buyer.pricesUpdatedSuccessfully) + blockchainMessage,
          [{ 
            text: t.common.ok,
            onPress: () => {
              console.log('Prices updated successfully');
              // Optionally refresh the data
              fetchLatestPrices();
            }
          }]
        );
      }
    } catch (error: any) {
      console.error('Error submitting prices:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to update prices. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    Alert.alert(
      t.buyer.clearAll,
      t.buyer.sureUpdatePrices,
      [
        { text: t.common.cancel, style: 'cancel' },
        { 
          text: t.buyer.clearAll, 
          style: 'destructive',
          onPress: () => {
            setPrices({ rss3: '', tsr20: '', latex: '', crepe: '' });
            setCustomGrades([]);
            setNotes('');
            setEffectiveFromDate(new Date());
            const defaultEndDate = new Date();
            defaultEndDate.setDate(defaultEndDate.getDate() + 7);
            setEffectiveToDate(defaultEndDate);
          }
        },
      ]
    );
  };

  // Show loading state while fetching prices
  if (fetchingPrices) {
    return (
      <View style={[styles.container, styles.centerContent, { paddingTop: insets.top + 16 }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.loadingText}>{t.buyer.loadingYourPrices}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" translucent />
      {/* Back Button Header */}
      <View style={[styles.backHeader, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            onPress={() => router.replace('/market-buyer')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#059669" />
          </TouchableOpacity>
          <Text style={styles.backHeaderTitle}>{t.buyer.updateRatesTitle}</Text>
          <View style={{ width: 32 }} />
        </View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { 
                paddingHorizontal: isTablet ? 32 : isSmallDevice ? 12 : 16,
                paddingBottom: Platform.OS === 'ios' ? 32 : 40
              }
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Info */}
            <View style={[styles.headerCard, isTablet && styles.headerCardTablet]}>
              <View style={[styles.headerIcon, isSmallDevice && styles.headerIconSmall]}>
                <Ionicons name="create" size={isSmallDevice ? 20 : 24} color="#059669" />
              </View>
              <View style={styles.headerContent}>
                <Text style={[
                  styles.headerTitle,
                  isSmallDevice && styles.headerTitleSmall,
                  isTablet && styles.headerTitleTablet
                ]}>
                  {t.buyer.updateRatesTitle}
                </Text>
                <Text style={[
                  styles.headerSubtitle,
                  isSmallDevice && styles.headerSubtitleSmall
                ]}>
                  {t.buyer.setTodaysPrices}
                </Text>
              </View>
            </View>

            {/* Date Range Section */}
            <View style={[styles.dateRangeSection, isTablet && styles.dateRangeSectionTablet]}>
              <Text style={[styles.dateRangeTitle, isSmallDevice && styles.dateRangeTitleSmall]}>
                {t.buyer.effectivePeriod}
              </Text>
              
              <View style={styles.dateRangeContainer}>
                {/* From Date */}
                <TouchableOpacity 
                  style={[styles.dateBanner, styles.dateRangeItem]}
                  onPress={() => {
                    setTempDate(effectiveFromDate);
                    setActiveDatePicker('from');
                    setShowFromDatePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.dateItemContent}>
                    <Text style={styles.dateLabel}>{t.buyer.from}</Text>
                    <View style={styles.dateValueRow}>
                      <Ionicons name="calendar-outline" size={isSmallDevice ? 14 : 16} color="#059669" />
                      <Text style={[styles.dateText, isSmallDevice && styles.dateTextSmall]}>
                        {effectiveFromDate.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-down" size={isSmallDevice ? 14 : 16} color="#64748b" />
                </TouchableOpacity>

                {/* Arrow */}
                <View style={styles.dateArrow}>
                  <Ionicons name="arrow-forward" size={20} color="#94a3b8" />
                </View>

                {/* To Date */}
                <TouchableOpacity 
                  style={[styles.dateBanner, styles.dateRangeItem]}
                  onPress={() => {
                    setTempDate(effectiveToDate);
                    setActiveDatePicker('to');
                    setShowToDatePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.dateItemContent}>
                    <Text style={styles.dateLabel}>{t.buyer.to}</Text>
                    <View style={styles.dateValueRow}>
                      <Ionicons name="calendar-outline" size={isSmallDevice ? 14 : 16} color="#dc2626" />
                      <Text style={[styles.dateText, isSmallDevice && styles.dateTextSmall]}>
                        {effectiveToDate.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-down" size={isSmallDevice ? 14 : 16} color="#64748b" />
                </TouchableOpacity>
              </View>
              
              {/* Duration Info */}
              <View style={styles.dateInfoRow}>
                <Ionicons name="time-outline" size={14} color="#64748b" />
                <Text style={styles.dateInfoText}>
                  {t.buyer.validFor} {Math.ceil((effectiveToDate.getTime() - effectiveFromDate.getTime()) / (1000 * 60 * 60 * 24))} {t.buyer.days}
                </Text>
              </View>
            </View>

            {/* Date Picker Modal for iOS / Inline for Android - From Date */}
            {Platform.OS === 'ios' ? (
              <Modal
                visible={showFromDatePicker}
                transparent
                animationType="slide"
              >
                <View style={styles.datePickerModalOverlay}>
                  <View style={styles.datePickerModalContent}>
                    <View style={styles.datePickerHeader}>
                      <TouchableOpacity onPress={() => setShowFromDatePicker(false)}>
                        <Text style={styles.datePickerCancel}>{t.common.cancel}</Text>
                      </TouchableOpacity>
                      <Text style={styles.datePickerTitle}>{t.buyer.selectStartDate}</Text>
                      <TouchableOpacity onPress={() => {
                        setEffectiveFromDate(tempDate);
                        // Ensure end date is after start date
                        if (tempDate >= effectiveToDate) {
                          const newEndDate = new Date(tempDate);
                          newEndDate.setDate(newEndDate.getDate() + 7);
                          setEffectiveToDate(newEndDate);
                        }
                        setShowFromDatePicker(false);
                      }}>
                        <Text style={styles.datePickerDone}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={tempDate}
                      mode="date"
                      display="spinner"
                      onChange={(event: DateTimePickerEvent, date?: Date) => {
                        if (date) setTempDate(date);
                      }}
                      minimumDate={new Date()}
                      style={{ width: '100%' }}
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              showFromDatePicker && (
                <DateTimePicker
                  value={effectiveFromDate}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    setShowFromDatePicker(false);
                    if (event.type === 'set' && date) {
                      setEffectiveFromDate(date);
                      // Ensure end date is after start date
                      if (date >= effectiveToDate) {
                        const newEndDate = new Date(date);
                        newEndDate.setDate(newEndDate.getDate() + 7);
                        setEffectiveToDate(newEndDate);
                      }
                    }
                  }}
                  minimumDate={new Date()}
                />
              )
            )}

            {/* Date Picker Modal for iOS / Inline for Android - To Date */}
            {Platform.OS === 'ios' ? (
              <Modal
                visible={showToDatePicker}
                transparent
                animationType="slide"
              >
                <View style={styles.datePickerModalOverlay}>
                  <View style={styles.datePickerModalContent}>
                    <View style={styles.datePickerHeader}>
                      <TouchableOpacity onPress={() => setShowToDatePicker(false)}>
                        <Text style={styles.datePickerCancel}>{t.common.cancel}</Text>
                      </TouchableOpacity>
                      <Text style={styles.datePickerTitle}>{t.buyer.selectEndDate}</Text>
                      <TouchableOpacity onPress={() => {
                        if (tempDate <= effectiveFromDate) {
                          Alert.alert(t.buyer.invalidDate, t.buyer.endDateMustBeAfterStartDate);
                          return;
                        }
                        setEffectiveToDate(tempDate);
                        setShowToDatePicker(false);
                      }}>
                        <Text style={styles.datePickerDone}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={tempDate}
                      mode="date"
                      display="spinner"
                      onChange={(event: DateTimePickerEvent, date?: Date) => {
                        if (date) setTempDate(date);
                      }}
                      minimumDate={new Date(effectiveFromDate.getTime() + 24 * 60 * 60 * 1000)}
                      style={{ width: '100%' }}
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              showToDatePicker && (
                <DateTimePicker
                  value={effectiveToDate}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    setShowToDatePicker(false);
                    if (event.type === 'set' && date) {
                      if (date <= effectiveFromDate) {
                        Alert.alert(t.buyer.invalidDate, t.buyer.endDateMustBeAfterStartDate);
                        return;
                      }
                      setEffectiveToDate(date);
                    }
                  }}
                  minimumDate={new Date(effectiveFromDate.getTime() + 24 * 60 * 60 * 1000)}
                />
              )
            )}

            {/* Price Input Section */}
            <View style={[styles.section, isTablet && styles.sectionTablet]}>
              <Text style={[
                styles.sectionTitle,
                isSmallDevice && styles.sectionTitleSmall,
                isTablet && styles.sectionTitleTablet
              ]}>
                Rubber Grades
              </Text>
              <Text style={[
                styles.sectionDescription,
                isSmallDevice && styles.sectionDescriptionSmall
              ]}>
                {t.buyer.enterBuyingPrices}
              </Text>

              {(['rss3', 'tsr20', 'latex', 'crepe'] as const).map((grade) => {
                const gradeLabels: Record<string, string> = {
                  rss3: t.buyer.rss3,
                  tsr20: t.buyer.tsr20,
                  latex: t.buyer.latex,
                  crepe: t.buyer.crepe
                };

                return (
                  <View 
                    key={grade}
                    style={[styles.inputCard, isTablet && styles.inputCardTablet]}
                  >
                    <View style={styles.inputHeader}>
                      <View style={styles.gradeInfo}>
                        <Text style={[
                          styles.gradeLabel,
                          isSmallDevice && styles.gradeLabelSmall
                        ]}>
                          {gradeLabels[grade]}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={[
                        styles.currencySymbol,
                        isSmallDevice && styles.currencySymbolSmall
                      ]}>
                        LKR
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          isSmallDevice && styles.inputSmall,
                          isTablet && styles.inputTablet
                        ]}
                        placeholder="0.00"
                        placeholderTextColor="#cbd5e1"
                        keyboardType="decimal-pad"
                        value={prices[grade]}
                        onChangeText={(value) => handlePriceChange(grade, value)}
                      />
                      <Text style={[
                        styles.unitText,
                        isSmallDevice && styles.unitTextSmall
                      ]}>
                        / kg
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Custom Grades Section */}
            {customGrades.length > 0 && (
              <View style={[styles.section, isTablet && styles.sectionTablet]}>
                <View style={styles.customHeader}>
                  <Text style={[
                    styles.sectionTitle,
                    isSmallDevice && styles.sectionTitleSmall,
                    isTablet && styles.sectionTitleTablet
                  ]}>
                    {t.buyer.customGrades}
                  </Text>
                  <Text style={styles.customCount}>{customGrades.length}</Text>
                </View>
                <Text style={[
                  styles.sectionDescription,
                  isSmallDevice && styles.sectionDescriptionSmall
                ]}>
                  {t.buyer.yourCustomRubberGrades}
                </Text>

                {customGrades.map((grade) => (
                  <View 
                    key={grade.id} 
                    style={[
                      styles.customInputCard,
                      isTablet && styles.customInputCardTablet
                    ]}
                  >
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeCustomGrade(grade.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="close-circle" size={isSmallDevice ? 20 : 24} color="#ef4444" />
                    </TouchableOpacity>
                    
                    <View style={styles.customNameWrapper}>
                      <Ionicons name="pricetag-outline" size={isSmallDevice ? 16 : 18} color="#64748b" />
                      <TextInput
                        style={[
                          styles.customNameInput,
                          isSmallDevice && styles.customNameInputSmall
                        ]}
                        placeholder={t.buyer.gradeNameExample}
                        placeholderTextColor="#cbd5e1"
                        value={grade.name}
                        onChangeText={(value) => updateCustomGradeName(grade.id, value)}
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <Text style={[
                        styles.currencySymbol,
                        isSmallDevice && styles.currencySymbolSmall
                      ]}>
                        LKR
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          isSmallDevice && styles.inputSmall,
                          isTablet && styles.inputTablet
                        ]}
                        placeholder="0.00"
                        placeholderTextColor="#cbd5e1"
                        keyboardType="decimal-pad"
                        value={grade.price}
                        onChangeText={(value) => handleCustomPriceChange(grade.id, value)}
                      />
                      <Text style={[
                        styles.unitText,
                        isSmallDevice && styles.unitTextSmall
                      ]}>
                        / kg
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Add Custom Grade Button */}
            <View style={[styles.addCustomSection, isTablet && styles.addCustomSectionTablet]}>
              <TouchableOpacity 
                style={[
                  styles.addCustomButton,
                  isTablet && styles.addCustomButtonTablet
                ]}
                onPress={addCustomGrade}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.addCustomIcon,
                  isSmallDevice && styles.addCustomIconSmall
                ]}>
                  <Ionicons name="add" size={isSmallDevice ? 18 : 22} color="#1A237E" />
                </View>
                <View style={styles.addCustomContent}>
                  <Text style={[
                    styles.addCustomTitle,
                    isSmallDevice && styles.addCustomTitleSmall
                  ]}>
                    {t.buyer.addCustomGrade}
                  </Text>
                  <Text style={[
                    styles.addCustomSubtitle,
                    isSmallDevice && styles.addCustomSubtitleSmall
                  ]}>
                    {t.buyer.addOtherRubberTypes}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={isSmallDevice ? 18 : 20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Notes Section */}
            <View style={[styles.section, isTablet && styles.sectionTablet]}>
              <Text style={[
                styles.sectionTitle,
                isSmallDevice && styles.sectionTitleSmall,
                isTablet && styles.sectionTitleTablet
              ]}>
                {t.buyer.additionalNotesOptional}
              </Text>
              <View style={[styles.notesCard, isTablet && styles.notesCardTablet]}>
                <TextInput
                  style={[
                    styles.notesInput,
                    isSmallDevice && styles.notesInputSmall
                  ]}
                  placeholder={t.buyer.addSpecialConditions}
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={notes}
                  onChangeText={setNotes}
                  maxLength={1000}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={[styles.actionButtons, isTablet && styles.actionButtonsTablet]}>
              <TouchableOpacity 
                style={[
                  styles.clearButton,
                  isTablet && styles.clearButtonTablet
                ]}
                onPress={clearAll}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Ionicons name="refresh-outline" size={isSmallDevice ? 18 : 20} color="#64748b" />
                <Text style={[
                  styles.clearButtonText,
                  isSmallDevice && styles.clearButtonTextSmall
                ]}>
                  {t.buyer.clearAll}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  isTablet && styles.submitButtonTablet
                ]}
                onPress={handleSubmit}
                activeOpacity={0.8}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#059669', '#10b981']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.submitGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <>
                      <Ionicons name="checkmark-circle" size={isSmallDevice ? 20 : 22} color="#ffffff" />
                      <Text style={[
                        styles.submitButtonText,
                        isSmallDevice && styles.submitButtonTextSmall,
                        isTablet && styles.submitButtonTextTablet
                      ]}>
                        {t.buyer.updatePrices}
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Info Footer */}
            <View style={[styles.infoFooter, isTablet && styles.infoFooterTablet]}>
              <Ionicons name="information-circle-outline" size={isSmallDevice ? 16 : 18} color="#64748b" />
              <Text style={[
                styles.infoText,
                isSmallDevice && styles.infoTextSmall
              ]}>
                {t.buyer.updatedPricesVisible}
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: '#f0fdf4',
    marginTop: 16,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#bbf7d0',
  },
  headerCardTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    padding: 24,
    marginTop: 24,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  headerTitleSmall: {
    fontSize: 16,
  },
  headerTitleTablet: {
    fontSize: 22,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    fontWeight: '500',
  },
  headerSubtitleSmall: {
    fontSize: 12,
    lineHeight: 17,
  },
  dateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  dateBannerTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateRangeSection: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateRangeSectionTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  dateRangeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  dateRangeTitleSmall: {
    fontSize: 14,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateRangeItem: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#f8fafc',
  },
  dateArrow: {
    paddingHorizontal: 4,
  },
  dateItemContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A237E',
  },
  dateTextSmall: {
    fontSize: 12,
  },
  dateInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
    gap: 6,
  },
  dateInfoText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  datePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  datePickerCancel: {
    fontSize: 16,
    color: '#64748b',
  },
  datePickerDone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  section: {
    marginTop: 28,
  },
  sectionTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  sectionTitleSmall: {
    fontSize: 18,
  },
  sectionTitleTablet: {
    fontSize: 24,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    fontWeight: '500',
  },
  sectionDescriptionSmall: {
    fontSize: 13,
  },
  inputCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputCardTablet: {
    padding: 20,
    borderRadius: 16,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A237E',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  gradeLabelSmall: {
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b',
    marginRight: 8,
  },
  currencySymbolSmall: {
    fontSize: 14,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    paddingVertical: 10,
  },
  inputSmall: {
    fontSize: 20,
    paddingVertical: 8,
  },
  inputTablet: {
    fontSize: 28,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 8,
  },
  unitTextSmall: {
    fontSize: 12,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  customCount: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    backgroundColor: '#1A237E',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  customInputCard: {
    backgroundColor: '#fefce8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#fde047',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#eab308',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  customInputCardTablet: {
    padding: 20,
    borderRadius: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  customNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fde047',
    marginBottom: 12,
    gap: 10,
  },
  customNameInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    paddingVertical: 10,
  },
  customNameInputSmall: {
    fontSize: 14,
    paddingVertical: 8,
  },
  addCustomSection: {
    marginTop: 8,
  },
  addCustomSectionTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  addCustomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  addCustomButtonTablet: {
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  addCustomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addCustomIconSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  addCustomContent: {
    flex: 1,
  },
  addCustomTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  addCustomTitleSmall: {
    fontSize: 14,
  },
  addCustomSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  addCustomSubtitleSmall: {
    fontSize: 11,
  },
  notesCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  notesCardTablet: {
    padding: 16,
    borderRadius: 14,
  },
  notesInput: {
    fontSize: 14,
    color: '#0f172a',
    minHeight: 80,
    fontWeight: '500',
  },
  notesInputSmall: {
    fontSize: 13,
    minHeight: 70,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 12,
  },
  actionButtonsTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    gap: 16,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  clearButtonTablet: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748b',
  },
  clearButtonTextSmall: {
    fontSize: 14,
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonTablet: {
    maxWidth: 400,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  submitButtonTextSmall: {
    fontSize: 14,
  },
  submitButtonTextTablet: {
    fontSize: 18,
  },
  infoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    gap: 8,
  },
  infoFooterTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  infoTextSmall: {
    fontSize: 11,
  },
});

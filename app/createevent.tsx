import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
  Switch,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { createEvent } from '../config/eventApi';


export default function CreateEventScreen() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // New state for is_active and is_cancelled
  const [isActive, setIsActive] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(t.createEvent.permissionDenied, t.createEvent.permissionDeniedMessage);
      return;
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });


    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };


  const handleCreateEvent = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert(t.common.error, t.createEvent.enterEventTitle);
      return;
    }


    if (!description.trim()) {
      Alert.alert(t.common.error, t.createEvent.enterEventDescription);
      return;
    }


    if (eventDate <= new Date()) {
      Alert.alert(t.common.error, t.createEvent.eventDateMustBeFuture);
      return;
    }

    // Validation for is_active and is_cancelled
    if (!isActive && !isCancelled) {
      Alert.alert(
        t.createEvent.invalidStatusTitle,
        t.createEvent.invalidStatusMessage
      );
      return;
    }

    if (isActive && isCancelled) {
      Alert.alert(
        t.createEvent.conflictingStatusTitle,
        t.createEvent.conflictingStatusMessage
      );
      return;
    }

    // Warning for cancelled events
    if (isCancelled) {
      Alert.alert(
        t.createEvent.cancelledEventWarningTitle,
        t.createEvent.cancelledEventWarningDesc,
        [
          { text: t.common.no, style: 'cancel' },
          { text: t.common.yes, onPress: () => proceedWithCreation() }
        ]
      );
      return;
    }

    await proceedWithCreation();
  };

  const proceedWithCreation = async () => {
    try {
      setLoading(true);


      const eventData = {
        title: title.trim(),
        description: description.trim(),
        event_date: eventDate.toISOString(),
        location: location.trim() || undefined,
        contact_number: contactNumber.trim() || undefined,
        max_participants: maxParticipants ? parseInt(maxParticipants) : undefined,
        image: imageUri || undefined,
        is_active: isActive,
        is_cancelled: isCancelled,
      };


      console.log('📤 Creating event:', eventData);


      const newEvent = await createEvent(eventData, accessToken!);


      console.log('✅ Event created with ID:', newEvent.id);


      Alert.alert(
        t.createEvent.successTitle, 
        t.createEvent.successMessage, 
        [
          { 
            text: t.common.ok, 
            onPress: () => router.back()
          }
        ]
      );
    } catch (error: any) {
      console.error('❌ Create event error:', error.response?.data);
      
      const errorData = error.response?.data;
      let errorMessage = t.createEvent.failedToCreateEvent;
      
      if (errorData) {
        if (errorData.event_date) {
          errorMessage = Array.isArray(errorData.event_date) 
            ? errorData.event_date[0] 
            : errorData.event_date;
        } else if (errorData.title) {
          errorMessage = Array.isArray(errorData.title) 
            ? errorData.title[0] 
            : errorData.title;
        } else if (errorData.description) {
          errorMessage = Array.isArray(errorData.description) 
            ? errorData.description[0] 
            : errorData.description;
        } else if (errorData.is_active) {
          errorMessage = Array.isArray(errorData.is_active) 
            ? errorData.is_active[0] 
            : errorData.is_active;
        } else if (errorData.is_cancelled) {
          errorMessage = Array.isArray(errorData.is_cancelled) 
            ? errorData.is_cancelled[0] 
            : errorData.is_cancelled;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
      
      Alert.alert(t.common.error, errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(eventDate);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setEventDate(newDate);
    }
  };


  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(eventDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setEventDate(newDate);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" translucent />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.createEvent.headerTitle}</Text>
        <View style={{ width: 44 }} />
      </View>


      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}>
        {/* Event Image */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="camera-plus" size={40} color="#999" />
              <Text style={styles.imagePlaceholderText}>{t.createEvent.eventImage}</Text>
            </View>
          )}
        </TouchableOpacity>


        {/* Title */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.eventTitleRequired}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={t.createEvent.eventTitlePlaceholder}
            placeholderTextColor="#999"
            maxLength={200}
          />
        </View>


        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.descriptionRequired}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder={t.createEvent.descriptionPlaceholder}
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>


        {/* Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.eventDateRequired}</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons name="calendar" size={20} color="#007AFF" />
            <Text style={styles.dateText}>
              {eventDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </TouchableOpacity>
        </View>


        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={new Date()}
            onChange={onDateChange}
          />
        )}


        {/* Time */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.eventTimeRequired}</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <MaterialCommunityIcons name="clock-outline" size={20} color="#007AFF" />
            <Text style={styles.dateText}>
              {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>


        {showTimePicker && (
          <DateTimePicker
            value={eventDate}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}


        {/* Location */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.locationOptional}</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder={t.createEvent.locationPlaceholder}
            placeholderTextColor="#999"
            maxLength={255}
          />
        </View>


        {/* Contact Number */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.contactNumberOptional}</Text>
          <TextInput
            style={styles.input}
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder={t.createEvent.contactNumberPlaceholder}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={20}
          />
        </View>


        {/* Max Participants */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.createEvent.maxParticipantsOptional}</Text>
          <TextInput
            style={styles.input}
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            placeholder={t.createEvent.maxParticipantsPlaceholder}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Event Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.statusSectionTitle}>{t.createEvent.eventStatus}</Text>
          
          {/* Is Active Toggle */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <MaterialCommunityIcons 
                name={isActive ? "check-circle" : "close-circle"} 
                size={20} 
                color={isActive ? "#00822C" : "#999"} 
              />
              <Text style={styles.switchLabel}>{t.createEvent.eventIsActive}</Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
              thumbColor={isActive ? '#00822C' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.helperText}>
            {t.createEvent.activeEventsVisible}
          </Text>

          {/* Is Cancelled Toggle */}
          <View style={[styles.switchRow, { marginTop: 16 }]}>
            <View style={styles.switchLabelContainer}>
              <MaterialCommunityIcons 
                name={isCancelled ? "cancel" : "check"} 
                size={20} 
                color={isCancelled ? "#DC2626" : "#999"} 
              />
              <Text style={styles.switchLabel}>{t.createEvent.eventIsCancelled}</Text>
            </View>
            <Switch
              value={isCancelled}
              onValueChange={setIsCancelled}
              trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
              thumbColor={isCancelled ? '#DC2626' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.helperText}>
            {t.createEvent.cancelledEventsCannot}
          </Text>

          {/* Warning Message */}
          {(!isActive || isCancelled) && (
            <View style={styles.warningBox}>
              <MaterialCommunityIcons name="alert" size={20} color="#F59E0B" />
              <Text style={styles.warningText}>
                {!isActive && isCancelled 
                  ? t.createEvent.warningBothInactiveAndCancelled
                  : !isActive 
                  ? t.createEvent.warningInactiveOnly
                  : t.createEvent.warningCancelledOnly}
              </Text>
            </View>
          )}
        </View>


        {/* Create Button */}
        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateEvent}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <MaterialCommunityIcons name="plus-circle" size={20} color="#FFF" />
              <Text style={styles.createButtonText}>{t.createEvent.createEventButton}</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  backButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#F5F5F7', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    color: '#333' 
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  dateButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
  },
  dateText: { fontSize: 16, color: '#333', marginLeft: 12, flex: 1 },
  statusSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statusSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginLeft: 28,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
  },
  createButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#00822C', 
    borderRadius: 12, 
    padding: 16, 
    marginTop: 20 
  },
  createButtonDisabled: { opacity: 0.6 },
  createButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF', marginLeft: 8 },
});

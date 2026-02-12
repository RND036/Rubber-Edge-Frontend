// app/(auth)/signup.tsx
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sendOTP } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';


// Districts from Django model
const DISTRICTS = [
  'Kalutara',
  'Galle',
  'Matara',
  'Ratnapura',
  'Kegalle',
  'Moneragala',
  'Ampara',
  'Badulla',
  'Kandy',
  'Colombo',
  'Gampaha',
  'Kurunegala',
];


// Farm locations organized by district
const FARM_LOCATIONS: Record<string, string[]> = {
  Kalutara: ['Horana', 'Bandaragama', 'Matugama', 'Agalawatta', 'Bulathsinhala', 'Palindanuwara'],
  Galle: ['Elpitiya', 'Baddegama', 'Neluwa', 'Udugama', 'Yakkalamulla', 'Nagoda'],
  Matara: ['Akuressa', 'Deniyaya', 'Kotapola', 'Hakmana', 'Pasgoda', 'Morawaka'],
  Ratnapura: ['Eheliyagoda', 'Kuruwita', 'Kalawana', 'Ayagama', 'Nivithigala', 'Pelmadulla'],
  Kegalle: ['Deraniyagala', 'Yatiyanthota', 'Ruwanwella', 'Bulathkohupitiya', 'Aranayake', 'Mawanella'],
  Moneragala: ['Wellawaya', 'Buttala', 'Medagama', 'Bibile', 'Siyambalanduwa', 'Madulla'],
  Ampara: ['Uhana', 'Sammanthurai', 'Kalmunai', 'Padiyathalawa', 'Damana', 'Lahugala'],
  Badulla: ['Passara', 'Ella', 'Hali-Ela', 'Bandarawela', 'Welimada', 'Lunugala'],
  Kandy: ['Galagedara', 'Kadugannawa', 'Peradeniya', 'Akurana', 'Deltota', 'Nawalapitiya'],
  Colombo: ['Homagama', 'Padukka', 'Hanwella', 'Avissawella', 'Seethawaka', 'Kesbewa'],
  Gampaha: ['Dompe', 'Attanagalla', 'Mirigama', 'Divulapitiya', 'Minuwangoda', 'Veyangoda'],
  Kurunegala: ['Mawathagama', 'Polgahawela', 'Alawwa', 'Pannala', 'Narammala', 'Ridigama'],
};


const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'farmer' | 'buyer' | 'officer'>('farmer');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();


  // Farmer-specific fields
  const [nicNumber, setNicNumber] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [landArea, setLandArea] = useState('');


  // Buyer-specific fields
  const [companyName, setCompanyName] = useState('');
  const [businessRegNumber, setBusinessRegNumber] = useState('');


  // Officer-specific fields
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');


  const formatPhone = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('94')) cleaned = cleaned.substring(2);
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return cleaned.length > 0 ? '0' + cleaned : '';
  };


  const getAPIFormat = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return '+94' + cleaned;
  };


  const validatePhone = (phone: string) => {
    return /^0[7][0-9]{8}$/.test(phone.replace(/\D/g, ''));
  };


  const handleSendOTP = async () => {
    // Validate all fields first
    if (!fullName.trim()) {
      Alert.alert(t.common.error, t.auth.enterFullName);
      return;
    }


    if (!validatePhone(phoneNumber)) {
      Alert.alert(t.auth.invalidPhone, t.auth.invalidPhoneMessage);
      return;
    }


    // Build and validate profile data based on role
    let profileData: any = {};


    if (accountType === 'farmer') {
      if (!nicNumber || !farmLocation || !district || !landArea) {
        Alert.alert(t.common.error, t.auth.fillAllFarmerDetails);
        return;
      }
      profileData = {
        name: fullName,
        nic_number: nicNumber,
        farm_location: farmLocation,
        district: district,
        land_area: landArea,
      };
    } else if (accountType === 'buyer') {
      if (!companyName || !businessRegNumber) {
        Alert.alert(t.common.error, t.auth.fillAllBuyerDetails);
        return;
      }
      profileData = {
        name: fullName,
        company_name: companyName,
        business_reg_number: businessRegNumber,
      };
    } else if (accountType === 'officer') {
      if (!employeeId || !department) {
        Alert.alert(t.common.error, t.auth.fillAllOfficerDetails);
        return;
      }
      profileData = {
        name: fullName,
        employee_id: employeeId,
        department: department,
      };
    }


    setLoading(true);
    try {
      const formattedPhone = getAPIFormat(phoneNumber);
      await sendOTP(formattedPhone);
      
      // Navigate to OTP verification screen
      router.push({
        pathname: '/(auth)/verify-otp',
        params: {
          phoneNumber: formattedPhone,
          accountType: accountType,
          profileData: JSON.stringify(profileData),
        },
      });
    } catch (error: any) {
      Alert.alert(t.common.error, error.message || t.auth.failedToSendOtp);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />


      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View className="items-center mt-8 mb-8">
          <Image
            source={require('../../assets/images/logosvg.gif')}
            className="w-28 h-28 mb-2"
            resizeMode="contain"
          />
          <Text className="text-base font-semibold text-black tracking-wider">
            RUBBER EDGE
          </Text>
        </View>


        <View className="px-8">
          <Text className="text-3xl font-bold text-[#2D7A4F] text-center mb-2">
            {t.auth.signUp}
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8">
            {t.auth.createNewAccount}
          </Text>


          {/* Full Name */}
          <View className="flex-row items-center bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4">
            <Ionicons name="person-outline" size={24} color="#2D7A4F" />
            <TextInput
              className="flex-1 text-base text-[#2D7A4F] font-medium ml-3"
              placeholder={t.auth.fullName}
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#999"
            />
          </View>


          {/* Account Type Picker */}
          <View className="bg-[#E8F5E9] rounded-xl px-4 mb-4">
            <Picker
              selectedValue={accountType}
              onValueChange={(value: 'farmer' | 'buyer' | 'officer') => setAccountType(value)}
              style={{color: '#2D7A4F'}}>
              <Picker.Item label={t.auth.farmer} value="farmer" />
              <Picker.Item label={t.auth.buyer} value="buyer" />
              <Picker.Item label={t.auth.officer} value="officer" />
            </Picker>
          </View>

          {/* Conditional Fields Based on Role */}
          {accountType === 'farmer' && (
            <>
              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.nicNumber}
                value={nicNumber}
                onChangeText={setNicNumber}
                placeholderTextColor="#999"
              />
              
              {/* District Picker */}
              <View className="bg-[#E8F5E9] rounded-xl px-4 mb-4">
                <Picker
                  selectedValue={district}
                  onValueChange={(value: string) => {
                    setDistrict(value);
                    setFarmLocation(''); // Reset farm location when district changes
                  }}
                  style={{color: district ? '#2D7A4F' : '#999'}}>
                  <Picker.Item label={t.auth.selectDistrict} value="" color="#999" />
                  {DISTRICTS.map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>


              {/* Farm Location Picker */}
              <View className="bg-[#E8F5E9] rounded-xl px-4 mb-4">
                <Picker
                  selectedValue={farmLocation}
                  onValueChange={(value: string) => setFarmLocation(value)}
                  style={{color: farmLocation ? '#2D7A4F' : '#999'}}
                  enabled={!!district}>
                  <Picker.Item 
                    label={district ? t.auth.selectFarmLocation : t.auth.selectDistrictFirst} 
                    value="" 
                    color="#999" 
                  />
                  {district && FARM_LOCATIONS[district]?.map((loc) => (
                    <Picker.Item key={loc} label={loc} value={loc} />
                  ))}
                </Picker>
              </View>


              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.landAreaPlaceholder}
                value={landArea}
                onChangeText={setLandArea}
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </>
          )}


          {accountType === 'buyer' && (
            <>
              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.companyName}
                value={companyName}
                onChangeText={setCompanyName}
                placeholderTextColor="#999"
              />
              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.businessRegNumber}
                value={businessRegNumber}
                onChangeText={setBusinessRegNumber}
                placeholderTextColor="#999"
              />
            </>
          )}


          {accountType === 'officer' && (
            <>
              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.employeeId}
                value={employeeId}
                onChangeText={setEmployeeId}
                placeholderTextColor="#999"
              />
              <TextInput
                className="bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4 text-[#2D7A4F]"
                placeholder={t.auth.department}
                value={department}
                onChangeText={setDepartment}
                placeholderTextColor="#999"
              />
            </>
          )}


          {/* Phone Number */}
          <View className="flex-row items-center bg-[#E8F5E9] rounded-xl px-4 py-4 mb-4">
            <Ionicons name="call-outline" size={24} color="#2D7A4F" />
            <TextInput
              className="flex-1 text-base text-[#2D7A4F] font-medium ml-3"
              placeholder={t.auth.phonePlaceholder}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(formatPhone(text))}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              maxLength={10}
            />
          </View>


          {/* Continue Button */}
          <TouchableOpacity
            className="bg-[#2D7A4F] rounded-xl py-5 items-center justify-center shadow-md mb-6"
            onPress={handleSendOTP}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-lg font-bold text-white">{t.common.continue}</Text>
            )}
          </TouchableOpacity>


          {/* Sign In Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-sm text-gray-600">{t.auth.alreadyHaveAccount} </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
              <Text className="text-sm text-[#2D7A4F] font-semibold">{t.auth.signIn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default SignUpScreen;

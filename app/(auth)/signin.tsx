// app/(auth)/signin.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sendOTP } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  // Format phone number as user types
  const formatPhone = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('94')) cleaned = cleaned.substring(2);
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return cleaned.length > 0 ? '0' + cleaned : '';
  };

  // Convert to API format (+94XXXXXXXXX)
  const getAPIFormat = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return '+94' + cleaned;
  };

  // Validate Sri Lankan phone number
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return /^0[7][0-9]{8}$/.test(cleaned);
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!validatePhone(phoneNumber)) {
      Alert.alert(t.auth.invalidPhone, t.auth.invalidPhoneMessage);
      return;
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
          mode: 'login',
        },
      });
    } catch (error: any) {
      Alert.alert(t.common.error, error.message || t.auth.failedToSendOtp);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpPress = () => {
    router.push('/(auth)/signup');
  };

  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'si' : language === 'si' ? 'ta' : 'en';
    setLanguage(newLanguage);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'en': return 'EN';
      case 'si': return 'සි';
      case 'ta': return 'த';
      default: return 'EN';
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Subtle Background Decoration */}
      <View className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]">
        <View className="w-full h-full rounded-full bg-[#2D7A4F] -translate-y-1/3 translate-x-1/3" />
      </View>
      <View className="absolute bottom-0 left-0 w-56 h-56 opacity-[0.03]">
        <View className="w-full h-full rounded-full bg-[#2D7A4F] translate-y-1/3 -translate-x-1/3" />
      </View>

      <View className="flex-1" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* Language Button */}
        <View className="absolute top-6 right-6 z-10" style={{ paddingTop: insets.top }}>
          <TouchableOpacity
            onPress={handleLanguageChange}
            activeOpacity={0.7}
            className="bg-[#2D7A4F] rounded-full p-3 shadow-lg shadow-[#2D7A4F]/30"
          >
            <View className="flex-row items-center gap-1">
              <Ionicons name="language" size={18} color="#fff" />
              <Text className="text-white font-bold text-sm">{getLanguageLabel()}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center"
        >
          {/* Logo Section */}
          <View className="items-center mb-12">
            <View className="bg-white rounded-3xl p-3 shadow-sm">
              <Image
                source={require('../../assets/images/logosvg.gif')}
                className="w-28 h-28"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-bold text-gray-800 tracking-widest mt-4">
              RUBBER EDGE
            </Text>
            <Text className="text-xs text-gray-400 mt-1 tracking-wide">
              Smart Rubber Farming
            </Text>
          </View>

          {/* Sign In Form */}
          <View className="px-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-800 text-center">
                {t.auth.welcomeBack}
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2">
                {t.auth.enterPhoneToContine}
              </Text>
            </View>

            {/* Phone Number Input */}
            <View className="mb-4">
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                {t.auth.phoneNumber}
              </Text>
              <View 
                className={`flex-row items-center bg-gray-50 rounded-2xl px-5 py-4 border-2 ${
                  isFocused ? 'border-[#2D7A4F] bg-white' : 'border-transparent'
                }`}
              >
                <View className="bg-[#E8F5E9] p-2 rounded-xl mr-4">
                  <Ionicons name="call-outline" size={20} color="#2D7A4F" />
                </View>
                <Text className="text-gray-400 font-medium mr-2">+94</Text>
                <TextInput
                  className="flex-1 text-base text-gray-800 font-medium"
                  placeholder="7X XXX XXXX"
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(formatPhone(text))}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="phone-pad"
                  placeholderTextColor="#CBD5E1"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Remember Me */}
            <TouchableOpacity
              className="flex-row items-center mb-8 self-start"
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                className={`w-5 h-5 rounded-md mr-3 items-center justify-center ${
                  rememberMe 
                    ? 'bg-[#2D7A4F]' 
                    : 'border-2 border-gray-300 bg-white'
                }`}
              >
                {rememberMe && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text className="text-sm text-gray-600">{t.auth.keepMeSignedIn}</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleSendOTP}
              disabled={loading}
              activeOpacity={0.9}
              className="overflow-hidden rounded-2xl shadow-lg shadow-[#2D7A4F]/30"
            >
              <LinearGradient
                colors={['#3D9A6F', '#2D7A4F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="py-5 items-center justify-center flex-row"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text className="text-base font-bold text-white mr-2">
                      {t.common.continue}
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="text-xs text-gray-400 mx-4">{t.common.or}</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-sm text-gray-500">{t.auth.newToRubberEdge} </Text>
              <TouchableOpacity onPress={handleSignUpPress} activeOpacity={0.7}>
                <Text className="text-sm text-[#2D7A4F] font-bold">{t.auth.createAccount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Footer */}
        <View className="items-center pb-6">
          <Text className="text-xs text-gray-400">
            {t.auth.termsAgreement}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

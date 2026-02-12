// app/(auth)/verify-otp.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { login, register, sendOTP } from '../../services/api';

const VerifyOTPScreen = () => {
  const params = useLocalSearchParams();
  const phoneNumber = params.phoneNumber as string;
  const mode = (params.mode as 'login' | 'signup') || 'signup';
  const accountType = params.accountType as 'farmer' | 'buyer' | 'officer';
  const profileData = params.profileData ? JSON.parse(params.profileData as string) : {};
  const { login: authLogin } = useAuth();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (i + index < 6) {
          newOtp[i + index] = char;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await sendOTP(phoneNumber);
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      Alert.alert(t.common.success, t.auth.otpResent);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      Alert.alert(t.common.error, error.message || t.auth.failedToResendOtp);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert(t.common.error, t.auth.enterSixDigitOtp);
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    try {
      if (mode === 'login') {
        // Handle login
        const response = await login(phoneNumber, otpCode);
        
        // Save to auth context
        await authLogin(response.data.user, response.data.tokens);
        
        // Route based on role
        const role = response.data.user.role;
        if (role === 'farmer') {
          router.replace('/(tabs)');
        } else if (role === 'buyer') {
          router.replace('/(buyer)');
        } else if (role === 'officer') {
          router.replace('/(officer)');
        }
      } else {
        // Handle signup
        await register(phoneNumber, otpCode, accountType, profileData);
        Alert.alert(t.common.success, t.auth.registrationSuccess, [
          { text: t.common.ok, onPress: () => router.replace('/(auth)/signin') },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        mode === 'login' ? t.auth.loginFailed : t.auth.registrationFailed, 
        error.message || t.common.retry
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneDisplay = (phone: string) => {
    // Convert +94771234567 to 077 123 4567
    const local = phone.replace('+94', '0');
    return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      {/* Custom Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-[#E8F5E9] items-center justify-center"
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#2D7A4F" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-[#2D7A4F]">
            {mode === 'login' ? t.auth.verifyLogin : t.auth.verifyAccount}
          </Text>
        </View>
        <View className="w-10" />
      </View>

      <View className="flex-1 justify-center px-8">
        {/* Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-[#E8F5E9] rounded-full items-center justify-center mb-4">
            <Ionicons name="shield-checkmark-outline" size={48} color="#2D7A4F" />
          </View>
          <Text className="text-base text-gray-600 text-center">
            {t.auth.enterOtpCode}
          </Text>
          <Text className="text-base font-semibold text-[#2D7A4F] mt-1">
            {formatPhoneDisplay(phoneNumber)}
          </Text>
        </View>

        {/* OTP Input Boxes */}
        <View className="flex-row justify-between mb-8 px-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              className={`w-12 h-14 border-2 rounded-xl text-center text-2xl font-bold ${
                digit ? 'border-[#2D7A4F] bg-[#E8F5E9]' : 'border-gray-300 bg-gray-50'
              }`}
              style={{ color: '#2D7A4F' }}
              value={digit}
              onChangeText={value => handleOtpChange(value.replace(/[^0-9]/g, ''), index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={6}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          className={`rounded-xl py-4 items-center justify-center shadow-md mb-6 ${
            otp.join('').length === 6 ? 'bg-[#2D7A4F]' : 'bg-gray-300'
          }`}
          onPress={handleVerify}
          disabled={loading || otp.join('').length !== 6}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-lg font-bold text-white">
              {mode === 'login' ? t.auth.verifyAndLogIn : t.auth.verifyAndSignUp}
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <View className="items-center">
          <Text className="text-gray-500 mb-2">{t.auth.didntReceiveCode}</Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={timer > 0 || loading}>
            <Text
              className={`text-base font-semibold ${
                timer > 0 ? 'text-gray-400' : 'text-[#2D7A4F]'
              }`}>
              {timer > 0 ? `${t.auth.resendIn} ${timer}s` : t.auth.resendOtp}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VerifyOTPScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../context/translations';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const LanguageSelectionScreen = () => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const insets = useSafeAreaInsets();

  // Sync with context language on mount
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const languages: LanguageOption[] = [
    {
      code: 'en',
      name: t.languageSelection.english,
      nativeName: 'English',
      flag: '🇬🇧',
    },
    {
      code: 'si',
      name: t.languageSelection.sinhala,
      nativeName: 'සිංහල',
      flag: '🇱🇰',
    },
    {
      code: 'ta',
      name: t.languageSelection.tamil,
      nativeName: 'தமிழ்',
      flag: '🇱🇰',
    },
  ];

  const handleLanguageSelect = (code: Language) => {
    setSelectedLanguage(code);
  };

  const handleContinue = async () => {
    // Save selected language to context and storage
    await setLanguage(selectedLanguage);
    console.log('Selected language:', selectedLanguage);
    // Navigate to sign in or onboarding
    router.push('/(auth)/signin');
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <View className="flex-1 px-8">
        {/* Logo Section */}
        <View className="items-center mt-12 mb-8">
          <Image
            source={require('../../assets/images/logosvg.gif')}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <Text className="text-base font-semibold text-black tracking-wider">
            RUBBER EDGE
          </Text>
        </View>

        {/* Title */}
        <View className="mb-12">
          <Text className="text-3xl font-bold text-[#2D7A4F] text-center mb-2">
            {t.languageSelection.title}
          </Text>
          <Text className="text-base text-gray-600 text-center">
            {t.languageSelection.subtitle}
          </Text>
        </View>

        {/* Language Options */}
        <View className="mb-8">
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              className={`flex-row items-center justify-between bg-[#E8F5E9] rounded-xl px-6 py-5 mb-4 ${
                selectedLanguage === language.code ? 'border-2 border-[#2D7A4F]' : ''
              }`}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <View className="flex-row items-center">
                <Text className="text-4xl mr-4">{language.flag}</Text>
                <View>
                  <Text className="text-lg font-semibold text-[#2D7A4F]">
                    {language.name}
                  </Text>
                  <Text className="text-base text-[#2D7A4F] opacity-70">
                    {language.nativeName}
                  </Text>
                </View>
              </View>
              {selectedLanguage === language.code && (
                <Ionicons name="checkmark-circle" size={28} color="#2D7A4F" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-[#2D7A4F] rounded-xl py-5 items-center justify-center shadow-md"
          onPress={handleContinue}
        >
          <Text className="text-lg font-bold text-white">{t.common.continue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelectionScreen;

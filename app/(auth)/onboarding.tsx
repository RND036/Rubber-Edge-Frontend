import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

const { height, width } = Dimensions.get("window");

interface Page {
  color: string;
  titleKey: 'title1' | 'title2' | 'title3';
  lottie: any;
  descKey: 'desc1' | 'desc2' | 'desc3';
  skip: boolean;
}

const pagesConfig: Page[] = [
  {
    color: "#00822C",
    titleKey: "title1",
    lottie: require("../../assets/lottie/watering.json"),
    descKey: "desc1",
    skip: true,
  },
  {
    color: "#00822C",
    titleKey: "title2",
    lottie: require("../../assets/lottie/trackimprove.json"),
    descKey: "desc2",
    skip: true,
  },
  {
    color: "#00822C",
    titleKey: "title3",
    lottie: require("../../assets/lottie/Sales.json"),
    descKey: "desc3",
    skip: false,
  },
];

// Remove navigation prop since we're using Expo Router
const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<any>(null);
  const [activePage, setActivePage] = useState(0);
  const { t } = useLanguage();

  const handleNext = (): void => {
    if (activePage < pagesConfig.length - 1) {
      const nextPage = activePage + 1;
      scrollRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
      setActivePage(nextPage);
    }
  };

  const handleSkip = (): void => {
    const lastPage = pagesConfig.length - 1;
    scrollRef.current?.scrollTo({
      x: lastPage * width,
      animated: true,
    });
    setActivePage(lastPage);
  };

  const handleMomentumScrollEnd = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActivePage(pageIndex);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const getDotStyle = (index: number) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: ["#fdc2ae", "#FC6363", "#fdc2ae"],
      extrapolate: "clamp",
    });

    const widthDot = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [8, 42, 8],
      extrapolate: "clamp",
    });

    return { backgroundColor, width: widthDot };
  };

  return (
    <View className="flex-1">
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        ref={scrollRef}
        decelerationRate="fast"
      >
        {pagesConfig.map((page, index) => (
          <OnboardingPage
            key={index}
            page={page}
            index={index}
            onNext={handleNext}
            onSkip={handleSkip}
            t={t}
          />
        ))}
      </Animated.ScrollView>

      {/* Page Indicators */}
      <View
        className="absolute flex-row justify-center mt-4 "
        style={{ top: height / 1.75, width }}
      >
        {pagesConfig.map((_, index) => {
          const dotStyle = getDotStyle(index);
          return (
            <Animated.View
              key={index}
              className="h-3 rounded-full mx-1"
              style={[dotStyle]}
            />
          );
        })}
      </View>
    </View>
  );
};

interface OnboardingPageProps {
  page: Page;
  index: number;
  onNext: () => void;
  onSkip: () => void;
  t: any;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({
  page,
  index,
  onNext,
  onSkip,
  t,
}) => {
  const insets = useSafeAreaInsets();
  
  const handleGetStarted = () => {
    // Use Expo Router navigation
    router.push('/language'); // or router.replace('/signin') to replace current screen
  };

  return (
    <View
      className="flex-1 items-center justify-start"
      style={[{ backgroundColor: page.color, width, paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      {/* Lottie Animation Section */}
      <View
        className="justify-center items-center"
        style={{ height: height / 1.86 }}
      >
        <LottieView
          source={page.lottie}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      </View>

      {/* Content Container */}
      <View
        className="absolute bottom-0 w-full bg-white px-11 pt-16 justify-between"
        style={{
          height: height / 2.16,
          borderTopLeftRadius: index === 0 ? 100 : 0,
          borderTopRightRadius: index === pagesConfig.length - 1 ? 100 : 0,
        }}
      >
        <View>
          <Text className="text-black text-3xl font-bold text-center mb-4">
            {t.onboarding[page.titleKey]}
          </Text>
          <Text className="text-gray-700 text-large text-justify leading-6">
            {t.onboarding[page.descKey]}
          </Text>
        </View>

        {/* Button Section */}
        <View className="pb-20 px-4">
          {page.skip ? (
            <View className="flex-row justify-between items-center w-full">
              <TouchableOpacity onPress={onSkip} className="py-2">
                <Text className="text-base text-gray-700">{t.onboarding.skipNow}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onNext}
                className="w-50 h-30 rounded-full justify-center items-center p-2"
                style={{ backgroundColor: page.color }}
              >
                <Entypo name="arrow-long-right" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleGetStarted} // Updated to use Expo Router
              className="w-full py-4 rounded-lg items-center"
              style={{ backgroundColor: page.color }}
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-bold">{t.onboarding.getStarted}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface SplashScreenProps {
  onAnimationFinish: () => Promise<void> | void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Start looping animation
    animationRef.current?.play();

    // After 3 seconds, stop and go to onboarding
    const timer = setTimeout(() => {
      animationRef.current?.pause(); // freeze where it is
      onAnimationFinish?.();
    }, 3000); // Changed from 500ms to 3000ms (3 seconds)

    return () => clearTimeout(timer);
  }, [onAnimationFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require('../assets/lottie/logo.json')}
        autoPlay={false}   // controlled manually             // keep looping while active
        speed={0.8}        // slower playback
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;

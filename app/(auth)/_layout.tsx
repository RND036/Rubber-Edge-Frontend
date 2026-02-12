import { Stack } from 'expo-router';

const AuthLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="verify-otp" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
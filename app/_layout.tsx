import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ToastProvider } from "react-native-toast-notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name="(router)/welcome-intro/index" />
        <Stack.Screen name="(router)/login/index" />
        <Stack.Screen name="(router)/signUp/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ToastProvider>
  );
}











































































{/* <View style={{ flex: 1 }}>
{isLoggedIn ? (
  <View>
  </View>
) : (
  <View>
  </View>
)}
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="auth/register" options={{ headerShown: true, title: 'Register' }} />
</Stack>
</View> */}
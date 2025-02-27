import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, createContext} from 'react';
import 'react-native-reanimated';
import {CharacterInfoProvider} from "@/components/characterUpdater";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


 export const ThingBadName  = createContext<string>("testString");



export default function RootLayout() {
  const colorScheme = "dark";
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ThingBadName.Provider value = "test string  tual used words">
              <CharacterInfoProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
              </CharacterInfoProvider>
          </ThingBadName.Provider>
        </ThemeProvider>
  );
}

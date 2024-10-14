import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalTheme } from "./constants/theme";
import Test from "./components/Test";
import BottomTabs from "./components/bottomTabs/BottomTabs";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import ManageAlarm from "./screens/ManageAlarm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthCheck } from "./components/Auth/AuthCheck/AuthCheck";

const Stack = createNativeStackNavigator();

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const [fontLoaded] = useFonts({
    pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "pretendard-bold": require("./assets/fonts/Pretendard-Bold.otf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthCheck />
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}

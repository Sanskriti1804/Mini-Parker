import { Stack } from "expo-router";

// Root stack: auth, tabs, and ride-booking screens
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="find-ride" />
      <Stack.Screen name="confirm-ride" />
      <Stack.Screen name="book-ride" />
    </Stack>
  );
}

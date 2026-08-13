import {Stack, Tabs} from "expo-router";
import Home from "@/app/(root)/(tabs)/home";
import {View , Image} from "react-native"

const TabIcon = () => (
    <View>
        <Image />
    </View>
)

export default function Layout() {
  // return (
  //   <Stack screenOptions={{ headerShown: false }} initialRouteName="(auth)">
  //     <Stack.Screen name="(auth)" />
  //     <Stack.Screen name="(tabs)" />
  //   </Stack>
  // );

    <Tabs initialRouteName="index" screenOptions={{tabBarActiveTintColor : "white" }}>
        <Tabs.Screen name="Home" options={{
            title: "Home",
            headerShown: false,
            tabBarIcon : () => <TabIcon/>
        }} />
        <Tabs.Screen name="Chat" options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon : () => <TabIcon/>
        }} />
        <Tabs.Screen name="Ride" options={{
            title: "Ride",
            headerShown: false,
            tabBarIcon : () => <TabIcon/>
        }} />
        <Tabs.Screen name="Profile" options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon : () => <TabIcon/>
        }} />
    </Tabs>
}

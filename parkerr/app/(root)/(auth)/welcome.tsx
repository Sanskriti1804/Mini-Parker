import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Onboarding</Text>
        <Text style={styles.subtitle}>Welcome to Parker</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Jakarta-Bold",
    fontSize: 28,
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Jakarta-Medium",
    fontSize: 16,
    color: "#6B7280",
  },
});

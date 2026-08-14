import { Redirect, type Href } from "expo-router";

// DEV ONLY: change this to jump straight to a screen for testing (auth flow stays unchanged)
// Examples: "/welcome" | "/sign-in" | "/sign-up" | "/home" | "/ride" | "/chat" | "/profile"
const TEST_START_SCREEN: Href = "/welcome";

export default function Index() {
  // First screen of the app — swap TEST_START_SCREEN above to test any route
  return <Redirect href={TEST_START_SCREEN} />;
}

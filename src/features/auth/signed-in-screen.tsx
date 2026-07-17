import { useAuth, useUser } from "@clerk/expo";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PressableScale } from "@/components/pressable-scale";
import { shared, signedIn } from "@/copies";
import { components, fonts, palette, spacing, typeScale } from "@/theme";

import { GateMark } from "./components/gate-mark";

/** Shown while Clerk has an active session. Mirrors the gate's identity block. */
export function SignedInScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <View style={components.screen}>
      <SafeAreaView style={styles.fill} edges={["top", "bottom"]}>
        <GateMark title={shared.brand.name} eyebrow={signedIn.eyebrow} />

        <View style={styles.body}>
          <Text style={styles.greeting}>{signedIn.greeting}</Text>
          {email ? <Text style={styles.email}>{email}</Text> : null}

          <PressableScale
            accessibilityRole="button"
            onPress={() => signOut()}
            style={[components.buttonGhost, styles.signOut]}
          >
            <Text style={styles.signOutText}>{signedIn.signOut}</Text>
          </PressableScale>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: 30,
  },
  greeting: { ...typeScale.title, color: palette.paper100, marginBottom: spacing.xs },
  email: {
    fontFamily: fonts.numeral,
    fontSize: 14,
    letterSpacing: 0.5,
    color: palette.nano400,
    marginBottom: spacing.xl,
  },
  signOut: { alignSelf: "stretch" },
  signOutText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: palette.paper100,
    letterSpacing: 0.3,
  },
});

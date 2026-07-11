import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { Field } from "@/components/field";
import { LabelledDivider } from "@/components/labelled-divider";
import { PressableScale } from "@/components/pressable-scale";
import { login, shared } from "@/copies";
import { components, fonts, palette, spacing, typeScale } from "@/theme";

import { GateMark } from "./components/gate-mark";
import { ProviderButtons, type Provider } from "./components/provider-buttons";
import { useLoginForm } from "./hooks/use-login-form";

export function LoginScreen() {
  // TODO: pass an authenticate handler once a session layer exists.
  const {
    credentials,
    setName,
    setMantra,
    revealed,
    toggleReveal,
    canSubmit,
    submit,
  } = useLoginForm();

  function selectProvider(_provider: Provider) {
    // TODO: federated sign-in.
  }

  return (
    <View style={components.screen}>
      <SafeAreaView style={styles.fill} edges={["top", "bottom"]}>
        <KeyboardAwareScrollView
          style={styles.fill}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          enableResetScrollToCoords={false}
          extraScrollHeight={24}
          bounces={false}
        >
          <GateMark title={shared.brand.name} eyebrow={login.eyebrow} />

          <View style={styles.form}>
            <View style={styles.fields}>
              <Field
                label={login.fields.name}
                value={credentials.name}
                onChangeText={setName}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
              />
              <Field
                label={login.fields.mantra}
                value={credentials.mantra}
                onChangeText={setMantra}
                secureTextEntry={!revealed}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={submit}
                style={!revealed && styles.obscured}
                trailing={
                  <PressableScale
                    accessibilityRole="button"
                    onPress={toggleReveal}
                    hitSlop={10}
                  >
                    <Text style={styles.reveal}>
                      {revealed ? login.reveal.hide : login.reveal.show}
                    </Text>
                  </PressableScale>
                }
              />
            </View>

            <PressableScale
              accessibilityRole="button"
              onPress={submit}
              disabled={!canSubmit}
              style={[
                components.buttonPrimary,
                styles.submit,
                !canSubmit && styles.submitIdle,
              ]}
            >
              <Text style={components.buttonPrimaryText}>{login.submit}</Text>
            </PressableScale>

            <Text style={styles.helper}>
              {login.forgot.prompt}{" "}
              <Text style={styles.link}>{login.forgot.action}</Text>
            </Text>

            <LabelledDivider
              label={login.providersDivider}
              style={styles.divider}
            />
            <ProviderButtons onSelect={selectProvider} />

            <Text style={styles.footer}>
              {login.register.prompt}{" "}
              <Text style={styles.link}>{login.register.action}</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  scroll: { flexGrow: 1 },

  form: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 30,
    flex: 1,
    justifyContent: "flex-end",
  },
  fields: { gap: spacing.sm + 2 },
  obscured: { letterSpacing: 3 },
  reveal: {
    fontFamily: fonts.numeral,
    fontSize: 10.5,
    letterSpacing: 1,
    color: palette.nano400,
  },

  submit: { marginTop: 18 },
  submitIdle: { opacity: 0.45 },

  helper: {
    ...typeScale.caption,
    letterSpacing: 0,
    textAlign: "center",
    color: palette.paper600,
    marginTop: spacing.md,
  },
  link: { fontFamily: fonts.bodyBold, color: palette.gold500 },

  divider: { marginTop: spacing.xl - 4, marginBottom: 14 },

  footer: {
    ...typeScale.body,
    fontSize: 13,
    textAlign: "center",
    color: palette.paper400,
    marginTop: spacing.xl - 4,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: palette.goldRuleFaint,
  },
});

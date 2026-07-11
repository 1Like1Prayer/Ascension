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
  const {
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    revealed,
    toggleReveal,
    pendingVerification,
    canSubmit,
    busy,
    error,
    submit,
    verify,
    resendCode,
    cancelVerification,
  } = useLoginForm();

  function selectProvider(_provider: Provider) {
    // TODO: browser SSO via useSSO() (works in Expo Go); native buttons need a dev build.
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

          {pendingVerification ? (
            <View style={styles.form}>
              <Text style={styles.hint}>{login.verify.hint(email.trim())}</Text>

              <View style={styles.fields}>
                <Field
                  label={login.verify.label}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  returnKeyType="go"
                  onSubmitEditing={verify}
                  maxLength={6}
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <PressableScale
                accessibilityRole="button"
                onPress={verify}
                disabled={busy || code.trim().length === 0}
                style={[
                  components.buttonPrimary,
                  styles.submit,
                  (busy || code.trim().length === 0) && styles.submitIdle,
                ]}
              >
                <Text style={components.buttonPrimaryText}>
                  {login.verify.submit}
                </Text>
              </PressableScale>

              <Text style={styles.helper}>
                <Text style={styles.link} onPress={resendCode}>
                  {login.verify.resend}
                </Text>
                {"   "}
                <Text style={styles.link} onPress={cancelVerification}>
                  {login.verify.back}
                </Text>
              </Text>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.fields}>
                <Field
                  label={login.fields.name}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <Field
                  label={login.fields.mantra}
                  value={password}
                  onChangeText={setPassword}
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

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <PressableScale
                accessibilityRole="button"
                onPress={submit}
                disabled={!canSubmit || busy}
                style={[
                  components.buttonPrimary,
                  styles.submit,
                  (!canSubmit || busy) && styles.submitIdle,
                ]}
              >
                <Text style={components.buttonPrimaryText}>{login.submit}</Text>
              </PressableScale>

              {/* Clerk bot protection mounts here for the sign-up path (Gate 10). */}
              <View nativeID="clerk-captcha" />

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
          )}
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

  hint: {
    ...typeScale.body,
    fontSize: 14,
    color: palette.paper400,
    marginBottom: spacing.lg,
  },

  errorText: {
    ...typeScale.caption,
    letterSpacing: 0,
    color: palette.danger,
    marginTop: spacing.md,
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

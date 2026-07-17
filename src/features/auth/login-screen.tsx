import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { Field } from "@/components/field";
import { LabelledDivider } from "@/components/labelled-divider";
import { PressableScale } from "@/components/pressable-scale";
import { login, shared } from "@/copies";
import { components, fonts, palette, spacing, typeScale } from "@/theme";

import { GateMark } from "./components/gate-mark";
import { ProviderButtons } from "./components/provider-buttons";
import { useLoginForm } from "./hooks/use-login-form";

export function LoginScreen() {
  const f = useLoginForm();

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
            {f.mode === "signIn" ? (
              <SignInBlock f={f} />
            ) : f.mode === "verifyEmail" ? (
              <VerifyBlock f={f} />
            ) : f.mode === "forgotRequest" ? (
              <ForgotRequestBlock f={f} />
            ) : (
              <ForgotResetBlock f={f} />
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

type Flow = ReturnType<typeof useLoginForm>;

/** Shared error line + primary button, so every mode reads the same. */
function ErrorLine({ error }: { error: string | null }) {
  return error ? <Text style={styles.errorText}>{error}</Text> : null;
}

function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <PressableScale
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={[components.buttonPrimary, styles.submit, disabled && styles.submitIdle]}
    >
      <Text style={components.buttonPrimaryText}>{label}</Text>
    </PressableScale>
  );
}

function RevealToggle({ f }: { f: Flow }) {
  return (
    <PressableScale accessibilityRole="button" onPress={f.toggleReveal} hitSlop={10}>
      <Text style={styles.reveal}>
        {f.revealed ? login.reveal.hide : login.reveal.show}
      </Text>
    </PressableScale>
  );
}

function SignInBlock({ f }: { f: Flow }) {
  return (
    <>
      <View style={styles.fields}>
        <Field
          label={login.fields.name}
          value={f.email}
          onChangeText={f.setEmail}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />
        <Field
          label={login.fields.mantra}
          value={f.password}
          onChangeText={f.setPassword}
          secureTextEntry={!f.revealed}
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={f.submit}
          style={!f.revealed && styles.obscured}
          trailing={<RevealToggle f={f} />}
        />
      </View>

      <ErrorLine error={f.error} />
      <PrimaryButton label={login.submit} onPress={f.submit} disabled={!f.canSubmit || f.busy} />
      {/* Clerk bot protection mounts here for the sign-up path (Gate 10). */}
      <View nativeID="clerk-captcha" />

      <Text style={styles.helper}>
        {login.forgot.prompt}
        <Text style={styles.link} onPress={f.goToForgot}>
          {login.forgot.action}
        </Text>
      </Text>

      <LabelledDivider label={login.providersDivider} style={styles.divider} />
      <ProviderButtons onSelect={f.startSso} />

      <Text style={styles.footer}>
        {login.register.prompt}{" "}
        <Text style={styles.link}>{login.register.action}</Text>
      </Text>
    </>
  );
}

function VerifyBlock({ f }: { f: Flow }) {
  return (
    <>
      <Text style={styles.hint}>{login.verify.hint(f.email.trim())}</Text>
      <View style={styles.fields}>
        <Field
          label={login.verify.label}
          value={f.code}
          onChangeText={f.setCode}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          returnKeyType="go"
          onSubmitEditing={f.verify}
          maxLength={6}
        />
      </View>

      <ErrorLine error={f.error} />
      <PrimaryButton
        label={login.verify.submit}
        onPress={f.verify}
        disabled={f.busy || f.code.trim().length === 0}
      />

      <Text style={styles.helper}>
        <Text style={styles.link} onPress={f.resendCode}>
          {login.verify.resend}
        </Text>
        {"   "}
        <Text style={styles.link} onPress={f.backToSignIn}>
          {login.verify.back}
        </Text>
      </Text>
    </>
  );
}

function ForgotRequestBlock({ f }: { f: Flow }) {
  return (
    <>
      <Text style={styles.hint}>{login.forgot.request.hint}</Text>
      <View style={styles.fields}>
        <Field
          label={login.fields.name}
          value={f.email}
          onChangeText={f.setEmail}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="go"
          onSubmitEditing={f.sendResetCode}
        />
      </View>

      <ErrorLine error={f.error} />
      <PrimaryButton
        label={login.forgot.request.submit}
        onPress={f.sendResetCode}
        disabled={f.busy || f.email.trim().length === 0}
      />

      <Text style={styles.helper}>
        <Text style={styles.link} onPress={f.backToSignIn}>
          {login.forgot.back}
        </Text>
      </Text>
    </>
  );
}

function ForgotResetBlock({ f }: { f: Flow }) {
  return (
    <>
      <Text style={styles.hint}>{login.forgot.reset.hint(f.email.trim())}</Text>
      <View style={styles.fields}>
        <Field
          label={login.forgot.reset.codeLabel}
          value={f.code}
          onChangeText={f.setCode}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          returnKeyType="next"
          maxLength={6}
        />
        <Field
          label={login.forgot.reset.passwordLabel}
          value={f.password}
          onChangeText={f.setPassword}
          secureTextEntry={!f.revealed}
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={f.resetPassword}
          style={!f.revealed && styles.obscured}
          trailing={<RevealToggle f={f} />}
        />
      </View>

      <ErrorLine error={f.error} />
      <PrimaryButton
        label={login.forgot.reset.submit}
        onPress={f.resetPassword}
        disabled={f.busy || f.code.trim().length === 0 || f.password.length === 0}
      />

      <Text style={styles.helper}>
        <Text style={styles.link} onPress={f.backToSignIn}>
          {login.forgot.back}
        </Text>
      </Text>
    </>
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

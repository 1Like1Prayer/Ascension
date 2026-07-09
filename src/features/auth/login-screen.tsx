import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Field } from '@/components/field';
import { LabelledDivider } from '@/components/labelled-divider';
import { PressableScale } from '@/components/pressable-scale';
import { components, fonts, palette, spacing, typeScale } from '@/theme';

import { GateMark } from './components/gate-mark';
import { ProviderButtons, type Provider } from './components/provider-buttons';
import { useLoginForm } from './hooks/use-login-form';

export function LoginScreen() {
  // TODO: pass an authenticate handler once a session layer exists.
  const { credentials, setName, setMantra, revealed, toggleReveal, canSubmit, submit } =
    useLoginForm();

  function selectProvider(_provider: Provider) {
    // TODO: federated sign-in.
  }

  return (
    <View style={components.screen}>
      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GateMark title="Murim Ascension" eyebrow="The Gate of the Sect" />

          <View style={styles.form}>
            <View style={styles.fields}>
              <Field
                label="DISCIPLE NAME"
                value={credentials.name}
                onChangeText={setName}
                textContentType="username"
                returnKeyType="next"
              />
              <Field
                label="SECRET MANTRA"
                value={credentials.mantra}
                onChangeText={setMantra}
                secureTextEntry={!revealed}
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={submit}
                style={!revealed && styles.obscured}
                trailing={
                  <PressableScale
                    accessibilityRole="button"
                    onPress={toggleReveal}
                    hitSlop={10}>
                    <Text style={styles.reveal}>{revealed ? 'HIDE' : 'SHOW'}</Text>
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
              ]}>
              <Text style={components.buttonPrimaryText}>Enter the Sect</Text>
            </PressableScale>

            <Text style={styles.helper}>
              Forgot your mantra? <Text style={styles.link}>Consult the elders</Text>
            </Text>

            <LabelledDivider label="OR ARRIVE BY" style={styles.divider} />
            <ProviderButtons onSelect={selectProvider} />

            <Text style={styles.footer}>
              No record in the annals? <Text style={styles.link}>Begin initiation</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },

  form: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingBottom: 30,
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
    textAlign: 'center',
    color: palette.paper600,
    marginTop: spacing.md,
  },
  link: { fontFamily: fonts.bodyBold, color: palette.gold500 },

  divider: { marginTop: spacing.xl - 4, marginBottom: 14 },

  footer: {
    ...typeScale.body,
    fontSize: 13,
    textAlign: 'center',
    color: palette.paper400,
    marginTop: spacing.xl - 4,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: palette.goldRuleFaint,
  },
});

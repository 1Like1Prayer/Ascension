import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from '@/components/pressable-scale';
import { copy } from '@/i18n';
import { components, fonts, palette, spacing } from '@/theme';

/** Identifiers, not labels. Each provider's label lives in `copy.auth.providers`. */
export const PROVIDERS = ['apple', 'google'] as const;
export type Provider = (typeof PROVIDERS)[number];

/** "Or arrive by" — third-party sign-in. */
export function ProviderButtons({ onSelect }: { onSelect: (provider: Provider) => void }) {
  return (
    <View style={styles.row}>
      {PROVIDERS.map((provider) => {
        const label = copy.auth.providers[provider];
        return (
          <PressableScale
            key={provider}
            accessibilityRole="button"
            accessibilityLabel={copy.auth.a11y.continueWith(label)}
            onPress={() => onSelect(provider)}
            style={[components.buttonGhost, styles.button]}>
            <Text style={styles.label}>{label}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm + 2 },
  button: { flex: 1, paddingHorizontal: spacing.md },
  label: { fontFamily: fonts.bodyBold, fontSize: 13.5, color: palette.paper400 },
});

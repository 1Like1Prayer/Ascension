import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from '@/components/pressable-scale';
import { components, fonts, palette, spacing } from '@/theme';

export const PROVIDERS = ['Apple', 'Google'] as const;
export type Provider = (typeof PROVIDERS)[number];

/** "Or arrive by" — third-party sign-in. */
export function ProviderButtons({ onSelect }: { onSelect: (provider: Provider) => void }) {
  return (
    <View style={styles.row}>
      {PROVIDERS.map((provider) => (
        <PressableScale
          key={provider}
          accessibilityRole="button"
          accessibilityLabel={`Continue with ${provider}`}
          onPress={() => onSelect(provider)}
          style={[components.buttonGhost, styles.button]}>
          <Text style={styles.label}>{provider}</Text>
        </PressableScale>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm + 2 },
  button: { flex: 1, paddingHorizontal: spacing.md },
  label: { fontFamily: fonts.bodyBold, fontSize: 13.5, color: palette.paper400 },
});

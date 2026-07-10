import { StyleSheet, Text, View } from 'react-native';

import { copy } from '@/i18n';
import { components, effects, fonts, palette, radii, spacing, typeScale } from '@/theme';

import { LotusHalo } from './lotus-halo';

/** Seal, wordmark, and halo. The identity block at the top of every auth screen. */
export function GateMark({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <View style={styles.mark}>
      <LotusHalo />
      <View style={styles.seal}>
        <Text style={styles.glyph}>{copy.brand.glyph}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={typeScale.eyebrow}>{eyebrow}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: { alignItems: 'center', paddingTop: 64, paddingHorizontal: spacing.xl },
  // A rankSeal, scaled up for the hero and given a crimson bloom.
  seal: {
    ...components.rankSeal,
    width: 76,
    height: 76,
    borderRadius: radii.md,
    borderWidth: 2,
    ...effects.sealGlow,
  },
  glyph: { fontFamily: fonts.display, fontSize: 36, color: palette.paper100 },
  title: { ...typeScale.hero, color: palette.paper100, marginTop: 20, marginBottom: 4 },
});

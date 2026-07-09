import { StyleSheet, View } from 'react-native';

import { palette } from '@/theme';

/** Concentric cultivation rings. Sizes and opacities come from the design. */
const RINGS = [
  { size: 348, color: palette.nanoDim, borderStyle: 'dashed' },
  { size: 300, color: palette.goldRule, borderStyle: 'solid' },
  { size: 250, color: palette.crimsonVeil, borderStyle: 'solid' },
] as const;

/** Distance from the top of the parent to the shared centre of every ring. */
const CENTER_Y = 190;

/** Decorative halo. Absolutely positioned; give the parent a stable top edge. */
export function SealRings() {
  return (
    <View pointerEvents="none" style={styles.layer}>
      {RINGS.map(({ size, color, borderStyle }) => (
        <View
          key={size}
          style={[
            styles.ring,
            {
              top: CENTER_Y - size / 2,
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: color,
              borderStyle,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center' },
  ring: { position: 'absolute', borderWidth: 1 },
});

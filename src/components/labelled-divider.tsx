import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { components, fonts, palette, spacing } from '@/theme';

type Props = { label: string; style?: StyleProp<ViewStyle> };

/** Gold hairline, a techno label, gold hairline. */
export function LabelledDivider({ label, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      <View style={components.rule} />
      <Text style={styles.label}>{label}</Text>
      <View style={components.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  label: {
    fontFamily: fonts.numeral,
    fontSize: 10,
    letterSpacing: 1.6,
    color: palette.paper600,
  },
});

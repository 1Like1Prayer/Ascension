import { useRef, type ReactNode } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { components, palette, spacing } from '@/theme';

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0];
type BlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0];

type Props = TextInputProps & {
  label: string;
  /** Rendered inside the box, after the input — e.g. a SHOW toggle. */
  trailing?: ReactNode;
};

/**
 * Labelled text field. Focus lights the nano border.
 *
 * The border is driven by `Animated`, not React state, and this is load-bearing:
 * a state update in `onFocus` re-renders (commits) the TextInput subtree while it
 * is focusing, which blurs it on Android's new architecture — the keyboard opens
 * and immediately closes. Animating the wrapper updates its border without ever
 * re-rendering the input, so focus holds.
 */
export function Field({ label, trailing, style, onFocus, onBlur, ...input }: Props) {
  const focus = useRef(new Animated.Value(0)).current;

  const animateFocus = (to: number) =>
    Animated.timing(focus, {
      toValue: to,
      duration: 150,
      // borderColor is not native-driver-able; but this never triggers a React
      // re-render regardless, which is the whole point.
      useNativeDriver: false,
    }).start();

  const handleFocus = (e: FocusEvent) => {
    animateFocus(1);
    onFocus?.(e);
  };
  const handleBlur = (e: BlurEvent) => {
    animateFocus(0);
    onBlur?.(e);
  };

  const borderColor = focus.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.ink600, palette.nanoFocus],
  });

  return (
    <View style={styles.field}>
      <Text style={components.fieldLabel}>{label}</Text>
      <Animated.View style={[components.inputBox, { borderColor }]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={palette.paper600}
          selectionColor={palette.nano400}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[components.inputText, style]}
          {...input}
        />
        {trailing}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs + 2 },
});

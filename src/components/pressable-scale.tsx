import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { effects } from '@/theme';

type Props = Omit<PressableProps, 'style'> & { style?: StyleProp<ViewStyle> };

/** Pressable that dips on touch. Inert while disabled — no press, no dip. */
export function PressableScale({ style, disabled, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        style,
        pressed && !disabled && { transform: [{ scale: effects.pressedScale }] },
      ]}
      {...rest}
    />
  );
}

import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { components, palette, spacing } from '@/theme';

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0];
type BlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0];

type Props = TextInputProps & {
  label: string;
  /** Rendered inside the box, after the input — e.g. a SHOW toggle. */
  trailing?: ReactNode;
};

/**
 * Labelled text field. Owns its focus state so callers never thread it through;
 * focus lights the nano border, and only one field can hold it at a time.
 */
export function Field({ label, trailing, style, onFocus, onBlur, ...input }: Props) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: BlurEvent) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.field}>
      <Text style={components.fieldLabel}>{label}</Text>
      <View style={[components.inputBox, focused && components.inputBoxFocused]}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs + 2 },
});

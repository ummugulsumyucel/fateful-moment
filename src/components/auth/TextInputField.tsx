import { useState, type ReactNode } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, fontSizes, sizes, spacing } from '../../theme/theme';

type TextInputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  style?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  onFocus?: () => void;

  leftElement?: ReactNode;

  rightElement?: ReactNode;

  hasContent?: boolean;

  inputRef?: React.RefObject<TextInput | null>;
};

export default function TextInputField({
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = 'none',
  autoComplete,
  textContentType,
  returnKeyType,
  onSubmitEditing,
  onBlur,
  onFocus,
  style,
  leftElement,
  rightElement,
  hasContent,
  inputRef,
}: TextInputFieldProps) {
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(error);

  const showActiveBorder =
    focused || (hasContent ?? value.length > 0);

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.inputRow}>

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPrimary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={false}
          style={[
            styles.input,

            leftElement ? styles.inputWithLeft : undefined,
            rightElement ? styles.inputWithRight : undefined,

            showActiveBorder && styles.focused,
            hasError && styles.error,
          ]}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />

        {leftElement && (
          <View
            style={styles.leftSlot}
            pointerEvents="none"
          >
            {leftElement}
          </View>
        )}

        {rightElement && (
          <View
            style={styles.rightSlot}
            pointerEvents="box-none"
          >
            {rightElement}
          </View>
        )}

      </View>

      {hasError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  inputRow: {
    width: '100%',
    position: 'relative',
  },

  input: {
    width: '100%',
    height: sizes.inputHeight,
    borderRadius: sizes.inputRadius,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.secondary,
    color: colors.white,
    fontFamily:fonts.primary.regular,
    fontSize: fontSizes.input,
    borderWidth: 1,
    borderColor: '#FFFFFF0D',
  },

  inputWithLeft: {
    paddingLeft: 44,
  },

  inputWithRight: {
    paddingRight: 48,
  },

  focused: {
    borderColor: colors.border,
  },

  error: {
    borderColor: '#E53A3A',
  },

  errorText: {
    marginTop: spacing.xs,
    color: '#E53A3A',
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.caption,
  },

  leftSlot: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightSlot: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { Pressable, StyleSheet, Text } from 'react-native';
import { fontSizes } from '../../theme/theme';

export type SignUpButtonProps = {
  disabled: boolean;
  onPress: () => void;
  title?: string;
};

export default function SignUpButton({
  disabled,
  onPress,
  title = 'Sign up',
}: SignUpButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D3F324',
    borderWidth: 0,
  },

  disabled: {
    opacity: 0.35,
  },

  pressed: {
    opacity: 0.82,
  },

  text: {
    color: '#00D3F3',
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.body,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
});

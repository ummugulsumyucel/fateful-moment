import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import { fontSizes } from '../../theme/theme';
import { icons } from '../../assets/icons';

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: 'mail';
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  icon,
  style,
}: PrimaryButtonProps) {
  const Icon = icon ? icons[icon] : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.disabled : styles.active,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {Icon && (
          <Icon size={24} color={colors.primary} />
      )}

      <Text
        style={[
          styles.text,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  active: {
    backgroundColor: colors.brandButtonBackground,
  },

  disabled: {
    backgroundColor: colors.brandButtonBackground,
    opacity: 0.35,
  },

  text: {
    color: colors.primary,
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.body,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },

  disabledText: {
    opacity: 0.6,
  },

  pressed: {
    opacity: 0.8,
  },
});

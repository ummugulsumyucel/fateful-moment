import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import { fonts, fontSizes, sizes } from '../../theme/theme';
import { icons } from '../../assets/icons';

type SecondaryButtonProps = {
  title: string;
  icon?: 'apple' | 'google';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function SecondaryButton({
  title,
  icon,
  onPress,
  style,
}: SecondaryButtonProps) {
  const Icon = icon ? icons[icon] : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      {Icon && (
        <View style={styles.iconWrap}>
          <Icon size={sizes.icon} />
        </View>
      )}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: sizes.buttonHeight,
    borderRadius: sizes.buttonRadius,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  iconWrap: {
    width: sizes.icon,
    height: sizes.icon,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.white,
    fontFamily: fonts.primary.semiBold,
    fontSize: fontSizes.button,
    fontWeight: '500',
  },

  pressed: {
    opacity: 0.75,
  },
});

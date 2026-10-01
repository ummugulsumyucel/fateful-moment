import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import BackIcon from '../../assets/icons/BackIcon';
import { sizes, spacing } from '../../theme/theme';

type BackButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={spacing.sm}
      style={[styles.button, style]}
    >
      <BackIcon size={sizes.backIcon} color="#90A1B9" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: sizes.backButton,
    height: sizes.backButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.backButton / 2,
    backgroundColor: '#FFFFFF0D',
    borderWidth: 0.75,
    borderColor: '#FFFFFF1A',
  },
});

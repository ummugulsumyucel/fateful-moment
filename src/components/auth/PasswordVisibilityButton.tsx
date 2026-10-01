import { Eye, EyeOff } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

export type PasswordVisibilityButtonProps = {
  visible: boolean;
  onPress: () => void;
};

export default function PasswordVisibilityButton({
  visible,
  onPress,
}: PasswordVisibilityButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.button}>
      {visible
        ? <EyeOff size={18} color={colors.textSecondary} strokeWidth={1.8} />
        : <Eye    size={18} color={colors.textSecondary} strokeWidth={1.8} />
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

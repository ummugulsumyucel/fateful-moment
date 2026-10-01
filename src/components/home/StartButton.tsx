import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { START_BUTTON } from '../../constants/home';

type Props = {
  onPress?: () => void;
  label?: string;
};

export default function StartButton({ onPress, label = 'Start' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: START_BUTTON.width,
    height: START_BUTTON.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: START_BUTTON.gap,
    paddingVertical: START_BUTTON.paddingV,
    paddingHorizontal: START_BUTTON.paddingH,
    borderRadius: START_BUTTON.radius,
    backgroundColor: colors.brandButtonBackground,
    borderWidth: 1,
    borderColor: 'rgba(0, 211, 243, 0.45)',
  },
  label: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: START_BUTTON.fontSize,
    lineHeight: START_BUTTON.lineHeight,
  },
});

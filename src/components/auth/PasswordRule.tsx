import { StyleSheet, Text, View } from 'react-native';
import CheckCircleIcon from '../../assets/icons/CheckCircleIcon';
import { colors, fonts } from '../../theme/theme';

export type PasswordRuleProps = {
  label: string;
  met: boolean;
};

export default function PasswordRule({ label, met }: PasswordRuleProps) {
  return (
    <View style={styles.row}>
      <CheckCircleIcon
        size={16}
        color={met ? colors.primary : colors.textMuted}
      />
      <Text style={[styles.label, met && styles.labelMet]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  label: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
    flexShrink: 1,
  },
  labelMet: {
    color: colors.white,
  },
});

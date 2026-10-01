import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme';

type LegalFooterProps = {
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
};

export default function LegalFooter({
  onTermsPress,
  onPrivacyPress,
}: LegalFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <Text style={styles.description}>
        By continuing you agree to the{' '}
        <Text style={styles.link} onPress={onTermsPress}>
          Terms of Use
        </Text>
        {' and '}
        <Text style={styles.link} onPress={onPrivacyPress}>
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },

  description: {
    color: colors.textSecondary,
    fontFamily: fonts.primary.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },

  link: {
    color: colors.primary,
    fontFamily: fonts.primary.regular,
  },
});

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { fonts, fontSizes, sizes, spacing } from '../../theme/theme';

import AppLogo from '../../components/auth/AppLogo';
import PrimaryButton from '../../components/auth/PrimaryButton';
import SecondaryButton from '../../components/auth/SecondaryButton';
import OrDivider from '../../components/auth/OrDivider';
import LegalFooter from '../../components/auth/LegalFooter';

type SignInUpScreenProps = {
  onContinueWithEmail?: () => void;
};

export default function SignInUpScreen({
  onContinueWithEmail,
}: SignInUpScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        <View style={styles.content}>
          <AppLogo />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>Welcome to Fateful Moment</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton
              title="Continue with Email"
              icon="mail"
              onPress={onContinueWithEmail}
            />

            <OrDivider />

            <View style={styles.socialGroup}>
              <SecondaryButton title="Continue with Apple" icon="apple" />
              <SecondaryButton title="Continue with Google" icon="google" />
            </View>
          </View>
        </View>
        <LegalFooter />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: sizes.screenPadding,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },

  titleBlock: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.title,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    color: colors.textMuted,
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.body,
    textAlign: 'center',
  },

  actions: {
    width: '100%',
    marginTop: spacing.xxxl,
    gap: sizes.screenPadding,
  },

  socialGroup: {
    width: '100%',
    gap: spacing.md,
  },
});

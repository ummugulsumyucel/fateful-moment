import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppLogo from '../../components/auth/AppLogo';
import BackButton from '../../components/auth/BackButton';
import TextInputField from '../../components/auth/TextInputField';
import SignUpButton from '../../components/auth/SignUpButton';
import { colors, fonts, fontSizes, sizes, spacing } from '../../theme/theme';
import { CircleCheck, Mail } from 'lucide-react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  onBack?: () => void;
  onBackToSignIn?: () => void;
};

// ─── Validation ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ResetPasswordScreen({ onBack, onBackToSignIn }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = EMAIL_RE.test(email.trim());

  function handleEmailChange(text: string) {
    setEmail(text);
    if (emailError && EMAIL_RE.test(text.trim())) {
      setEmailError('');
    }
  }

  function handleEmailBlur() {
    if (email.trim().length > 0 && !EMAIL_RE.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }

  async function handleSubmit() {
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }
    if (!isEmailValid) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    Keyboard.dismiss();
    setLoading(true);

    // Simulate async reset password request
    await new Promise<void>(resolve => setTimeout(resolve, 600));

    setLoading(false);
    setSubmitted(true);
  }

  // ── Check Your Email state ─────────────────────────────────────────────────

  if (submitted) {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />

        {/* Back button */}
        <View style={styles.topRow}>
          <BackButton onPress={onBackToSignIn} />
        </View>

        {/* Success content — flex-centered, no absolute positioning */}
        <View style={styles.successContainer}>
          {/* Success icon */}
          <View style={styles.successIconWrapper}>
            <CircleCheck
              size={40}
              color={colors.primary}
              strokeWidth={2}
            />
          </View>

          {/* Title */}
          <Text style={styles.successTitle}>Check Your Email</Text>

          {/* Body */}
          <Text style={styles.successBody}>
            {"We've sent password reset\ninstructions to "}
            <Text style={styles.successEmailBold}>{email.trim()}</Text>
          </Text>

          {/* Back to Sign In button */}
          <View style={styles.successButtonWrapper}>
            <SignUpButton
              disabled={false}
              onPress={() => onBackToSignIn?.()}
              title="Back to Sign in"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── Reset Password state ───────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.flex}>
            {/* ── Back button ──────────────────────────────────────────── */}
            <View style={styles.topRow}>
              <BackButton onPress={onBack} />
            </View>

            {/* ── Logo ─────────────────────────────────────────────────── */}
            <View style={styles.logoWrapper}>
              <AppLogo />
            </View>

            {/* ── Heading ──────────────────────────────────────────────── */}
            <View style={styles.headingWrapper}>
              <Text style={styles.title}>Reset your password</Text>
              <Text style={styles.subtitle}>
                Enter your email to receive a reset link
              </Text>
            </View>

            {/* ── Form ─────────────────────────────────────────────────── */}
            <View style={styles.form}>
              <TextInputField
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="done"
                error={emailError}
                leftElement={
                  email.trim().length === 0 ? (
                    <Mail
                      size={22}
                      color={colors.textPrimary}
                      strokeWidth={1.5}
                    />
                  ) : undefined
                }
              />

              {/* Sign In button */}
              <View style={styles.buttonWrapper}>
                <SignUpButton
                  disabled={!isEmailValid || loading}
                  onPress={handleSubmit}
                  title="Sign In"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  flex: {
    flex: 1,
  },

  // ── Header ─────────────────────────────────────────────────────

  topRow: {
    marginTop: spacing.sm,
    marginHorizontal: sizes.screenPadding,
    height: sizes.backButton,
    justifyContent: 'center',
  },

  // ── Logo ────────────────────────────────────────────────────────

  logoWrapper: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },

  // ── Heading ─────────────────────────────────────────────────────

  headingWrapper: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
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

  // ── Form ─────────────────────────────────────────────────────────

  form: {
    marginTop: spacing.xl,
    marginHorizontal: sizes.screenPadding,
  },

  buttonWrapper: {
    marginTop: spacing.lg,
  },

  // ── Success / Check Your Email ────────────────────────────────────

  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.screenPadding,
  },

  successIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00D3F333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },

  successTitle: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.title,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  successBody: {
    color: colors.textMuted,
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.body,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },

  successEmailBold: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontWeight: '700',
  },

  successButtonWrapper: {
    width: '100%',
  },
});

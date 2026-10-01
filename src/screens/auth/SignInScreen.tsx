import { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AppLogo from '../../components/auth/AppLogo';
import BackButton from '../../components/auth/BackButton';
import PasswordVisibilityButton from '../../components/auth/PasswordVisibilityButton';
import SignUpButton from '../../components/auth/SignUpButton';
import TextInputField from '../../components/auth/TextInputField';
import { colors, fonts, fontSizes, sizes, spacing } from '../../theme/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  onBack?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSignIn?: (email: string, password: string) => void;
  passwordError?: string;
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SignInScreen({
  onBack,
  onForgotPassword,
  onSignUp,
  onSignIn,
  passwordError: externalPasswordError,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const signInButtonRef = useRef<View>(null);

  const insets = useSafeAreaInsets();

  const isEmailValid = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const isFormValid = email.trim().length > 0 && password.length > 0;

  const resolvedPasswordError = externalPasswordError || passwordError;

  function validateEmail() {
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
    } else if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }

  function validatePassword() {
    if (!password) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }
  }

  function handleSignIn() {
    const emailInvalid = !email.trim() || !isEmailValid(email);
    const passwordEmpty = !password;

    if (emailInvalid) {
      setEmailError(
        !email.trim()
          ? 'Please enter your email address.'
          : 'Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }

    if (passwordEmpty) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }

    if (emailInvalid || passwordEmpty) return;

    setEmailError('');
    setPasswordError('');
    Keyboard.dismiss();
    onSignIn?.(email.trim(), password);
  }

  function scrollToSignInButton() {
    if (Platform.OS !== 'ios') return;

    setTimeout(() => {
      signInButtonRef.current?.measureLayout(
        scrollViewRef.current as any,
        (_x, y, _w, h) => {
          scrollViewRef.current?.scrollTo({
            y: y + h + 100,
            animated: true,
          });
        },
        () => {},
      );
    }, 150);
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.topRow}>
              <BackButton onPress={onBack} />
            </View>

            <View style={styles.logoWrapper}>
              <AppLogo />
            </View>

            <View style={styles.headingWrapper}>
              <Text style={styles.title}>Welcome to Fateful Moment</Text>
              <Text style={styles.subtitle}>Sign in with Email</Text>
            </View>

            <View style={styles.form}>
              <TextInputField
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                placeholder="Your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                onBlur={validateEmail}
                onFocus={scrollToSignInButton}
                error={emailError}
              />

              <View style={styles.fieldGap}>
                <TextInputField
                  inputRef={passwordRef}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Your password"
                  secureTextEntry={!showPw}
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  onBlur={validatePassword}
                  onFocus={scrollToSignInButton}
                  error={resolvedPasswordError}
                  rightElement={
                    password.length > 0 ? (
                      <PasswordVisibilityButton
                        visible={showPw}
                        onPress={() => setShowPw(v => !v)}
                      />
                    ) : undefined
                  }
                />
              </View>

              <View ref={signInButtonRef} style={styles.signInButtonWrapper}>
                <SignUpButton
                  disabled={!isFormValid}
                  onPress={handleSignIn}
                  title="Sign In"
                />
              </View>
            </View>

            <Pressable
              onPress={onForgotPassword}
              style={styles.forgotWrapper}
              accessibilityRole="button"
              accessibilityLabel="Forgot password?"
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <Text style={styles.footerText}>
              No account yet?{' '}
              <Text style={styles.footerLink} onPress={onSignUp} accessibilityRole="link">
                Sign up
              </Text>
            </Text>
          </ScrollView>
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

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.screenPadding,
    paddingBottom: spacing.xxl,
  },

  // ── Header ─────────────────────────────────────────────────────

  topRow: {
    marginTop: spacing.sm,
    height: sizes.backButton,
    justifyContent: 'center',
  },

  logoWrapper: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },

  // ── Heading ────────────────────────────────────────────────────

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
    fontSize: fontSizes.subtitle,
    textAlign: 'center',
  },

  // ── Form ───────────────────────────────────────────────────────

  form: {
    marginTop: spacing.xl,
  },

  fieldGap: {
    marginTop: spacing.xl,
  },

  // ── Sign In button ─────────────────────────────────────────────

  signInButtonWrapper: {
    marginTop: spacing.xxxl,
  },

  // ── Forgot password ────────────────────────────────────────────

  forgotWrapper: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },

  forgotText: {
    color: colors.primary,
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.small,
  },

  // ── Footer ─────────────────────────────────────────────────────

  footerText: {
    marginTop: 48,
    color: colors.textMuted,
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },

  footerLink: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    textDecorationLine: 'underline',
  },
});

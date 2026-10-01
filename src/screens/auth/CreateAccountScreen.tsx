import { useRef, useState, useMemo, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, fontSizes, sizes, spacing } from '../../theme/theme';
import AppLogo from '../../components/auth/AppLogo';
import BackButton from '../../components/auth/BackButton';
import TextInputField from '../../components/auth/TextInputField';
import PasswordRule from '../../components/auth/PasswordRule';
import PasswordVisibilityButton from '../../components/auth/PasswordVisibilityButton';
import SignUpButton from '../../components/auth/SignUpButton';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  onBack?: () => void;
  onSignInPress?: () => void;
  onSignUp?: (name: string, email: string, password: string) => void;
};

// ─── Validation helpers ────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function checkPassword(pw: string) {
  return {
    minLength: pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    digit: /\d/.test(pw),
  };
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export default function CreateAccountScreen({ onBack, onSignInPress, onSignUp }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidHide', () => {
      setPwTouched(false);
    });
    return () => subscription.remove();
  }, []);

  const nameValid = name.trim().length >= 3;
  const emailValid = EMAIL_RE.test(email.trim());

  function handleNameChange(text: string) {
    setName(text);
    if (nameError && text.trim().length >= 3) setNameError('');
  }

  function handleNameBlur() {
    if (name.trim().length > 0 && name.trim().length < 3) {
      setNameError('Enter at least 3 characters.');
    } else {
      setNameError('');
    }
  }

  function handleEmailChange(text: string) {
    setEmail(text);
    if (emailError && EMAIL_RE.test(text.trim())) setEmailError('');
  }

  function handleEmailBlur() {
    if (email.trim().length > 0 && !EMAIL_RE.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }

  const pwRules = useMemo(() => checkPassword(password), [password]);
  const isFormValid =
    nameValid &&
    emailValid &&
    pwRules.minLength &&
    pwRules.uppercase &&
    pwRules.lowercase &&
    pwRules.digit;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Back button ── */}
          <View style={styles.topRow}>
            <BackButton onPress={onBack} />
          </View>

          {/* ── Logo ── */}
          <View style={styles.logoWrapper}>
            <AppLogo />
          </View>

          {/* ── Title ── */}
          <Text style={styles.title}>
            Create your Fateful Moment{'\n'}Account
          </Text>

          {/* ── Form ── */}
          <View style={styles.form}>
            {/* Name */}
            <TextInputField
              value={name}
              onChangeText={handleNameChange}
              onBlur={handleNameBlur}
              placeholder="Full Name"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={nameError}
            />

            {/* Email */}
            <View style={styles.fieldGap}>
              <TextInputField
                inputRef={emailRef}
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="Your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={emailError}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGap}>
              <TextInputField
                inputRef={passwordRef}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (!pwTouched && text.length > 0) setPwTouched(true);
                }}
                placeholder="Your password"
                secureTextEntry={!showPw}
                autoComplete="password-new"
                textContentType="newPassword"
                returnKeyType="done"
            rightElement={
              password.length > 0 ? (
                <PasswordVisibilityButton
                  visible={showPw}
                  onPress={() => setShowPw(v => !v)}
                />
              ) : undefined
            }
              />

              {pwTouched && (
                <View style={styles.rulesContainer}>
                  <PasswordRule label="Must be at least 8 characters long" met={pwRules.minLength} />
                  <PasswordRule label="Must contain at least 1 uppercase letter" met={pwRules.uppercase} />
                  <PasswordRule label="Must contain at least 1 lowercase letter" met={pwRules.lowercase} />
                  <PasswordRule label="Must contain at least 1 digit" met={pwRules.digit} />
                </View>
              )}
            </View>
          </View>

          {/* ── Sign Up button ── */}
          <View style={styles.buttonRow}>
            <SignUpButton
              disabled={!isFormValid}
              onPress={() => onSignUp?.(name.trim(), email.trim(), password)}
            />
          </View>

          {/* ── Sign in footer ── */}
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.footerLink} onPress={onSignInPress}>
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  flex: { flex: 1 },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.screenPadding,
    paddingBottom: spacing.xxl,
  },

  // ── Header ──────────────────────────────────────────────────────────────────

  topRow: {
    marginTop: spacing.sm,
    height: sizes.backButton,
    justifyContent: 'center',
  },

  logoWrapper: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },

  // ── Title ───────────────────────────────────────────────────────────────────

  title: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: fontSizes.title,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },

  // ── Form ────────────────────────────────────────────────────────────────────

  form: {
    width: '100%',
  },

  fieldGap: {
    marginTop: spacing.xl,
  },

  rulesContainer: {
    marginTop: spacing.md,
    paddingLeft: spacing.xs,
    gap: 4,
  },

  // ── Button / Footer ─────────────────────────────────────────────────────────

  buttonRow: {
    marginTop: spacing.xxxl,
  },

  footerText: {
    marginTop: spacing.xxxl,
    color: colors.textSecondary,
    fontFamily: fonts.primary.regular,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },

footerLink: {
  color: colors.primary,
  fontFamily: fonts.primary.bold,
  fontWeight: '700',
  letterSpacing: 0,
  textAlign: 'center',
  textDecorationLine: 'underline',
},
});

export { colors } from './colors';
export { fonts, typography } from './typography';
export { spacing } from './spacing';
export { radius } from './radius';

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const sizes = {
  screenPadding: 24,
  backButton: 40,
  backIcon: 20,
  logo: 148,
  brandHeader: 54,
  brandIndicatorWidth: 3,
  brandIndicatorHeight: 22,
  inputHeight: 56,
  inputRadius: 16,
  buttonHeight: 56,
  buttonRadius: 16,
  icon: 22,
} as const;

// ─── Font sizes ───────────────────────────────────────────────────────────────

export const fontSizes = {
  brand: 13,
  title: 24,
  subtitle: 20,
  body: 16,
  button: 16,
  input: 16,
  small: 13,
  caption: 12,
} as const;

// ─── Layout helpers (auth screens) ───────────────────────────────────────────

export const layout = {
  screenHorizontal: 24,
  inputHorizontal: 16,
  inputVertical: 16,
  formFieldGap: 36,
  fieldToButtonGap: 48,
  iconTextGap: 8,
} as const;

// ─── Font families ────────────────────────────────────────────────────────────

export const fonts = {
  primary: {
    regular: 'Inter_400Regular',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    black: 'Inter_900Black',
    blackItalic: 'Inter_900Black_Italic',
  },

  secondary: {
    regular: 'JetBrainsMono_400Regular',
    bold: 'JetBrainsMono_700Bold',
  },
} as const;

// ─── Typography styles ────────────────────────────────────────────────────────

export const typography = {
  heading1: {
    fontFamily: fonts.primary.blackItalic,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900' as const,
    fontStyle: 'italic' as const,
    letterSpacing: -1.43,
    textTransform: 'uppercase' as const,
  },
} as const;
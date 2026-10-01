import { Image, StyleSheet, Text, View } from 'react-native';

import { fonts, typography } from '../../theme/typography';
import { colors } from '../../theme';

// ─── Assets ────────────────────────────────────────────────────────────────────

const dnaPortrait = require('../../assets/images/dnaPortrait.png') as number;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function DNAHeaderCard() {
  return (
    <View style={styles.card}>
      <Image source={dnaPortrait} style={styles.portrait} resizeMode="cover" />
      <View style={styles.textArea}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          BRAVE VISIONARY
        </Text>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            You see the big picture and walk towards it - no matter the cost. Ethics sometimes take
            a back seat, but few surpass you in the courage to take action.
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 82,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1D293D',
    backgroundColor: 'rgba(15, 23, 43, 0.4)',
    padding: 8,
  },
  portrait: {
    width: 64,
    height: 64,
    borderRadius: 16,
    flexShrink: 0,
  },
  textArea: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },

  title: {
    ...typography.heading1,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#F1F5F9',
  },
 
  descriptionWrapper: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 184, 219, 0.4)',
    paddingLeft: 4,
    paddingRight: 4,
  },

  description: {
    fontFamily: fonts.primary.regular,
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 0,
    color: colors.textMuted,
  },
});

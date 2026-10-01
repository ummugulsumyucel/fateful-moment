import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DECISION_DNA_STATIC_DATA } from '../../data/decisionDNAStaticData';
import { Activity } from 'lucide-react-native';

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PatternDetection() {
  const { patterns } = DECISION_DNA_STATIC_DATA;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Activity
  size={10}
  color={colors.primary}
  strokeWidth={1.5}
/>
        <Text style={styles.title}>PATTERN DETECTION</Text>
      </View>
      <View style={styles.patternList}>
        {patterns.map((pattern) => (
          <View key={pattern.id} style={styles.patternRow}>
            <Text style={styles.patternNum}>{pattern.id}</Text>
            <Text style={styles.patternText}>{pattern.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1D293D',
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 43, 0.4)',
    padding: 12,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontFamily: fonts.secondary.regular,
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 0,
    color: '#90A1B9',
    textTransform: 'uppercase',
  },
  patternList: {
    gap: 8,
  },
  patternRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
patternNum: {
  fontFamily: fonts.secondary.bold,
  fontWeight: '700',
  fontSize: 10,
  lineHeight: 15,
  color: colors.primary,
  minWidth: 20,
  flexShrink: 0,
},

  patternText: {
    fontFamily: fonts.primary.regular,
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 11,
    color: '#62748E',
    flex: 1,
  },
});

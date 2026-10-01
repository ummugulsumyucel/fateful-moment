import { StyleSheet, Text, View } from 'react-native';

import { Target } from 'lucide-react-native';

import { fonts } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DECISION_DNA_STATIC_DATA } from '../../data/decisionDNAStaticData';

export default function BlindSpotVision() {
  const { blindSpot } = DECISION_DNA_STATIC_DATA;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Target size={14} color="#FB2C36" strokeWidth={2} />
        </View>

          <Text style={styles.title}>
            BLIND SPOT — {blindSpot.dimension}
          </Text>
      </View>

      <Text style={styles.question}>{blindSpot.question}</Text>

      <Text style={styles.description}>{blindSpot.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#FB2C3633',
  backgroundColor: '#FB2C360D',
  padding: 12,
  paddingBottom: 46,
  gap: spacing.sm,
},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.secondary.bold,
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 0,
    color: colors.danger,
    textTransform: 'uppercase',
  },

  question: {
    fontFamily: fonts.primary.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: colors.white,
  },

  description: {
    fontFamily: fonts.primary.regular,
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 11,
    color: '#90A1B9',
  },
});
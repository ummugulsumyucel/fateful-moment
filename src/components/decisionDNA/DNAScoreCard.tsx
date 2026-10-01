import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../theme/typography';
import { colors } from '../../theme/colors';

import type { DNAScore } from '../../data/decisionDNAStaticData';

type Props = DNAScore;

export default function DNAScoreCard({
  label,
  value,
  icon: Icon,
}: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.topRow}>
        <Icon
          size={7}
          color="#45556C"
          strokeWidth={1}
        />

        <Text style={styles.value}>
          {value}
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <Text
          style={styles.label}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {label}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(
                Math.max(value, 0),
                100,
              )}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 37,
    borderRadius: 6.73,
    borderWidth: 0.32,
    borderColor: '#1D293D',
    backgroundColor: 'rgba(15, 23, 43, 0.7)',
    paddingHorizontal: 7.05,
    paddingTop: 7.05,
    overflow: 'hidden',
  },

  topRow: {
    width: '100%',
    height: 6.727,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  value: {
    fontFamily: fonts.primary.bold,
    fontWeight: '700',
    fontSize: 6.5,
    lineHeight: 7,
    color: colors.primary,
  },

  bottomRow: {
    width: '100%',
    height: 6.313,
    marginTop: 3.346,
    justifyContent: 'center',
  },

  label: {
    fontFamily: fonts.secondary.regular,
    fontWeight: '400',
    fontSize: 5.5,
    lineHeight: 6.3,
    letterSpacing: 0.5,
    color: '#62748E',
    textTransform: 'uppercase',
  },

  progressBar: {
    width: '100%',
    height: 3,
    marginTop: 5,
    borderRadius: 2,
    backgroundColor: '#1D293D',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
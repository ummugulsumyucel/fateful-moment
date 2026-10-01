import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../theme/typography';
import RadarChart from '../decisionDNA/RadarChart';
import { DECISION_DNA_STATIC_DATA } from '../../data/decisionDNAStaticData';

import { Dna } from 'lucide-react-native';
// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  radarSize: number;
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PsychologicalMatrix({ radarSize }: Props) {
  const { scores } = DECISION_DNA_STATIC_DATA;

  const vision  = scores[0].value; 
  const courage = scores[1].value; 
  const risk    = scores[2].value; 
  const control = scores[3].value; 
  const empathy = scores[4].value; 
  const ethics  = scores[5].value; 

 return (
  <View style={styles.card}>
   <View style={styles.header}>
  <Dna size={10} color="#00D3F2" />
  <Text style={styles.title}>PSYCHOLOGICAL MATRIX</Text>
</View>

    <View style={styles.radarWrapper}>
      <RadarChart
        vision={vision}
        courage={courage}
        risk={risk}
        control={control}
        empathy={empathy}
        ethics={ethics}
        size={radarSize}
      />
    </View>
  </View>
);
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    minHeight: 174,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1D293D',
    backgroundColor: 'rgba(15, 23, 43, 0.6)',
    padding: 8,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 1.2,
    color: '#E2E8F0',
    textTransform: 'uppercase',
  },
  radarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme';

export default function OrDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.text}>
        OR
      </Text>

      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF1A',
  },

  text: {
    color: colors.textSecondary,
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19.5,
    letterSpacing: 0.65,
    textTransform: 'uppercase',
    marginHorizontal: 12,
  },
});

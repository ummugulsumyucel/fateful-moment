import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { SECTION_HEADER } from '../../constants/home';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function SectionHeader({
  title = 'Scenarios',
  subtitle = 'Choose a scenario and ask yourself, "If you were in that situation, what would you do?"',
}: Props) {
  return (
    <View style={styles.header} pointerEvents="none">
      <View style={styles.divider} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
      <Text style={styles.count} numberOfLines={1}>
        30 Scenarios
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: colors.sidebarBorder,
  },
  title: {
    marginTop: SECTION_HEADER.gapDividerToTitle,
    color: colors.scenariosTitleColor,
    fontFamily: fonts.primary.bold,
    fontSize: SECTION_HEADER.titleSize,
    lineHeight: SECTION_HEADER.titleLineHeight,
    textAlign: 'left',
    textTransform: 'capitalize',
    includeFontPadding: false,
  },
  subtitle: {
    marginTop: SECTION_HEADER.gapTitleToSubtitle,
    color: colors.scenariosSubtitleColor,
    fontFamily: fonts.secondary.bold,
    fontSize: SECTION_HEADER.subtitleSize,
    lineHeight: SECTION_HEADER.subtitleLineHeight,
    textAlign: 'left',
    textTransform: 'capitalize',
    includeFontPadding: false,
  },
  count: {
    marginTop: SECTION_HEADER.gapSubtitleToCount,
    color: colors.scenariosCountColor,
    fontFamily: fonts.primary.black,
    fontSize: SECTION_HEADER.countSize,
    lineHeight: SECTION_HEADER.countLineHeight,
    textAlign: 'left',
    textTransform: 'capitalize',
    includeFontPadding: false,
  },
});

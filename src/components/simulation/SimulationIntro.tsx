import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radius } from '../../theme/radius';
import TopPlayer from '../home/TopPlayer';

const BG_IMAGE = require('../../assets/images/arkaplan.png');

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  title: string;
  description: string;
  onStart: () => void;
  onPlayPause?: (playing: boolean) => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SimulationIntro({
  title,
  description,
  onStart,
  onPlayPause,
  onSkipBack,
  onSkipForward,
}: Props) {
  const insets = useSafeAreaInsets();
  // Android'de status bar yüksekliğini topBar'a ekle
  const topBarHeight = 48 + (Platform.OS === 'android' ? insets.top : 0);

  return (
    <View style={styles.root}>
      {/* Top bar with player widget */}
      <View style={[styles.topBar, { height: topBarHeight }]}>
        <View style={[styles.topPlayer, { top: Platform.OS === 'android' ? insets.top : 0 }]}>
          <TopPlayer
            onPlayPause={onPlayPause}
            onSkipBack={onSkipBack}
            onSkipForward={onSkipForward}
          />
        </View>
      </View>

      {/* Centred scenario briefing card */}
      <View style={[styles.content, { paddingTop: topBarHeight + 12 }]}>
        <View style={styles.simContainer}>
          {/* Background image */}
          <Image source={BG_IMAGE} style={styles.backgroundImage} resizeMode="cover" />

          {/* Gradient overlay — darkens the bottom half so text is readable */}
          <View pointerEvents="none" style={styles.gradientContainer}>
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <Defs>
                <LinearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#020618" stopOpacity="0.05" />
                  <Stop offset="0.45" stopColor="#020618" stopOpacity="0.20" />
                  <Stop offset="0.70" stopColor="#020618" stopOpacity="0.65" />
                  <Stop offset="1" stopColor="#020618" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="100" height="100" fill="url(#cardGradient)" />
            </Svg>
          </View>

          {/* Border overlay rendered on top so it's not covered by the image */}
          <View pointerEvents="none" style={styles.cardBorder} />

          {/* Text content + start button */}
          <View style={styles.textContainer}>
            <View style={styles.textContent}>
              <View style={styles.scenarioHeading}>
                <Text style={styles.scenarioBriefing}>SCENARIO BRIEFING</Text>
                <Text
                  style={styles.scenarioTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {title.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.description}>{description}</Text>
            </View>

            <TouchableOpacity
              onPress={onStart}
              activeOpacity={0.85}
              style={styles.startBtn}
              accessibilityRole="button"
              accessibilityLabel="Start Simulation"
            >
              <Text style={styles.startBtnLabel}>Start Simulation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.homeBg,
  },

  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: '#020618',
    borderBottomWidth: 1,
    borderBottomColor: '#314158',
    zIndex: 20,
  },

  topPlayer: {
    position: 'absolute',
    right: 0,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },

  simContainer: {
    width: '86%',
    maxWidth: 728,
    aspectRatio: 728 / 292,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#1D293D',
    backgroundColor: '#020618',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 20,
    
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#1D293D',
    borderRadius: radius.lg,
    zIndex: 10,
  },

  textContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 15,
  },

  textContent: {
    width: '100%',
    maxWidth: 497,
    gap: 16,
    alignItems: 'center',
  },

  scenarioHeading: {
    width: 146,
    height: 54,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scenarioBriefing: {
    fontFamily: fonts.secondary.bold,
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.primary,
  },

  scenarioTitle: {
    width: 146,
    height: 34,
    fontFamily: fonts.primary.blackItalic,
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#F8FAFC',
  },

  description: {
    width: '100%',
    maxWidth: 497,
    fontFamily: fonts.primary.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#E2E8F0',
  },

  startBtn: {
    width: 179,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 184, 219, 0.141)',
  },

  startBtnLabel: {
    fontFamily: fonts.primary.black,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.primary,
  },
});

import { useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ListMusic from 'lucide-react-native/icons/list-music';
import Pause from 'lucide-react-native/icons/pause';
import SkipBack from 'lucide-react-native/icons/skip-back';
import SkipForward from 'lucide-react-native/icons/skip-forward';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { PLAYER } from '../../constants/home';

type Props = {
  trackTitle?: string;
  standbyLabel?: string;
  onPlayPause?: (playing: boolean) => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
};

export default function TopPlayer({
  trackTitle = 'This is the fateful moment',
  standbyLabel = 'STANDBY',
  onPlayPause,
  onSkipBack,
  onSkipForward,
}: Props) {
  const [playing, setPlaying] = useState(false);

  function handlePlayPause() {
    const next = !playing;

    setPlaying(next);
    onPlayPause?.(next);
  }

  return (
    <View style={styles.playerBar}>
      <TouchableOpacity
        onPress={onSkipBack}
        activeOpacity={0.7}
        accessibilityLabel="Previous"
        accessibilityRole="button"
      >
        <SkipBack
          size={PLAYER.iconSize}
          color={colors.playerTextDim}
          strokeWidth={2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePlayPause}
        activeOpacity={0.8}
        style={styles.playBtn}
        accessibilityLabel={playing ? 'Pause' : 'Play'}
        accessibilityRole="button"
      >
        {playing ? (
          <Pause
            size={PLAYER.iconSize}
            color={colors.primary}
            strokeWidth={2}
          />
        ) : (
          <View style={styles.playGlyph} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSkipForward}
        activeOpacity={0.7}
        accessibilityLabel="Next"
        accessibilityRole="button"
      >
        <SkipForward
          size={PLAYER.iconSize}
          color={colors.playerTextDim}
          strokeWidth={2}
        />
      </TouchableOpacity>

      <View style={styles.trackInfo}>
        <Text
          style={styles.standbyLabel}
          numberOfLines={1}
        >
          {standbyLabel}
        </Text>

        <Text
          style={styles.trackTitle}
          numberOfLines={1}
        >
          {trackTitle}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityLabel="Queue"
        accessibilityRole="button"
      >
        <ListMusic
          size={PLAYER.listIconSize}
          color={colors.playerTextDim}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playerBar: {
    width: PLAYER.width,
    height: PLAYER.height,
    backgroundColor: 'rgba(15, 23, 43, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(49, 65, 88, 0.5)',
    borderTopLeftRadius: PLAYER.radius,
    borderBottomLeftRadius: PLAYER.radius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PLAYER.paddingV,
    paddingHorizontal: PLAYER.paddingH,
    gap: PLAYER.gap,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 20,
  },

playBtn: {
  width: PLAYER.playButtonSize,
  height: PLAYER.playButtonSize,
  borderRadius: PLAYER.playButtonSize / 2,
  borderWidth: 1,
  borderColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 0px 15px 0px #06B6D433',
},
  playGlyph: {
    width: 0,
    height: 0,
    marginLeft: 2,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.primary,
  },

  trackInfo: {
    flex: 1,
    minWidth: 0,
  },

  standbyLabel: {
    color: colors.playerStandbyText,
    fontFamily: fonts.secondary.regular,
    fontSize: PLAYER.standbySize,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },

  trackTitle: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: PLAYER.trackSize,
    textTransform: 'uppercase',
  },
});
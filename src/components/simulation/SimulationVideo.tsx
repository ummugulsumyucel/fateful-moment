import { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';

import BackIcon from '../../assets/icons/BackIcon';

type Props = {
  onBack: () => void;
  source: ReturnType<typeof require>;
  onFinished?: () => void;
};

export default function SimulationVideo({ onBack, source, onFinished }: Props) {
  const insets = useSafeAreaInsets();
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  const player = useVideoPlayer(source, (p) => {
    p.loop = false;
    p.play();
  });

  useEffect(() => {
    const sub = player.addListener('playingChange', (event) => {
      if (!event.isPlaying && player.duration > 0) {
        const remaining = player.duration - player.currentTime;
        if (remaining < 0.5) {
          onFinishedRef.current?.();
        }
      }
    });
    return () => sub.remove();
  }, [player]);

  const playerRef = useRef(player);
  useEffect(() => {
    const p = playerRef.current;
    return () => {
      p.release();
    };
  }, []);

  const backTop = Math.max(insets.top, 10);
  const backLeft = 32 + insets.left;

  return (
    <View style={styles.root}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      <TouchableOpacity
        onPress={onBack}
        style={[styles.backHitArea, { top: backTop, left: backLeft }]}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <View style={styles.backIcon} pointerEvents="none">
          <BackIcon size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
  },
  backHitArea: {
    position: 'absolute',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -(44 - 24) / 2,
    marginTop: -(44 - 24) / 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

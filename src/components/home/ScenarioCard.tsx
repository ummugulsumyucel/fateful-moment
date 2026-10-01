import { useId } from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import AlarmClock from 'lucide-react-native/icons/alarm-clock';
import type { LucideIcon } from 'lucide-react-native';

import StartButton from './StartButton';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { CARD, CARD_SHADOWS } from '../../constants/home';

type Props = {
  isDimmed?: boolean;
  onPress?: () => void;
  isActive?: boolean;
  time: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  showButton?: boolean;
  showTime?: boolean;
  icon?: LucideIcon;
  onStart?: () => void;
};

export default function ScenarioCard({
  isDimmed = false,
  onPress,
  isActive = true,
  time,
  title,
  description,
  image,
  showButton = true,
  showTime = true,
  icon: TimeIcon = AlarmClock,
  onStart,
}: Props) {
  const gradientId = `cardOverlay${useId().replace(
    /[^a-zA-Z0-9]/g,
    '',
  )}`;

  return (
    <Pressable
      onPress={onPress}
      style={styles.shadowWrap}
      accessibilityRole="button"
    >
      <View style={styles.card}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />

        <View pointerEvents="none" style={styles.overlay}>
          <Svg
            width={CARD.width}
            height={CARD.height}
          >
            <Defs>
              <LinearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop
                  offset="0"
                  stopColor={colors.homeBg}
                  stopOpacity={CARD.overlayTopOpacity}
                />

                <Stop
                  offset="1"
                  stopColor={colors.homeBg}
                  stopOpacity={CARD.overlayBottomOpacity}
                />
              </LinearGradient>
            </Defs>

            <Rect
              width="100%"
              height="100%"
              fill={`url(#${gradientId})`}
            />
          </Svg>
        </View>

        {showTime ? (
          <View style={styles.timeRow}>
            <TimeIcon
              size={CARD.timeIconSize}
              color={colors.primary}
              strokeWidth={2.2}
            />

            <Text style={styles.timeText}>
              {time}
            </Text>
          </View>
        ) : null}

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.body}>
          <Text
            style={styles.description}
            numberOfLines={4}
          >
            {description}
          </Text>

          {showButton ? (
            <View style={styles.startRow}>
              <StartButton
                onPress={isActive ? onStart : undefined}
              />
            </View>
          ) : null}
        </View>

        <View
          pointerEvents="none"
          style={styles.borderOverlay}
        />

        {isDimmed ? (
          <View
            pointerEvents="none"
            style={styles.dimOverlay}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    width: CARD.width,
    height: CARD.height,
    borderRadius: CARD.radius,
    boxShadow: [...CARD_SHADOWS],
  },

  card: {
    width: CARD.width,
    height: CARD.height,
    borderRadius: CARD.radius,
    overflow: 'hidden',
    borderWidth: CARD.borderWidth,
    borderColor: colors.cardBorder,
  },

  image: {
    ...StyleSheet.absoluteFill,
    width: CARD.width,
    height: CARD.height,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
  },

  borderOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: CARD.radius,
    borderWidth: CARD.borderWidth,
    borderColor: colors.cardBorder,
  },

  timeRow: {
    position: 'absolute',
    left: CARD.padding,
    top: CARD.timeTop,
    width: CARD.timeWidth,
    height: CARD.timeHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CARD.timeIconGap,
  },

  timeText: {
    color: colors.primary,
    fontFamily: fonts.secondary.bold,
    fontSize: CARD.durationSize,
    lineHeight: CARD.durationLineHeight,
  },

  title: {
    position: 'absolute',
    left: CARD.padding,
    right: CARD.padding,
    top: CARD.titleTop,
    height: CARD.titleHeight,
    color: colors.scenariosTitleColor,
    fontFamily: fonts.primary.blackItalic,
    fontSize: CARD.titleSize,
    lineHeight: CARD.titleLineHeight,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },

  body: {
    position: 'absolute',
    left: CARD.padding,
    top: CARD.bodyTop,
    width: CARD.bodyWidth,
    height: CARD.bodyHeight,
    justifyContent: 'space-between',
    gap: CARD.bodyGap,
  },

  description: {
    color: colors.cardDescColor,
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    lineHeight: 16,
  },

  startRow: {
    alignItems: 'flex-end',
  },

  dimOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(2, 6, 23, 0.55)',
    borderRadius: CARD.radius,
  },
});
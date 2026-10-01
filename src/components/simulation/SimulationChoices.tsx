import { useWindowDimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { useState } from 'react';

import BackIcon from '../../assets/icons/BackIcon';
import { fonts } from '../../theme/typography';
import type { Choice, ChoicesStage } from '../../types/simulation';
import { colors } from '../../theme';

// ─── Assets ───────────────────────────────────────────────────────────────────

const BG_IMAGE_1 = require('../../assets/images/optionBackground.png');
const BG_IMAGE_2 = require('../../assets/images/optionBackground2.png');

const REF_W = 812;
const REF_H = 375;

const CONTAINER_W = 702;
const CONTAINER_H = 222;
const CONTAINER_TOP = 76.5;

const CARD_H = 66;
const CARD_GAP = 12;

const PROGRESS_TRACK_W = 764;
const PROGRESS_TRACK_H = 6;
const PROGRESS_TRACK_TOP = 345;

const PROGRESS_W_DEFAULT = 214;
const PROGRESS_W_SELECTED = 100; 

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  choices: Choice[];
  stage: ChoicesStage;
  firstSelectedOption: string | null;
  secondSelectedOption: string | null;
  onSelect: (id: string) => void;
  onBack?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SimulationChoices({
  choices,
  stage,
  firstSelectedOption,
  secondSelectedOption,
  onSelect,
  onBack,
}: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();

  const scaleX = screenW / REF_W;
  const scaleY = screenH / REF_H;

  const containerW = Math.min(CONTAINER_W * scaleX, screenW - 32);
  const cardW = (containerW - CARD_GAP) / 2;
  const cardH = CARD_H * scaleY;
  const containerTop = CONTAINER_TOP * scaleY;

  const containerLeft = (screenW - containerW) / 2;

  const progressTrackW = Math.min(PROGRESS_TRACK_W * scaleX, screenW - 48);
  const progressTrackLeft = (screenW - progressTrackW) / 2;
  const progressTrackTop = PROGRESS_TRACK_TOP * scaleY;


  const activeSelectedOption =
    stage === 'choices2'
      ? (secondSelectedOption ?? firstSelectedOption)
      : firstSelectedOption;


  const yourChoiceId = stage === 'choices2' ? firstSelectedOption : null;

  const previousOptionId =
    stage === 'choices2' &&
    secondSelectedOption !== null &&
    firstSelectedOption !== null &&
    secondSelectedOption !== firstSelectedOption
      ? firstSelectedOption
      : null;

  const showRedBg = stage === 'choices1' && firstSelectedOption !== null;

  const progressActiveW =
    firstSelectedOption !== null
      ? PROGRESS_W_SELECTED * scaleX
      : PROGRESS_W_DEFAULT * scaleX;
  const progressActiveColor = firstSelectedOption !== null ? '#EF4444' : '#FFD230';

  const bgImage = stage === 'choices2' ? BG_IMAGE_2 : BG_IMAGE_1;

  const row1 = choices.slice(0, 2);
  const row2 = choices.slice(2, 4);
  const row3 = choices.slice(4, 5);

  return (
 <View style={styles.root}>
  <Image
    source={bgImage}
    style={styles.bgImage}
    resizeMode="cover"
  />

  <View
    pointerEvents="none"
    style={styles.bgOverlay}
  />

      {showRedBg && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={StyleSheet.absoluteFill}
          >
            <Defs>
              <RadialGradient
                id="redVignette"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"
                gradientUnits="objectBoundingBox"
              >
                <Stop offset="0" stopColor="#FF0000" stopOpacity="0" />
                <Stop offset="0.806" stopColor="#FF0000" stopOpacity="0" />
                <Stop offset="1" stopColor="#FF0000" stopOpacity="0.12" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100" height="100" fill="url(#redVignette)" />
          </Svg>
        </View>
      )}

      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={styles.backHitArea}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <BackIcon size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Options grid */}
      <View
        style={[
          styles.grid,
          {
            top: containerTop,
            left: containerLeft,
            width: containerW,
            height: CONTAINER_H * scaleY,
            gap: CARD_GAP,
          },
        ]}
      >
        <View style={[styles.row, { gap: CARD_GAP }]}>
          {row1.map((choice) => (
            <OptionCard
              key={choice.id}
              choice={choice}
              isSelected={activeSelectedOption === choice.id}
              isPrevious={previousOptionId === choice.id}
              isYourChoice={yourChoiceId === choice.id}
              onPress={onSelect}
              cardW={cardW}
              cardH={cardH}
            />
          ))}
        </View>

        <View style={[styles.row, { gap: CARD_GAP }]}>
          {row2.map((choice) => (
            <OptionCard
              key={choice.id}
              choice={choice}
              isSelected={activeSelectedOption === choice.id}
              isPrevious={previousOptionId === choice.id}
              isYourChoice={yourChoiceId === choice.id}
              onPress={onSelect}
              cardW={cardW}
              cardH={cardH}
            />
          ))}
        </View>

        {row3.length > 0 && (
          <View style={styles.rowCentre}>
            <OptionCard
              key={row3[0].id}
              choice={row3[0]}
              isSelected={activeSelectedOption === row3[0].id}
              isPrevious={previousOptionId === row3[0].id}
              isYourChoice={yourChoiceId === row3[0].id}
              onPress={onSelect}
              cardW={cardW}
              cardH={cardH}
            />
          </View>
        )}
      </View>

      {stage === 'choices1' && (
        <View
          style={[
            styles.progressTrack,
            {
              top: progressTrackTop,
              left: progressTrackLeft,
              width: progressTrackW,
              height: PROGRESS_TRACK_H,
            },
          ]}
        >
          <View
            style={[
              styles.progressActive,
              {
                alignSelf: 'center',
                width: progressActiveW,
                height: PROGRESS_TRACK_H,
                backgroundColor: progressActiveColor,
                shadowColor: firstSelectedOption !== null ? '#EF4444' : '#FFD230',
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

// ─── Option card ─────────────────────────────────────────────────────────────

type OptionCardProps = {
  choice: Choice;
  isSelected: boolean;
  isPrevious: boolean;
  isYourChoice: boolean;
  onPress: (id: string) => void;
  cardW: number;
  cardH: number;
};

function OptionCard({
  choice,
  isSelected,
  isPrevious,
  isYourChoice,
  onPress,
  cardW,
  cardH,
}: OptionCardProps) {
  const gradId = `selGrad-${choice.id}`;
  const [box, setBox] = useState({ w: 0, h: 0 });
  const showGradient = isSelected || isPrevious;

  return (
    <View
      style={[
        styles.cardWrapper,
        { width: cardW, minHeight: cardH },
      ]}
    >
      {isYourChoice && (
        <View style={styles.yourChoiceLabel} pointerEvents="none">
          <Text style={styles.yourChoiceText}>Your Choice</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => onPress(choice.id)}
        activeOpacity={0.85}
        accessibilityRole="button"        
style={[
  styles.card,
  {
    width: cardW,
    minHeight: cardH,
    borderWidth: showGradient ? 2 : 1,
    backgroundColor: showGradient ? 'transparent' : 'rgba(15, 23, 43, 0.63)',
    opacity: isPrevious ? 0.48 : 1,
  },
]}
      >
{showGradient && (
  <View
    pointerEvents="none"
    style={StyleSheet.absoluteFill}
    onLayout={(e) => {
      const { width, height } = e.nativeEvent.layout;
      setBox({ w: width, h: height });
    }}
  >
    {box.w > 0 && (
      <Svg width={box.w} height={box.h} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          {isPrevious ? (
            // Figma: linear-gradient(91.21deg, ...)
            <LinearGradient id={gradId} x1="0" y1="0.49" x2="1" y2="0.51">
              <Stop offset="0" stopColor="#0F172B" stopOpacity="0.63" />
              <Stop offset="0.5" stopColor="#00D3F3" stopOpacity="0.63" />
              <Stop offset="1" stopColor="#0F172B" stopOpacity="0.63" />
            </LinearGradient>
          ) : (
            <LinearGradient id={gradId} x1="0" y1="0.5" x2="1" y2="0.5">
              <Stop offset="0" stopColor="#1B3F52" stopOpacity="1" />
              <Stop offset="0.6" stopColor="#14B8CC" stopOpacity="1" />
              <Stop offset="1" stopColor="#12263C" stopOpacity="1" />
            </LinearGradient>
          )}
        </Defs>

        <Rect x="0" y="0" width="100" height="100" fill={`url(#${gradId})`} />

        {isSelected && (
          <>
            <Polygon points="18,100 40,100 47,0 25,0" fill="#FFFFFF" fillOpacity="0.07" />
            <Polygon points="62,100 84,100 91,0 69,0" fill="#FFFFFF" fillOpacity="0.07" />
            <Polygon points="40,100 62,100 69,0 47,0" fill="#000000" fillOpacity="0.06" />
          </>
        )}
      </Svg>
    )}
  </View>
)}

        <Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>
          {choice.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#020618',
  },

  bgImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },

  bgOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0000007D',
  },

  backHitArea: {
    position: 'absolute',
    top: 10,
    left: 16,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  grid: {
    position: 'absolute',
    zIndex: 10,
  },

  row: {
    flexDirection: 'row',
  },

  rowCentre: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'relative',
  },

  yourChoiceLabel: {
    position: 'absolute',
    top: -16,
    alignSelf: 'center',
    zIndex: 30,
    width: 106,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFB900',
    backgroundColor: '#FFD230',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yourChoiceText: {
    fontFamily: fonts.primary.black,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    textAlign: 'center',
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#F8FAFC',
    backgroundColor: '#0F172BA1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center'
  },

  gradientSvg: {
    borderRadius: 16,
  },

  cardText: {
    fontFamily: fonts.primary.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.white,
    zIndex: 1,
  },

  cardTextSelected: {
    fontFamily: fonts.primary.bold,
    fontWeight: '700',
    color: colors.white,
    
  },

  progressTrack: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#1D293D',
    opacity: 0.56,
    zIndex: 10,
  },

  progressActive: {
    borderRadius: 999,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
  },
});

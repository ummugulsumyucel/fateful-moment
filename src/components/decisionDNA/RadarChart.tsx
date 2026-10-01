import { StyleSheet, View } from 'react-native';

import Svg, {
  Line,
  Polygon,
  Text as SvgText,
} from 'react-native-svg';

import { fonts } from '../../theme/typography';
import { DECISION_DNA_STATIC_DATA } from '../../data/decisionDNAStaticData';
import DNAScoreCard from '../decisionDNA/DNAScoreCard';

type Dimension =
  | 'vision'
  | 'courage'
  | 'risk'
  | 'control'
  | 'empathy'
  | 'ethics';

type Props = {
  vision: number;
  courage: number;
  risk: number;
  control: number;
  empathy: number;
  ethics: number;
  size?: number;
};

const DIMENSIONS: Dimension[] = [
  'vision',
  'courage',
  'risk',
  'control',
  'empathy',
  'ethics',
];

const LABELS: Record<Dimension, string> = {
  vision: 'VISION',
  courage: 'COURAGE',
  risk: 'RISK',
  control: 'CONTROL',
  empathy: 'EMPATHY',
  ethics: 'ETHICS',
};

function toCartesian(
  angle: number,
  radius: number,
  cx: number,
  cy: number,
) {
  const rad = (angle - 90) * (Math.PI / 180);

  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function polygonPoints(
  values: number[],
  maxR: number,
  cx: number,
  cy: number,
): string {
  const n = values.length;

  return values
    .map((v, i) => {
      const angle = (360 / n) * i;
      const r = (v / 100) * maxR;

      const pt = toCartesian(
        angle,
        r,
        cx,
        cy,
      );

      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

export default function RadarChart({
  vision,
  courage,
  risk,
  control,
  empathy,
  ethics,
  size = 140,
}: Props) {
  // Radar etiketlerinin SVG sınırına çarpmasını önlemek için
  // grafiğin etrafına ekstra alan bırakıyoruz.
  const PADDING = 20;

  const svgSize = size + PADDING * 2;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxR = size * 0.38;

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const scoreValues = [
    vision,
    courage,
    risk,
    control,
    empathy,
    ethics,
  ];

  const filled = polygonPoints(
    scoreValues,
    maxR,
    cx,
    cy,
  );

  return (
    <View style={styles.root}>

      {/* Radar */}
      <View
        style={{
          width: svgSize,
          height: svgSize,
        }}
      >
        <Svg
          width={svgSize}
          height={svgSize}
        >
          {/* Grid rings */}
          {gridLevels.map((level) => {
            const pts = polygonPoints(
              [100, 100, 100, 100, 100, 100].map(
                (v) => v * level,
              ),
              maxR,
              cx,
              cy,
            );

            return (
              <Polygon
                key={level}
                points={pts}
                fill="none"
                stroke="#1D293D"
                strokeWidth={0.8}
              />
            );
          })}

          {/* Axis lines */}
          {DIMENSIONS.map((_, i) => {
            const angle =
              (360 / DIMENSIONS.length) * i;

            const pt = toCartesian(
              angle,
              maxR,
              cx,
              cy,
            );

            return (
              <Line
                key={i}
                x1={cx}
                y1={cy}
                x2={pt.x}
                y2={pt.y}
                stroke="#1D293D"
                strokeWidth={0.8}
              />
            );
          })}

          {/* Filled area */}
          <Polygon
            points={filled}
            fill="#06B6D466"
            stroke="#06B6D4"
            strokeWidth={1.5}
          />

          {/* Axis labels */}
          {DIMENSIONS.map((dim, i) => {
            const angle =
              (360 / DIMENSIONS.length) * i;

            const labelR = maxR + 14;

            const pt = toCartesian(
              angle,
              labelR,
              cx,
              cy,
            );

            return (
              <SvgText
                key={dim}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={6.5}
                fill="#62748E"
                fontFamily={fonts.primary.bold}
                letterSpacing={0.5}
              >
                {LABELS[dim]}
              </SvgText>
            );
          })}
        </Svg>
      </View>
      <View style={styles.scoreGrid}>
        {[0, 2, 4].map((rowStart) => (
          <View key={rowStart} style={styles.scoreRow}>
            <DNAScoreCard
              label={DECISION_DNA_STATIC_DATA.scores[rowStart].label}
              value={DECISION_DNA_STATIC_DATA.scores[rowStart].value}
              icon={DECISION_DNA_STATIC_DATA.scores[rowStart].icon}
            />
            <DNAScoreCard
              label={DECISION_DNA_STATIC_DATA.scores[rowStart + 1].label}
              value={DECISION_DNA_STATIC_DATA.scores[rowStart + 1].value}
              icon={DECISION_DNA_STATIC_DATA.scores[rowStart + 1].icon}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  scoreGrid: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'column',
    gap: 6,
  },

  scoreRow: {
    flexDirection: 'row',
    gap: 6,
  },
});
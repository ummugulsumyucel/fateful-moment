import {
  useWindowDimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from 'react-native';

import { useState } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fonts } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

import DNAHeaderCard from '../../components/decisionDNA/DNAHeaderCard';
import PsychologicalMatrix from '../../components/decisionDNA/PsychologicalMatrix';
import PatternDetection from '../../components/decisionDNA/PatternDetection';
import BlindSpotVision from '../../components/decisionDNA/BlindSpotVision';

import Sidebar, {
  type SidebarItem,
} from '../../components/home/Sidebar';

import {
  DRAWER,
} from '../../constants/home';

import { useDrawer } from '../../hooks/useDrawer';

const LEFT = 66;
const RIGHT_PAD = 24;
const COLUMN_GAP = 16;

type Props = {
  onBack?: () => void;
};

export default function DecisionDNAScreen({
  onBack,
}: Props = {}) {
  const insets = useSafeAreaInsets();

  const { width: screenW } = useWindowDimensions();

  const contentW = screenW - LEFT - RIGHT_PAD;

  const columnW =
    (contentW - COLUMN_GAP) / 2;

  const radarSize = Math.min(
    130,
    columnW * 0.46,
  );

  const [activeSidebarItem, setActiveSidebarItem] =
    useState<SidebarItem>('dna');

  const { drawerOpen, translateX, setOpen, panHandlers } = useDrawer({
    leftInset: insets.left,
  });

  function handleSidebarPress(
    item: SidebarItem,
  ) {
    setActiveSidebarItem(item);

    if (item === 'dna') {
      setOpen(false);
      return;
    }

    if (item === 'scenarios') {
      setOpen(false);
      onBack?.();
    }
  }

  return (
    <View
      style={styles.rootContainer}
      {...panHandlers}
    >

      <ScrollView
        style={styles.root}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom:
              insets.bottom + 32,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            {
              marginTop:
                insets.top + spacing.md,

              marginLeft: LEFT,
            },
          ]}
        >
          Karar DNAsı
        </Text>
        <View
          style={[
            styles.contentRow,
            {
              marginLeft: LEFT,
              marginRight: RIGHT_PAD,
              gap: COLUMN_GAP,
            },
          ]}
        >
          <View
            style={[
              styles.column,
              {
                width: columnW,
              },
            ]}
          >
            <DNAHeaderCard />

            <PsychologicalMatrix
              radarSize={radarSize}
            />
          </View>
          <View
            style={[
              styles.column,
              {
                width: columnW,
              },
            ]}
          >
            <PatternDetection />

            <BlindSpotVision />
          </View>
        </View>
      </ScrollView>

      {drawerOpen ? (
        <Pressable
          style={styles.scrim}
          onPress={() => setOpen(false)}
        />
      ) : null}

      <Animated.View
        pointerEvents={
          drawerOpen
            ? 'auto'
            : 'none'
        }
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      >
        <Sidebar
          activeItem={
            activeSidebarItem
          }
          onItemPress={
            handleSidebarPress
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },

  root: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  title: {
    fontFamily: fonts.primary.black,
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 28,
    color: colors.white,
    marginBottom: 12,
  },

  contentRow: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
    gap: 12,
  },

  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor:
      'rgba(0, 0, 0, 0.45)',
    zIndex: 10,
  },

  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER.width,
    zIndex: 11,
  },
});
import { useState } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Sidebar, { type SidebarItem } from '../../components/home/Sidebar';
import TopPlayer from '../../components/home/TopPlayer';
import SectionHeader from '../../components/home/SectionHeader';
import ScenarioCard from '../../components/home/ScenarioCard';
import { SCENARIOS } from '../../data/scenarios';
import { colors } from '../../theme/colors';
import { useDrawer } from '../../hooks/useDrawer';
import {
  CARD,
  DRAWER,
  DRAWER_TRIGGER_EDGE_WIDTH,
  HOME_CONTENT_LEFT,
  PLAYER,
} from '../../constants/home';

type Props = {
  onScenarioStart?: (id: string) => void;
  onDnaPress?: () => void;
};

export default function HomeScreen({ onScenarioStart, onDnaPress }: Props) {
  const insets = useSafeAreaInsets();
  const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>('scenarios');
  const [focusedScenarioId, setFocusedScenarioId] = useState<string | null>(null);

  const { drawerOpen, translateX, setOpen, panHandlers } = useDrawer({
    leftInset: insets.left,
  });

  function handleSidebarPress(item: SidebarItem) {
    setActiveSidebarItem(item);
    if (item === 'scenarios') {
      setOpen(false);
    } else if (item === 'dna') {
      setOpen(false);
      onDnaPress?.();
    }
  }

  return (
    <View style={styles.root} {...panHandlers}>
      <StatusBar hidden={false} barStyle="light-content" backgroundColor={colors.homeBg} />

      <View style={styles.canvas}>
        <View style={[styles.playerAnchor, { top: Platform.OS === 'ios' ? 0 : insets.top }]}>
          <TopPlayer />
        </View>

        <View
          style={[
            styles.column,
            {
              left: HOME_CONTENT_LEFT + insets.left,
              right: 0,
              top: Platform.OS === 'ios' ? PLAYER.height : PLAYER.height + insets.top,
              bottom: insets.bottom,
            },
          ]}
        >
          <SectionHeader />

          <FlatList
            data={SCENARIOS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardList}
            contentContainerStyle={styles.listContent}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
            renderItem={({ item }) => (
              <ScenarioCard
                isDimmed={focusedScenarioId !== null && focusedScenarioId !== item.id}
                onPress={() => setFocusedScenarioId(item.id)}
                isActive={item.isActive}
                time={item.time}
                title={item.title}
                description={item.description}
                image={item.image}
                onStart={() => onScenarioStart?.(item.id)}
              />
            )}
          />
        </View>

        <Pressable
          onPress={() => setOpen(true)}
          style={styles.triggerStrip}
          accessibilityLabel="Open menu"
          accessibilityRole="button"
        />
      </View>

      {drawerOpen ? (
        <Pressable style={styles.scrim} onPress={() => setOpen(false)} />
      ) : null}

      <Animated.View
        pointerEvents={drawerOpen ? 'auto' : 'none'}
        style={[styles.drawer, { transform: [{ translateX }] }]}
      >
        <Sidebar activeItem={activeSidebarItem} onItemPress={handleSidebarPress} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.homeBg,
  },
  canvas: {
    ...StyleSheet.absoluteFill,
  },
  playerAnchor: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  column: {
    position: 'absolute',
    left: HOME_CONTENT_LEFT,
    right: 0,
    top: PLAYER.height,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  cardList: {
    alignSelf: 'stretch',
    marginTop: CARD.gap,
    height: CARD.height,
  },
  listContent: {
    alignItems: 'flex-start',
    paddingRight: CARD.gap,
  },
  cardSeparator: {
    width: CARD.gap,
  },
  triggerStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_TRIGGER_EDGE_WIDTH,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
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

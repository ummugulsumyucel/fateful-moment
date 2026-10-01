import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Compass from 'lucide-react-native/icons/compass';
import Dna from 'lucide-react-native/icons/dna';
import Settings from 'lucide-react-native/icons/settings';

import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { DRAWER } from '../../constants/home';

export type SidebarItem = 'scenarios' | 'dna' | 'settings';

type Props = {
  activeItem?: SidebarItem;
  onItemPress?: (item: SidebarItem) => void;
};

const ITEMS: { key: SidebarItem; label: string; Icon: typeof Compass }[] = [
  { key: 'scenarios', label: 'SCENARIOS', Icon: Compass },
  { key: 'dna', label: 'DNA', Icon: Dna },
  { key: 'settings', label: 'SETTINGS', Icon: Settings },
];

const DRAWER_SHADOW = [
  { offsetX: 12, offsetY: 0, blurRadius: 40, spreadDistance: 0, color: 'rgba(0, 0, 0, 0.45)' },
] as const;

export default function Sidebar({ activeItem = 'scenarios', onItemPress }: Props) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.items}>
        {ITEMS.map(({ key, label, Icon }) => {
          const isVisuallyActive = key === activeItem;
          const iconColor = isVisuallyActive ? colors.primary : colors.sidebarIconInactive;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => onItemPress?.(key)}
              activeOpacity={0.8}
              style={[styles.item, isVisuallyActive ? styles.itemActive : styles.itemInactive]}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: activeItem === key }}
            >
              <Icon
                size={DRAWER.iconSize}
                color={iconColor}
                strokeWidth={isVisuallyActive ? 2.2 : 1.8}
              />
              <Text
                style={[
                  styles.label,
                  isVisuallyActive ? styles.labelActive : styles.labelInactive,
                  key === 'scenarios' ? styles.scenariosLabel : null,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
              {isVisuallyActive ? <View style={styles.activeDot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: DRAWER.width,
    height: '100%',
    backgroundColor: colors.sidebarBg,
    boxShadow: [...DRAWER_SHADOW],
  },
  items: {
    position: 'absolute',
    left: DRAWER.padding,
    top: DRAWER.navTop,
    width: DRAWER.itemWidth,
    justifyContent: 'flex-start',
    gap: DRAWER.itemGap,
  },
  item: {
    width: DRAWER.itemWidth,
    height: DRAWER.itemHeight,
    borderRadius: DRAWER.itemRadius,
    borderWidth: DRAWER.itemBorderWidth,
    padding: DRAWER.itemPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemActive: {
    backgroundColor: colors.sidebarSelectedBg,
    borderColor: colors.sidebarSelectedBorder,
  },
  itemInactive: {
    backgroundColor: colors.sidebarBg,
    borderColor: colors.sidebarItemBorder,
  },
  label: {
    marginLeft: DRAWER.iconGap,
    height: DRAWER.labelHeight,
    fontFamily: fonts.primary.bold,
    fontSize: DRAWER.labelSize,
    lineHeight: DRAWER.labelHeight,
    textTransform: 'uppercase',
  },
  scenariosLabel: {
    width: 84,
  },
  labelActive: {
    color: colors.primary,
  },
  labelInactive: {
    color: colors.sidebarLabelInactive,
  },
  activeDot: {
    marginLeft: 'auto',
    width: DRAWER.dotSize,
    height: DRAWER.dotSize,
    borderRadius: DRAWER.dotSize / 2,
    backgroundColor: colors.primary,
  },
});

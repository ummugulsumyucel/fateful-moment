
import { useCallback, useRef, useState } from 'react';
import { Animated, GestureResponderHandlers, PanResponder } from 'react-native';

import { DRAWER, DRAWER_TRIGGER_EDGE_WIDTH } from '../constants/home';

type Options = {
  leftInset?: number;
};

export type UseDrawerReturn = {
  drawerOpen: boolean;
  translateX: Animated.Value;
  setOpen: (next: boolean) => void;
  panHandlers: GestureResponderHandlers;
};

export function useDrawer({ leftInset = 0 }: Options = {}): UseDrawerReturn {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [translateX] = useState(() => new Animated.Value(-DRAWER.width));

  const openRef = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      openRef.current = next;
      setDrawerOpen(next);
      Animated.timing(translateX, {
        toValue: next ? 0 : -DRAWER.width,
        duration: 220,
        useNativeDriver: true,
      }).start();
    },
    [translateX],
  );

  const [panHandlers] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gesture) => {
        const fromLeftEdge =
          evt.nativeEvent.pageX <= DRAWER_TRIGGER_EDGE_WIDTH + leftInset;
        if (!openRef.current && fromLeftEdge && gesture.dx > 12) return true;
        if (openRef.current && gesture.dx < -12) return true;
        return false;
      },
      onPanResponderRelease: (_, gesture) => {
        if (!openRef.current && gesture.dx > 40) setOpen(true);
        else if (openRef.current && gesture.dx < -40) setOpen(false);
      },
    }).panHandlers,
  );

  return {
    drawerOpen,
    translateX,
    setOpen,
    panHandlers,
  };
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export const DRAWER = {
  width: 256,
  padding: 24,
  navTop: 103,    
  itemWidth: 208,
  itemHeight: 45.51,
  itemRadius: 14,
  itemBorderWidth: 0.76,
  itemPadding: 12,
  itemGap: 16,
  iconSize: 20,    
  iconGap: 16,     
  labelHeight: 20,
  labelSize: 14,   
  dotSize: 6,      
} as const;

export const DRAWER_TRIGGER_EDGE_WIDTH = 66;

// ─── Content layout ───────────────────────────────────────────────────────────

export const HOME_CONTENT_LEFT = 66;

export const SECTION_HEADER = {
  gapDividerToTitle: 19,  
  gapTitleToSubtitle: 8,   
  gapSubtitleToCount: 15,  
  gapCountToCards: 8,      
  titleSize: 20,
  titleLineHeight: 20,
  subtitleSize: 12,
  subtitleLineHeight: 16,
  countSize: 12,
  countLineHeight: 16,
} as const;

// ─── Scenario card ────────────────────────────────────────────────────────────

export const CARD_SHADOWS = [
  { offsetX: 0, offsetY: 8, blurRadius: 10, spreadDistance: -6, color: 'rgba(0, 0, 0, 0.1)' },
  { offsetX: 0, offsetY: 20, blurRadius: 25, spreadDistance: -5, color: 'rgba(0, 0, 0, 0.1)' },
] as const;

export const CARD = {
  width: 220,
  height: 176,
  radius: 16,
  borderWidth: 1,
  padding: 12,
  gap: 16,   

  timeTop: 28,
  timeWidth: 55,
  timeHeight: 12,
  timeIconSize: 12,    
  timeIconGap: 4,      

  titleTop: 44,
  titleHeight: 16,
  titleSize: 12,       
  titleLineHeight: 16, 

  bodyTop: 64,
  bodyWidth: 196,
  bodyHeight: 100,
  bodyGap: 4,

  overlayTopOpacity: 0.55,    
  overlayBottomOpacity: 0.78, 

  durationSize: 8,    
  durationLineHeight: 12, 
} as const;

// ─── Top player ───────────────────────────────────────────────────────────────

export const PLAYER = {
  width: 289,
  height: 48,
  radius: 999,
  paddingV: 6,
  paddingH: 16,
  gap: 16,
  playButtonSize: 34,  
  iconSize: 16,        
  listIconSize: 18,    
  standbySize: 8,      
  trackSize: 11,       
} as const;

// ─── Start button ─────────────────────────────────────────────────────────────

export const START_BUTTON = {
  width: 62,
  height: 32,
  radius: 16,
  paddingV: 8,
  paddingH: 8,
  gap: 8,
  fontSize: 12,
  lineHeight: 16,
} as const;


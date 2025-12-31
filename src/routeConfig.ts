export const ScrollTypes = ['Left To Right', 'Right To Left', 'Fixed'] as const;
export type ScrollType = typeof ScrollTypes[number];

export const Positions = ['Left', 'Right', 'Center'] as const;
export type Position = typeof Positions[number];

export const ScreenFormats = ['single', 'two', 'three'] as const;
export type ScreenFormat = typeof ScreenFormats[number];

export const FontWeights = ['Regular', 'Bold'] as const;
export type FontWeight = typeof FontWeights[number];

// Add these constants for default sizes:
export const DEFAULT_SCREEN_HEIGHTS = [16, 32] as const;
export type ScreenHeight = typeof DEFAULT_SCREEN_HEIGHTS[number];

export const DEFAULT_SCREEN_WIDTHS = [64, 96, 128, 160, 192, 224] as const;
export type ScreenWidth = typeof DEFAULT_SCREEN_WIDTHS[number];

export const SCROLL_SPEED_PRESETS = [
  { label: "Very Fast", value: 9 },
  { label: "Medium Fast", value: 6 },
  { label: "Normal", value: 4 },
  { label: "Slow", value: 3 },
  { label: "Very Slow", value: 1 },
] as const;

export type ScrollSpeedPresetLabel = typeof SCROLL_SPEED_PRESETS[number]['label'];
export type ScrollSpeedPresetValue = typeof SCROLL_SPEED_PRESETS[number]['value'];



export interface BitmapTranslations {
  bitmap: string;
  width: number;
  height: number;
}

export interface TextConfig {
  text: string;
  bitmap?: string;
  fontWidth?: number;
  scrollType: ScrollType;
  position: Position;
  scrollSpeed: number;
  fontWeight: FontWeight;
  fontHeight?: number;
}

type ScreenTextKeys = 'sideText' | 'upperHalfText' | 'lowerHalfText' | 'text';

type ScreenTexts<T extends ScreenTextKeys[]> = {
  [K in T[number]]: TextConfig;
};

type SingleScreenTexts = ScreenTexts<['text']>;
type TwoScreenTexts = ScreenTexts<['sideText', 'text']>;
type ThreeScreenTexts = ScreenTexts<['sideText', 'upperHalfText', 'lowerHalfText']>;

export interface Screen {
  format: ScreenFormat;
  texts: SingleScreenTexts | TwoScreenTexts | ThreeScreenTexts;
  height: ScreenHeight;
  width: ScreenWidth;
}

export interface Screens {
  front: Screen;
  side: Screen;
  rear: Screen;
  internal: Screen;
}

// Group flags for clarity
export interface RouteFlags {
  splitRoute: boolean;
  showRt: boolean;
  showSpm: boolean;
  showBoth: boolean;
}

export interface RouteInformation {
  routeNumber: string;
  source: string;
  destination: string;
  via: string;
  routeNumber1: string;
  routeNumber2: string;
  separation: string;
  splitRoute: boolean;
  showRt: boolean;
  showSpm: boolean;
  showBoth: boolean;
}

export interface SpecialMessage {
  title: string;
  message: string;
  priority?: number;
}

export interface LanguageDisplayConfig {
  [languageCode: string]: Screens;
}

export interface DisplayConfig {
  route: RouteInformation;
  displayConfig: LanguageDisplayConfig;
  version: string;
  areaId: string;
  depotId: string;
  createdAt?: string;
  active?: string;
  deleted?: string;
  id?: string;
  specialMessages: SpecialMessage[];
}



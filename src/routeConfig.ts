export const ScrollTypes = ['Left To Right', 'Right To Left', 'Fixed', 'Flicker'] as const;
export type ScrollType = typeof ScrollTypes[number];

export const Positions = ['Left', 'Right', 'Center'] as const;
export type Position = typeof Positions[number];

export const ScreenFormats = ['single', 'two', 'three'] as const;
export type ScreenFormat = typeof ScreenFormats[number];

export const FontWeights = ['Regular', 'Bold'] as const;
export type FontWeight = typeof FontWeights[number];

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
  fontSize: number;
  fontWeight: FontWeight;
  fontHeight?: number;
  x_offset?: number;
  y_offset?: number;
  spacing?: number;
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



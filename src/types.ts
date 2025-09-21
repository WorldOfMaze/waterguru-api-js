
export type WaterGuruDashboard = {
  rspType: string;
  code: string;
  lastModified: string; // ISO Date
  status: string;
  waterBodies: WaterGuruWaterBodyView[];
  waterBodyIdToIndex: Record<string, number>;
  statusColors: WaterGuruStatusColors;
  contact: WaterGuruContactInfo;
  specialOffers: unknown[];
  storeUrl: string;
  buyTestKitUrl: string;
  buySensorUrl: string;
  helpUrl: string;
};

export type WaterGuruStatusColors = {
  GREEN: string;
  YELLOW: string;
  RED: string;
};

export type WaterGuruContactInfo = {
  web: string;
  supportWeb: string;
  supportEmail: string;
  supportPhone: string;
};

export type WaterGuruWaterBodyView = {
  viewType: string;
  status: keyof WaterGuruStatusColors;
  firstAlertCondition?: string;
  alerts: WaterGuruAlertView[];
  waterBody: WaterGuruWaterBody;
  waterBodyId: string;
  name: string;
  waterTemp: number;
  waterTempTime: string;
  waterTempTimeHuman: string;
  freeClTargetEffective: number;
  freeClTargetEffectiveDec: string;
  phTargetEffective: number;
  phTargetEffectiveDec: string;
  flowGpmTargetEffective: number;
  taTargetEffective: number;
  chTargetEffective: number;
  cyaTargetEffective: number;
  saltTargetEffective: number;
  pods: WaterGuruPodView[];
  latestMeasureTime: string;
  latestMeasureTimeHuman: string;
  measurements: WaterGuruMeasurementView[];
  adviceUrl: string;
  equipmentUrl: string;
  sanitizerType: string;
};

export type WaterGuruAlertView = {
  category: string;
  source: string;
  condition: string;
  icon: string;
  status: keyof WaterGuruStatusColors;
  color: string;
  text: string;
  advice?: WaterGuruAdvice;
};

export type WaterGuruWaterBody = {
  waterBodyId: string;
  userId: string;
  createTime: string;
  label: string;
  sizeGallons: number;
  sizeGallonsManual: boolean;
  measDoseHr: number;
  measDoseMin: number;
  measDoseHrMinModified: string;
  measDoseTimes: { hour: number; minute: number }[];
  type: string;
  surface: string;
  filterType: string;
  userCl: string;
  userTrich: string;
  userClLiq: string;
  userClLiqProductPct: number;
  userAcid: string;
  userAcidMuriaticPct: number;
  cover: string;
  addr1: string;
  city: string;
  state: string;
  zip: string;
  imageUrl: string;
};

export type WaterGuruPodView = {
  pod: WaterGuruPod;
  podId: number;
  refillables: WaterGuruRefillable[];
  rssiInfo?: WaterGuruRssiInfo;
};

export type WaterGuruMeasurementView = {
  viewType: string;
  status: keyof WaterGuruStatusColors;
  type: string;
  title: string;
  value: string;
  floatValue?: number;
  intValue?: number;
  measureTime: string;
  measureTimeHuman: string;
  color: string;
  cfg: WaterGuruMeasurementConfig;
  target?: number;
  alerts?: WaterGuruAlertView[];
  firstAlertCondition?: string;
};

export type WaterGuruAdvice = {
  url: string;
  miscData?: unknown;
  action?: unknown;
};

export type WaterGuruPod = {
  podId: number;
  shortBleId: string;
  bleId: string;
  opsNotes: unknown[];
  userId: string;
  waterBodyId: string;
  createTime: string;
  lastCxnTime: string;
  setUpTime: string;
  ipAddr: string;
  wifiId: string;
  product: string;
  fwSeries: string;
  fwUpdateVersion: string;
  fwUpdateVersionPush: boolean;
  fwUpdateLinkPushes: unknown[];
  fwUpdateInstalls: string[];
  fwUpdateBranch: string;
  fwGoldenLinkPushes: unknown[];
  fwGoldenInstalls: unknown[];
  fwBleVersion: string;
  fwBleLinkPushes: unknown[];
  fwBleInstalls: string[];
  cfgPush: boolean;
  freeClTarget: number;
  phTarget: number;
  sizeGal: number;
  measAutoHrs: number;
  measDoseTimes: { hour: number; minute: number }[];
  freeClDoseDailyLim: number;
  measDelayMins: number;
  flowDeltaThreshold: number;
  flowSensorRefOhms: number;
  pumpScanState: string;
  pumpScanPendingTime: string;
  pumpScanIntervalMins: number;
  pumpScanNumCycles: number;
  doCmdCron: unknown[];
  remotePowerType: number;
};

export type WaterGuruRefillable = {
  viewType: string;
  status: keyof WaterGuruStatusColors;
  type: string;
  color: string;
  label: string;
  maxAmount?: string;
  amountLeft: string;
  unit: string;
  timeLeftText?: string;
  pctLeft?: number;
  pctLeftDec?: string;
  urgent?: boolean;
  refillTime?: string;
};

export type WaterGuruRssiInfo = {
  rssi: number;
  rssiTime: string;
  bars: number;
  desc: string;
  tip: string;
};

export type WaterGuruMeasurementConfig = {
  dataType: string;
  abbrev: string;
  queryParam: string;
  unit?: string;
  srcScale?: number;
  decPlaces?: number;
  example?: string;
  floatRanges?: Record<string, number>;
  intRanges?: Record<string, number>;
  ranges?: Record<string, string>;
  deltas?: unknown[];
  validDays?: number;
  validRange?: { MIN: number; MAX: number };
  averagedValueValidRange?: { MIN: number; MAX: number };
};

export type WaterGuruResponse = {
  pools?: unknown[]; // Replace 'unknown' with the actual type if you know it
  devices?: unknown[]; // Replace 'any' with the actual type if you know it
  [key: string]: unknown; // Keep this for any additional fields
};

export type WgTokens = {
  idToken: string;
  accessToken?: string;
  refreshToken?: string;
  username?: string;
};
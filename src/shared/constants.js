import { NOT_FOUND } from 'redux-first-router';

export const ROOT_DOM_NODE_ID = '_r';
export const PRELOADED_STATE_KEY = '__PS';
export const GET_COIN_DATA_ENDPOINT_PATH = '/api/coin_data';
export const COIN_DATA_UPDATE_PERIOD = 1000 * 30; // 30 sec

export const NAVIGATE_TO_NOT_FOUND = NOT_FOUND;
export const NAVIGATE_TO_DASHBOARD = 'NAVIGATE_TO_DASHBOARD';
export const SET_COIN_DATA = 'SET_COIN_DATA';
export const SET_COIN_LIST_FILTER_SEARCH_TEXT =
  'SET_COIN_LIST_FILTER_SEARCH_TEXT';
export const SET_CALCULATOR_PERIOD = 'SET_CALCULATOR_PERIOD';
export const SET_CALCULATOR_OVERRIDE = 'SET_CALCULATOR_OVERRIDE';

export const BTC_SYMBOL = 'BTC';
export const USD_SYMBOL = 'USD';

const SEC_IN_MINUTE = 60;
const SEC_IN_HOUR = 60 * SEC_IN_MINUTE;
const SEC_IN_DAY = 24 * SEC_IN_HOUR;
const SEC_IN_WEEK = 7 * SEC_IN_DAY;
const DAYS_IN_YEAR = (365 * 3 + 366) / 4;
const SEC_IN_YEAR = DAYS_IN_YEAR * SEC_IN_DAY;
const SEC_IN_MONTH = SEC_IN_YEAR / 12;
export const PERIODS_IN_SEC_MAP = new Map([
  ['Hour', SEC_IN_HOUR],
  ['Day', SEC_IN_DAY],
  ['Week', SEC_IN_WEEK],
  ['Month', SEC_IN_MONTH],
  ['Year', SEC_IN_YEAR],
]);
export const PERIODS_KEYS = [...PERIODS_IN_SEC_MAP.keys()];

export const HR_UNITS_FACTOR_MAP = new Map([
  ['h/s', 1],
  ['kh/s', 1e3],
  ['Mh/s', 1e6],
  ['Gh/s', 1e9],
  ['Th/s', 1e12],
]);
export const HR_UNITS_KEYS = [...HR_UNITS_FACTOR_MAP.keys()];

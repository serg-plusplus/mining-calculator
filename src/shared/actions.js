import { selectCalculatorCoinIds } from '@/shared/selectors';
import {
  NAVIGATE_TO_DASHBOARD,
  SET_COIN_DATA,
  SET_COIN_LIST_FILTER_SEARCH_TEXT,
  SET_CALCULATOR_PERIOD,
  SET_CALCULATOR_OVERRIDE,
} from '@/shared/constants';

export const setCoinData = coinData => ({
  type: SET_COIN_DATA,
  coinData,
});

export const setCoinListFilterSearchText = searchText => ({
  type: SET_COIN_LIST_FILTER_SEARCH_TEXT,
  searchText,
});

export const navigateToDashboard = calcCoinIds => ({
  type: NAVIGATE_TO_DASHBOARD,
  payload: { calcCoinIds },
});

export const addCoinToCalculator = coinId => (dispatch, getState) => {
  const state = getState();
  const calcCoinIds = selectCalculatorCoinIds(state);

  if (calcCoinIds.indexOf(coinId) === -1) {
    dispatch(navigateToDashboard([...calcCoinIds, coinId]));
  }
};

export const removeCoinFromCalculator = coinId => (dispatch, getState) => {
  const state = getState();
  const calcCoinIds = selectCalculatorCoinIds(state);

  if (calcCoinIds.indexOf(coinId) !== -1) {
    dispatch(navigateToDashboard(calcCoinIds.filter(ccId => ccId !== coinId)));
  }
};

export const setCalculatorPeriod = period => ({
  type: SET_CALCULATOR_PERIOD,
  period,
});

export const setCalculatorOverride = (coinId, override) => ({
  type: SET_CALCULATOR_OVERRIDE,
  coinId,
  override,
});

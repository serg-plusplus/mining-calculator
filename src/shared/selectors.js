import { createSelector } from 'reselect';
import { selectLocationState } from 'redux-first-router';
import fuzzysort from 'fuzzysort';
import { getArrayAverage } from '@/shared/helpers';
import {
  PERIODS_IN_SEC_MAP,
  HR_UNITS_FACTOR_MAP,
  HR_UNITS_KEYS,
  BTC_SYMBOL,
  USD_SYMBOL,
} from '@/shared/constants';

export const selectLocation = selectLocationState;
export const selectTitle = state => state.title;
export const selectCoinData = state => state.coinData;
export const selectCoinListFilter = state => state.coinListFilter;
export const selectCalculatorPeriod = state => state.calculatorPeriod;
export const selectCalculatorOverrides = state => state.calculatorOverrides;

export const selectCoinDataObj = createSelector(
  selectCoinData,
  coinData =>
    coinData.reduce(
      (coinDataObj, { id, ...coin }) => ({
        ...coinDataObj,
        [id]: coin,
      }),
      {},
    ),
);

export const selectCalculatorCoinIds = createSelector(
  selectLocation,
  location => location.payload.calcCoinIds || [],
);

export const selectCalculatorPeriodInSec = createSelector(
  selectCalculatorPeriod,
  calcPeriod => PERIODS_IN_SEC_MAP.get(calcPeriod),
);

const defaultHrUnit = getArrayAverage(HR_UNITS_KEYS);
const defaultCalcOverride = { hrUnit: defaultHrUnit, ownHrStr: '' };
const getHrUnitFactor = hrUnit => HR_UNITS_FACTOR_MAP.get(hrUnit);
const getProfitPerSec = (ownHr, data) => {
  const ratio = ownHr / data.netHash;
  const blocksPerMs = 1 / +data.blockTime;
  return ratio * blocksPerMs * data.blockReward;
};
export const selectCalculatorCoins = createSelector(
  selectCoinDataObj,
  selectCalculatorCoinIds,
  selectCalculatorOverrides,
  selectCalculatorPeriodInSec,
  (coinDataObj, calcCoinIds, calcOvrs, calcPeriodInSec) =>
    calcCoinIds.map(ccId => {
      const data = coinDataObj[ccId];
      const override = calcOvrs[ccId] || defaultCalcOverride;
      const hrUnitFactor = getHrUnitFactor(override.hrUnit);
      const ownHr = (+override.ownHrStr || 0) * hrUnitFactor;

      let profit = null;
      if (ownHr > 0) {
        const profitPerSec = getProfitPerSec(ownHr, data);
        const profitPerPeriod = profitPerSec * calcPeriodInSec;
        profit = {
          native: profitPerPeriod,
          [BTC_SYMBOL]: profitPerPeriod * +data.priceBtc,
          [USD_SYMBOL]: profitPerPeriod * +data.priceUsd,
        };
      }

      return { id: ccId, data, override, profit };
    }),
);

const coinsSearchFuzzyOpts = {
  keys: ['hardwareType', 'symbol', 'name', 'algorithm'],
  threshold: -5000, // don't return bad results
};
export const selectSelectableCoins = createSelector(
  selectCoinData,
  selectCalculatorCoinIds,
  selectCoinListFilter,
  (coinData, calcCoinIds, clFilter) => {
    const upgradeWithAlreadyCalculated = sc => ({
      ...sc,
      isAlreadyCalculated: calcCoinIds.some(ccId => sc.id === ccId),
    });

    return clFilter.searchText.length > 0
      ? fuzzysort
          .go(clFilter.searchText, coinData, coinsSearchFuzzyOpts)
          .map(fResult => upgradeWithAlreadyCalculated(fResult.obj))
      : coinData.map(upgradeWithAlreadyCalculated);
  },
);

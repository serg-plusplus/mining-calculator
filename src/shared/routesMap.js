import { redirect } from 'redux-first-router';
import { selectCalculatorCoinIds, selectCoinDataObj } from '@/shared/selectors';
import { navigateToDashboard } from '@/shared/actions';
import { NAVIGATE_TO_DASHBOARD } from '@/shared/constants';

const CALC_COIN_IDS_SEPARATOR = '-plus-';
const MINING_CALC_POSTFIX = '-mining-calculator';

export default {
  [NAVIGATE_TO_DASHBOARD]: {
    path: '/:calcCoinIds*',
    fromPath: calcCoinIdsStr =>
      calcCoinIdsStr
        .replace(MINING_CALC_POSTFIX, '')
        .split(CALC_COIN_IDS_SEPARATOR),
    toPath: calcCoinIds =>
      calcCoinIds.length > 0
        ? `${calcCoinIds.join(CALC_COIN_IDS_SEPARATOR)}${MINING_CALC_POSTFIX}`
        : undefined,
    thunk: (dispatch, getState) => {
      const state = getState();
      const calcCoinIds = selectCalculatorCoinIds(state);
      const coinDataObj = selectCoinDataObj(state);

      const realCalcConIds = [];
      if (Array.isArray(calcCoinIds)) {
        calcCoinIds.forEach(ccId => {
          if (!coinDataObj[ccId]) return;
          if (realCalcConIds.indexOf(ccId) !== -1) return;

          realCalcConIds.push(ccId);
        });
      }

      if (realCalcConIds.length !== calcCoinIds.length) {
        dispatch(redirect(navigateToDashboard(realCalcConIds)));
      }
    },
  },
};

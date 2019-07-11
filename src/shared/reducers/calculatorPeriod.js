import { SET_CALCULATOR_PERIOD } from '@/shared/constants';
import { PERIODS_KEYS } from '@/shared/constants';

const defaultCalcPeriod = PERIODS_KEYS[1]; // `Day`
const calculatorPeriodReducer = (calcPeriod = defaultCalcPeriod, action) =>
  action.type === SET_CALCULATOR_PERIOD ? action.period : calcPeriod;

export default calculatorPeriodReducer;

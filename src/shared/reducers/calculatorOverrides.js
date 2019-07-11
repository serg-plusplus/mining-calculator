import { SET_CALCULATOR_OVERRIDE } from '@/shared/constants';

const defaultCalcOvrs = {};
const calculatorOverridesReducer = (calcOvrs = defaultCalcOvrs, action) => {
  switch (action.type) {
    case SET_CALCULATOR_OVERRIDE:
      return {
        ...calcOvrs,
        [action.coinId]: action.override,
      };
    default:
      return calcOvrs;
  }
};

export default calculatorOverridesReducer;

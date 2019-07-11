import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  selectCalculatorPeriod,
  selectCalculatorCoins,
} from '@/shared/selectors';
import {
  removeCoinFromCalculator,
  setCalculatorPeriod,
  setCalculatorOverride,
} from '@/shared/actions';
import Calculator from '@/shared/components/sections/Calculator';

const mapStateToProps = state => ({
  period: selectCalculatorPeriod(state),
  coins: selectCalculatorCoins(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCoinFromCalculator,
      setCalculatorPeriod,
      setCalculatorOverride,
    },
    dispatch,
  );
const VisibleCalculator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calculator);

export default VisibleCalculator;

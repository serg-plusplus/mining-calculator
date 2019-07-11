import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSelectableCoins } from '@/shared/selectors';
import { addCoinToCalculator } from '@/shared/actions';
import CoinList from '@/shared/components/sections/CoinList';

const mapStateToProps = state => ({
  coins: selectSelectableCoins(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCoinToCalculator }, dispatch);
const VisibleCoinList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoinList);

export default VisibleCoinList;

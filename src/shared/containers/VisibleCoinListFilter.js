import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCoinListFilter } from '@/shared/selectors';
import { setCoinListFilterSearchText } from '@/shared/actions';
import CoinListFilter from '@/shared/components/sections/CoinListFilter';

const mapStateToProps = state => ({
  searchText: selectCoinListFilter(state).searchText,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { onSearchTextChange: setCoinListFilterSearchText },
    dispatch,
  );

const VisibleCoinListFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoinListFilter);

export default VisibleCoinListFilter;

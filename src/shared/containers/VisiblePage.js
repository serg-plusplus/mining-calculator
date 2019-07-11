import { connect } from 'react-redux';
import { selectLocation } from '@/shared/selectors';
import Page from '@/shared/components/Page';

const mapStateToProps = state => ({
  location: selectLocation(state),
});
const VisiblePage = connect(mapStateToProps)(Page);

export default VisiblePage;

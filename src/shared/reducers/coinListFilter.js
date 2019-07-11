import { SET_COIN_LIST_FILTER_SEARCH_TEXT } from '@/shared/constants';

const defaultClFilter = {
  searchText: '',
};
const coinListFilterReducer = (clFilter = defaultClFilter, action) => {
  switch (action.type) {
    case SET_COIN_LIST_FILTER_SEARCH_TEXT:
      return {
        ...clFilter,
        searchText: action.searchText,
      };

    default:
      return clFilter;
  }
};

export default coinListFilterReducer;

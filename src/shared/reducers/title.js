import {
  NAVIGATE_TO_DASHBOARD,
  NAVIGATE_TO_NOT_FOUND,
} from '@/shared/constants';

const defaultTitle = 'Default title';
const titleReducer = (title = defaultTitle, action) => {
  switch (action.type) {
    case NAVIGATE_TO_DASHBOARD:
      return 'Dashboard title';
    case NAVIGATE_TO_NOT_FOUND:
      return 'Not Found title';
    default:
      return title;
  }
};

export default titleReducer;

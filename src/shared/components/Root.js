import React from 'react';
import { Provider } from 'react-redux';
import VisiblePage from '@/shared/containers/VisiblePage';

const Root = ({ store }) => (
  <Provider store={store}>
    <VisiblePage />
  </Provider>
);

export default Root;

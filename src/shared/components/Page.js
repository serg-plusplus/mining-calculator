import React from 'react';
import Dashboard from '@/shared/components/pages/Dashboard';
import { NAVIGATE_TO_DASHBOARD } from '@/shared/constants';

const pageComponentsMap = {
  [NAVIGATE_TO_DASHBOARD]: Dashboard,
};

const Page = ({ location }) => {
  const PageComponent = pageComponentsMap[location.type];
  return PageComponent ? <PageComponent {...location.payload} /> : null;
};

export default Page;

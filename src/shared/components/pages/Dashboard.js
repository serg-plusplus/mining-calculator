import React, { Fragment } from 'react';
import BrandHeader from '@/shared/components/sections/BrandHeader';
import VisibleCalculator from '@/shared/containers/VisibleCalculator';
import VisibleCoinList from '@/shared/containers/VisibleCoinList';
import VisibleCoinListFilter from '@/shared/containers/VisibleCoinListFilter';

const Dashboard = () => (
  <Fragment>
    <BrandHeader />
    <main className="pa2 mb4">
      <div className="center mw6 bg-white black br2 pa1 ba b--moon-gray bw2">
        <VisibleCalculator />
        <div className="pa1">
          <VisibleCoinListFilter />
          <VisibleCoinList />
        </div>
      </div>
    </main>
  </Fragment>
);

export default Dashboard;

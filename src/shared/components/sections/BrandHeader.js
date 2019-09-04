import React from 'react';

const BrandHeader = () => (
  <header className="tc pa2 mb3">
    <h1 className="white lh-copy f3 fw3 ma0">Mining calculator</h1>
    <h3 className="white lh-copy f7 fw4 ma0 mb2">
      Provides mining profitability calculator for top-rated crypto currencies
    </h3>
    <span className="lightgray lh-copy f7 fw6 ma0 mr1">by</span>
    <a
      href="https://github.com/serh11p"
      target="_blank"
      rel="noopener noreferrer"
      title="Open @serh11p GitHub profile in New Tab"
      className="bg-brand white ts-black-30 bs-black-30 lh-copy tracked-tight pa1 br2 link f7 fw6 system-sans-serif"
    >
      @serh11p
    </a>
  </header>
);

export default BrandHeader;

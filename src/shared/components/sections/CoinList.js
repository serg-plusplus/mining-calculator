import React, { Fragment } from 'react';

const CoinList = ({ coins, addCoinToCalculator }) => (
  <Fragment>
    {coins.map(coin => {
      const addButton_clickHandler = () => {
        addCoinToCalculator(coin.id);
      };

      return (
        <article key={coin.id} className="dt w-100 bb b--black-05 pb2 ph1 mt2">
          <div className="dtc h-auto w1-5 w2-ns v-mid">
            <img
              src={coin.cmcImgUrl}
              alt={`coinmarketcap-${coin.symbol}`}
              className="db h-auto w1-5 w2-ns"
            />
          </div>
          <div className="dtc v-mid pl2 pl3-ns pr2">
            <h1 className="fw6 lh-title black mv0 f7 f5-ns">
              {coin.name}{' '}
              <span className="gray fw4 nowrap">
                #{coin.algorithm}[{coin.hardwareType}]
              </span>
            </h1>
            <h2 className="fw4 mt0 mb0 black-60 f7 f6-ns">{coin.symbol}</h2>
          </div>
          <div className="dtc v-mid">
            <form className="w-100 tr">
              <button
                type="button"
                disabled={coin.isAlreadyCalculated}
                onClick={addButton_clickHandler}
                className={`${
                  coin.isAlreadyCalculated ? 'o-50' : 'pointer'
                } button-reset bg-white nowrap f7 f6-ns ba b--black-20 br2 pv1 black-60 outline-0 focus-b-brand focus-bs-brand-30`}
              >
                Calculate{coin.isAlreadyCalculated ? 'd' : ' +'}
              </button>
            </form>
          </div>
        </article>
      );
    })}
  </Fragment>
);

export default CoinList;

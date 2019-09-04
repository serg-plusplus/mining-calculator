import React, { Component, PureComponent, Fragment } from 'react';
import { round } from '@/shared/helpers';
import {
  PERIODS_KEYS,
  HR_UNITS_KEYS,
  BTC_SYMBOL,
  USD_SYMBOL,
} from '@/shared/constants';

class PeriodSelect extends Component {
  periodSelectField_changeHandler = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <form className="pa1">
        <div className="w-100 flex mb2">
          {PERIODS_KEYS.map((period, index) => {
            const isSelected = period === this.props.period;
            const isFirst = index === 0;
            const isLast = index === PERIODS_KEYS.length - 1;

            const brCx = isFirst
              ? 'br2 br--left'
              : isLast
              ? 'br2 br--right'
              : '';
            const bgCx = isSelected
              ? 'bg-light-gray b--black-20 dark-gray '
              : 'b--black-10 mid-gray';
            return (
              <label
                key={period}
                className={`relative flex items-center justify-center flex-grow-1 mb1 ba nl1px ${brCx} lh-copy pa015 pointer ${bgCx}`}
              >
                <input
                  type="radio"
                  name="hardware-type"
                  value={period}
                  checked={isSelected}
                  onChange={this.periodSelectField_changeHandler}
                  className="absolute o-0 top-0 left-0 z-0"
                />
                <span className="f7 f6-ns nowrap fw4">{period}</span>
              </label>
            );
          })}
        </div>
      </form>
    );
  }
}

class Calculator extends PureComponent {
  render() {
    const coins = this.props.coins;
    const totalProfit = coins.reduce(
      (tp, coin) =>
        coin.profit
          ? {
              [BTC_SYMBOL]: (tp ? tp[BTC_SYMBOL] : 0) + coin.profit[BTC_SYMBOL],
              [USD_SYMBOL]: (tp ? tp[USD_SYMBOL] : 0) + coin.profit[USD_SYMBOL],
              size: (tp ? tp.size : 0) + 1,
            }
          : tp,
      null,
    );

    return (
      <Fragment>
        {coins.length > 0 ? (
          <PeriodSelect
            period={this.props.period}
            onChange={this.props.setCalculatorPeriod}
          />
        ) : null}
        {coins.map(this.renderCoin)}
        {totalProfit && totalProfit.size > 1 ? (
          <div className="pa1 mb1">
            <div className="pb1 mb2 mr1 f7 nowrap">
              <span className="ttu fw6 purple">Total amount:</span>
            </div>
            <div className="flex flex-wrap">
              <div className="mb2 mr2 f7 nowrap">
                <span className="bg-bitcoin-10 br2 pa015 fw6 mid-gray ba b--black-10">
                  {BTC_SYMBOL}
                </span>{' '}
                <span className="near-black fw5">
                  {round(totalProfit[BTC_SYMBOL], 10)}
                </span>
              </div>
              <div className="mb2 mr2 f7 nowrap">
                <span className="bg-dollar-30 br2 pa015 fw6 mid-gray ba b--black-10">
                  {USD_SYMBOL}
                </span>{' '}
                <span className="near-black fw5">
                  ${round(totalProfit[USD_SYMBOL])}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }

  renderCoin = ({ id, data, override, profit }) => {
    const ownHrFieldId = `own-hr-${id}`;
    const overrideField_changeHandler = e => {
      const ovrd = { ...override, [e.target.name]: e.target.value };
      this.props.setCalculatorOverride(id, ovrd);
    };
    const deleteButton_clickHandler = () => {
      this.props.removeCoinFromCalculator(id);
    };

    return (
      <article key={id} className="relative w-100 bb b--black-05 ph1 pt1 mb2">
        <div className="">
          <form className="w-100">
            <label
              htmlFor={ownHrFieldId}
              className="db mb1 f7 mid-gray fw4 pr2"
            >
              <img
                src={data.imgUrl}
                alt={`coinmarketcap-${data.symbol}`}
                className="w1 h1 mh1 v-mid"
              />
              <span className="v-mid">
                <span className="dark-gray fw6">{data.name}</span>
                <span className="gray fw5">
                  #{data.algorithm}[{data.hardwareType}]
                </span>{' '}
                <span className="nowrap">Hash rate(own)</span>
              </span>
            </label>
            <div className="w-100 mb2 flex items-stretch">
              <input
                type="number"
                step="any"
                id={ownHrFieldId}
                placeholder="123.45"
                name="ownHrStr"
                value={override.ownHrStr}
                onChange={overrideField_changeHandler}
                className="input-reset color-inherit f6 bg-near-white pa035 br2 br--left ba b--moon-gray outline-0 focus-b-brand focus-bs-brand-30 flex-auto focus-z-999"
              />
              <select
                name="hrUnit"
                value={override.hrUnit}
                onChange={overrideField_changeHandler}
                className="input-reset select bg-near-white color-inherit f6 pa035 br2 br--right ba b--moon-gray outline-0 focus-b-brand focus-bs-brand-30 nl1px focus-z-999"
              >
                {HR_UNITS_KEYS.map(hrUnit => (
                  <option key={hrUnit} value={hrUnit}>
                    {hrUnit}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {profit ? (
            <div className="flex flex-wrap">
              <div className="mb2 mr2 f7 nowrap">
                <span className="bg-dollar-light-30 br2 pa01 fw6 mid-gray ba b--black-10">
                  {data.symbol}
                </span>{' '}
                <span className="near-black fw5">
                  {round(profit.native, 10)}
                </span>
              </div>
              <div className="mb2 mr2 f7 nowrap">
                <span className="bg-bitcoin-10 br2 pa01 fw6 mid-gray ba b--black-10">
                  {BTC_SYMBOL}
                </span>{' '}
                <span className="near-black fw5">
                  {round(profit[BTC_SYMBOL], 10)}
                </span>
              </div>
              <div className="mb2 mr2 f7 nowrap">
                <span className="bg-dollar-30 br2 pa01 fw6 mid-gray ba b--black-10">
                  {USD_SYMBOL}
                </span>{' '}
                $
                <span className="near-black fw5">
                  {round(profit[USD_SYMBOL])}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={deleteButton_clickHandler}
          className="button-reset absolute top-0 right-0 bg-black-30 br-100 bw0 h1 w1 delete pointer outline-0 focus-bs-brand-30"
        />
      </article>
    );
  };
}

export default Calculator;

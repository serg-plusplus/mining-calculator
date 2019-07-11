import React, { Component, Fragment } from 'react';
import DynamicPlaceholder from '@/shared/components/misc/DynamicPlaceholder';

class CoinListFilter extends Component {
  searchField_changeHandler = e => {
    this.props.onSearchTextChange(e.target.value);
  };

  render() {
    return (
      <Fragment>
        <label htmlFor="coin-search" className="f6 mid-gray fw4 db mb1 ml1">
          Search
          <small>(by coin name, symbol, hardware type, algorithm etc.)</small>
        </label>
        <DynamicPlaceholder
          sentences={['BTC', 'Ethereum', 'GPU', 'ASIC']}
          sentenceDelay={1500}
          render={dp => {
            const handleChange = event => {
              if (dp.isTyping) {
                dp.reset();
              }
              this.searchField_changeHandler(event);
            };
            const focusHandler = () => dp.startTyping();
            const blurHandler = () => dp.reset();

            return (
              <input
                type="text"
                id=""
                placeholder={dp.placeholder}
                spellCheck={false}
                value={this.props.value}
                onChange={handleChange}
                onFocus={focusHandler}
                onBlur={blurHandler}
                className="input-reset ba b--black-20 pa2 mb2 db w-100 br2 outline-0 focus-b-brand focus-bs-brand-30"
              />
            );
          }}
        />
      </Fragment>
    );
  }
}

export default CoinListFilter;

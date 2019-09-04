import nodeFetch from 'node-fetch';
import { COIN_DATA_UPDATE_PERIOD } from '@/shared/constants';

// Helper wrapper over default `fetch`.
const fetchJSON = async (url, opts) => {
  const res = await nodeFetch(url, opts);
  const body = await res.json();
  if (res.status !== 200) {
    throw new Error(body.message || res.statusText);
  }

  return body;
};

const WHATTOMINE_GPU_COINS_URL = 'http://whattomine.com/coins.json';
const WHATTOMINE_ASIC_COINS_URL = 'http://whattomine.com/asic.json';
const COINMARKETCAP_TICKER_WITH_HUGE_LIMIT_URL =
  'https://api.coinmarketcap.com/v1/ticker?limit=10000';
// @TODO
const fetchCoinData = async () => {
  const [
    { coins: gpuWhattomineCoinDataObj },
    { coins: asicWhattomineCoinDataObj },
    coinmarketcapCoinDataArr,
  ] = await Promise.all([
    fetchJSON(WHATTOMINE_GPU_COINS_URL),
    fetchJSON(WHATTOMINE_ASIC_COINS_URL),
    fetchJSON(COINMARKETCAP_TICKER_WITH_HUGE_LIMIT_URL),
  ]);

  const coinmarketcapCoinData = new Map(
    coinmarketcapCoinDataArr.map(coinData => [coinData.symbol, coinData]),
  );

  const coinData = [];
  new Map([
    ['GPU', gpuWhattomineCoinDataObj],
    ['ASIC', asicWhattomineCoinDataObj],
  ]).forEach((wtmCoinDataObj, hardwareType) => {
    Object.values(wtmCoinDataObj).forEach(wtmCoin => {
      if (!coinmarketcapCoinData.has(wtmCoin.tag)) {
        return;
      }

      const cmcCoin = coinmarketcapCoinData.get(wtmCoin.tag);
      coinData.push({
        hardwareType,
        id: `${hardwareType}_${wtmCoin.algorithm}_${cmcCoin.symbol}`,
        cmcId: cmcCoin.id,
        symbol: cmcCoin.symbol,
        name: cmcCoin.name,
        priceUsd: cmcCoin.price_usd,
        priceBtc: cmcCoin.price_btc,
        algorithm: wtmCoin.algorithm,
        netHash: wtmCoin.nethash,
        blockTime: wtmCoin.block_time,
        blockReward: wtmCoin.block_reward,
        imgUrl: `https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/${cmcCoin.symbol.toLowerCase()}.png`
      });
    });
  });

  return coinData;
};

let currentCoinData = [];
const getCurrentCoinData = () => currentCoinData;
const setCurrentCoinData = newCoinData => {
  currentCoinData = newCoinData;
};

const updateCurrentCoinData = async () => {
  const freshCoinData = await fetchCoinData();
  setCurrentCoinData(freshCoinData);
};

const reschedule = async () => {
  try {
    await updateCurrentCoinData();
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(reschedule, COIN_DATA_UPDATE_PERIOD);
  }
};
reschedule();

export { getCurrentCoinData };

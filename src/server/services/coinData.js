import nodeFetch from 'node-fetch';
import htmlparser2 from 'htmlparser2';
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

const COINMARKETCAP_CURRENCY_PAGE_URL_PREFIX =
  'https://coinmarketcap.com/currencies/';
const META_TAG_NAME = 'meta';
const OG_IMAGE_PROP = 'og:image';
// Parse `coinmarketcap` currency page and get coin image url from it.
const fetchCmcCoinImgUrl = async cmcCoinId => {
  const url = `${COINMARKETCAP_CURRENCY_PAGE_URL_PREFIX}${cmcCoinId}`;
  const res = await nodeFetch(url);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return new Promise((resolve, reject) => {
    let coinImgUrl;
    const parserStream = new htmlparser2.WritableStream({
      onopentag: (name, attrs) => {
        if (name === META_TAG_NAME && attrs.property === OG_IMAGE_PROP) {
          coinImgUrl = attrs.content;
          res.body.end();
        }
      },
      onerror: err => {
        reject(err);
      },
      onend: () => {
        if (coinImgUrl === void 0) {
          reject(new Error('Image Not Found'));
          return;
        }

        resolve(coinImgUrl);
      },
    });

    res.body.pipe(parserStream);
  });
};

const CMC_IMG_URL_PLACEHOLDER =
  'https://s2.coinmarketcap.com/static/img/coins/32x32/1627.png';
const upgradeWithCmcImgUrl = async ({ cmcId, ...coin }) => {
  let cmcImgUrl;
  try {
    const cmcCoinImgUrl = await fetchCmcCoinImgUrl(cmcId);
    cmcImgUrl = cmcCoinImgUrl.replace('200x200', '64x64');
  } catch (err) {
    cmcImgUrl = CMC_IMG_URL_PLACEHOLDER;
  }

  return { ...coin, cmcImgUrl: `/api/img?url=${cmcImgUrl}` };
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
      });
    });
  });

  // Update current coin data.
  return Promise.all(coinData.map(upgradeWithCmcImgUrl));
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

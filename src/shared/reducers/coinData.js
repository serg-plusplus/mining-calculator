import { SET_COIN_DATA } from '@/shared/constants';

const defaultCoinData = [];
const coinDataReducer = (coinData = defaultCoinData, action) =>
  action.type === SET_COIN_DATA ? action.coinData : coinData;

export default coinDataReducer;

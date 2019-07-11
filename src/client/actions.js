import { setCoinData } from '@/shared/actions';
import {
  COIN_DATA_UPDATE_PERIOD,
  GET_COIN_DATA_ENDPOINT_PATH,
} from '@/shared/constants';

export const scheduleCoinDataUpdater = () => dispatch => {
  const updateCoinData = () =>
    fetch(GET_COIN_DATA_ENDPOINT_PATH)
      .then(res => res.json())
      .then(freshCoinData => {
        dispatch(setCoinData(freshCoinData));
      });

  const reschedule = () => {
    setTimeout(() => {
      updateCoinData()
        .then(reschedule)
        .catch(reschedule);
    }, COIN_DATA_UPDATE_PERIOD);
  };
  reschedule();
};

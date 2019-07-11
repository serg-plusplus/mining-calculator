import http from 'http';
import createPolka from 'polka';
import compression from 'compression';
import serveStatic from 'serve-static';
import send from '@polka/send-type';
import request from 'request';
import securityMiddlewares from './securityMiddlewares';
import renderMarkup from './renderMarkup';
import { GET_COIN_DATA_ENDPOINT_PATH } from '@/shared/constants';
import { getCurrentCoinData } from './services/coinData';

const FIFTEEN_DAYS_IN_S = 60 * 60 * 24 * 15;

const polka = createPolka({
  onError: (err, req, res) => {
    const code = (res.statusCode = err.code || err.status || 500);
    if (code === 500 && process.env.NODE_ENV === 'production') {
      res.end(http.STATUS_CODES[code]);
      return;
    }
    res.end(err.length && (err || err.message || http.STATUS_CODES[code]));
  },
});

polka
  .use(
    ...securityMiddlewares,
    compression({ threshold: 0 }),
    serveStatic(process.env.RAZZLE_PUBLIC_DIR, {
      maxAge: process.env.NODE_ENV === 'production' ? FIFTEEN_DAYS_IN_S : 0,
      index: false,
    }),
  )
  .get(GET_COIN_DATA_ENDPOINT_PATH, (req, res) => {
    try {
      const coinData = getCurrentCoinData();
      send(res, 200, coinData);
    } catch (err) {
      polka.onError(err, req, res);
    }
  })
  .get('/api/img', (req, res) => {
    const { url } = req.query;
    request.get(url).pipe(res);
  })
  .get('/*', async (req, res) => {
    try {
      await renderMarkup(req, res);
    } catch (err) {
      polka.onError(err, req, res);
    }
  });

export default polka;

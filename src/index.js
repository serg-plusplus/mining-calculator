import polka from './server';

(async () => {
  try {
    await polka.listen(process.env.PORT, process.env.HOST);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// Enable Hot Module Replacement (HMR).
if (module.hot) {
  let { handler, server } = polka;
  module.hot.accept('./server', () => {
    server.removeListener('request', handler);
    const { handler: nextHandler } = require('./server').default;
    server.on('request', nextHandler);
    handler = nextHandler;
  });
}

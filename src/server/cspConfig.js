const cspConfig = {
  directives: {
    childSrc: ["'self'"],
    // Note: Setting this to stricter than * breaks the service worker. :(
    // I can't figure out how to get around this, so if you know of a safer
    // implementation that is kinder to service workers please let me know.
    connectSrc: ["'self'", 'ws:'], // ['*'] for SW
    defaultSrc: ["'self'"],
    imgSrc: [
      "'self'",
      // If you use Base64 encoded images (i.e. inlined images), then you will
      // need the following:
      'data:',
      '*.coinmarketcap.com',
    ],
    fontSrc: ["'self'", 'data:'],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    manifestSrc: ["'self'"],
    scriptSrc: [
      // Allow scripts hosted from our application.
      "'self'",
      // Note: We will execution of any inline scripts that have the following
      // nonce identifier attached to them.
      // This is useful for guarding your application whilst allowing an inline
      // script to do data store rehydration (redux/mobx/apollo) for example.
      // @see https://helmetjs.github.io/docs/csp/
      (req, res) => `'nonce-${res.nonce}'`,
      // This is a know workaround for browsers that don't support nonces.
      // It will be ignored by browsers that do support nonces as they will
      // recognise that we have also provided a nonce configuration and
      // use the stricter rule.
      "'unsafe-inline'",
    ],
    styleSrc: [
      "'self'",
      // Webpack generates JS that loads our CSS, so this is needed:
      "'unsafe-inline'",
      'blob:',
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  // When in development mode we need to add our secondary Webpack Dev Server that
  // is used to host our client bundle to our csp config.
  const { HOST, PORT, PORT_DEV } = process.env;
  const devServerSrc = `${HOST}:${PORT_DEV || +PORT + 1}`;
  Object.keys(cspConfig.directives).forEach(directive => {
    cspConfig.directives[directive].push(devServerSrc);
  });
}

export default cspConfig;

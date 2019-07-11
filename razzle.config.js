'use strict';

const path = require('path');

const PATHS = {
  appSrc: path.resolve(__dirname, 'src'),
  indexCss: path.resolve(__dirname, 'src/index.css'),
};

const razzleEntries = (config, { target }) => {
  if (target === 'web') {
    config.entry.client.unshift(PATHS.indexCss);
  }

  return config;
};

const razzleAliases = (config, { dev }) => {
  Object.assign(config.resolve.alias, {
    '@': PATHS.appSrc,
  });

  return config;
};

const razzleSourceMaps = (config, { target, dev }, webpack) => {
  if (target === 'node') {
    config.plugins.push(
      new webpack.BannerPlugin({
        banner: `require('source-map-support').install();`,
        raw: true,
        entryOnly: false,
      }),
    );
  }

  if (target === 'web' && !dev) {
    config.devtool = false;
  }

  return config;
};

const razzleNamedModules = (config, { target, dev }, webpack) => {
  if (target === 'web' && !dev) {
    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof webpack.NamedModulesPlugin),
    );
  }

  return config;
};

const babelLoaderRE = /babel-loader/;
const razzleBabel = (config, { target, dev }) => {
  config.module.rules.forEach(rule => {
    if (!babelLoaderRE.test(rule.loader)) {
      return;
    }

    rule.options.presets = [
      [
        require.resolve('babel-preset-env'),
        {
          useBuiltIns: false,
          modules: false,
          targets:
            target === 'node' ? { node: 'current' } : { ie: 9, uglify: true },
        },
      ],
      require.resolve('babel-preset-react'),
    ];
    rule.options.plugins = [
      dev && require.resolve('react-hot-loader/babel'),
      require.resolve('babel-plugin-transform-class-properties'),
      [
        require.resolve('babel-plugin-transform-object-rest-spread'),
        {
          useBuiltIns: true,
        },
      ],
      [
        require.resolve('babel-plugin-transform-runtime'),
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
        },
      ],
      require.resolve('babel-plugin-syntax-dynamic-import'),
      dev && require.resolve('babel-plugin-transform-react-jsx-source'),
      !dev && require.resolve('babel-plugin-transform-react-remove-prop-types'),
    ].filter(Boolean);
  });

  return config;
};

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    let newConfig = config;
    return [
      razzleEntries,
      razzleAliases,
      razzleSourceMaps,
      razzleNamedModules,
      razzleBabel,
    ].reduce((cfg, fn) => fn(cfg, { target, dev }, webpack), newConfig);
  },
};

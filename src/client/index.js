import './polyfills';

import React from 'react';
import { hydrate } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import createStore from '@/shared/createStore';
import HotRoot from '@/shared/containers/HotRoot';
import { ROOT_DOM_NODE_ID, PRELOADED_STATE_KEY } from '@/shared/constants';
import { scheduleCoinDataUpdater } from './actions';

const preloadedState = window[PRELOADED_STATE_KEY];
const history = createBrowserHistory();
const store = createStore(history, preloadedState);

const $root = document.getElementById(ROOT_DOM_NODE_ID);
const rootVdomNode = <HotRoot store={store} />;
hydrate(rootVdomNode, $root);

/**
 * Start Scheduler for Coin data updating.
 */
store.dispatch(scheduleCoinDataUpdater());

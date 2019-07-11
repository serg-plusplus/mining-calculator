import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import routesMap from '@/shared/routesMap';
import { selectTitle } from '@/shared/selectors';
import * as reducers from '@/shared/reducers';

export default (history, initialState) => {
  const router = connectRoutes(history, routesMap, {
    title: selectTitle,
    restoreScroll: restoreScroll(),
  });

  const rootReducer = combineReducers({
    ...reducers,
    location: router.reducer,
  });
  const middlewares = applyMiddleware(thunkMiddleware, router.middleware);
  const enhancers = compose(
    router.enhancer,
    middlewares,
  );
  const store = createStore(rootReducer, initialState, enhancers);

  if (process.env.BUILD_TARGET === 'client' && module.hot) {
    module.hot.accept('@/shared/reducers/index', () => {
      const reducers = require('@/shared/reducers/index');
      const rootReducer = combineReducers({
        ...reducers,
        location: router.reducer,
      });
      store.replaceReducer(rootReducer);
    });
  }
  if (process.env.BUILD_TARGET === 'server') {
    store.applyRouteThunk = () => router.thunk(store);
  }

  return store;
};

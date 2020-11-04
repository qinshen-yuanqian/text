import React, { memo, Suspense } from 'react';
import { Provider } from 'react-redux'; //用来共享数据
import { renderRoutes } from 'react-router-config';

import routes from './router';
import store from './store';

import { HashRouter } from 'react-router-dom';
import HYAppHeader from "@/components/app-header";
import HYAppFooter from "@/components/app-footer";
import HYAppPlayerBar from './pages/player/app-player-bar';


export default memo(function App() {
  return (
    <Provider store={store}>
      {/* 此处实现数据的共享 */}
      <HashRouter>
        <HYAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <HYAppPlayerBar />
        <HYAppFooter />
      </HashRouter>
    </Provider>

  )
})


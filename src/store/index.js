import { createStore, applyMiddleware, compose } from  'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//可以在redux-dev-tools中看到状态
//给store传入一个reducer,和enhance函数，这里可以使用中间件
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
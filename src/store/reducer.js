// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';  //直接将合并的对象转换成为immutable对象

//导入需要合并的reducer，为了避免命名冲突，需要为reducer起别名
import { reducer as recommendReducer } from '../pages/discover/children-pages/recommend/store';
import { reducer as playerReducer } from '../pages/player/store/index';
//在这里进行reducer的合并
// combineReducers传入一个对象类型
const  cReducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer
});


export default cReducer;
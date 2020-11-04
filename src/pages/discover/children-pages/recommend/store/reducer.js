import { Map } from 'immutable';

import * as actionTypes from './constants';


const defaultState = Map({
    topBanner: [],
    hotRecommends: [],
    newAlbums: [],

    upRanking: {},
    newRanking:{},
    originRanking:{},
});

function reducer(state = defaultState, action){
    switch(action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanner",action.topBanner);
            // state对象是defaultState，可以调用set方法，set修改完成后，返回一个新的对象
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends",action.hotRecommends);
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums",action.newAlbums);
        case actionTypes.CHANGE_UP_RANKING:
            return state.set("upRanking",action.upRanking);
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set("newRanking",action.newRanking);
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set("originRanking",action.originRanking);
        default: 
            return state;
    }
}

export default reducer;

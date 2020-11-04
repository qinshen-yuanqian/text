import * as actionTypes from './constants';

import { getTopBanners, getHotRecommends } from '@/services/recommend';
import { getNewAlbums,getTopList } from '@/services/recommend';
// import hotRecommends from '../c-cpns/hot-recommend';

const changeToBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanner: res.banners
})

const changeHotRecommendAction = (res) => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result
})

const changeAlbumAction = (res) => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums
})
const changeUpRankingAction = (res) => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res.playlist
})
const changeNewRankingAction = (res) => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res.playlist
})
const changeOriginRankingAction = (res) => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res.playlist
})


export const getTopBannerAction = () => {
    //函数的返回值是一个函数
    return dispatch => {
        // 在这里进行网络请求的发送
        getTopBanners().then(res => {
            dispatch(changeToBannerAction(res));
            // console.log(res);
        })

    }
}

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        getHotRecommends(limit).then(res => {
            // console.log(res)
            dispatch(changeHotRecommendAction(res))
        })
    }
}

export const getNewAlbumsAction = (limit) => {
    return dispatch => {
        getNewAlbums(limit).then(res => {
            //console.log(res)
            dispatch(changeAlbumAction(res));
        })
    }
}

export const getTopListAction = (idx) => {
    return dispatch => {
        getTopList(idx).then(res => {
            switch(idx) {
                case 0:
                    dispatch(changeUpRankingAction(res));
                    break;
                case 2:
                    dispatch(changeNewRankingAction(res));
                    break;
                case 3:
                    dispatch(changeOriginRankingAction(res));
                    break;
                default:

            }
        })
    }
}
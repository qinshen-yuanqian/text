import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import HYThemeHeaderRCM from '@/components/theme-header-recommend/index'
import HYSongsCover from '@/components/songs-cover'

import { HOT_RECOMMEND_LIMIT } from '@/common/contants';

import {
    HotRecommendWrapper
} from './style';
import { getHotRecommendAction } from '../../store/actionCreators';


export default memo(function HYHotRecommend() {
    // 内部的state

    //redux里面的hooks
    const { hotRecommends } = useSelector(state => ({
        hotRecommends: state.getIn(["recommend","hotRecommends"])
    }),shallowEqual)

    const dispatch = useDispatch();

    // 其他的一些hooks
    useEffect(() => {
        dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
    },[dispatch]);

    const keywords = ["华语","流行","摇滚","电子"];
    return (
        <HotRecommendWrapper>
            <HYThemeHeaderRCM title="热门推荐" keywords={keywords}/>
            <div className="recommend-list">
                {
                    hotRecommends.map((item, index) => {
                        return <HYSongsCover info={item} key={item.id} />
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})

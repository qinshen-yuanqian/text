import React, { memo, useEffect } from 'react';
import HYThemeHeaderRCM from '@/components/theme-header-recommend/index';
import HYTopRanking from '@/components/top-ranking';
import {getTopListAction} from '../../store/actionCreators';
//测试代码：
// import {getTopList} from '@/services/recommend';
import { RankingWrapper } from  './style';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
export default memo(function HYRecommendRanking() {
    // redux hooks
    const {upRanking, newRanking, originRanking} = useSelector(state => ({
        upRanking:state.getIn(["recommend", "upRanking"]),
        newRanking:state.getIn(["recommend", "newRanking"]),
        originRanking:state.getIn(["recommend", "originRanking"]),
    }),shallowEqual);
    const dispatch = useDispatch();
    //other hooks
    useEffect(() => {
        dispatch(getTopListAction(0));
        dispatch(getTopListAction(2));
        dispatch(getTopListAction(3));
    },[dispatch]);

    return (
        <RankingWrapper RankingWrapper>
            <HYThemeHeaderRCM title="榜单"/>
            <div className="tops">
                <HYTopRanking info={upRanking}/>
                <HYTopRanking info={newRanking}/>
                <HYTopRanking info={originRanking}/>
            </div>
        </RankingWrapper>
    )
})

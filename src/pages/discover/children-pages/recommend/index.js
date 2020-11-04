import React, { memo} from 'react';
//组件和redux关联要做的两件事情：获取数据和进行dispatch的操作
import HYTopBanner from './c-cpns/topBanner/index';
import HYHotRecommend from './c-cpns/hot-recommend/index';
import HYRecommendRanking from './c-cpns/ranking/index';
import HYNewAlbum from './c-cpns/new-album/index';
import HYUserLogin from './c-cpns/user-login/index';
import HYHotAnchor from './c-cpns/hot-anchor/index';
import HYSettleSinger from './c-cpns/settle-singer/index'


import { 
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style';

function HYRecommend(props) {
    return (
        <RecommendWrapper>
            <HYTopBanner/>
            <Content className="wrap-v2">
                {/* 这部分是热门推荐部分 */}
                <RecommendLeft>
                    <HYHotRecommend/>
                    <HYNewAlbum/>
                    <HYRecommendRanking />
                </RecommendLeft>
                {/* 这里是入驻歌手部分 */}
                <RecommendRight>
                    <HYUserLogin/>
                    <HYSettleSinger/>
                    <HYHotAnchor/>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}

export default memo(HYRecommend);


//使用redux-hooks之前
// function HYRecommend(props) {
//     const { getBanners, topBanner } = props;
//     console.log(topBanner);
//     //在这里发起网络请求，使用redux-thunk
//     useEffect(() => {
//         getBanners();
//     },[getBanners])

//     return (
//         <div>
//             <h2>HYRecommend:{topBanner.length}</h2>
//         </div>
//     )
// }

// const mapStateToProps = state => ({
//     topBanner: state.recommend.topBanner
// });
// const mapDispatchToProps = dispatch => ({
//     getBanners: () => {
//         dispatch(getTopBannerAction());
//     }
// });
// //connect(mapStateToProps, mapDispatchToProps) 返回的是一个高阶组件，然后对组件再进行一次包裹
// const newConnect = connect(mapStateToProps, mapDispatchToProps);
// // 然后对组件再进行一次包裹
// export default newConnect(memo(HYRecommend));
import React, { memo,useEffect,useRef,useCallback,useState } from 'react';
import { useSelector, useDispatch,shallowEqual} from 'react-redux';

import { getTopBannerAction } from '../../store/actionCreators';

import { Carousel } from 'antd';
import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl
} from './style';

export default memo(function HYTopBanner() {
    // state 记录一下轮播图滚到了哪里
    const [CurrentIndex, setCurrentIndex] = useState(0);

    const { topBanner } = useSelector(state => ({
        // topBanner: state.get("recommend").get("topBanner")
        topBanner: state.getIn(["recommend","topBanner"])  //先取第一层，再取第二层
    }),shallowEqual);

    const dispatch = useDispatch();
    
    //其他hooks
    const bannerRef = useRef();
    //发送网络请求：
    useEffect(() =>{
        dispatch(getTopBannerAction());
    },[dispatch]);  //根据数据的dispatch的改变进行数据的重新渲染

    // useCallback 对函数的调用有一定的缓存，记忆作用memories
    const bannerChange = useCallback(
        (from, to) => {
            // console.log(to);   根据to去取image，将image的信息放在这里
            setCurrentIndex(to);  //使得currentIndex总是保存最新值
        },
        []
    );

    // 其他业务逻辑
    const bgImage = topBanner[CurrentIndex] && (topBanner[CurrentIndex].imageUrl+"?imageView&blur=40x20");
   
    //返回JSX
    return (
        <BannerWrapper bgImage={bgImage}>
            {/* 整体 */}
            <div className="banner wrap-v2">
                {/* 左边 */}
                <BannerLeft>
                    <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
                        {
                            topBanner.map((item,index)=>{
                                return (
                                    <div className="banner-item" key={item.imageUrl}>
                                        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>

                </BannerLeft>
                {/* 右边 */}
                <BannerRight>
                    <BannerControl>
                        {/* bannerRef.current.prev() 调用组件的方法对组件进行操作 */}
                        <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
                        <button className="btn right" onClick={e => bannerRef.current.prev()}></button>
                    </BannerControl>

                </BannerRight>
            </div>
            
        </BannerWrapper>
    )
})

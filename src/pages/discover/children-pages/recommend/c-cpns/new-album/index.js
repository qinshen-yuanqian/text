import React, { memo, useEffect, } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Carousel } from 'antd';
import HYAlbumCover from '@/components/album-cover';

// import { getNewAlbums } from '@/services/recommend';
import HYThemeHeaderRCM from '@/components/theme-header-recommend/index';
import { getNewAlbumsAction } from '../../store/actionCreators';
import { AlbumWrapper } from './style'
import { useRef } from 'react';


export default memo(function HYNewAlbum() {
    //在单独的文件中进行数据的管理
    // const [newAlbums, setNewAlbums] = useState([]);

    // useEffect(() => {
    //     getNewAlbums(10).then(res => {
    //         //console.log(res);
    //         setNewAlbums(res.albums)
    //     })
    // }, []);
    const { newAlbums } = useSelector(state => ({
        newAlbums: state.getIn(["recommend", "newAlbums"])
    }), shallowEqual);  //shallowEqual :对返回的对象进行浅层比较，浅层比较一致的情况下，返回为true的情况下，组件不会进行重新刷新
    const dispatch = useDispatch();

    //other hooks
    const pageRef = useRef();
    useEffect(() => {
        //这里注意：dispatch函数是将getNewAlbumsAction函数的返回值作为参数的
        dispatch(getNewAlbumsAction(10));

    }, [dispatch])
    return (
        <AlbumWrapper>
            <HYThemeHeaderRCM title="新碟上架" />
            <div className="content">
                <button className="arrow arrow-left sprite_02"
                        onClick={e => pageRef.current.prev()}></button>
                <div className="album">
                    <Carousel dots={false} ref={pageRef}>
                        {
                            [0, 1].map(item => {
                                return (
                                    <div key={item} className="page">
                                      {
                                          newAlbums.slice(item*5, (item+1)*5).map(iten => {
                                              return <HYAlbumCover key={iten.id}
                                                                    info={iten} 
                                                                    size={100} 
                                                                    width={118}
                                                                    bgp="-570px"></HYAlbumCover>
                                          })
                                      }
                                    </div>
                                )} 
                            )
                        }
                    </Carousel>
                </div>
                <button className="arrow arrow-right sprite_02"
                        onClick={e => pageRef.current.prev()}></button>
            </div>

        </AlbumWrapper>
    )
})
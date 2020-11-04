import React, { memo } from 'react';
import { getSizeImage } from '@/utils/format-utils'

import { AlbumWrapper } from './style';

export default memo(function HYAlbumCover(props) {
    //state and props
    //bgp 传入背景图片使用的精灵图的位置
    const {info, size = 130, width= 153, bgp="-845px"} = props;
    return (
        <AlbumWrapper size={size} width={width} bgp={bgp}>
            {/* 注意样式文件传参的方式 */}
            {/* 图片部分 */}
            <div className="album-image">
                <img src={getSizeImage(info.picUrl, size)} alt=""/>
    <a href="/todo" className="cover image_cover">{info.name}</a>
            </div>
            {/* 图片信息部分 */}
            <div className="album-info">
                <div className="name">{info.name}</div>
                <div className="artist">{info.artist.name}</div>
            </div>
        </AlbumWrapper>
    )
})

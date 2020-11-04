import React, { memo } from 'react'
import { SongsCoverWrapper } from './style'

import { getCount, getSizeImage } from "@/utils/format-utils";

export default memo(function HYSongsCover(props) {
    const { info } = props;
    return (
        <SongsCoverWrapper>
            {/* 上面一部分 */}
            <div className="cover-top">
                <img src={getSizeImage(info.picUrl, 140)} alt="" />
                <div className="cover sprite_covor">
                    <div className="info sprite_covor">
                        {/* 一层覆盖 */}
                        <span>
                            <i className="sprite_icon erji"></i>
                            {getCount(info.playCount)}
                        </span>
                        <i className="sprite_icon play"></i>
                    </div>
                </div>
            </div>
            {/* 下面一部分 */}
            <div className="cover-bottom text-nowrap">
                {info.name}
            </div>
            <div className="cover-source text-nowrap">
                by {info.copywriter || info.creator.nickname}
            </div>
        </SongsCoverWrapper>
    )
})

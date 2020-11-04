import React, { memo } from 'react';

import {
    PlayerWrapper,
    PlayerLeft,
    PlayerRight
} from './style';

export default memo(function HYPlayer() {
    return (
        <PlayerWrapper className="wrap-v2">
            <PlayerLeft>
                <h2>playerInfo</h2>
                <h2>HYSongContent</h2>
            </PlayerLeft>
            <PlayerRight>
                <h2>playerSimiPlaylist</h2>
                <h2>HYSimiSong</h2>
                <h2>downLoad</h2>
            </PlayerRight>
        </PlayerWrapper>
    )
})

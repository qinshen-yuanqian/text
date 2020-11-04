import  { getSongDetail, getLyric } from '@/services/player';
import {getRandomNumber} from '@/utils/math-util';
import { parseLyric } from '@/utils/parse-lyric';

import * as actionTypes from './constants';
const changeCurrentSongAction = (currentSong) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
});
const changeCurrentSongIndexAction = (index) => ({
    type:actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex: index
});

const changePlayListAction = (playList) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList
});

const changeLyricListAction = (lyricList) => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList
});

export const changeCurrentLyricIndexAction = (currentLyricIndex) => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    currentLyricIndex
}
);
export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
});
//进行前一首和下一首播放的时候，所要执行的dispatch
export const changeCurrentIndexAndSongAction = (tag) => {
    return (dispatch, getState) => {
        const playList = getState().getIn(["player","playList"]);
        // console.log(playList);
        const sequence = getState().getIn(["player", "sequence"]);
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);

        //需要判断一下当前的播放顺序
        switch(sequence){
            //在进行变化时，需要先判断一下当前的播放顺序，然后进行currentIndex的改变
            case 1:  //随机播放
            //    let randomIndex = -1;   //原来不可能等于-1
               let randomIndex = changeLyricListAction(playList.length);
               //    判断一下随机的index如果等于当前的index，需要再进行一次随机抽取
               while(randomIndex === currentSongIndex) {
                   randomIndex = getRandomNumber(playList.length);
               }
               currentSongIndex = randomIndex;
               break;
            default: //顺序播放
                currentSongIndex += tag;   //根据tag进行切歌
                if(currentSongIndex >= playList.length )  //到播放列表最后了
                    currentSongIndex = 0;
                if(currentSongIndex < 0) 
                    currentSongIndex = playList.length - 1; //播放到列表最前面，再上一首应该是列表最后
                break;
        }
        // debugger;
        // 对redux中的值进行更新
        console.log(playList);
        console.log(currentSongIndex);
        const currentSong = playList[currentSongIndex];   //根据currentIndex确定当前需要播放的歌曲
        dispatch(changeCurrentSongAction(currentSong));   //修改当前播放的歌曲，
        dispatch(changeCurrentSongIndexAction(currentSongIndex));  //修改当前播放歌曲的index
        // 3.请求歌词
        dispatch(getLyricAction(currentSong.id));

    }
}
export function getSongDetailAction(ids) {
    return (dispatch, getState) => {
        // 1.根据id查找playList中是否已经存在该歌曲
        //通过getState获取playList中的数据
        const playList = getState().getIn(["player","playList"]);//拿到的是一个数组
        const SongIndex = playList.findIndex( song => song.id === ids);   //找到返回索引值，未找到返回-1

        // 2.判断是否在播放列表中找到该歌曲
        let song = null;
        if (SongIndex !== -1) { 
            //找到了这首歌曲
            //改变这首歌在列表中的位置
            dispatch(changeCurrentSongIndexAction(SongIndex));   
            //改变当前播放的歌曲
            song = playList[SongIndex];
            dispatch(changeCurrentSongAction(song));
            // 3.请求歌词
            dispatch(getLyricAction(song.id));

        }else {
            //未找到这首歌曲(请求这首歌曲 -> )
            getSongDetail(ids).then( res => {
                // console.log(res);
                song = res.songs && res.songs[0];
                if (!song) return;

                //1.将请求到的歌曲添加到播放列表当中
                const newPlayList = [...playList];
                newPlayList.push(song);
                //2.更新redux中playList的数据
                dispatch(changePlayListAction(newPlayList));
                // 改变索引值
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
                dispatch(changeCurrentSongAction(song));
                // 3.请求歌词
                dispatch(getLyricAction(song.id));
                
            })

        }
        
        
    }
}

export const getLyricAction = (id) => {
    return dispatch => {
        //发送网络请求，获取歌词数据
        getLyric(id).then(res => {
            const lyric = res.lrc.lyric;
            //console.log(lyric)   //此处可以获取到所有的歌词，现在需要对歌词进行解析
            const lyricList = parseLyric(lyric);   //lyricList是解析好的数组
            dispatch(changeLyricListAction(lyricList));

        })
    }
}
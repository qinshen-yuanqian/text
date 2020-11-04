//third
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';  //实现路由的跳转
//antd
import { Slider, message } from 'antd';
//css
import {
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style';
//redux
import { 
    getSongDetailAction,
    changeSequenceAction,
    changeCurrentIndexAndSongAction,
    changeCurrentLyricIndexAction
 } from '../store/actionCreators';
//utils
import { formatDate, getSizeImage, getPlaySong } from '@/utils/format-utils';


export default memo(function HYPlayerBar() {
    //*props and state*
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    // 判断当前是否在手指拖动改变进度条
    const [isChanging, setIsChanging] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    // *redux hooks*
    const { 
        currentSong, 
        sequence, 
        playList, 
        lyricList,
        currentLyricIndex
     } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player","sequence"]),
        playList: state.getIn(["player","playList"]),
        lyricList: state.getIn(["player","lyricList"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
    }), shallowEqual);
    const dispatch = useDispatch();

    //*otherHooks*
    const audioRef = useRef()
    useEffect(() => {
        dispatch(getSongDetailAction(167876))
    }, [dispatch]);
    //设置src
    useEffect(() => {
        audioRef.current.src = getPlaySong(currentSong.id);
        //play()返回一个promise对象，可以使用then和catch进行不同情况的处理
        audioRef.current.play().then(res => {
            //当前播放歌曲没有出错
            setIsPlaying(true);
        }).catch(err => {
            //当前播放歌曲出现错误
            setIsPlaying(false);
        });
    }, [currentSong]);  //song发生改变使，进行重新获取

    //* other handle*
    const picUrl = (currentSong.al && currentSong.al.picUrl) || " ";
    const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
    const duration = currentSong.dt || 0;
    const showDuration = formatDate(duration, "mm:ss");
    const showCurrentTime = formatDate(currentTime, "mm:ss");
    // 当前的进度,是一个变量，会引起组件的重绘,使用useState进行重新赋值
    // const progress = currentTime / duration * 100;

    // *handle function*
    //点击之后进行音乐的播放
    const playMusic = useCallback(() => {
       isPlaying ? audioRef.current.pause() : audioRef.current.play();
       setIsPlaying(!isPlaying);
    }, [isPlaying]);
    //点击切换播放的顺序
    const changeSequence = () => {
        let currentSequence = sequence + 1;
        if (currentSequence > 2) {
            currentSequence = 0;
        }
        dispatch(changeSequenceAction(currentSequence));
    };
    //切歌按钮的函数
    const  changeMusic = (tag) => {
        dispatch(changeCurrentIndexAndSongAction(tag));

    }
    //当播放时间发生更新，需要执行的回调函数
    const timeUpdate = (e) => {
        // currentTime*1000转化为毫秒
        //   console.log(e.target.currentTime*1000);
        const currentTime = e.target.currentTime*1000;   //这里是局部的currentTime，注意和全局的区别
        if (!isChanging) {
            setCurrentTime(currentTime);
            setProgress(currentTime/ duration * 100);   //需要乘以1000变成毫秒
        }


        //获取当前的歌词
     
        //遍历歌词
        let i=0;
        for(; i<lyricList.length; i++){
            let lyricItem = lyricList[i];
            if(currentTime < lyricItem.time){
                break;
            }
        }

        if(currentLyricIndex !== i-1){
            //console.log(lyricList[i-1]);//实时的获取到当前的歌词
            const content = lyricList[i-1] && lyricList[i-1].content;
            //下面对歌词进行一个实时的展示
            message.open({
                key: "lyric",
                content: content,   //内容
                duration: 0,  
                className: "lyric-class"  //自定义样式
            });
            dispatch(changeCurrentLyricIndexAction(i-1));
        }
        


    }
    //监听滑块的改变，当将一个回调函数传到自定义组件内部的时候，需要使用useCallback,在某些情况下重新执行，某些情况下不需要执行
    const sliderChange = useCallback(value => {
        // console.log("change", value);
        setIsChanging(true);
        const currentTime = value / 100 * duration;
        setCurrentTime(currentTime);  //设置当前的进度时间
        setProgress(value);
    }, [duration]);
    const sliderAfterChange = useCallback(value => {
        // console.log("afterChange",value);
        //value / 100 * duration -> 秒钟的时间 需要乘以1000，变成毫秒
        const currentTime = value / 100 * duration / 1000;
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime * 1000);   //解决延迟的bug
        setIsChanging(false);

        if (!isPlaying){
            playMusic();
        }

    }, [duration,isPlaying,playMusic]);
    //处理当前歌曲播放完成之后，如何切换到下一首歌曲进行播放
    const handleEnded = () => {
        // 判断当前列表的播放方式，随机播放还是顺序播放还是单曲循环，单曲循环处理比较特殊
        // 如果当前的播放顺序是顺序播放，那么播放结束就意味着切换到下一首歌曲，直接调用封装好的Action即可
        if (sequence === 2){
            //单曲循环（继续播放当前的歌曲）将播放时间直接重置为0，再次从头播放
            audioRef.current.currentTime = 0;
            // 手动进行重新播放
            audioRef.current.play();
        } else {
            //其他情况
            dispatch(changeCurrentIndexAndSongAction(1));
        }
    }
    
    //result
    return (
        <PlaybarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                    <button className="prev sprite_player" 
                            onClick={e => changeMusic(-1)}></button>
                    <button className="play sprite_player" onClick={e => playMusic()}></button>
                    <button className="next sprite_player"
                            onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    {/* 第一步展示播放的图片 */}
                    <div className="image">
                        <NavLink to="/discover/player">
                            <img src={getSizeImage(picUrl, 35)} alt="" />
                        </NavLink>

                    </div>
                    {/* 中间播放区段 */}
                    <div className="info">
                        {/* 歌曲的名称和歌手的名称 */}
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="/#" className="singer-name">{singerName}</a>
                        </div>
                        {/* 进度条 */}
                        <div className="progress">
                            {/* 滑块部分 */}
                            <Slider defaultValue={0}
                                value={progress}
                                onChange={sliderChange}
                                onAfterChange={sliderAfterChange} />
                            {/* 时间格式 */}
                            <div className="time">
                                <span className="now-time">{showCurrentTime}</span>
                                <span className="divider">/</span>
                                <span className="duration">{showDuration}</span>
                            </div>

                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    {/* 将sequence传入样式里面 */}
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_playbar">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
                        <button className="sprite_player btn playlist">{playList.length}</button>
                    </div>
                </Operator>
            </div>
            {/* onTimeUpdate 当前时间发生更新，函数发生回调， */}
            <audio ref={audioRef} 
                   onTimeUpdate={e => timeUpdate(e)} 
                   onEnded={e => handleEnded()}/>
        </PlaybarWrapper>
    )
})

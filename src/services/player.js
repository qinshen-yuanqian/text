//请求每一首歌曲详情的网络请求
import request from './request';
export function getSongDetail(ids){
    return request({
        url: "/song/detail",
        params: {
            ids
        }
    })
}

export function getLyric(id){
    return request({
        url: "/lyric",
        params: {
            id
        }
    })
}
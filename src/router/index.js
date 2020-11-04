import React from 'react';
import { Redirect } from 'react-router-dom';

// import HYDiscover from '@/pages/discover';
// import HYRecommend  from '@/pages/discover/children-pages/recommend';
// import HYArtist  from '@/pages/discover/children-pages/artist';
// import HYDjradio  from '@/pages/discover/children-pages/djradio';
// import HYRanking  from '@/pages/discover/children-pages/ranking';
// import HYSongs  from '@/pages/discover/children-pages/songs';
// import HYAlbum  from '@/pages/discover/children-pages/album';
// import HYPlayer  from '../pages/player';
// import HYFriend from '@/pages/friend';
// import HYMine from '@/pages/mine';

//路由懒加载
const HYDiscover = React.lazy(() => import('@/pages/discover'));
const HYRecommend = React.lazy(() => import('@/pages/discover/children-pages/recommend'));
const HYArtist = React.lazy(() => import('@/pages/discover/children-pages/artist'));
const HYDjradio =  React.lazy(() => import( '@/pages/discover/children-pages/djradio'));
const HYRanking =  React.lazy(() => import('@/pages/discover/children-pages/ranking'));
const HYSongs = React.lazy(() => import( '@/pages/discover/children-pages/songs'));
const HYAlbum =  React.lazy(() => import('@/pages/discover/children-pages/album'));
const HYPlayer =  React.lazy(() => import('../pages/player'));
const HYFriend = React.lazy(() => import('@/pages/friend'));
const HYMine= React.lazy(() => import('@/pages/mine'));

const routes = [
    {
        path: "/",
        exact: true,
        // 渲染组件，这里是重定向
        render: () => {
            return <Redirect to="/discover"/>
        }
    },
    {
        path: '/discover',
        component: HYDiscover,
        routes: [
            {
                path: '/discover',
                exact: true,
                render: () => {
                   return <Redirect to="/discover/recommend" />
                }
            },
            {
                path:'/discover/recommend',
                component: HYRecommend
            },
            {
                path:'/discover/album',
                component: HYAlbum
            },
            {
                path:'/discover/artist',
                component: HYArtist
            },
            {
                path:'/discover/djradio',
                component: HYDjradio
            },
            {
                path:'/discover/ranking',
                component: HYRanking
            },
            {
                path:'/discover/songs',
                component: HYSongs
            },
            {
                path:'/discover/player',
                component: HYPlayer
            }
        ]
    },
    {
        path: '/friend',
        component: HYFriend
    },
    {
        path: '/mine',
       
        component: HYMine
    }
];

export default routes;
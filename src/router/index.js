import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Article from '../components/Article'
import Video from '../components/Video'
import Play from '../components/Play'
import Movie from '../components/Movie'
import Details from '../components/Details'
import MusicList from '../components/MusicList'
import Music from '../components/Music'
import MusicPlay from '../components/MusicPlay'
import MusicSong from '../components/MusicSong'

Vue.use(Router)

const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/article', component: Article },
    { path: '/video', component: Video },
    { path: '/play', component: Play },
    { path: '/movie', component: Movie },
    { path: '/details', component: Details },
    { path: '/musiclist', component: MusicList },
    { path: '/music', component: Music},
    { path: '/musicplay', component: MusicPlay},
    { path: '/musicsong', component: MusicSong}

]

const router = new Router({
    mode: 'history',
    routes
});

export default router;
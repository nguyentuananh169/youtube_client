import DefaultLayout from '../layouts/DefaultLayout';

import Home from '../pages/Home';
import Watch from '../pages/Watch';
import Search from '../pages/Search';
import Channel from '../pages/Channel';
import Post from '../pages/Post';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Logout from '../pages/Auth/Logout';
import Subscriptions from '../pages/Subscriptions';
import Library from '../pages/Library';
import History from '../pages/History';
import WatchLater from '../pages/WatchLater';
import Liked from '../pages/Liked';

const defaultRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/watch/:id', component: Watch, layout: DefaultLayout, props: { isMobile: true } },
    { path: '/search/:keyword', component: Search, layout: DefaultLayout },
    { path: '/channel/:id/:page', component: Channel, layout: DefaultLayout },
    { path: '/post/:id', component: Post, layout: DefaultLayout },
    { path: '/subscriptions/:page', component: Subscriptions, layout: DefaultLayout },
    { path: '/library', component: Library, layout: DefaultLayout },
    { path: '/history', component: History, layout: DefaultLayout },
    { path: '/watch-later', component: WatchLater, layout: DefaultLayout },
    { path: '/liked', component: Liked, layout: DefaultLayout },
    { path: '/login/', component: Login, layout: null },
    { path: '/register/', component: Register, layout: null },
    { path: '/logout/', component: Logout, layout: null },
];
export default defaultRoutes;

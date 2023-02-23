import DefaultLayout from '../layouts/DefaultLayout';

import Home from '../pages/Home';
import Watch from '../pages/Watch';

const defaultRoutes = [
    { path: '/', component: Home, layout: DefaultLayout, props: { isMobile: false } },
    { path: '/watch/:id', component: Watch, layout: DefaultLayout, props: { isMobile: true } },
    { path: '/search/:keyword', component: Watch, layout: DefaultLayout },
];
export default defaultRoutes;

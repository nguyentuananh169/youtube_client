import DefaultLayout from '../layouts/DefaultLayout';

import Home from '../pages/Home';
import Watch from '../pages/Watch';

const defaultRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/channel/:id', component: Home, layout: DefaultLayout },
    { path: '/watch/:id', component: Watch, layout: DefaultLayout, props: { isHideNavbar: true } },
];
export default defaultRoutes;

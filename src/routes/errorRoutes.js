import { Fragment } from 'react';

import Error from '../pages/Error';
import NotFound from '../pages/NotFound';

const errorRoutes = [
    { path: '/error/:code', component: Error, layout: Fragment },
    { path: '*', component: NotFound, layout: Fragment },
];
export default errorRoutes;

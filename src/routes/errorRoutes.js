import { Fragment } from 'react';

import NotFound from '../pages/NotFound';

const errorRoutes = [{ path: '*', component: NotFound, layout: Fragment }];
export default errorRoutes;

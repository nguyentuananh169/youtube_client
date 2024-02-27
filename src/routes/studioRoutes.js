import StudioLayout from '../layouts/StudioLayout';

import Overview from '../pages/studio/Overview';
import Content from '../pages/studio/Content';
import Analytics from '../pages/studio/Analytics';
import Comments from '../pages/studio/Comments';
import CommentsByVideoId from '../pages/studio/Comments/CommentsByVideoId';
import Translations from '../pages/studio/Translations';
import CopyRight from '../pages/studio/CopyRight';
import Monetization from '../pages/studio/Monetization';
import Editing from '../pages/studio/Editing';
import Music from '../pages/studio/Music';

const studioRoutes = [
    { path: '/studio', component: Overview, layout: StudioLayout },
    { path: '/studio/videos/:tab', component: Content, layout: StudioLayout },
    { path: '/studio/analytics', component: Analytics, layout: StudioLayout },
    { path: '/studio/comments', component: Comments, layout: StudioLayout },
    { path: '/studio/comments/:videoId', component: CommentsByVideoId, layout: StudioLayout },
    { path: '/studio/translations', component: Translations, layout: StudioLayout },
    { path: '/studio/copyright', component: CopyRight, layout: StudioLayout },
    { path: '/studio/monetization', component: Monetization, layout: StudioLayout },
    { path: '/studio/editing', component: Editing, layout: StudioLayout },
    { path: '/studio/music', component: Music, layout: StudioLayout },
];
export default studioRoutes;

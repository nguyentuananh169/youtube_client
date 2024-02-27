import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { defaultRoutes, studioRoutes, errorRoutes } from './routes';
import ToastMessage from './components/ToastMessage';
import authApi from './api/authApi';
import { changeUserInfo, checkLogin } from './store/actions/auth';
import CheckLogin from './components/CheckLogin';
function App() {
    const dispatch = useDispatch();
    const isCheckLogin = useSelector((state) => state.auth.isCheckLogin);
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        if (token && isCheckLogin) {
            const handleCheckLogin = async () => {
                const response = await authApi.checkLogin();
                const user = response[0].user || null;
                if (!user) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
                dispatch(changeUserInfo(user));
                dispatch(checkLogin(false));
            };
            handleCheckLogin();
        }
    }, []);
    if (isCheckLogin && token) {
        return <CheckLogin />;
    }
    return (
        <>
            <ToastMessage />
            <Routes>
                {defaultRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout {...route.props}>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {studioRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout {...route.props}>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {errorRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout {...route.props}>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;

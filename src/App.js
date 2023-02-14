import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { defaultRoutes, errorRoutes } from './routes';
function App() {
    return (
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
    );
}

export default App;

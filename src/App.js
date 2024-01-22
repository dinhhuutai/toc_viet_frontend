import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutAdmin from './layoutsAdmin/DefaultLayout';
import { routes, routesAdmin } from './routes';
import config from './config';
import ProtectedRouteAdmin from './routing/ProtectedRouteAdmin';
import ProtectedCheckUser from './routing/ProtectedCheckUser';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedCheckUser />}>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.isParams ? `${route.path}/:id` : route.path}
                                element={
                                    route.isLogin ? (
                                        <route.component />
                                    ) : (
                                        <DefaultLayout>
                                            <route.component />
                                        </DefaultLayout>
                                    )
                                }
                            ></Route>
                        );
                    })}

                    <Route path="/admin" element={<Navigate to={config.routes.adminCollection} />} />
                    <Route path="/login" element={<Navigate to={config.routes.login} />} />

                    <Route path="/admin" element={<ProtectedRouteAdmin />}>
                        {routesAdmin.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.addId ? `${route.path}/:id` : route.path}
                                    element={
                                        <DefaultLayoutAdmin>
                                            <route.component />
                                        </DefaultLayoutAdmin>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

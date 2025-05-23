import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {CustomSidebar} from "./components/global/nav.sidebar";
import Topbar from "./components/global/nav.topbar";
import AuthService from "./services/auth/auth.service";
import Home from "./components/home.component";
import FormulasGrid from "./components/grid.formilas.component";
import FormulasForm from './components/form.formulas.component';
import Profile from "./components/auth/profile.component";
import CommonForm from "./components/auth/common-form.component";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TestPatternForm} from "./components/form.test-pattern.component";
import {NotificationProvider} from "./components/global/nav.notifbar";
import {TestPatternsGrid} from "./components/grid.test-pattern.component";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ruRU} from "@mui/x-date-pickers/locales";
import {GroupsGrid} from "./components/grid.groups.component";

// import AuthVerify from "./common/AuthVerify";

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
    const [currentTitle, setCurrentTitle] = useState('');

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        // Найти маршрут с текущим путем и получить его title
        const matchedRoute = routes.find(route => route.path === location.pathname);
        if (matchedRoute) {
            setCurrentTitle(matchedRoute.title);
        } else {
            setCurrentTitle('');
        }
    }, [location]);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(null);
        window.location.href = '/';
    };

    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat, sans-serif',
        },
    });

    const routes = [
        {
            path: "/",
            element: currentUser ? <Navigate to="/home" replace/> : <CommonForm/>
        },
        {path: "/home", element: <Home/>, title: "Home"},
        {path: "/profile", element: <Profile/>, title: "Profile"},
        {path: "/formulas", element: <FormulasGrid/>, title: "Формулы"},
        {path: "/formulas/new", element: <FormulasForm/>, title: "Формулы"},
        {path: "/tests/new", element: <TestPatternForm/>, title: "Тесты"},
        {path: "/tests", element: <TestPatternsGrid/>, title: "Тесты"},
        {path: "/groups", element: <GroupsGrid/>, title: "Текущие группы"},
    ];

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                {currentUser && <CustomSidebar/>}
                <main className="content">
                    {currentUser && <Topbar currentUser={currentUser} logOut={logOut} currentTitle={currentTitle}/>}
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
                        <NotificationProvider>
                            <Routes>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element}/>
                                ))}
                            </Routes>
                        </NotificationProvider>
                    </LocalizationProvider>
                </main>
            </div>
        </ThemeProvider>
    );
};

export default App;

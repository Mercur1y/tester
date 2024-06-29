import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { CustomSidebar } from "./components/global/nav.sidebar";
import Topbar from "./components/global/nav.topbar";
import AuthService from "./services/auth/auth.service";
import Home from "./components/home.component";
import FormulasGrid from "./components/grid.formilas.component";
import FormulasForm from './components/form.formulas.component';
import Profile from "./components/auth/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import CommonForm from "./components/auth/common-form.component";
import { montserrat } from '@fontsource/montserrat';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

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
    { path: "/", element: <CommonForm/> },
    { path: "/home", element: <Home />, title: "Home" },
    { path: "/profile", element: <Profile />, title: "Profile" },
    { path: "/user", element: <BoardUser />, title: "User Board" },
    { path: "/mod", element: <BoardModerator />, title: "Moderator Board" },
    { path: "/admin", element: <BoardAdmin />, title: "Admin Board" },
    { path: "/formulas", element: <FormulasGrid />, title: "Formulas" },
    { path: "/formulas/new", element: <FormulasForm />, title: "Formulas" },
  ];

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
      {currentUser && <CustomSidebar />}
      <main className="content">
        {currentUser && <Topbar currentUser={currentUser} logOut={logOut} currentTitle={currentTitle} />}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  );
};

export default App;

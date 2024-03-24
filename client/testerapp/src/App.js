import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logoImage from './assets/logo.png';
import { CustomSidebar } from "./components/global/nav.sidebar";
import CommonForm from "./components/auth/common-form.component";
import Topbar from "./components/global/nav.topbar";

import AuthService from "./services/auth/auth.service";
import Home from "./components/home.component";
import Profile from "./components/auth/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/AuthVerify";

class App extends Component {  constructor(props) {
  super(props);
  this.logOut = this.logOut.bind(this);

  this.state = {
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  };
}

componentDidMount() {
  const user = AuthService.getCurrentUser();

  if (user) {
    this.setState({
      currentUser: user,
      showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
      showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    });
}
}

logOut() {
  AuthService.logout();
  this.setState({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  });
  return <Navigate to="/" />;
}

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, loading } = this.state;

    return (
        <div className="app">
          {currentUser && <CustomSidebar />}
        
        <main className="content">
        {currentUser && 
        <nav className="navbar navbar-expand" style={{ backgroundColor: '#edf7fa' }}>
          <Link to={"/"} className="navbar-brand">
            <img src={logoImage} alt="Логотип" className="nav-logo-image"/>
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
        </nav>
        }
          <Routes>
            <Route path="/" element={<CommonForm />}/>
            {currentUser && <Route path="/home" element={<Home />} />}
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
          </main>
        </div>
    );
  }
}

export default App;
import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { DiGithubBadge } from "react-icons/di";
import styled from "@emotion/styled";
import SignInForm from "./login.component";
import SignUpForm from "./register.component";
import Logo from "../../assets/logo-text.png";
import Background from "../../assets/auth_background.jpg";
import { withRouter } from '../../common/with-router';

import "../../style/auth-style.css";

const StyledLogo = styled.img(props => ({
    width: '90%',
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledContainer = styled('div')({
    position: 'relative',
    backgroundImage: 'url(' + Background + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(rgba(237, 249, 252, 0.95), rgba(204, 219, 224, 0.95))', // Прозрачный белый цвет
    },
  });

  const mountedStyle = {
    opacity: 1,
    transition: "opacity 250ms ease-in",
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "auto"
  };
  const unmountedStyle = {
    opacity: 0,
    transition: "opacity 270ms ease-out",
    pointerEvents: "none", // Отключаем события мыши для невидимого элемента
    position: "absolute",
    top: 0,
    left: 0,
  };

  function hideEmailMiddle(email) {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      const [start, end] = [email.slice(0, 3), email.slice(atIndex)];
      const middle = '*'.repeat(Math.max(0, atIndex - 3));
      return `${start}${middle}****${end}`;
    }
    return email;
  }

const DiGithubBadgeStyled = styled(DiGithubBadge)`
  font-size: 55px; /* Устанавливаем размер иконки */
  margin-bottom: 6px; /* Добавляем небольшой отступ между иконкой и текстом */
`;

const CommonForm = () => {
    const [type, setType] = useState("signIn");
    const [confirmContent, setConfirmContent] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");

    const handleOnClick = (text) => {
        if (text !== type) {
          setType(text);
        }
      };
  
    const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");
  
    return (
        <StyledContainer className="CommonformBox">
        <Container className={containerClass} id="container">
                <SignUpForm setConfirmContent={setConfirmContent} setCurrentEmail={setCurrentEmail} />
                <SignInForm />
          <Box className="overlay-container">
            <Box className="overlay">
              <Box className="overlay-panel overlay-left">
                  <div className style={confirmContent ? mountedStyle : unmountedStyle}>
                    <h1>Вы успешно зарегистрированы в системе!</h1>
                    <h2 style={{marginTop: "40px", padding: "0 10%"}}>
                    Мы отправили Вам письмо на адрес
                    </h2>
                    <h1>{hideEmailMiddle(currentEmail)}</h1>
                    <h2 style={{marginTop: "7px", padding: "0 10%"}}> для подтверждения регистрации.
                    </h2>
                    <h2>
                    После подтверждения Вы сможете
                    </h2>
                  </div>
                  <div style={!confirmContent ? mountedStyle : unmountedStyle}>
                    <h1>Для ознакомления с ресурсом, Вы можете посетить репозиторий проекта</h1>
                    <a href="https://github.com/Mercur1y/tester"> на <DiGithubBadgeStyled/>GitHub</a>
                    <h2 style={{marginTop: "40px"}}>
                      Если вы уже авторизированы, можете
                    </h2>
                  </div>
                <Button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}
                size="large"
                sx={{position: "absolute", bottom: "95px", borderRadius: 2, color: "#00a5da", ":hover": {backgroundColor: "#1cacdc", color: "white"}}}>
                  Войти в систему
                </Button>
              </Box>
              <Box className="overlay-panel overlay-right">
                <h1>Добро пожаловать в мир</h1>
                <StyledLogo src={Logo} alt=""/>
                <h2 style={{marginTop: "20px"}}>
                Введите свои личные данные и начните путешествие вместе с нами
                </h2>
                <Button id="signUp" onClick={() => handleOnClick("signUp")}
                size="large"
                sx={{mt: 2, borderRadius: 2, color: "#00a5da", ":hover": {backgroundColor: "#1cacdc", color: "white"}}}
                >
                  Регистрация
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </StyledContainer>
    );
  };
  
  export default withRouter(CommonForm);
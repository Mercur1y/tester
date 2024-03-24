import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { TextField, Button, Autocomplete, Box, CircularProgress, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { PiUserCirclePlusThin } from "react-icons/pi";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth/auth.service";

const roles = [
  { value: 'ROLE_MODERATOR', label: 'Преподаватель' },
  { value: 'ROLE_USER', label: 'Обучающийся' }
];

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
  margin-right: 70px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-image: linear-gradient(to bottom right, #00183d, #3298ba);
`;

const Register = ({setConfirmContent, setCurrentEmail}) => {
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  const initialValuesBasic = {
    username: "",
    email: "",
    password: "",
  };

  const initialValuesAdditional = {
    name: "",
    surname: "",
    role: "",
  };

  const validationSchemaBasic = Yup.object().shape({
    username: Yup.string().required("Введите имя пользователя"),
    email: Yup.string().email("Некорректный e-mail").required("Введите e-mail"),
    password: Yup.string().required("Введите пароль"),
  });

  const validationSchemaAdditional = Yup.object().shape({
    name: Yup.string().required("Введите имя"),
    surname: Yup.string().required("Введите фамилию"),
    role: Yup.string().required("Выбор роли обязателен"),
  });

  const formikBasic = useFormik({
    initialValues: initialValuesBasic,
    validationSchema: validationSchemaBasic,
    onSubmit: async () => {
      const isValid = await formikBasic.validateForm();
      if (isValid) {
        setShowAdditionalFields(true);
      }
    }
  });

  const formikAdditional = useFormik({
    initialValues: initialValuesAdditional,
    validationSchema: validationSchemaAdditional,
    onSubmit: async (values) => {
      const { username, email, password } = formikBasic.values;
      const { name, surname, role } = values;
      setMessage("");
      setIsLoading(true);
  
      try {
        await AuthService.register(username, email, password, name, surname, role);
        setTimeout(() => {
          formikBasic.resetForm();
          formikAdditional.resetForm();
          setShowAdditionalFields(false);
          setCurrentEmail(email);
          setConfirmContent(true);
        }, 2000);
      } catch (error) {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  });
  

  const handleBack = () => {
    setShowAdditionalFields(false);
  };

  return (
      <Box className="form-container sign-up-container" sx={{marginTop: "4%", position: 'relative'}}>
        <IconDiv>
        <Line />
        <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#00183d" offset="0%" />
          <stop stopColor="#3298ba" offset="100%" />
        </linearGradient>
        </svg>
        <PiUserCirclePlusThin style={{ fontSize: "80px", fill: "url(#blue-gradient)" }} />
        <Line />
        </IconDiv>
        <CSSTransition
          in={!showAdditionalFields}
          timeout={500}
          classNames="form-animation"
          unmountOnExit
        >
          <Box 
              component="form" 
              onSubmit={formikBasic.handleSubmit} 
              sx={{
                justifyContent: "normal",
                margin: "20px",
                position: 'absolute',
                width: '98%'
              }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              name="username"
              label="Придумайте логин"
              InputLabelProps={{ shrink: true }}
              autoFocus
              value={formikBasic.values.username}
              onChange={formikBasic.handleChange}
              error={formikBasic.touched.username && Boolean(formikBasic.errors.username)}
              helperText={formikBasic.touched.username && formikBasic.errors.username}
              color="info"
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="@Email"
              InputLabelProps={{ shrink: true }}ы
              autoComplete="email"
              value={formikBasic.values.email}
              onChange={formikBasic.handleChange}
              error={formikBasic.touched.email && Boolean(formikBasic.errors.email)}
              helperText={formikBasic.touched.email && formikBasic.errors.email}
              color="info"
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Ваш невероятный пароль"
              InputLabelProps={{ shrink: true }}
              type="password"
              autoComplete="new-password"
              value={formikBasic.values.password}
              onChange={formikBasic.handleChange}
              error={formikBasic.touched.password && Boolean(formikBasic.errors.password)}
              helperText={formikBasic.touched.password && formikBasic.errors.password}
              color="info"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2, mb: 2, borderRadius: 2, backgroundColor: "#1cacdc" }}
            >
              Продолжить
              <ArrowForwardIosOutlinedIcon sx={{ ml: 1, fontSize: 18 }} />
            </Button>
          </Box>
          </CSSTransition>
          <CSSTransition
            in={showAdditionalFields}
            timeout={500}
            classNames="form-animation"
            unmountOnExit
          >
          <Box component="form" 
                onSubmit={formikAdditional.handleSubmit} 
                sx={{
                  justifyContent: "normal",
                  margin: "20px",
                  position: 'absolute',
                  width: '98%'
                }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label="Имя"
              InputLabelProps={{ shrink: true }}
              autoFocus
              value={formikAdditional.values.name}
              onChange={formikAdditional.handleChange}
              error={formikAdditional.touched.name && Boolean(formikAdditional.errors.name)}
              helperText={formikAdditional.touched.name && formikAdditional.errors.name}
              color="info"
            />
            <TextField
              margin="normal"
              fullWidth
              id="surname"
              name="surname"
              label="Фамилия"
              InputLabelProps={{ shrink: true }}
              value={formikAdditional.values.surname}
              onChange={formikAdditional.handleChange}
              error={formikAdditional.touched.surname && Boolean(formikAdditional.errors.surname)}
              helperText={formikAdditional.touched.surname && formikAdditional.errors.surname}
              color="info"
            />
            <Autocomplete
            id="role"
            name="role"
            margin="normal"
            fullWidth
            options={roles}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              formikAdditional.setFieldValue('role', newValue ? newValue.value : '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите должность"
                InputLabelProps={{ shrink: true }}
                error={formikAdditional.touched.role && Boolean(formikAdditional.errors.role)}
                helperText={formikAdditional.touched.role && formikAdditional.errors.role}
                color="info"
              />
            )}
            sx={{marginTop: "20px"}}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: 3, marginRight: 9 }}>
              <Button
                variant="ghost"
                size="large"
                sx={{ borderRadius: 2, marginRight: 2 }}
                onClick={handleBack}
              >
                <ArrowBackIosOutlinedIcon sx={{fontSize: 18 }} />
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#1cacdc",
                  "&:disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "inherit",
                      animation: "$spin 1s linear infinite",
                    },
                  },
                  "@keyframes spin": {
                    "0%": {
                      transform: "rotate(0deg)",
                    },
                    "100%": {
                      transform: "rotate(360deg)",
                    },
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Зарегистрироваться'
                )}
              </Button>
          </Box>
          {message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          </Box>
          </CSSTransition>
      </Box>
  );
}

export default Register;

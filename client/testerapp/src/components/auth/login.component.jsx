import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PiUserCircleThin } from "react-icons/pi";
import { TextField, Button, Typography, Link, Box, Alert } from "@mui/material";
import styled from "@emotion/styled";

import AuthService from "../../services/auth/auth.service";
import { withRouter } from '../../common/with-router';

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  margin-right: 70px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-image: linear-gradient(to bottom right, #00183d, #3298ba);
`;

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        setMessage("");
        setLoading(true);
    
        AuthService.login(values.username, values.password)
          .then(() => {
            navigate("/profile");
            window.location.reload();
          })
          .catch((error) => {
            const errorMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(errorMessage);
            setLoading(false);
          }); // Можно использовать, чтобы отправить данные на сервер
    }
  });

  return (
      <Box className="form-container sign-in-container" sx={{marginTop: "4%"}}>
        <IconDiv>
        <Line />
        <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#00183d" offset="0%" />
          <stop stopColor="#3298ba" offset="100%" />
        </linearGradient>
        </svg>
        <PiUserCircleThin style={{ fontSize: "80px", fill: "url(#blue-gradient)" }} />
        <Line />
        </IconDiv>
        <Box 
            component="form" 
            onSubmit={formik.handleSubmit}
            sx={{justifyContent: "normal", margin: "20px 20px 20px 20px"}}
            >
        <TextField
            margin="normal"
            fullWidth
            id="username"
            name="username"
            label="Логин"
            InputLabelProps={{ shrink: true }}
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{marginBottom: "20px"}}
            color="info"
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            InputLabelProps={{ shrink: true }}
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            color="info"
          />
          <Link href="#" variant="body2">
            Забыли пароль?
          </Link>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 4, mb: 2, borderRadius: 2, backgroundColor: "#1cacdc" }}
          >
            Войти
          </Button>
          {message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
        </Box>
  );
}

export default withRouter(Login);

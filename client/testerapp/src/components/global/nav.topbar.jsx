import React, { useState } from 'react';
import { Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

/**
 * @param {Object} props Свойства компонента:
 * currentUser - текущий пользователь.
 * logOut - функция для выхода из системы.
 * currentTitle - название текущей страницы.
 * @return {JSX.Element} Рендер компонента верхней панели.
 */
const Topbar = ({ currentUser, logOut, currentTitle }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    logOut();
    handleCloseDialog(); 
  };

  return (
    <Box display="flex" p={2} ml={4} justifyContent="space-between">
      <Typography variant="h6">{currentTitle}</Typography>
      <Box display="flex"></Box>
      {/* ICONS */}
      <Box display="flex" justifyContent="flex-end">
        <IconButton sx={{ mr: 2 }} onClick={() => navigate("/profile")}>
          <PersonOutlinedIcon />
          <Typography variant="button" sx={{ textTransform: 'lowercase', ml: 0.5 }}>{currentUser.username}</Typography>
        </IconButton>
        <IconButton onClick={handleOpenDialog}> {/* Вызываем функцию handleOpenDialog при клике */}
          <LogoutIcon />
        </IconButton>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <DialogContentText>
              Вы уверены, что хотите выйти?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отмена</Button>
            <Button variant="contained" onClick={handleLogout} color="error">Выйти</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Topbar;

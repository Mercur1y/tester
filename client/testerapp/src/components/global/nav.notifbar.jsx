import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const notify = (msg, level = 'info') => {
        setMessage(msg);
        setSeverity(level);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={severity} onClose={handleClose} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotify = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotificationProvider');
    }
    return context.notify;
}

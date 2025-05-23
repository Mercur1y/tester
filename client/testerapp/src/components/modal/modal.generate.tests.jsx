import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import {groups} from "../../common/consts";

export const CreateTestModal = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState(dayjs().add(1, 'day'));
    const [groupId, setGroupId] = useState('');

    const handleSubmit = () => {
        onSubmit({ name, deadline: deadline.toISOString(), groupId: Number(groupId) });
        setName('');
        setDeadline(dayjs().add(1, 'day'));
        setGroupId('');
    };

    const handleCancel = () => {
        setName('');
        setDeadline(dayjs().add(1, 'day'));
        setGroupId('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Создать тест</DialogTitle>
            <DialogContent>
                <TextField
                    label="Наименование"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <DateTimePicker
                    label="Дата сдачи"
                    value={deadline}
                    format="DD.MM.YYYY HH:mm"
                    ampm={false}
                    minDateTime={dayjs()}
                    onChange={(newValue) => setDeadline(newValue)}
                    slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
                <TextField
                    select
                    fullWidth
                    label="Группа"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    margin="normal"
                >
                    {Object.entries(groups).map(([id, group]) => (
                        <MenuItem key={id} value={id}>
                            {group.code} - {group.name}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} disabled={!name || !groupId}>Создать</Button>
            </DialogActions>
        </Dialog>
    );
};

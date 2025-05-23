import React, { useEffect, useState } from 'react';
import {
    Box, Typography, IconButton, Paper, Chip
} from '@mui/material';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { format } from 'date-fns';
import testService from "../services/test.service";
import {useNavigate} from "react-router-dom";
import {ViewTestResultModal} from "./modal/modal.student.result";

export const StudentTestList = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedResults, setSelectedResults] = useState([]);
    const [selectedName, setSelectedName] = useState(null);

    const handleOpenModal = (test) => {
        const parsed = JSON.parse(test.content);
        setSelectedResults(parsed);
        setSelectedName(test.testName)
        setModalOpen(true);
    };

    useEffect(() => {
        testService.getStudentTests().then(setTests);
    }, []);

    const columns = [
        { field: 'testName', headerName: 'Название теста', width: 300 },
        {
            field: 'deadline',
            headerName: 'Дедлайн',
            width: 200,
            valueFormatter: ({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm')
        },
        {
            field: 'teacher',
            headerName: 'Преподаватель',
            width: 220,
            valueGetter: ({ row }) => `${row.teacherSurname} ${row.teacherName}`
        },
        {
            field: 'status',
            headerName: 'Статус',
            width: 200,
            renderCell: ({ row }) => (
                <Chip
                    label={row.finished ? "Завершён" : "Требует выполнения"}
                    color={row.finished ? "info" : "success"}
                />
            )
        },
        { field: 'rate', headerName: 'Результат', width: 100, valueFormatter: ({ value }) => value + "/100" },
        {
            field: 'actions',
            headerName: '',
            width: 120,
            renderCell: ({ row }) => (
                <>
                    {!row.finished ? (
                        <IconButton color="primary" onClick={() => navigate(`/student/tests/${row.studentTestId}/solve`)}>
                            <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => handleOpenModal(row)}>
                            <VisibilityIcon />
                        </IconButton>
                    )}
                </>
            )
        }
    ];

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Мои тесты</Typography>
            <Paper>
                <DataGrid
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    rows={tests}
                    columns={columns}
                    getRowId={(row) => row.studentTestId}
                    autoHeight
                    pageSize={10}
                />
                <ViewTestResultModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    testName={selectedName}
                    results={selectedResults}
                />
            </Paper>
        </Box>
    );
};

import {useEffect, useState} from 'react';
import {Box, Chip, IconButton, Paper, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {format} from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import testService from "../services/test.service";
import {StudentStatusModal} from "./modal/modal.student.status";

export const TestAssignmentsGrid = () => {
    const [tests, setTests] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        testService.getAssigned().then(setTests);
    }, []);

    const columns = [
        { field: 'groupCode', headerName: 'Код группы', width: 150 },
        { field: 'groupName', headerName: 'Группа', width: 400 },
        { field: 'name', headerName: 'Название теста', width: 250 },
        {
            field: 'createDate',
            headerName: 'Создан',
            width: 180,
            valueFormatter: ({ value }) => format(new Date(value), 'dd.MM.yyyy HH:mm')
        },
        {
            field: 'deadline',
            headerName: 'Статус',
            width: 220,
            renderCell: ({ value }) => {
                const now = new Date();
                const deadline = new Date(value);
                const isActive = deadline > now;

                return (
                    <Chip
                        label={isActive ? "В процессе" : "Завершён"}
                        color={isActive ? "success" : "error"}
                        size="small"
                        sx={{ fontWeight: 500 }}
                    />
                );
            }
        },
        {
            field: 'actions',
            headerName: '',
            width: 100,
            renderCell: ({ row }) => (
                <IconButton
                    color="primary"
                    onClick={() => {
                        setSelectedStudents(row.students);
                        setModalOpen(true);
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            )
        }
    ];

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Назначенные тесты</Typography>
            <Paper>
                <DataGrid
                    rows={tests}
                    columns={columns}
                    getRowId={(row) => row.id}
                    autoHeight
                    pageSize={10}
                />
            </Paper>
            <StudentStatusModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                students={selectedStudents}
            />
        </Box>
    );
};

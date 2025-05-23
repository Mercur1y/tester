import React, {useEffect, useState} from 'react';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {Box, IconButton, Paper} from '@mui/material';
import groupService from '../services/group.service';
import {GroupStudentsModal} from "./modal/modal.group.students";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const GroupsGrid = () => {
    const [groups, setGroups] = useState([]);
    const [studentsModalOpen, setStudentsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        groupService.getAllWithStudents().then(setGroups);
    }, []);

    const columns = [
        { field: 'name', headerName: 'Группа', width: 400 },
        { field: 'code', headerName: 'Код направления', width: 150 },
        { field: 'course', headerName: 'Курс', width: 100 },
        {
            field: 'actions',
            headerName: '',
            width: 200,
            renderCell: ({ row }) => (
                <IconButton
                    color="primary"
                    onClick={() => {
                        setSelectedGroup(row);
                        setStudentsModalOpen(true);
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            )
        }
    ];

    return (
        <Box p={3}>
            <Paper>
                <DataGrid
                    rows={groups}
                    columns={columns}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    getRowId={(row) => row.id}
                    autoHeight
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
                <GroupStudentsModal
                    open={studentsModalOpen}
                    onClose={() => setStudentsModalOpen(false)}
                    students={selectedGroup?.students || []}
                    groupName={selectedGroup?.name}
                />
            </Paper>
        </Box>
    );
};

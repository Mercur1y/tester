import React, {useEffect, useState} from 'react';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {Box, FormControl, IconButton, InputLabel, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {withRouter} from "../common/with-router";
import {sections} from '../common/consts';
import {ContentDiv, CustomSelect} from './global/mui.styles';
import {renderMathInElement} from 'mathlive';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import {format} from 'date-fns';
import formulaService from '../services/formula.service';
import {FormulaCell} from "../util/convert.formula";
import {DeleteOutlined} from "@mui/icons-material";
import {useNotify} from "./global/nav.notifbar";

const FormulasGrid = () => {
    const [formulas, setFormulas] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const navigate = useNavigate();
    const notify = useNotify();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await formulaService.getAll();
                setFormulas(data);
            } catch (error) {
                console.error('Error fetching formulas:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('.latex-formula');
        elements.forEach((element) => {
            renderMathInElement(element);
        });
    }, [formulas]);

    const handleOpen = () => {
        navigate('/formulas/new');
    };

    const handleDelete = async (id) => {
        try {
            await formulaService.delete(id);
            setFormulas(prev => prev.filter(p => p.id !== id));
            notify('Шаблон успешно удалён', 'success');
        } catch (error) {
            console.error('Ошибка при удалении', error);
            notify('Не удалось удалить шаблон', 'error');
        }
    };

    const handleResetFilters = () => {
        setSelectedSection('');
        setSelectedDivision('');
    };

    const handleRowSelection = (selectedRowIds) => {
        const updatedFormulas = formulas.map((formula) => ({
            ...formula,
            selected: selectedRowIds.includes(formula.id),
        }));
        setFormulas(updatedFormulas);
    };

    const filteredFormulas = formulas.filter((formula) => {
        const matchesDivision = selectedDivision
            ? String(formula.divisionId) === String(selectedDivision)
            : true;

        const matchesSection = selectedSection
            ? String(formula.sectionId) === String(selectedSection)
            : true;

        return matchesDivision && matchesSection;
    });

    const columns = [
        { field: 'divisionId', headerName: 'Раздел', width: 150, valueGetter: (params) => sections[params.value].name },
        { field: 'sectionId', headerName: 'Секция', width: 150, valueGetter: (params) => {
                const division = Object.values(sections).find(div => div.subsections[params.value]);
                return division ? division.subsections[params.value] : '';
            }},
        { field: 'formula', headerName: 'Формула', width: 330, renderCell: (params) => <FormulaCell formula={params.value} /> },
        {
            field: 'parameters',
            headerName: 'Переменные',
            width: 400,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        fontSize: 13,
                        paddingY: 1,
                    }}
                >
                    {Object.entries(params.value).map(([variable, data]) => (
                        <Box key={variable}>
                            <strong>{variable}</strong>: {data.values?.length
                            ? data.values.join(', ')
                            : `min: ${data.min}, max: ${data.max}${data.round !== undefined ? `, round: ${data.round}` : ''}`}
                        </Box>
                    ))}
                </Box>
            )
        },
        { field: 'createdAt', headerName: 'Дата создания', width: 200, valueFormatter: (params) => {
                return format(new Date(params.value), 'dd/MM/yyyy HH:mm:ss');
            }},
        {
            field: 'actions',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: ({ row }) => (
                <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                    <DeleteOutlined fontSize="small" />
                </IconButton>
            )
        }
    ];

    return (
        <ContentDiv>
            <Box style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel>Раздел</InputLabel>
                    <CustomSelect
                        fullWidth
                        value={selectedDivision}
                        onChange={(e) => {
                            setSelectedDivision(e.target.value);
                            setSelectedSection('');
                        }}
                    >
                        {Object.keys(sections).map((divisionId) => (
                            <MenuItem key={divisionId} value={divisionId}>{sections[divisionId].name}</MenuItem>
                        ))}
                    </CustomSelect>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel>Секция</InputLabel>
                    <CustomSelect
                        fullWidth
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        disabled={!selectedDivision}
                    >
                        {selectedDivision && Object.keys(sections[selectedDivision].subsections).map((sectionId) => (
                            <MenuItem key={sectionId} value={sectionId}>{sections[selectedDivision].subsections[sectionId]}</MenuItem>
                        ))}
                    </CustomSelect>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mt: 3 }}>
                    <IconButton color="primary" onClick={handleResetFilters}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredFormulas}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => handleRowSelection(ids)}
                    getRowHeight={() => 'auto'}
                />
            </Box>
        </ContentDiv>
    );
};

export default withRouter(FormulasGrid);

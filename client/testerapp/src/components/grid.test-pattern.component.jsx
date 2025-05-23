// TestPatternsGrid.jsx
import React, {useEffect, useState} from 'react';
import {Box, Collapse, IconButton, MenuItem, Paper, TextField, Typography} from '@mui/material';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import testPatternService from '../services/testPattern.service';
import {sections} from '../common/consts';
import {convertAsciiMathToLatex, renderMathInElement} from 'mathlive';
import {useNotify} from "./global/nav.notifbar";
import {AddAPhotoOutlined, AddToPhotosOutlined, DeleteOutlined} from "@mui/icons-material";
import testService from "../services/test.service";
import {CreateTestModal} from "./modal/modal.generate.tests";

const FormulaInline = ({formula, parameters}) => {
    const latex = convertAsciiMathToLatex(formula).replace(/#([a-zA-Z])/g, '\\mathbf{$1}');
    const ref = React.useRef(null);

    useEffect(() => {
        if (ref.current) {
            renderMathInElement(ref.current);
        }
    }, [latex]);

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <div ref={ref}>{`$$${latex}$$`}</div>
            <Box fontSize={16} color="#555">
                {parameters && Object.entries(parameters).map(([varName, data], idx) => (
                    <span key={varName}>
            <strong>{varName}</strong>: {data.values?.length
                        ? data.values.join(', ')
                        : `min: ${data.min}, max: ${data.max}${data.round !== undefined ? `, round: ${data.round}` : ''}`}
                        {idx < Object.keys(parameters).length - 1 ? ', ' : ''}
          </span>
                ))}
            </Box>
        </Box>
    );
};

export const TestPatternsGrid = () => {
    const [patterns, setPatterns] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const navigate = useNavigate();
    const notify = useNotify();

    useEffect(() => {
        testPatternService.getAll().then(data => {
            setPatterns(data);
            setFiltered(data);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const result = patterns.filter(p => {
            const matchDivision = selectedDivision
                ? Object.values(sections).find(s => s.subsections[p.sectionId] && selectedDivision === Object.keys(sections).find(k => sections[k] === s))
                : true;
            const matchSection = selectedSection ? p.sectionId === selectedSection : true;
            return matchDivision && matchSection;
        });
        setFiltered(result);
    }, [selectedDivision, selectedSection, patterns]);

    const handleDelete = async (id) => {
        try {
            await testPatternService.delete(id);
            setPatterns(prev => prev.filter(p => p.id !== id));
            setExpandedRow(null);
            setSelectedId(null);
            notify('Шаблон успешно удалён', 'success');
        } catch (error) {
            console.error('Ошибка при удалении', error);
            notify('Не удалось удалить шаблон', 'error');
        }
    };

    const handleGenerateTest = async (data) => {
        try {
            await testService.generate({
                ...data,
                patternId: selectedId
            });
            setSelectedId(null);
            notify('Тест успешно создан', 'success');
            setCreateModalOpen(false);
        } catch (e) {
            notify('Ошибка при создании теста', 'error');
        }
    };

    const columns = [
        {
            field: 'expand',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: ({row}) => (
                <IconButton size="small" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>
                    {expandedRow === row.id ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            )
        },
        {field: 'name', headerName: 'Название', width: 400},
        {
            field: 'sectionId',
            headerName: 'Раздел / Секция',
            width: 500,
            valueGetter: ({row}) => {
                const div = Object.values(sections).find(d => d.subsections[row.sectionId]);
                return div ? `${div.name} / ${div.subsections[row.sectionId]}` : '';
            }
        },
        {
            field: 'createDate',
            headerName: 'Дата создания',
            width: 200,
            valueFormatter: ({value}) => format(new Date(value), 'dd.MM.yyyy HH:mm')
        },
        {
            field: 'actions',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: ({row}) => (
                <Box>
                    <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                        <DeleteOutlined fontSize="small"/>
                    </IconButton>
                    <IconButton color="primary" size="small" onClick={() => {
                        setSelectedId(row.id);
                        setCreateModalOpen(true);
                    }}>
                        <AddToPhotosOutlined fontSize="small"/>
                    </IconButton>
                </Box>
            )
        }
    ];

    const rowsWithFormulas = filtered.map((row) => ({...row, id: row.id}));

    return (
        <Box p={3}>
            <Box display="flex" gap={2} mb={2} alignItems="center">
                <TextField
                    select
                    variant="standard"
                    label="Раздел"
                    value={selectedDivision}
                    onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedSection('');
                    }}
                    sx={{m: 1, minWidth: 200}}
                >
                    {Object.entries(sections).map(([divId, div]) => (
                        <MenuItem key={divId} value={divId}>{div.name}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    variant="standard"
                    label="Секция"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    disabled={!selectedDivision}
                    sx={{m: 1, minWidth: 200}}
                >
                    {selectedDivision &&
                        Object.entries(sections[selectedDivision].subsections).map(([secId, name]) => (
                            <MenuItem key={secId} value={secId}>{name}</MenuItem>
                        ))}
                </TextField>
                <Box sx={{display: 'flex', alignItems: 'center', ml: 1, mt: 3}}>
                    <IconButton color="primary" onClick={() => navigate('/tests/new')}>
                        <AddIcon/>
                    </IconButton>
                </Box>
            </Box>
            <Paper>
                <DataGrid
                    rows={rowsWithFormulas}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    autoHeight
                    disableSelectionOnClick
                />

                {expandedRow && (
                    <Collapse in={!!expandedRow} timeout="auto" unmountOnExit>
                        <Box px={4} py={2} mt={2} bgcolor="#f5f5f5" borderRadius={1}>
                            <Typography variant="subtitle1" gutterBottom>Использованные формулы</Typography>
                            {rowsWithFormulas.find(r => r.id === expandedRow)?.formulas.map((f, idx, arr) => (
                                <React.Fragment key={f.id}>
                                    <FormulaInline formula={f.formula} parameters={f.parameters}/>
                                    {idx < arr.length - 1 && (
                                        <Box my={1}>
                                            <hr style={{borderTop: '1px dashed #ccc', margin: '8px 0'}}/>
                                        </Box>
                                    )}
                                </React.Fragment>
                            ))}

                        </Box>
                    </Collapse>
                )}
            </Paper>
            <CreateTestModal
                open={createModalOpen}
                onClose={() => {setSelectedId(null); setCreateModalOpen(false);}}
                onSubmit={handleGenerateTest}
            />
        </Box>
    );
};
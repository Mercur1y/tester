import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, InputLabel, Box, FormControl, IconButton, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { withRouter } from "../common/with-router";
import { sections, localeGridText } from '../common/consts';
import { ContentDiv, CustomSelect } from './global/mui.styles';
import { convertAsciiMathToLatex, renderMathInElement } from 'mathlive';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import formulaService from '../services/formula.service';

const convertAsciiToLatex = (ascii) => {
    let latex = convertAsciiMathToLatex(ascii);
    latex = latex.replace(/#([a-zA-Z])/g, '\\mathbf{$1}');
    return latex;
};

const FormulaCell = ({ formula }) => {
    const latexFormula = convertAsciiToLatex(formula);
    const divRef = React.useRef(null);

    useEffect(() => {
        if (divRef.current) {
            renderMathInElement(divRef.current);
        }
    }, [latexFormula]);

    return (
        <div ref={divRef} className="latex-formula">
            {`$$${latexFormula}$$`}
        </div>
    );
};

const columns = [
    { field: 'divisionId', headerName: 'Раздел', width: 150, valueGetter: (params) => sections[params.value].name },
    { field: 'sectionId', headerName: 'Секция', width: 150, valueGetter: (params) => {
        const division = Object.values(sections).find(div => div.subsections[params.value]);
        return division ? division.subsections[params.value] : '';
    }},
    { field: 'formula', headerName: 'Формула', width: 250, renderCell: (params) => <FormulaCell formula={params.value} /> },
    { field: 'parameters', headerName: 'Переменные', width: 400, renderCell: (params) => (
        <div>
            {Object.entries(params.value).map(([variable, data]) => (
                <div key={variable}>
                    <strong>{variable}:</strong> {data.values.length ? data.values.join(', ') : `min: ${data.min}, max: ${data.max}, round: ${data.round}`}
                </div>
            ))}
        </div>
    ) },
    { field: 'createdAt', headerName: 'Дата создания', width: 200, valueFormatter: (params) => {
        return format(new Date(params.value), 'dd/MM/yyyy HH:mm:ss');
    }},
];

const FormulasGrid = () => {
    const [formulas, setFormulas] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

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

    const handleResetFilters = () => {
        setSelectedSection('');
        setSelectedDivision('');
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRowSelection = (selectedRowIds) => {
        const updatedFormulas = formulas.map((formula) => ({
            ...formula,
            selected: selectedRowIds.includes(formula.id),
        }));
        setFormulas(updatedFormulas);
    };

    const filteredFormulas = formulas.filter(formula => {
        if (selectedSection) {
            return formula.sectionId === selectedSection;
        }
        if (selectedDivision) {
            return formula.divisionId === selectedDivision;
        }
        return true;
    });

    return (
        <ContentDiv>
            <Box style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                    <IconButton color="primary" onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Действие 1</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Действие 2</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Действие 3</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredFormulas}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    localeText={localeGridText}
                    checkboxSelection
                    onSelectionModelChange={(ids) => handleRowSelection(ids)}
                />
            </Box>
        </ContentDiv>
    );
};

export default withRouter(FormulasGrid);

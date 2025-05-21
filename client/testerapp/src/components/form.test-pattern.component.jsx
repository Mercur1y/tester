import React, {useEffect, useRef, useState} from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import formulaService from '../services/formula.service';
import testPatternService from '../services/testPattern.service';
import { sections } from '../common/consts';
import {convertAsciiMathToLatex, renderMathInElement} from "mathlive";
import {useNotify} from "./global/nav.notifbar";
import {useNavigate} from "react-router-dom";

export const TestPatternForm = () => {
    const [name, setName] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [availableFormulas, setAvailableFormulas] = useState([]);
    const [selectedFormulas, setSelectedFormulas] = useState([]);

    const notify = useNotify();
    const navigate = useNavigate();

    useEffect(() => {
        if (sectionId) {
            formulaService.getBySection(sectionId).then(setAvailableFormulas);
        }
    }, [sectionId]);

    const handleSubmit = async () => {
        try {
            await testPatternService.create({
                name,
                sectionId,
                formulaIds: selectedFormulas
            });
            notify('Шаблон успешно создан', 'success');
            navigate('/tests');
        } catch (error) {
            notify('Ошибка при создании шаблона', 'error');
        }
    };

    return (
        <Box p={3} maxWidth={600}>
            <Typography variant="h5" gutterBottom>Создание шаблона теста</Typography>
            <TextField
                fullWidth
                label="Наименование"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                select
                fullWidth
                label="Секция"
                margin="normal"
                value={sectionId}
                onChange={(e) => {
                    setSectionId(e.target.value);
                    setSelectedFormulas([]);
                }}
            >
                {Object.entries(sections).flatMap(([, div]) =>
                    Object.entries(div.subsections).map(([secId, secName]) => (
                        <MenuItem key={secId} value={secId}>{div.name} / {secName}</MenuItem>
                    ))
                )}
            </TextField>
            <TextField
                select
                fullWidth
                label="Выберите формулы"
                margin="normal"
                SelectProps={{ multiple: true }}
                value={selectedFormulas}
                onChange={(e) => setSelectedFormulas(e.target.value)}
            >
                {availableFormulas.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                        <FormulaOption formula={f.formula} parameters={f.parameters} />
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Создать</Button>
        </Box>
    );
};

const FormulaOption = ({ formula, parameters }) => {
    const latex = convertAsciiMathToLatex(formula).replace(/#([a-zA-Z])/g, '\\mathbf{$1}');
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            renderMathInElement(ref.current);
        }
    }, [latex]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div ref={ref} className="latex-formula">
                {`$$${latex}$$`}
            </div>
            <div style={{ fontSize: '12px', color: '#555' }}>
                {Object.entries(parameters).map(([varName, data], idx) => (
                    <span key={varName}>
            <strong>{varName}</strong>: {data.values?.length
                        ? data.values.join(', ')
                        : `min: ${data.min}, max: ${data.max}${data.round !== undefined ? `, round: ${data.round}` : ''}`}
                        {idx < Object.keys(parameters).length - 1 ? ', ' : ''}
          </span>
                ))}
            </div>
        </div>
    );
};

export default FormulaOption;
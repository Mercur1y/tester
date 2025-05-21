import React, { useState, useEffect, useRef } from 'react';
import {Button, InputLabel, Select, MenuItem, Alert, Box, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { withRouter } from "../common/with-router";
import { ContentDiv, HalfContentBox } from "./global/mui.styles";
import VariableRangeCard from "./elements/formulas.var-range-card";
import { MathfieldElement } from 'mathlive';
import { sections } from '../common/consts';
import formulaService from '../services/formula.service';

const createMathfieldElement = () => {
    const el = new MathfieldElement({
        fontsDirectory: 'https://cdn.jsdelivr.net/npm/mathlive@0.100.0/dist/fonts'
    });
    el.style.width = '100%';
    el.style.height = '200px';
    el.style.textAlign = 'center';
    el.style.fontSize = '24px';
    return el;
}

const extractVariablesFromExpression = (expression) => {
    const variableRegex = /#([a-zA-Z])/g;
    const variables = new Set();
    let match;

    while ((match = variableRegex.exec(expression)) !== null) {
        variables.add(match[1]);
    }

    return [...variables];
}

const addMultiplicationOperators = (expression) => {
    let result = expression.replace(/(\d)(?=#([a-zA-Z]))/g, '$1*');
    result = result.replace(/#([a-zA-Z])(\d)/g, '#$1*$2');
    result = result.replace(/#([a-zA-Z])(?=\()/g, '#$1*');
    result = result.replace(/\)(?=#([a-zA-Z]))/g, ')*');
    return result;
}

const FormulasForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [variables, setVariables] = useState([]);
    const [filledVariables, setFilledVariables] = useState([]);
    const [divisionId, setDivisionId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [error, setError] = useState('');
    const mathfieldRef = useRef(null);
    const mathfieldElementRef = useRef(null);
    const saveButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mathfieldElementRef.current) {
            mathfieldElementRef.current = createMathfieldElement();
            mathfieldRef.current.appendChild(mathfieldElementRef.current);

            mathfieldElementRef.current.addEventListener('input', () => {
                const value = mathfieldElementRef.current.getValue('ascii-math');
                setInputValue(value);

                try {
                    const extractedVariables = extractVariablesFromExpression(value);
                    setVariables(extractedVariables);
                } catch (error) {
                    console.error('Error parsing expression:', error);
                }
            });
        }

        const handleClickOutside = (event) => {
            if (saveButtonRef.current && !saveButtonRef.current.contains(event.target)) {
                setError('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            if (mathfieldRef.current && mathfieldElementRef.current) {
                mathfieldRef.current.removeChild(mathfieldElementRef.current);
                mathfieldElementRef.current = null;
            }
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSave = async () => {
        if (!inputValue.trim()) {
            setError('Формула не может быть пустой');
            return;
        }

        setError('');
        const modifiedExpression = addMultiplicationOperators(inputValue);

        const variableData = filledVariables.reduce((acc, variable) => {
            acc[variable.name] = {
                min: variable.min,
                max: variable.max,
                round: variable.round,
                values: variable.values || [],
            };
            return acc;
        }, {});

        const newFormula = {
            id: Date.now(),
            divisionId,
            sectionId,
            formula: modifiedExpression,
            createdAt: new Date().toISOString(),
            parameters: variableData,
        };

        try {
            const savedFormula = await formulaService.create(newFormula);

            // Получаем текущие формулы из localStorage
            const existingFormulas = JSON.parse(localStorage.getItem('formulas')) || [];
            // Добавляем новую формулу
            const updatedFormulas = [savedFormula, ...existingFormulas];
            // Сохраняем обратно в localStorage
            localStorage.setItem('formulas', JSON.stringify(updatedFormulas));

            console.log("Сохранено выражение:", JSON.stringify(savedFormula, null, 2)); // Логируем данные для отладки

            navigate('/formulas'); // Возвращаемся на главную страницу после сохранения

        } catch (error) {
            setError(`Не удалось сохранить формулу: ${error.message}`);
            console.error('Ошибка сохранения формулы:', error);
        }
    };

    return (
        <ContentDiv>
            <HalfContentBox>
                <Box ref={mathfieldRef} style={{ width: '100%', marginBottom: '20px' }}></Box>
                <TextField
                    select
                    fullWidth
                    label="Раздел"
                    value={divisionId}
                    onChange={(e) => {
                        setDivisionId(e.target.value);
                        setSectionId(''); // сбросить выбранную секцию при смене раздела
                    }}
                    margin="normal"
                >
                    {Object.keys(sections).map((id) => (
                        <MenuItem key={id} value={id}>
                            {sections[id].name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Секция"
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    disabled={!divisionId}
                    margin="normal"
                >
                    {divisionId &&
                        Object.keys(sections[divisionId].subsections).map((secId) => (
                            <MenuItem key={secId} value={secId}>
                                {sections[divisionId].subsections[secId]}
                            </MenuItem>
                        ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={handleSave} ref={saveButtonRef} style={{ marginTop: '20px' }}>
                    Сохранить
                </Button>
                {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
            </HalfContentBox>
            <HalfContentBox>
                <VariableRangeCard variables={variables} setFilledVariables={setFilledVariables} />
            </HalfContentBox>
        </ContentDiv>
    );
};

export default withRouter(FormulasForm);

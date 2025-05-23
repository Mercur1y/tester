import React, { useEffect, useState } from 'react';
import {
    Box, Typography, TextField, Button, Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { renderMathInElement, convertAsciiMathToLatex } from 'mathlive';
import testService from "../services/test.service";
import {useNotify} from "./global/nav.notifbar";

export const StudentTestSolve = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const notify = useNotify();

    useEffect(() => {
        testService.getById(id).then((data) => {
            setTest(data);
            setAnswers(data.content.map((item) => ({ ...item, answer: '' })));
        });
    }, [id]);

    useEffect(() => {
        const elements = document.querySelectorAll('.latex-formula');
        elements.forEach(el => renderMathInElement(el));
    }, [answers]);

    const handleChange = (index, value) => {
        const updated = [...answers];
        updated[index].answer = value;
        setAnswers(updated);
    };

    const handleSubmit = async () => {
        try {
            await testService.submit(id, { formulas: answers });
            notify("Ответ отправлен. Подождите несколько секунд, пока проверяется...", "info");
            setTimeout(() => {
                navigate('/student/tests');
            }, 5000); // 3 сек. задержка
        } catch (e) {
            console.error(e);
        }
    };

    if (!test) return <div>Загрузка...</div>;

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>
                Решение теста: {test.testName}
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                {answers.map((item, idx) => (
                    <Box key={item.id} mb={2}>
                        <Typography className="latex-formula" mb={1}>
                            {`$$${convertAsciiMathToLatex(item.formula).replace(/#([a-zA-Z])/g, '\\mathbf{$1}')}$$`}
                        </Typography>
                        <TextField
                            fullWidth
                            label={`Ответ`}
                            value={item.answer}
                            onChange={(e) => handleChange(idx, e.target.value)}
                        />
                    </Box>
                ))}
                <Button variant="contained" onClick={handleSubmit}>Отправить</Button>
            </Paper>
        </Box>
    );
};
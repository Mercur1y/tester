import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Box, Typography, Chip, Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { convertAsciiMathToLatex, renderMathInElement } from 'mathlive';

const FormulaPreview = ({ formula }) => {
    const latex = convertAsciiMathToLatex(formula).replace(/#([a-zA-Z])/g, '\\mathbf{$1}');
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) renderMathInElement(ref.current);
    }, [latex]);

    return (
        <div ref={ref}>{`$$${latex}$$`}</div>
    );
};

export const ViewTestResultModal = ({ open, onClose, testName, results }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Результаты теста: {testName}</DialogTitle>
            <DialogContent dividers>
                {results.map((item, index) => {
                    const correct = item.correct;
                    return (
                        <Box
                            key={index}
                            p={2}
                            mb={2}
                            borderRadius={2}
                            sx={{
                                bgcolor: correct ? '#e6f4ea' : '#fcebea',
                                border: `1px solid ${correct ? '#2e7d32' : '#d32f2f'}`
                            }}
                        >
                            <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="subtitle2">Задание {index + 1}</Typography>
                                <Chip
                                    label={correct ? 'Верно' : 'Ошибка'}
                                    color={correct ? 'success' : 'error'}
                                    icon={correct ? <CheckCircleOutlineIcon /> : <CancelIcon />}
                                    size="small"
                                />
                            </Box>
                            <FormulaPreview formula={item.formula} />

                            <Box mt={1}>
                                <Typography variant="body2"><strong>Ответ:</strong> {item.answer || '–'}</Typography>
                                {!correct && (
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Правильный ответ:</strong> {item.rightAnswer}
                                    </Typography>
                                )}
                            </Box>
                            {index < results.length - 1 && <Divider sx={{ mt: 2 }} />}
                        </Box>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};
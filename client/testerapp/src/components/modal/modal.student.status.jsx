import {
    Dialog, DialogTitle, DialogContent,
    Table, TableHead, TableRow, TableCell, TableBody, Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export const StudentStatusModal = ({ open, onClose, students }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
            Студенты
            <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell>Результат</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((s, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{s.surname}</TableCell>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>
                                <Chip
                                    label={s.finished ? "Выполнен" : "Не выполнен"}
                                    color={s.finished ? "success" : "error"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{s.rate != null ? s.rate : '—'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DialogContent>
    </Dialog>
);

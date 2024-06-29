import { styled } from '@mui/material/styles';
import { Box, Select } from "@mui/material";

export const ContentDiv = styled(Box)`
    margin: 0 auto;
    padding: 30px;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
`;

export const CustomSelect = styled(Select)({
  '& .MuiSelect-select': {
    fontFamily: 'Montserrat, sans-serif',
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    borderColor: 'transparent',
  },
});

export const HalfContentBox = styled(Box)`
    width: 45%;
    margin: 1%;
    padding: 15px;
    box-sizing: border-box;
`;

export const BlockFormulaBox = styled(Box)({
  width: '100%',
  height: '200px',
  margin: '0 auto',
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
});
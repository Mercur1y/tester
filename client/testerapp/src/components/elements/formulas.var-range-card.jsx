import React, { useState, useEffect } from 'react';
import { Card, CardContent, Slider, Typography, TextField, FormControl, OutlinedInput, FormHelperText, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';

const DisabledDiv = styled('div')(({ theme, disabled }) => ({
  opacity: disabled ? 0.5 : 1,
  pointerEvents: disabled ? 'none' : 'auto'
}));

function VariableRangeCard({ variables, setFilledVariables }) {
  const [rangeValues, setRangeValues] = useState({});
  const [range2Values, setRange2Values] = useState({});
  const [manualValues, setManualValues] = useState({});
  const [useManualValues, setUseManualValues] = useState({});

  useEffect(() => {
    const filledVariables = variables.map(variable => ({
      name: variable,
      min: useManualValues[variable] ? null : rangeValues[variable] ? rangeValues[variable][0] : -20,
      max: useManualValues[variable] ? null : rangeValues[variable] ? rangeValues[variable][1] : 20,
      round: useManualValues[variable] ? null : range2Values[variable] ? range2Values[variable] : 0,
      values: useManualValues[variable] ? manualValues[variable] : null,
    }));
    setFilledVariables(filledVariables);
  }, [rangeValues, range2Values, manualValues, useManualValues, variables, setFilledVariables]);

  const handleSliderChange = (variable) => (event, newValue) => {
    setRangeValues({
      ...rangeValues,
      [variable]: newValue
    });
  };

  const handleInputChange = (variable, type) => (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setRangeValues({
        ...rangeValues,
        [variable]: [
          type === 'min' ? value : rangeValues[variable][0],
          type === 'max' ? value : rangeValues[variable][1]
        ]
      });
    }
  };

  const handleRange2SliderChange = (variable) => (event, newValue) => {
    setRange2Values({
      ...range2Values,
      [variable]: newValue
    });
  };

  const handleRange2InputChange = (variable) => (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setRange2Values({
        ...range2Values,
        [variable]: value
      });
    }
  };

  const handleManualValuesChange = (variable) => (event) => {
    setManualValues({
      ...manualValues,
      [variable]: event.target.value.split(',').map(v => v.trim())
    });
  };

  const handleCheckboxChange = (variable) => (event) => {
    setUseManualValues({
      ...useManualValues,
      [variable]: event.target.checked
    });
  };

  return (
    <Card>
      <CardContent>
        {variables.map((variable, index) => (
          <div key={index}>
            <Typography id={`${variable}-slider`} gutterBottom variant="h5" sx={{ textAlign: 'center' }}>
              {variable}
            </Typography>
            <DisabledDiv disabled={useManualValues[variable]}>
              <Typography>Диапазон значений:</Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ m: 1, width: '15%', minWidth: '72px' }} variant="outlined" size='small'>
                  <OutlinedInput
                    id={`${variable}-min-range`}
                    type="number"
                    value={rangeValues[variable] ? rangeValues[variable][0] : -20}
                    onChange={handleInputChange(variable, 'min')}
                    aria-describedby={`${variable}-min-range-text`}
                  />
                  <FormHelperText id={`${variable}-min-range-text`}>Min</FormHelperText>
                </FormControl>
                <Slider
                  size="small"
                  value={rangeValues[variable] || [-20, 20]}
                  onChange={handleSliderChange(variable)}
                  aria-labelledby={`${variable}-slider`}
                  valueLabelDisplay="auto"
                  min={-20}
                  max={20}
                  step={1}
                  marks={[{ value: 0, label: '0' }]}
                />
                <FormControl sx={{ m: 1, width: '15%', minWidth: '72px' }} variant="outlined" size='small'>
                  <OutlinedInput
                    id={`${variable}-max-range`}
                    type="number"
                    value={rangeValues[variable] ? rangeValues[variable][1] : 20}
                    onChange={handleInputChange(variable, 'max')}
                    aria-describedby={`${variable}-max-range-text`}
                  />
                  <FormHelperText id={`${variable}-max-range-text`}>Max</FormHelperText>
                </FormControl>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <FormControl sx={{ m: 1, width: '15%', minWidth: '72px' }} variant="outlined" size='small'>
                  <OutlinedInput
                    id={`${variable}-round-range`}
                    type="number"
                    value={range2Values[variable] || 0}
                    onChange={handleRange2InputChange(variable)}
                    aria-describedby={`${variable}-round-range-text`}
                  />
                  <FormHelperText id={`${variable}-round-range-text`}>Round</FormHelperText>
                </FormControl>
                <Slider
                  size="small"
                  value={range2Values[variable] || 0}
                  onChange={handleRange2SliderChange(variable)}
                  aria-labelledby={`${variable}-round-slider`}
                  valueLabelDisplay="auto"
                  min={0}
                  max={4}
                  step={1}
                  marks={[{ value: 0, label: '0' }, { value: 4, label: '4' }]}
                />
              </div>
            </DisabledDiv>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useManualValues[variable] || false}
                  onChange={handleCheckboxChange(variable)}
                  name={`${variable}-manual-values`}
                />
              }
              label="Ввести значения вручную"
              sx={{ marginTop: '10px' }}
            />
            {useManualValues[variable] && (
              <TextField
                id={`${variable}-manual-values`}
                label="Значения"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Введите значения через запятую"
                onChange={handleManualValuesChange(variable)}
                sx={{ marginTop: '10px' }}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default VariableRangeCard;

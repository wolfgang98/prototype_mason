import React, { useEffect, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, createMuiTheme, ThemeProvider, CssBaseline, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import './App.scss';

import { RootState } from './store';
import { changeDimension } from 'common/dimension/dimensionSlice';
import { changeColumns, changeRows, changeMargin, addVariable, changeVariable } from 'features/components/grid/gridSlice';
import Grid from 'features/components/grid/Grid';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#7e57c2',
          },
          secondary: {
            main: '#ffee58',
          },
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const settings = useSelector(
    (state: RootState) => state.grid.settings
  );

  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(changeDimension(window.innerWidth, window.innerHeight));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  function onColumnChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeColumns(Number(event.currentTarget.value)));
  }

  function onRowsChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeRows(Number(event.currentTarget.value)));
  }

  function onMarginChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeMargin(Number(event.currentTarget.value)));
  }

  const variables = useSelector((state: RootState) => state.grid.variables);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const handleVariableChange = (id: string, key: string, e: ChangeEvent<{ value: string | unknown }>) => {
    dispatch(changeVariable({ id, [key]: String(e.target.value) }))
  }

  const handleAddVariableClick = () => {
    dispatch(addVariable({name: '', type: 'string'}));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={"app"}>
        <nav>
          <TextField label="Columns" type="number" value={settings.columns} onChange={onColumnChange} />
          <TextField label="Rows" type="number" value={settings.rows} onChange={onRowsChange} />
          <TextField label="Margin" type="number" value={settings.margin} onChange={onMarginChange} />
          <IconButton onClick={handleOpen}>
            <SettingsIcon />
          </IconButton>
        </nav>
        <Grid />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          {variables.map(v => (
            <div key={v.id} className={'setting'}>
              <TextField type="string" value={v.name} onChange={(e) => handleVariableChange(v.id, 'name', e)}></TextField>
              <Select value={v.type} onChange={(e) => handleVariableChange(v.id, 'type', e)}>
                <MenuItem value='string'>String</MenuItem>
                <MenuItem value='number'>Number</MenuItem>
                <MenuItem value='list'>List</MenuItem>
              </Select>
              {
                ['string', 'number'].includes(v.type)
                ? <TextField type={v.type} value={v.value} onChange={(e) => handleVariableChange(v.id, 'value', e)}></TextField>
                : <span>{v.value}</span>
              }
            </div>
          ))}
          <br></br>
          <Button variant={'outlined'} onClick={handleAddVariableClick}>Add Variable</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
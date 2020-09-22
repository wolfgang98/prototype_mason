import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';
import { Cell } from './types';

// todo: fetch from scholar api (settings, variables, cells)
// todo: should be part of the characterSlice
const initialState = {
  settings: {
    columns: 12,
    rows: 12,
    margin: 5,
  },
  variables: [
    // todo?: variable slice which gets +/- modifiers from modules
    { id: 'v0', name: 'Strength', type: 'number', value: '0', tags: [ 'Attribute' ]},
    { id: 'v1', name: 'Dexterity', type: 'number', value: '0', tags: [ 'Attribute' ]},
    { id: 'v2', name: 'Intelligence', type: 'number', value: '0', tags: [ 'Attribute' ]}
  ],
  cells: [
    { id: `c0`, x: 0, y: 0, w: 6, h: 4, module: 'm0' },
    { id: `c1`, x: 6, y: 0, w: 6, h: 4, module: 'm3' },
    { id: `c2`, x: 0, y: 4, w: 6, h: 4, module: 'm4' },
    { id: `c4`, x: 6, y: 4, w: 6, h: 4, module: 'm5' }
  ]
}

const gridSlice = createSlice({
  name: 'gridState',
  initialState,
  reducers: {
    changeColumns(state, action: PayloadAction<number>) {
      state.settings.columns = action.payload;
    },
    changeRows(state, action: PayloadAction<number>) {
      state.settings.rows = action.payload;
    },
    changeMargin(state, action: PayloadAction<number>) {
      state.settings.margin = action.payload;
    },
    addCell(state, action: PayloadAction<Cell>) {
      state.cells.push(action.payload);
    },
    changeVariable(state, action: PayloadAction<{ id: string, name?: string, value?: string, type?: string }>) {
      let variable = state.variables.find(e => e.id === action.payload.id);
      if (variable && action.payload.name) variable.name = action.payload.name;
      if (variable && action.payload.value) variable.value = action.payload.value;
      if (variable && action.payload.type) variable.type = action.payload.type;
    },
    changeVariableValue(state, action: PayloadAction<{ id: string, value: string }>) {
      let variable = state.variables.find(e => e.id === action.payload.id);
      if (variable) variable.value = action.payload.value;
    },
    addVariable(state, action: PayloadAction<{ name: string, type: string }>) {
      state.variables.push({
        id: 'v' + state.variables.length,
        name: action.payload.name,
        type: action.payload.type,
        value: '',
        tags: []
      });
    }
  }
});

export const { changeColumns, changeMargin, changeRows, changeVariable, changeVariableValue, addVariable } = gridSlice.actions;

export const addCell = (
  x: number,
  y: number
): AppThunk => async (dispatch: AppDispatch) => {
  const newCell : Cell = {
    id: Math.random().toString(36).substr(2, 9),
    x: x,
    y: y,
    w: 1,
    h: 1,
    module: 'm0'
  }

  dispatch(gridSlice.actions.addCell(newCell))
}

export default gridSlice.reducer;
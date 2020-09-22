import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModule } from './types';

// todo: fetch from api

const initialState: {
  byId: { [id: string]: IModule },
  allIds: string[]
} = {
  byId: {
    'm0': {
      id: 'm0',
      type: 'tabs',
      settings: '{"tabs":{"0":{"label":"Variable: Str","module":"m1"},"1":{"label":"Variable: Dex","module":"m2"}}}',
      state: ''
    },
    'm1': {
      id: 'm1',
      type: 'variable',
      settings: '{"variableId":"v0","isEditable":true}',
      state: ''
    },
    'm2': {
      id: 'm2',
      type: 'variable',
      settings: '{"variableId":"v1","isEditable":true}',
      state: ''
    },
    'm3': {
      id: 'm3',
      type: 'variable',
      settings: '{"variableId":"v2","isEditable":false}',
      state: ''
    },
    'm4': {
      id: 'm4',
      type: 'formula',
      settings: '{"formula":"sum(Strength, Dexterity)"}',
      state: ''
    },
    'm5': {
      id: 'm5',
      type: 'formula',
      settings: '{"formula":"max(Strength, Dexterity)"}',
      state: ''
    }
  },
  allIds: [
    'm0', 'm1', 'm2', 'm3', 'm4', 'm5'
  ]
}

const moduleSlice = createSlice({
  name: 'moduleState',
  initialState,
  reducers: {
    saveModuleSettings(state, action: PayloadAction<{id: string, settings: string}>) {
      state.byId[action.payload.id].settings = action.payload.settings;
    },
  }
});

export const { saveModuleSettings } = moduleSlice.actions;

export default moduleSlice.reducer;
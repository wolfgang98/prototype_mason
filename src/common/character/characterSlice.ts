import { createSlice } from '@reduxjs/toolkit';
import { Character } from './types';

const initialState = {
  byId: {} as {[id: string]: Character},
  allIds: [] as string[]
}

const characterSlice = createSlice({
  name: 'characterState',
  initialState,
  reducers: {}
});

export default characterSlice.reducer;
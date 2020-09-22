import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store';

const initialState = {
  width: 0,
  height: 0
}

const dimensionSlice = createSlice({
  name: 'dimensionState',
  initialState,
  reducers: {
    changeDimension(state, action: PayloadAction<{width: number, height: number}>) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    }
  }
});

export const changeDimension = (
  width: number,
  height: number
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(dimensionSlice.actions.changeDimension({width, height}))
}

export default dimensionSlice.reducer;
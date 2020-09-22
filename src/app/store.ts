import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import dimension from 'common/dimension/dimensionSlice';
import user from 'common/user/userSlice';
import character from 'common/character/characterSlice';
import grid from 'features/components/grid/gridSlice';
import module from 'features/components/module/moduleSlice';

const store = configureStore({
  reducer: {
    dimension,
    user,
    character,
    grid,
    module
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: ''
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {}
});

export default userSlice.reducer;
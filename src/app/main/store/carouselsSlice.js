import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getCarousels = createAsyncThunk('/carousels', async () => {
	const response = await axios.get('/carousels/admin');
	const data = await response.data.list;
	return data;
});

export const deleteCarousels = createAsyncThunk('/carousels/delete', async ids => {
	const response = await axios.put('/carousels/delete', { ids });
	const data = await response.data.list;
	return data;
});

const carouselsAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectCarousels, selectById: selectPromoteCodeById } = carouselsAdapter.getSelectors(
	state => state.main.carousels
);

const carouselsSlice = createSlice({
	name: 'main/carousels',
	initialState: carouselsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCarouselsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => {
				return { payload: event.target.value || '' }
			}
		}
	},
	extraReducers: {
		[getCarousels.fulfilled]: carouselsAdapter.setAll,
		[deleteCarousels.fulfilled]: carouselsAdapter.setAll
	}
});

export const { setCarouselsSearchText } = carouselsSlice.actions;

export default carouselsSlice.reducer;

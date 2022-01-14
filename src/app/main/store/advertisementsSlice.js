import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getAdvertisements = createAsyncThunk('/advertisements', async () => {
	const response = await axios.get('/advertisements');
	const data = await response.data.list;
	return data;
});
export const deleteAdvertisements = createAsyncThunk('/advertisements/delete', async ids => {
	const response = await axios.put('/advertisements/delete', { ids });
	const data = await response.data.list;
	return data;
});
const advertisementsAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectAdvertisements,
	selectById: selectPromoteCodeById
} = advertisementsAdapter.getSelectors(state => state.main.advertisements);

const advertisementsSlice = createSlice({
	name: 'main/advertisements',
	initialState: advertisementsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setAdvertisementsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAdvertisements.fulfilled]: advertisementsAdapter.setAll,
		[deleteAdvertisements.fulfilled]: advertisementsAdapter.setAll
	}
});

export const { setAdvertisementsSearchText } = advertisementsSlice.actions;

export default advertisementsSlice.reducer;

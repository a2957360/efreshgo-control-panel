import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShippingMissions = createAsyncThunk('/shippingMission', async () => {
	const response = await axios.get('/shippingMissions');
	const data = await response.data.list;
	return data;
});

export const deleteShippingMissions = createAsyncThunk('/shippingMission/delete', async ids => {
	const response = await axios.put('/shippingMissions/delete', ids);
	const data = await response.data.list;
	return data;
});

const shippingMissionAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectShippingMissions,
	selectById: selectPromoteCodeById
} = shippingMissionAdapter.getSelectors(state => state.main.shippingMissions);

const shippingMissionSlice = createSlice({
	name: 'main/shippingMissions',
	initialState: shippingMissionAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setShippingMissionsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getShippingMissions.fulfilled]: shippingMissionAdapter.setAll,
		[deleteShippingMissions.fulfilled]: shippingMissionAdapter.setAll
	}
});

export const { setShippingMissionsSearchText } = shippingMissionSlice.actions;

export default shippingMissionSlice.reducer;

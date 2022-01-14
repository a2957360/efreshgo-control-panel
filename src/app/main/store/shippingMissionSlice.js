/* eslint-disable object-shorthand */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShippingMission = createAsyncThunk(`shippingMissions/:_id`, async ({ _id }) => {
	const response = await axios.get(`/shippingMissions/${_id}`);
	const data = await response.data.result;
	return data;
});
export const getShippingMissionPdf = createAsyncThunk(`shippingMissions/pdf/:_id`, async ({ _id }) => {
	const response = await axios.get(`/shippingMissions/pdf/${_id}`);
	const data = await response.data;
	console.log(response);

	return data;
});

export const saveShippingMission = createAsyncThunk(`shippingMissions/:_id`, async shippingMission => {
	const { _id } = shippingMission;
	if (_id) {
		const response = await axios.put(`/shippingMissions/${_id}`, shippingMission);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/shippingMissions', shippingMission);
	const data = await response.data.result;
	return data;
});

const shippingMissionSlice = createSlice({
	name: 'main/shippingMission',
	initialState: null,
	reducers: {
		newShippingMission: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					link: '',
					images: []
				}
			})
		}
	},
	extraReducers: {
		[getShippingMission.fulfilled]: (state, action) => action.payload,
		[saveShippingMission.fulfilled]: (state, action) => action.payload
	}
});

export const { newShippingMission } = shippingMissionSlice.actions;

export default shippingMissionSlice.reducer;

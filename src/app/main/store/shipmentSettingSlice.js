import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShipmentSetting = createAsyncThunk(`shipments/settings/:_id`, async ({ _id }) => {
	const response = await axios.get(`/shipments/settings/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveShipmentSetting = createAsyncThunk(`shipments/settings/:_id`, async shipmentSetting => {
	const { _id } = shipmentSetting;
	if (_id) {
		const response = await axios.put(`/shipments/settings/${_id}`, shipmentSetting);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/shipments/settings', shipmentSetting);
	const data = await response.data.result;
	return data;
});

const shipmentSettingSlice = createSlice({
	name: 'main/shipmentSetting',
	initialState: null,
	reducers: {
		newShipmentSetting: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					requirement: 30,
					postalCode: [],
					isActive: false
				}
			})
		}
	},
	extraReducers: {
		[getShipmentSetting.fulfilled]: (state, action) => action.payload,
		[saveShipmentSetting.fulfilled]: (state, action) => action.payload
	}
});

export const { newShipmentSetting } = shipmentSettingSlice.actions;

export default shipmentSettingSlice.reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShipmentSettings = createAsyncThunk('shipmentSetting', async () => {
	const response = await axios.get('/shipments/settings');
	const data = await response.data.list;
	return data;
});
export const deleteShipmentSettings = createAsyncThunk('/shipmentSetting/delete', async ids => {
	const response = await axios.put('/shipments/settings/delete', ids);
	const data = await response.data.list;
	return data;
});

const shipmentSettingsAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectShipmentSettings,
	selectById: selectPromoteCodeById
} = shipmentSettingsAdapter.getSelectors(state => state.main.shipmentSettings);

const shipmentSettingsSlice = createSlice({
	name: 'main/shipmentSettings',
	initialState: shipmentSettingsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setShipmentSettingsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getShipmentSettings.fulfilled]: shipmentSettingsAdapter.setAll,
		[deleteShipmentSettings.fulfilled]: shipmentSettingsAdapter.setAll
	}
});

export const { setShipmentSettingsSearchText } = shipmentSettingsSlice.actions;

export default shipmentSettingsSlice.reducer;

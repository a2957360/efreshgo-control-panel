import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShipments = createAsyncThunk('shipments', async () => {
	const response = await axios.get('/shipments/');
	const data = await response.data.list;
	return data;
});
export const deleteShipments = createAsyncThunk('/shipments/delete', async ids => {
	const response = await axios.put('/shipments/delete', ids);
	const data = await response.data.list;
	return data;
});

const shipmentsAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectShipments, selectById: selectPromoteCodeById } = shipmentsAdapter.getSelectors(
	state => state.main.shipments
);

const shipmentsSlice = createSlice({
	name: 'main/shipments',
	initialState: shipmentsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setShipmentsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getShipments.fulfilled]: shipmentsAdapter.setAll,
		[deleteShipments.fulfilled]: shipmentsAdapter.setAll
	}
});

export const { setShipmentsSearchText } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;

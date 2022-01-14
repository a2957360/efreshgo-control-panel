import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getOrders = createAsyncThunk('/orders', async () => {
	const response = await axios.get('/orders/admin');
	const data = await response.data.list;
	return data;
});

export const deleteOrders = createAsyncThunk('/orders/delete', async ids => {
	const response = await axios.put('/orders/delete', ids);
	const data = await response.data.list;
	return data;
});

const ordersAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectOrders, selectById: selectPromoteCodeById } = ordersAdapter.getSelectors(
	state => state.main.orders
);

const ordersSlice = createSlice({
	name: 'main/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[deleteOrders.fulfilled]: ordersAdapter.setAll
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;

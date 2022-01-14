import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getPromoteCodes = createAsyncThunk('promote-codes', async () => {
	const response = await axios.get('/promoteCodes/admin');
	const data = await response.data.list;
	return data;
});

const promoteCodesAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectPromoteCodes, selectById: selectPromoteCodeById } = promoteCodesAdapter.getSelectors(
	state => state.main.promoteCodes
);

const promoteCodesSlice = createSlice({
	name: 'main/promoteCodes',
	initialState: promoteCodesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPromoteCodesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPromoteCodes.fulfilled]: promoteCodesAdapter.setAll
	}
});

export const { setPromoteCodesSearchText } = promoteCodesSlice.actions;

export default promoteCodesSlice.reducer;

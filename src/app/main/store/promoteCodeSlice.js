import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getPromoteCode = createAsyncThunk(`promote-code/:_id`, async ({ _id }) => {
	const response = await axios.get(`/promoteCodes/${_id}`);
	const data = await response.data.result;
	return data;
});

export const savePromoteCode = createAsyncThunk(`promote-code/:_id`, async promoteCode => {
	const { _id } = promoteCode;
	if (_id) {
		const response = await axios.put(`/promoteCodes/${_id}`, promoteCode);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/promoteCodes', promoteCode);
	const data = await response.data.result;
	return data;
});

const promoteCodeSlice = createSlice({
	name: 'main/promoteCode',
	initialState: null,
	reducers: {
		newPromoteCode: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					type: '',
					requirementText: '',
					requirementPrice: 0,
					discountMethod: 0,
					discountValue: 0,
					code: '',
					startedDate: Date.now(),
					expiredDate: Date.now(),
					isDelete: false
				}
			})
		}
	},
	extraReducers: {
		[getPromoteCode.fulfilled]: (state, action) => action.payload,
		[savePromoteCode.fulfilled]: (state, action) => action.payload
	}
});

export const { newPromoteCode } = promoteCodeSlice.actions;

export default promoteCodeSlice.reducer;

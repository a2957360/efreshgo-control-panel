import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';
// import { TermsOfServiceId } from '../../../global/ids';

export const getTerms = createAsyncThunk('/terms-of-service', async () => {
	// const response = await axios.get(`/terms/${TermsOfServiceId}`);
	// const data = await response.data.result;
	// return data;
});

export const saveTerms = createAsyncThunk('/terms-of-service', async terms => {
	// const response = await axios.put(`/terms/${TermsOfServiceId}`, terms);
	// const data = await response.data.result;

	// return data;
});

const termsSlice = createSlice({
	name: 'others/terms',
	initialState: { name: '', context: '' },
	extraReducers: {
		[getTerms.fulfilled]: (state, action) => action.payload,
		[saveTerms.fulfilled]: (state, action) => action.payload
	}
});

export default termsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';
// import { PrivacyPolicyId } from '../../../global/ids';

export const getPrivacy = createAsyncThunk('/privacy-policy', async () => {
	// const response = await axios.get(`/privacy/${PrivacyPolicyId}`);
	// const data = await response.data.result;
	// return data;
});

export const savePrivacy = createAsyncThunk('/privacy-policy', async privacy => {
	// const response = await axios.put(`/privacy/${PrivacyPolicyId}`, privacy);
	// const data = await response.data.result;

	// return data;
});

const privacySlice = createSlice({
	name: 'others/privacy',
	initialState: { name: '', context: '' },
	extraReducers: {
		[getPrivacy.fulfilled]: (state, action) => action.payload,
		[savePrivacy.fulfilled]: (state, action) => action.payload
	}
});

export default privacySlice.reducer;

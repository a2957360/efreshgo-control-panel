import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';
// import { ContactUsId } from '../../../global/ids';

export const getContactUs = createAsyncThunk('/contact-us', async () => {
	// const response = await axios.get(`/contactUs/${ContactUsId}`);
	// const data = await response.data.result;
	// return data;
});

export const saveContactUs = createAsyncThunk('/contact-us', async contactUs => {
	// const response = await axios.put(`/contactUs/${ContactUsId}`, contactUs);
	// const data = await response.data.result;

	// return data;
});

const contactUsSlice = createSlice({
	name: 'others/contactUs',
	initialState: { phone: '', address: '', email: '' },
	extraReducers: {
		[getContactUs.fulfilled]: (state, action) => action.payload,
		[saveContactUs.fulfilled]: (state, action) => action.payload
	}
});

export default contactUsSlice.reducer;

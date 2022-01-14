import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getCarousel = createAsyncThunk(`carousels/:_id`, async ({ _id }) => {
	const response = await axios.get(`/carousels/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveCarousel = createAsyncThunk(`carousels/:_id`, async carousel => {
	const { _id } = carousel;
	if (_id) {
		const response = await axios.put(`/carousels/${_id}`, carousel);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/carousels', carousel);
	const data = await response.data.result;
	return data;
});

const carouselSlice = createSlice({
	name: 'main/carousel',
	initialState: null,
	reducers: {
		newCarousel: {
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
		[getCarousel.fulfilled]: (state, action) => action.payload,
		[saveCarousel.fulfilled]: (state, action) => action.payload
	}
});

export const { newCarousel } = carouselSlice.actions;

export default carouselSlice.reducer;

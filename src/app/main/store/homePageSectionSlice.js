import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getHomePageSection = createAsyncThunk(`homePageSections/ get details`, async ({ _id }) => {
	const response = await axios.get(`/homePage/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveHomePageSection = createAsyncThunk(`homePageSections/ create or update`, async homePageSection => {
	const { _id } = homePageSection;
	if (_id) {
		const response = await axios.put(`/homePage/${_id}`, homePageSection);
		const data = await response.data.result;

		return data;
	}
	const response = await axios.post('/homePage', homePageSection);
	const data = await response.data.result;
	return data;
});

const homePageSectionSlice = createSlice({
	name: 'main/homePageSection',
	initialState: null,
	reducers: {
		newHomePageSection: {
			reducer: (state, action) => action.payload,
			prepare: homePageSection => ({
				payload: {
					type: 'advertisement',
					title: '',
					advertisement: {
						images: [],
						link: '',
						product: '',
						recipe: ''
					},
					promoteSection: {
						images: [],
						products: [],
						row: 3,
						column: 1
					},
					limitedTimeOffer: {
						images: [],
						products: [],
						row: 3,
						column: 1,
						selectedPrice: 2
					},
					isActive: false,
					order: 99
				}
			})
		}
	},
	extraReducers: {
		[getHomePageSection.fulfilled]: (state, action) => action.payload,
		[saveHomePageSection.fulfilled]: (state, action) => action.payload
	}
});

export const { newHomePageSection } = homePageSectionSlice.actions;

export default homePageSectionSlice.reducer;

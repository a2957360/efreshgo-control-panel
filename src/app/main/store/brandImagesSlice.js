import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getBrandImages = createAsyncThunk('/brand-images', async () => {
	const response = await axios.get('/brandImages');
	const data = await response.data.list;
	return data;
});

export const deleteBrandImages = createAsyncThunk('/brand-images/delete', async ids => {
	const response = await axios.put('/brandImages/delete', { ids });
	const data = await response.data.list;
	return data;
});

const brandImagesAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectBrandImages, selectById: selectPromoteCodeById } = brandImagesAdapter.getSelectors(
	state => state.main.brandImages
);

const brandImagesSlice = createSlice({
	name: 'main/brandImages',
	initialState: brandImagesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBrandImagesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBrandImages.fulfilled]: brandImagesAdapter.setAll,
		[deleteBrandImages.fulfilled]: brandImagesAdapter.setAll
	}
});

export const { setBrandImagesSearchText } = brandImagesSlice.actions;

export default brandImagesSlice.reducer;

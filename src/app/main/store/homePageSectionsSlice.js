import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getHomePageSections = createAsyncThunk('homePage', async () => {
	const response = await axios.get(`/homePage/admin`);
	const data = await response.data.list;
	return data;
});

export const deleteHomePageSections = createAsyncThunk('/homePage/delete', async ids => {
	const response = await axios.put('/homePage/delete', { ids });
	const data = await response.data.list;
	return data;
});

const homePageSectionsAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectHomePageSections,
	selectById: selectPromoteCodeById
} = homePageSectionsAdapter.getSelectors(state => state.main.homePageSections);

const homePageSectionsSlice = createSlice({
	name: 'main/homePageSections',
	initialState: homePageSectionsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setHomePageSectionsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getHomePageSections.fulfilled]: homePageSectionsAdapter.setAll,
		[deleteHomePageSections.fulfilled]: homePageSectionsAdapter.setAll
	}
});

export const { setHomePageSectionsSearchText } = homePageSectionsSlice.actions;

export default homePageSectionsSlice.reducer;

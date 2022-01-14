// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// export const getSubCategories = createAsyncThunk('product/subcategories', async () => {
// 	const result = await axios.post('/categoryModule.php', { isGet:'1', categoryType:'0', language:'Zh'});
// 	const data = result.data.data.filter(category => category.categoryParentId !== "")
// 	return data;
// });

// export const deleteSubCategories = createAsyncThunk('product/subcategories/delete', async ids => {
// 	// const response = await axios.put('/advertisements/delete', { ids });
// 	// const data = await response.data.list;
// 	// return data;
// });

// const subCategoriesAdapter = createEntityAdapter({ selectId: item => item.categoryId }); //{ selectId: item => item.categoryNumber }

// export const {
// 	selectAll: selectAllSubCategories,
// 	selectById: selectSubCategoryById
// } = subCategoriesAdapter.getSelectors(({main}) => main.productSubCategories);

// const subCategoriesSlice = createSlice({
// 	name: 'product/subcategories',
// 	initialState: subCategoriesAdapter.getInitialState({
// 		searchText: ''
// 	}),
// 	reducers: {
// 		setSearchText: {
// 			reducer: (state, action) => {
// 				state.searchText = action.payload;
// 			},
// 			prepare: event => ({ payload: event.target.value || '' })
// 		}
// 	},
// 	extraReducers: {
// 		[getSubCategories.fulfilled]: subCategoriesAdapter.setAll,
// 		[deleteSubCategories.fulfilled]: subCategoriesAdapter.setAll
// 	}
// });

// export const { setSearchText } = subCategoriesSlice.actions;

// export default subCategoriesSlice.reducer;

// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// export const getRecipeCategories = createAsyncThunk('/recipe/categories', async () => {
// 	const query = { isGet: 1, categoryType: 1, language:"Zh" }
// 	const result = await axios.post('/categoryModule.php', query);
// 	return result.data.data;
// });

// export const deleteRecipeCategories = createAsyncThunk('/recipe/categories/delete', async categoryNumberArray => {
// 		//删除中文分类
// 		const array_zh = categoryNumberArray.map(el => {
// 			if (el.language == 'Zh') {
// 				// console.log(el.categoryNumber);
// 				return el.categoryNumber;
// 			}
// 		});
// 		const array_en = categoryNumberArray.map(el => {
// 			if (el.language == 'En') {
// 				// console.log(el.categoryNumber);
// 				return el.categoryNumber;
// 			}
// 		});
// 		const { data: result_zh } = await axios.post('/categoryModule.php', {
// 			categoryNumber: array_zh,
// 			isDelete: '1',
// 			language: 'Zh'
// 		});
// 		const { data: result_en } = await axios.post('/categoryModule.php', {
// 			categoryNumber: array_en,
// 			isDelete: '1',
// 			language: 'En'
// 		});
// 		console.log(result_zh.concat(result_en));
// 		return;
// });

// const recipeCategoriesAdapter = createEntityAdapter({ selectId: item => item.categoryId });

// export const {
// 	selectAll: selectRecipeCategories,
// 	selectById: selectRecipeCategoryById
// } = recipeCategoriesAdapter.getSelectors(({ main }) => main.recipeCategories);

// const recipeCategoriesSlice = createSlice({
// 	name: 'recipe/category',
// 	initialState: recipeCategoriesAdapter.getInitialState({
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
// 		[getRecipeCategories.fulfilled]: recipeCategoriesAdapter.setAll,
// 		[deleteRecipeCategories.fulfilled]: recipeCategoriesAdapter.setAll
// 	}
// });

// export const { setSearchText } = recipeCategoriesSlice.actions;

// export default recipeCategoriesSlice.reducer;

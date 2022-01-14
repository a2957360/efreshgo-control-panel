// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// const config = {
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// };

// export const getProductMainCategories = createAsyncThunk('product/maincategories', async lng => {
// 	const query = JSON.stringify({ isGet: 1, language: 'Zh', categoryType: 0, categoryParentId: 0 });
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	};
// 	const result = await axios.post('/categoryModule.php', query, config);
// 	return result.data.data;
// });

// export const deleteProductMainCategories = createAsyncThunk('product/maincategories/delete', async categoryNumberArray => {
// 	//删除中文分类
// 	const array_zh = categoryNumberArray.map(el => {
// 		if (el.language == 'Zh') {
// 			// console.log(el.categoryNumber);
// 			return el.categoryNumber;
// 		}
// 	});
// 	const array_en = categoryNumberArray.map(el => {
// 		if (el.language == 'En') {
// 			// console.log(el.categoryNumber);
// 			return el.categoryNumber;
// 		}
// 	});
// 	const { data: result_zh } = await axios.post('/categoryModule.php', {
// 		categoryNumber: array_zh,
// 		isDelete: '1',
// 		language: 'Zh'
// 	});
// 	const { data: result_en } = await axios.post('/categoryModule.php', {
// 		categoryNumber: array_en,
// 		isDelete: '1',
// 		language: 'En'
// 	});
// 	console.log(result_zh.concat(result_en));
// 	return;
// });

// const mainCategoriesAdapter = createEntityAdapter({ selectId: item => item.categoryId });

// export const {
// 	selectAll: selectProductMainCategories,
// 	selectById: selectProductMainCategoryById
// } = mainCategoriesAdapter.getSelectors(({ main }) => main.productMainCategories);

// const mainCategoriesSlice = createSlice({
// 	name: 'product/maincategories',
// 	initialState: mainCategoriesAdapter.getInitialState({
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
// 		[getProductMainCategories.fulfilled]: mainCategoriesAdapter.setAll,
// 		[deleteProductMainCategories.fulfilled]: mainCategoriesAdapter.setAll
// 	}
// });

// export const { setSearchText } = mainCategoriesSlice.actions;

// export default mainCategoriesSlice.reducer;

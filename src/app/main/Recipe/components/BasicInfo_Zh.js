import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
import _ from '@lodash';

//components
import FuseLoading from '@fuse/core/FuseLoading';
import { TextField } from '@material-ui/core';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';

function BasicInfo_Zh(props) {
	const { cookbookNumber } = useParams();
	const { form, setForm } = props;

	const [categories, setCategories] = useState();
	const [products, setProducts] = useState();

	useEffect(() => {
		getCategories();
		getProducts();
	}, []);

	const getCategories = async () => {
		const query = { isGet: 1, language: 'Zh', categoryType: 1 };
		const { data } = await axios.post('/categoryModule.php', query);
		setCategories(data.data);
	};

	const getProducts = async () => {
		const { data } = await axios.post('/itemModule.php', { isGetAdmin: 1 });
		const result = data.data.map(product => {
			return product.Zh;
		});
		setProducts(result);
	};

	const renderRecipeCategory = categoryList => {
		const result = categoryList.map(catNum => {
			return categories.filter(cat => cat.categoryNumber === catNum)[0];
		});
		return !result[0] ? [] : result;
	};

	const handleCategoryChange = value => {
		console.log(value);
		if (!value || value.length === 0) {
			setForm({ ...form, cookbookCategory: [] });
		} else {
			setForm({ ...form, cookbookCategory: value.map(val => val.categoryNumber) });
		}
	};

	const renderItems = (itemList) => {
		const result = itemList.map(itemNum => {
			return products.filter(item => item.itemNumber === itemNum)[0];
		});
		return !result[0] ? [] : result;
	}

	const handleItemChange = (value) => {
		console.log(value);
		if (!value || value.length === 0) {
			setForm({ ...form, itemList: [] });
		} else {
			setForm({ ...form, itemList: value.map(val => val.itemNumber) });
		}
	}

	const handleChipChange = (value, name) => {
		setForm({ ...form, cookbookTag: { ...form.cookbookTag, Zh: value.map(item => item.value) } });
	};

	if (!categories || !products) {
		return <FuseLoading />;
	} else {
		return (
			<div>
				<TextField
					className="my-10"
					error={form.cookbookTitle.Zh === ''}
					label="菜谱中文名称"
					id="cookbookTitle"
					name="cookbookTitle"
					value={form.cookbookTitle.Zh}
					onChange={event =>
						setForm({ ...form, cookbookTitle: { ...form.cookbookTitle, Zh: event.target.value } })
					}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="my-10"
					error={form.cookbookSubTitle.Zh === ''}
					label="副标题"
					id="cookbookSubTitle"
					name="cookbookSubTitle"
					value={form.cookbookSubTitle.Zh}
					onChange={event =>
						setForm({ ...form, cookbookSubTitle: { ...form.cookbookSubTitle, Zh: event.target.value } })
					}
					variant="outlined"
					fullWidth
					multiline
				/>
				<Autocomplete
					id="recipeCat"
					className='my-10'
					options={categories}
					multiple
					fullWidth
					filterSelectedOptions
					getOptionLabel={option => {
						return !option ? '': option.categoryTitle
					}}
					// style={{ margin: 20 }}
					value={renderRecipeCategory(form.cookbookCategory)}
					onChange={(event, value) => handleCategoryChange(value)}
					renderInput={params => <TextField {...params} label="菜谱分类" variant="outlined" />}
				/>

				<Autocomplete
					id="itemList"
					className='my-10'
					options={products}
					multiple
					fullWidth
					filterSelectedOptions
					getOptionLabel={option => {
						return !option ? '': option.itemTitle
					}}
					value={renderItems(form.itemList)} //
					onChange={(event, value) => handleItemChange(value)}
					renderInput={params => <TextField {...params} label="材料列表" variant="outlined" />}
				/>

				<FuseChipSelect
					className="my-20"
					value={form.cookbookTag.Zh.map(tag => ({
						value: tag,
						label: tag
					}))}
					onChange={value => handleChipChange(value)}
					placeholder="菜谱关键词"
					textFieldProps={{
						label: '关键词',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					isMulti
				/>
			</div>
		);
	}
}

export default BasicInfo_Zh;

import React, { useState, useEffect } from 'react';

// packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, TextField, MenuItem, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { Autocomplete } from '@material-ui/lab';

function AnnouncementForm(props) {
	const { data, setAlert, history } = props;
	const { id } = useParams();

	const [form, setForm] = useState({ Zh: '', En: '' });
	const [target, setTarget] = useState('');
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState({});

	const [products, setProducts] = useState();
	const [mainCat, setMainCat] = useState();
	const [subCat, setSubCat] = useState();
	const [recipeCat, setRecipeCat] = useState();
	const [recipes, setRecipes] = useState();

	useEffect(() => {
		getProducts();
		getMainCats();
		getSubCats();
		getRecipeCats();
		getRecipes();
		if (id !== 'new') {
			setForm({ Zh: data.componentContent.Zh[id].text, En: data.componentContent.En[id].text });
			setTarget(data.componentContent.Zh[id].target);
			setSelected(data.componentContent.Zh[id]);
		}
	}, []);

	const getProducts = async () => {
		const { data } = await axios.post('/itemModule.php', { isGetAdmin: 1 });
		const result = data.data.map(product => {
			return product.Zh;
		});
		setProducts(result);
	};

	const getMainCats = async () => {
		const query = { isGet: 1, language: 'Zh', categoryType: 0 };
		const result = await axios.post('/categoryModule.php', query);
		const data = result.data.data.filter(category => category.categoryParentId === '');
		setMainCat(data);
	};

	const getSubCats = async () => {
		const result = await axios.post('/categoryModule.php', { isGet: 1, categoryType: 0, language: 'Zh' });
		const data = result.data.data.filter(category => category.categoryParentId !== '');
		setSubCat(data);
	};

	const getRecipeCats = async () => {
		const query = { isGet: 1, categoryType: 1, language: 'Zh' };
		const { data } = await axios.post('/categoryModule.php', query);
		setRecipeCat(data.data);
	};

	const getRecipes = async () => {
		const { data } = await axios.post('/cookbookModule.php', { isGetAdmin: 1 });
		const recipes = data.data.map(recipe => {
			return recipe.Zh;
		});
		setRecipes(recipes);
	};

	const handleChange = value => {
		if (!value) {
			setSelected();
			return;
		} else {
			if (target === 'product') {
				const { itemNumber, itemTitle } = value;
				setSelected({ itemNumber, itemTitle });
				return;
			}
			if (target === 'recipe') {
				const { cookbookNumber, cookbookTitle } = value;
				setSelected({ cookbookNumber, cookbookTitle });
				return;
			}
			const { categoryNumber, categoryTitle } = value;
			setSelected({ categoryNumber, categoryTitle });
			return;
		}
	};

	const canSubmit = () => {
		if (id === 'new') {
			return form.Zh !== '' && form.En !== '' && selected !== undefined;
		} else {
			return form.Zh !== '' && form.En !== '';
		}
	};

	const handleSave = async () => {
		const temp = { ...data };
		if (!temp.componentContent || temp.componentContent.length === 0) {
			temp.componentContent = { Zh: [], En: [] };
		}
		if (id === 'new') {
			temp.componentContent.Zh.push({ target, text: form.Zh, ...selected });
			temp.componentContent.En.push({ target, text: form.En, ...selected });
		}
		temp.componentContent.Zh[id] = { target, text: form.Zh, ...selected }
		temp.componentContent.En[id] = { target, text: form.En, ...selected }
		console.log(temp);
		setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result.data.message === 'success') {
			setAlert({ show: true, message: id === 'new' ? '新增广播信息成功！' : '广播信息保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/homepage/annoucements`);
			}, 2000);
		}
	};

	if (!form || loading || !products || !mainCat || !subCat || !recipeCat || !recipes) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<TextField
					className="mt-8 mb-16"
					label="中文广播信息"
					id="Zh"
					name="Zh"
					value={form.Zh}
					onChange={event => setForm({ ...form, Zh: event.target.value })}
					variant="outlined"
					fullWidth
					multiline
				/>

				<TextField
					className="mt-8 mb-16"
					label="英文广播信息"
					id="En"
					name="En"
					value={form.En}
					onChange={event => setForm({ ...form, En: event.target.value })}
					variant="outlined"
					fullWidth
					multiline
				/>

				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">
						内部链接：
						{id === 'new' ? '': data.componentContent.Zh.length !== 0 && data.componentContent.Zh[id].target === 'product'
							? data.componentContent.Zh[id].itemTitle
							: data.componentContent.Zh[id].target === 'recipe'
							? data.componentContent.Zh[id].cookbookTitle
							: data.componentContent.Zh[id].categoryTitle}
					</span>
				</Typography>

				<TextField
					className="flex ml-10 mr-10"
					id="target"
					name="target"
					value={target}
					onChange={event => setTarget(event.target.value)}
					variant="outlined"
					style={{ width: 300 }}
					select
				>
					<MenuItem value={'product'}>商品</MenuItem>
					<MenuItem value={'productMain'}>商品一级分类</MenuItem>
					<MenuItem value={'productSub'}>商品二级分类</MenuItem>
					<MenuItem value={'recipe'}>菜谱</MenuItem>
					<MenuItem value={'recipeCat'}>菜谱分类</MenuItem>
				</TextField>

				{target === 'product' && (
					<Autocomplete
						id="product"
						options={products}
						fullWidth
						getOptionLabel={option => option.itemTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择商品" variant="outlined" />}
					/>
				)}
				{target === 'productMain' && (
					<Autocomplete
						id="productMain"
						options={mainCat}
						fullWidth
						getOptionLabel={option => option.categoryTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择商品一级分类" variant="outlined" />}
					/>
				)}
				{target === 'productSub' && (
					<Autocomplete
						id="productSub"
						options={subCat}
						fullWidth
						getOptionLabel={option => option.categoryTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择商品二级分类" variant="outlined" />}
					/>
				)}
				{target === 'recipe' && (
					<Autocomplete
						id="recipe"
						options={recipes}
						fullWidth
						getOptionLabel={option => option.cookbookTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择菜谱" variant="outlined" />}
					/>
				)}
				{target === 'recipeCat' && (
					<Autocomplete
						id="recipeCat"
						options={recipeCat}
						fullWidth
						getOptionLabel={option => option.categoryTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择菜谱分类" variant="outlined" />}
					/>
				)}

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						className="whitespace-no-wrap normal-case mt-10"
						variant="contained"
						color="secondary"
						disabled={!canSubmit()}
						onClick={handleSave}
					>
						保存
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

export default AnnouncementForm;

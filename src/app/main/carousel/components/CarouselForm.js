import React, { useState, useEffect } from 'react';
// packages
import _ from 'lodash';
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, Icon, TextField, MenuItem, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { Autocomplete } from '@material-ui/lab';
// styles
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	imageContainer: {
		width: 250,
		padding: 10
	},
	imagePreview: {
		width: '100%',
		// height: 150,
		resize: 'contain'
	},
	deleteImageIcon: {
		position: 'absolute',
		color: red[500],
		top: -8,
		right: -8
	}
}));

function CarouselForm(props) {
	const { data, setAlert, history } = props;
	const classes = useStyles(props);
	const { id } = useParams();

	const [newCarousel, setNewCarousel] = useState({ Zh: '', En: '' });
	const [target, setTarget] = useState('');
	const [selected, setSelected] = useState();
	const [loading, setLoading] = useState(false);

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
			setNewCarousel({Zh: data.componentContent.Zh[id].uri, En: data.componentContent.En[id].uri});
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
		const result = await axios.post('/categoryModule.php', { isGet: '1', categoryType: '0', language: 'Zh' });
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

	const handleImageUpload = async event => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}
		const name = event.target.name;
		const formData = new FormData();
		formData.append('uploadImages', file);
		formData.append('isUploadImage', '1');
		const result = await axios.post('/imageModule.php', formData);
		const imageURL = result.data.data[0];
		setNewCarousel(_.set({ ...newCarousel }, name, imageURL));
	};

	const handleImageDelete = async (url, language) => {
		const query = {
			deleteImages: [url]
		};
		const { data } = await axios.post('/imageModule.php', query);
		if (data.message === 'success') {
			setNewCarousel(_.set({ ...newCarousel }, language, ''));
		}
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
		return selected !== undefined && newCarousel !== undefined && newCarousel.Zh !== '' && newCarousel.En !== '';
	};

	const handleSave = async () => {
		const temp = { ...data };
		if (!temp.componentContent || temp.componentContent.length === 0) {
			temp.componentContent = { Zh: [], En: [] };
		}
		if (id === 'new') {
			temp.componentContent.Zh.push({ target: target, uri: newCarousel.Zh, ...selected });
			temp.componentContent.En.push({ target: target, uri: newCarousel.En, ...selected });
		}else{
			temp.componentContent.Zh.splice(id, 1, { ...selected, target: target, uri: newCarousel.Zh });
			temp.componentContent.En.splice(id, 1, { ...selected, target: target, uri: newCarousel.En });
		}
		setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setAlert({ show: true, message: id === 'new' ? '新增轮播图广告成功！':'轮播图修改成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/homepage/carousels`);
			}, 2000);
		}
	};

	if (!products || !mainCat || !subCat || !recipeCat || !recipes || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">上传轮播图图片(图片规格 1170*600)</span>
				</Typography>
				{newCarousel.Zh === '' ? (
					<label
						htmlFor="button-file"
						className="flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
					>
						<span>中文图片</span>
						<input
							accept="image/*"
							className="hidden"
							id="button-file"
							name="Zh"
							type="file"
							onChange={handleImageUpload}
						/>
						<Icon fontSize="large" color="action">
							cloud_upload
						</Icon>
					</label>
				) : (
					<div
						className={clsx(
							classes.imageContainer,
							'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<div className={classes.deleteIconContainer}>
							<Icon
								className={classes.deleteImageIcon}
								onClick={() => handleImageDelete(newCarousel.Zh, 'Zh')}
							>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={newCarousel.Zh} alt="中文版轮播图图片" />
					</div>
				)}

				{newCarousel.En === '' ? (
					<label
						htmlFor="button-file"
						className="flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
					>
						<span>英文图片</span>
						<input
							accept="image/*"
							className="hidden"
							id="button-file"
							name="En"
							type="file"
							onChange={handleImageUpload}
						/>
						<Icon fontSize="large" color="action">
							cloud_upload
						</Icon>
					</label>
				) : (
					<div
						className={clsx(
							classes.imageContainer,
							'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<div className={classes.deleteIconContainer}>
							<Icon
								className={classes.deleteImageIcon}
								onClick={() => handleImageDelete(newCarousel.En, 'En')}
							>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={newCarousel.En} alt="英文版轮播图图片" />
					</div>
				)}

				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">内部链接：</span>
						{id === 'new' ? '': data.componentContent.Zh[id].target === 'product'
							? data.componentContent.Zh[id].itemTitle
							: data.componentContent.Zh[id].target === 'recipe'
							? data.componentContent.Zh[id].cookbookTitle
							: data.componentContent.Zh[id].categoryTitle}
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

export default CarouselForm;

import React, { useState, useEffect } from 'react';
// packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
import _ from '@lodash';
// components
import { Button, Icon, TextField, MenuItem, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
//styles
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
		resize: 'contain'
	},
	deleteImageIcon: {
		position: 'absolute',
		top: -8,
		right: -8,
		color: red[500]
	}
}));

function SectionAdForm(props) {
	const { data, setAlert, history } = props;
	const classes = useStyles(props);
	const { id } = useParams();

	const [newAd, setNewAd] = useState({ Zh: '', En: '' });
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
			setNewAd({ Zh: data.componentContent.Zh[id].uri, En: data.componentContent.En[id].uri });
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
		setNewAd(_.set({ ...newAd }, name, imageURL));
	};

	const handleImageDelete = async (url, language) => {
		const query = {
			deleteImages: [url]
		};
		const { data } = await axios.post('/imageModule.php', query);
		if (data.message === 'success') {
			setNewAd(_.set({ ...newAd }, language, ''));
		}
	};

	const handleChange = value => {
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
	};

	const canSubmit = () => {
		return selected !== undefined && newAd.Zh !== '' && newAd.En !== '';
	};

	const handleSave = async () => {
		const temp = { ...data };
		if (!temp.componentContent || temp.componentContent.length === 0) {
			temp.componentContent = { Zh: [], En: [] };
		}
		if (id === 'new') {
			temp.componentContent.Zh.push({ target: target, uri: newAd.Zh, ...selected });
			temp.componentContent.En.push({ target: target, uri: newAd.En, ...selected });
		}else{
			temp.componentContent.Zh.splice(id, 1, { ...selected, target: target, uri: newAd.Zh });
			temp.componentContent.En.splice(id, 1, { ...selected, target: target, uri: newAd.En });
		}
		setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setAlert({ show: true, message: id === 'new' ? '新增广告成功！' : '广告信息保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/homepage/sectionadvertisements`);
			}, 2000);
		}
	};

	if (!products || !mainCat || !subCat || !recipeCat || !recipes || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">上传广告图片 (图片规格 1170*450)</span>
				</Typography>
				{newAd.Zh === '' ? (
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
						<div>
							<Icon className={classes.deleteImageIcon} onClick={() => handleImageDelete(newAd.Zh, 'Zh')}>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={newAd.Zh} alt="recipeAd_zh" />
					</div>
				)}

				{newAd.En === '' ? (
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
						<div>
							<Icon className={classes.deleteImageIcon} onClick={() => handleImageDelete(newAd.En, 'En')}>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={newAd.En} alt="recipeAd_en" />
					</div>
				)}

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
						id="productSub"
						options={subCat}
						fullWidth
						getOptionLabel={option => option.categoryTitle}
						value={selected}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择菜谱分类" variant="outlined" />}
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

export default SectionAdForm;

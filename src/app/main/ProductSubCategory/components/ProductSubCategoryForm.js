import React, { useState, useEffect } from 'react';
//packages
import { useParams } from 'react-router-dom';
import _ from '@lodash';
import axios from '../../../../global/axios';
//components
import { Autocomplete } from '@material-ui/lab';
//styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Icon, TextField, Typography } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';

const useStyles = makeStyles(theme => ({
	imageContainer: {
		width: 130,
		height: 130,
		padding: 10
	},
	imagePreview: {
		width: '100%',
		// height: 110,
		resize: 'contain'
	},
	deleteImageIcon: {
		position: 'absolute',
		top: -8,
		right: -8,
		color: red[500]
	}
}));

const ProductCategoryForm = props => {
	const { form, setForm } = props;
	const classes = useStyles(props);
	const { categoryNumber } = useParams();
	const [loading, setLoading] = useState(false);
	const [mainCats, setMainCats] = useState();

	useEffect(() => {
		getMainCats();
	}, []);

	const getMainCats = async () => {
		const query = { isGet: 1, language: 'Zh', categoryType: 0 };
		const { data } = await axios.post('/categoryModule.php', query);
		const result = data.data.filter(category => category.categoryParentId === '');
		setMainCats(result);
	};

	const handleImageUpload = async event => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}
		const formData = new FormData();
		formData.append('uploadImages', file);
		formData.append('isUploadImage', '1');
		setLoading(true);
		const result = await axios.post('/imageModule.php', formData);
		const imageURL = result.data.data[0];
		setForm({ ...form, categoryImages: imageURL });
		setLoading(false);
	};

	const handleImageDelete = async img => {
		const query = {
			deleteImages: [img]
		};
		const result = await axios.post('/imageModule.php', query);
		if (result.data.message === 'success') {
			setForm(_.set({ ...form }, `categoryImages`, ''));
		}
	};

	const renderParentCat = (parentId) => {
		return parentId === '' ? null : mainCats.filter( cat => cat.categoryNumber === parentId )[0]
	}

	const handleMainCategoryChange = value => {
		if (!value ) {
			setForm({ ...form, categoryParentId: '' });
		} else {
			setForm({ ...form, categoryParentId: value.categoryNumber });
		}
	};

	if (!form || !mainCats || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full pt-10">
				<TextField
					className="flex m-20"
					error={form.categoryTitle.Zh === ''}
					label="分类中文名称"
					id="categoryTitle"
					name="categoryTitle"
					value={form.categoryTitle.Zh}
					onChange={event =>
						setForm({ ...form, categoryTitle: { ...form.categoryTitle, Zh: event.target.value } })
					}
					variant="outlined"
					style={{ width: 300 }}
				/>

				<TextField
					className="flex m-20"
					error={form.categoryTitle.En === ''}
					label="分类英文名称"
					id="categoryTitle"
					name="categoryTitle"
					value={form.categoryTitle.En}
					onChange={event =>
						setForm({ ...form, categoryTitle: { ...form.categoryTitle, En: event.target.value } })
					}
					variant="outlined"
					style={{ width: 300 }}
				/>

				<Autocomplete
					id="productMain"
					options={mainCats}
					value={renderParentCat(form.categoryParentId)}
					getOptionLabel={option => {
						return !option ? '': option.categoryTitle
					}}
					style={{ width: 300, margin: 20 }}
					onChange={(event, value) => handleMainCategoryChange(value)}
					renderInput={params => <TextField {...params} label="请选择商品一级分类" variant="outlined" />}
				/>

				{form.categoryImages !== '' ? (
					<div
						className={clsx(
							classes.imageContainer,
							'flex items-center justify-center relative rounded-8 mx-20 mb-16 pb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<div>
							<Icon
								className={classes.deleteImageIcon}
								onClick={() => handleImageDelete(form.categoryImages)}
							>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={form.categoryImages} alt="商品二级分类图标" />
					</div>
				) : (
					<label
						htmlFor="button-file"
						className="flex items-center justify-center relative w-128 h-128 rounded-8 mx-20 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
					>
						<span>分类图标</span>
						<input
							accept="image/*"
							className="hidden"
							id="button-file"
							type="file"
							onChange={handleImageUpload}
						/>
						<Icon fontSize="large" color="action">
							cloud_upload
						</Icon>
					</label>
				)}
			</div>
		);
	}
};

export default ProductCategoryForm;

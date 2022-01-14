import React, { useState } from 'react';
//packages
import _ from 'lodash';
import axios from '../../../../global/axios';

//components
import { Icon, TextField, Typography } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';

//styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	imageContainer: {
		width: 130,
		height: 125,
		padding: 10
	},
	imagePreview: {
		width: '100%',
		// height: 150,
		resize: 'contain'
	},
	deleteImageIcon: {
		position: 'absolute',
		top: -8,
		right: -8,
		color: red[500]
	}
}));

const RecipeCategoryForm = props => {
	const { form, setForm } = props;
	const classes = useStyles(props);
	const [loading, setLoading] = useState(false);

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

	if (!form || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full pt-10">
				<TextField
					className="flex m-20"
					label="中文名称"
					error={form.categoryTitle.Zh === ''}
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
					label="英文名称"
					error={form.categoryTitle.En === ''}
					id="categoryTitle"
					name="categoryTitle"
					value={form.categoryTitle.En}
					onChange={event =>
						setForm({ ...form, categoryTitle: { ...form.categoryTitle, En: event.target.value } })
					}
					variant="outlined"
					style={{ width: 300 }}
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
						<img className={classes.imagePreview} src={form.categoryImages} alt="菜谱分类图标" />
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

export default RecipeCategoryForm;

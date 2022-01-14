import React, { useState } from 'react';
//packages
import clsx from 'clsx';
import _ from '@lodash';
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Icon } from '@material-ui/core';

//styles
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
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar,': {
				opacity: 0.8
			},
			'& $deleteImageIcon,': {
				opacity: 1
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

const ImagesUpload = props => {
	const classes = useStyles();
	const { setForm, form } = props;
	const { itemNumber } = useParams();
	const [loading, setLoading] = useState(false);
	// const [images, setImages] = useState([])

	const handleUpload = async e => {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		//先上传再展示
		const formData = new FormData();
		formData.append('uploadImages', file);
		formData.append('isUploadImage', '1');
		setLoading(true);
		const result = await axios.post('/imageModule.php', formData);
		const imageURL = result.data.data[0];
		setLoading(false);
		const imgArray = _.concat([...form.itemImages], imageURL);
		setForm(_.set({ ...form }, `itemImages`, imgArray));
	};

	const handleImageDelete = async img => {
		const query = {
			deleteImages: [img]
		};
		const result = await axios.post('/imageModule.php', query);
		if (result.data.message === 'success') {
			const imgArray = _.pull([...form.itemImages], img);
			setForm(_.set({ ...form }, `itemImages`, imgArray));
		}
	};

	if (loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
				<label
					htmlFor="button-file"
					className={clsx(
						classes.productImageUpload,
						'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
					)}
				>
					<input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUpload} />
					<Icon fontSize="large" color="action">
						cloud_upload
					</Icon>
				</label>
				{form.itemImages.map((img, index) => {
						return (
							<div
								key={`product_images_${index.toString()}`}
								className={clsx(
									classes.imageContainer,
									'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
								)}
							>
								<div>
									<Icon className={classes.deleteImageIcon} onClick={() => handleImageDelete(img)}>
										remove_circle
									</Icon>
								</div>
								<img className={classes.imagePreview} src={img} alt="product_images" />
							</div>
						);
					})}
			</div>
		);
	}
};

export default ImagesUpload;

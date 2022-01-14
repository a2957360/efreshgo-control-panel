import React, { useState } from 'react';
//packages
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import { useParams } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import axios from '../../../../global/axios';
import Geocode from 'react-geocode';
//components
import { Icon, TextField, Typography } from '@material-ui/core';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Google_API_Key = 'AIzaSyDCmwMYRg9mGJDZ_ttRz9LVqaNTwcbtsyw';

Geocode.setApiKey(Google_API_Key);

const useStyles = makeStyles(theme => ({
	storeImage: {
		maxWidth: 180,
		// width: 180,
		padding: 10
	},
	imagePreview: {
		width: 150,
		height: 150,
		borderRadius: 150
	},
	deleteIconContainer: {
		width: 30,
		height: 30,
		backgroundColor: '#FFF'
	},
	deleteImageIcon: {
		position: 'absolute',
		top: -8,
		right: -8,
		color: red[500]
	}
}));

function BranchInfo_Zh(props) {
	const { storeNumber } = useParams();
	const { form, setForm } = props;
	const classes = useStyles(props);

	const handleAddressChange = async ({ label: address }) => {
		const { results } = await Geocode.fromAddress(address);
		const { lat, lng } = results[0].geometry.location;
		setForm({ ...form, storeLocation: { lat, lng }, storeAddress: address });
	};

	const handleImageUpload = async event => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}
		const formData = new FormData();
		formData.append('uploadImages', file);
		formData.append('isUploadImage', '1');
		const result = await axios.post('/imageModule.php', formData);
		const imageURL = result.data.data[0];
		setForm(_.set({ ...form }, `storeImages`, imageURL));
	};

	const handleImageDelete = async img => {
		const query = {
			deleteImages: [img]
		};
		const result = await axios.post('/imageModule.php', query);
		if (result) {
			setForm({ ...form, storeImages: '' });
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		if(name === "storeName_Zh"){
			setForm({...form, storeName: {...form.storeName, Zh: value}})
			return
		}
		if(name === "storeName_En"){
			setForm({...form, storeName: {...form.storeName, En: value}})
			return
		}
		setForm(_.set({ ...form }, name, value));
	};

	return (
		<div>
			<TextField
				className="mt-8 mb-16"
				error={form.storeName.Zh === ''}
				required
				label="门店中文名称"
				autoFocus
				id="storeName"
				name="storeName_Zh"
				value={form.storeName.Zh}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<TextField
				className="mt-8 mb-16"
				error={form.storeName.En === ''}
				required
				label="门店英文名称"
				autoFocus
				id="storeName"
				name="storeName_En"
				value={form.storeName.En}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<TextField
				className="mt-8 mb-16"
				error={form.storePhone === ''}
				required
				placeholder="4168888888"
				label="门店电话"
				id="storePhone"
				name="storePhone"
				value={form.storePhone}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<TextField
				className="mt-8 mb-16"
				error={form.storeEmail === ''}
				required
				placeholder="example@example.ca"
				label="门店电子邮箱"
				id="storeEmail"
				name="storeEmail"
				value={form.storeEmail}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
			<Typography className="text-16 mb-4">{`门店地址: ${form.storeAddress}`}</Typography>

			<GooglePlacesAutocomplete
				apiKey={Google_API_Key}
				minLengthAutocomplete={5}
				debounce={2000}
				onLoadFailed={() => alert('服务器连接错误，请稍后再试')}
				selectProps={{
					// value:form.storeAddress,
					placeholder: '请输入门店地址',
					onChange: value => handleAddressChange(value)
				}}
			/>

			<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
				<span className="mx-4 text-16">门店图标</span>
			</Typography>
			{form.storeImages !== '' ? (
				<div
					className={clsx(
						classes.storeImage,
						'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
					)}
				>
					<div className={classes.deleteIconContainer}>
						<Icon className={classes.deleteImageIcon} onClick={() => handleImageDelete(form.storeImages)}>
							remove_circle
						</Icon>
					</div>
					<img className={classes.imagePreview} src={form.storeImages} alt="门店图标" />
				</div>
			) : (
				<label
					htmlFor="button-file"
					className="flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
				>
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

export default BranchInfo_Zh;

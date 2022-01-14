import React, { useState, useEffect } from 'react';
// packages
import _ from '@lodash';
import axios from '../../../../global/axios';
// components
import { Button, Icon, TextField, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
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
	deleteIconContainer: {
		// position: 'absolute',
		// width: 30,
		// height: 30,
		// backgroundColor: '#000',
		// borderRadius: 15,
		// justifyContent:'center',
		// alignItems: 'center',
	},
	deleteImageIcon: {
		position: 'absolute',
		color: red[500],
		top: -8,
		right: -8
	}
}));

const Google_API_Key = 'AIzaSyDCmwMYRg9mGJDZ_ttRz9LVqaNTwcbtsyw';

function ContactUsForm(props) {
	const { data, setAlert, loadContactUsInfo } = props;
	const classes = useStyles(props);
	const [form, setForm] = useState(); //[]
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		initForm();
	}, [data]);

	const initForm = () => {
		if (!data) {
			return;
		}
		setForm(data[0].infoContent);

		// setForm({...data[0].infoContent, qr:data[0].infoContent.qr == '' ? });
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
		setForm(_.set({ ...form }, 'qr', imageURL));
	};

	const handleImageDelete = async img => {
		const query = {
			deleteImages: [img]
		};
		const result = await axios.post('/imageModule.php', query);
		if (result) {
			setForm(_.set({ ...form }, 'qr', ''));
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setForm(_.set({ ...form }, name, value));
	};

	const handleAddressChange = async ({ label: address }) => {
		setForm({ ...form, address: address });
	};

	const canSubmit = () => {
		return (
			form.phone !== '' &&
			form.phone.match(/^\d{10}$/) &&
			form.email !== '' &&
			form.address !== '' 
			// form.wechat !== '' &&
			// form.qr !== ''
		);
	};

	const handleSave = async () => {
		const temp = { ...data[0], infoContent: form };
		setLoading(true);
		const result = await axios.post('/infoModule.php', temp);
		if (result.data.message === 'success') {
			setAlert({ show: true, message: '联系方式保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				loadContactUsInfo();
				setLoading(false);
			}, 2000);
		}
	};

	if (!form || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">联系电话</span>
				</Typography> */}
				<TextField
					className="my-16"
					error={form.phone === '' || !form.phone.match(/^\d{10}$/)}
					placeholder="4168888888"
					label="联系电话"
					id="phone"
					name="phone"
					value={form.phone}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>

				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">{`联系地址: ${form.address}`}</span>
				</Typography> */}
				<GooglePlacesAutocomplete
					apiKey={Google_API_Key}
					minLengthAutocomplete={5}
					debounce={2000}
					onLoadFailed={() => alert('服务器连接错误，请稍后再试')}
					selectProps={{
						className: 'my-16',
						label: '联系地址',
						defaultInputValue: form.address,
						placeholder: '请输入联系地址',
						onChange: value => handleAddressChange(value)
					}}
				/>

				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">电子邮箱</span>
				</Typography> */}
				<TextField
					className="my-16"
					error={form.email === ''}
					placeholder="example@example.com"
					label="电子邮箱"
					id="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>

				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">客服微信号</span>
				</Typography> */}
				<TextField
					className="my-16"
					error={form.wechat === ''}
					placeholder="微信ID"
					label="客服微信"
					id="wechat"
					name="wechat"
					value={form.wechat}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>

				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">微信客服二维码</span>
				</Typography> */}

				{/* {form.qr === '' ? (
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
				) : (
					<div
						className={clsx(
							classes.imageContainer,
							'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<div className={classes.deleteIconContainer}>
							<Icon className={classes.deleteImageIcon} onClick={handleImageDelete}>
								remove_circle
							</Icon>
						</div>
						<img className={classes.imagePreview} src={form.qr} alt="微信客服二维码" />
					</div>
				)} */}

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						className="whitespace-no-wrap normal-case mt-20"
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

export default ContactUsForm;

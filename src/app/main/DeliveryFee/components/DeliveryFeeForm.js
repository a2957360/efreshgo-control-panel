import React, { useState, useEffect } from 'react';
// packages
import _ from '@lodash';
import axios from '../../../../global/axios';
// components
import { Button, Icon, TextField, Typography, InputAdornment } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
// styles
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		flexDirection: 'row'
	},
	textContainer: {
		display: 'inline-block'
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	timeInput: {
		width: 100
		// margin: 8
	}
}));

function DeliveryFeeForm(props) {
	const { data, setAlert, loadFeeInfo } = props;
	const classes = useStyles(props);
	const [form, setForm] = useState(); 
	const [busyHours, setBusyHours] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		initForm();
	}, [data]);

	const initForm = () => {
		if (!data.infoContent) {
			return;
		}
		setForm(data.infoContent);
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setForm(_.set({ ...form }, name, value));
	};

	const handleAddressChange = async ({ label: address }) => {
		setForm({ ...form, address: address });
	};

	const canSubmit = () => {
		return !_.isEqual(data.infoContent, form)
	};

	const handleSave = async () => {
		const temp = { ...data, infoContent: form };
		console.log(temp);
		setLoading(true);
		const result = await axios.post('/infoModule.php', temp);
		if (result.data.message === 'success') {
			setAlert({ show: true, message: '运费参数设置成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				loadFeeInfo();
				setLoading(false);
			}, 2000);
		}
	};

	if (!form ||loading) { // 
		return <FuseLoading />;
	} else {
		return (
			<div className="flex-col p-16 sm:p-24 max-w-2xl">
				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">最低免运费消费金额</span>
				</Typography>
				<TextField
					className="my-8"
					// error={form.minPrice === ''}
					placeholder="15.00"
					type="number"
					// label="最低免运费消费金额"
					helperText="高于此金额的订单免除运费"
					id="minPrice"
					name="minPrice"
					value={form.minPrice}
					onChange={handleChange}
					variant="outlined"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>
					}}
					fullWidth
					// style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">基础运费</span>
				</Typography>
				<TextField
					className="my-8"
					type="number"
					// error={form.baseDeliveryFee.toString().split('.') === 'string'}
					placeholder="2.99"
					helperText="未达到免运消费金额且配送距离小于基础配送距离按此收取运费"
					id="baseDeliveryFee"
					name="baseDeliveryFee"
					value={form.baseDeliveryFee}
					onChange={handleChange}
					variant="outlined"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>
					}}
					fullWidth
					// style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">基础配送距离</span>
				</Typography>
				<TextField
					className="my-8"
					type="number"
					// error={form.baseDeliveryFee.toString().split('.') === 'string'}
					placeholder="10"
					id="minDistance"
					name="minDistance"
					value={form.minDistance}
					onChange={handleChange}
					variant="outlined"
					InputProps={{
						endAdornment: <InputAdornment position="start">公里</InputAdornment>
					}}
					fullWidth
					// style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">每公里运费</span>
				</Typography>
				<TextField
					className="my-8"
					type="number"
					// error={form.baseDeliveryFee.toString().split('.') === 'string'}
					placeholder="1.50"
					helperText="超出基础配送距离每公里运费"
					id="deliverFee"
					name="deliverFee"
					value={form.deliverFee}
					onChange={handleChange}
					variant="outlined"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
						endAdornment: <InputAdornment position="start">/公里</InputAdornment>
					}}
					fullWidth
					// style={{ width: 300, display: 'block' }}
				/>

				<div className={classes.container}>
					<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
						高峰时段
					</Typography>
					<TextField
						className={classes.timeInput}
						// placeholder="xx:xx 例如: 10:30"
						// label="Hour"
						value={form.busyHour[0]}
						type="time"
						id="busyHour_start"
						onChange={event => {
							const temp = form.busyHour;
							temp[0] = event.target.value;
							setForm({ ...form, busyHour: temp });
						}}
						variant="outlined"
						helperText="高峰时段内订单将收取额外运费"
						style={{ width: 300 }}
					/>

					<div className={clsx(classes.textContainer, 'mt-10 mx-10')}>
						<Typography className="text-16 sm:text-20 truncate">至</Typography>
					</div>

					<TextField
						className={classes.timeInput}
						// placeholder="xx:xx 例如: 10:30"
						// label="Hour"
						type="time"
						id="busyHour_start"
						value={form.busyHour[1]}
						onChange={event => {
							const temp = form.busyHour;
							temp[1] = event.target.value;
							setForm({ ...form, busyHour: temp });
						}}
						variant="outlined"
						style={{ width: 300 }}
					/>
				</div>

				<Typography className="my-20 normal-case flex items-center sm:m-12" role="subtitle1" color="inherit">
					高峰时段加价百分比
				</Typography>

				<TextField
					className="my-20"
					type="number"
					placeholder="30"
					// label="高峰时段加价百分比"
					id="busyHourRate"
					name="busyHourRate"
					value={form.busyHourRate}
					onChange={handleChange}
					variant="outlined"
					style={{ width: 300, display: 'block' }}
					InputProps={{
						endAdornment: <InputAdornment position="start">%</InputAdornment>
					}}
				/>
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

export default DeliveryFeeForm;

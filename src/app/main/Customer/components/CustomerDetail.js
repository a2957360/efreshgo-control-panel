import React, { useState } from 'react';
import { Button, Icon, TextField, Typography, InputAdornment, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import axios from '../../../../global/axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		flexDirection: 'row'
	},
	insurance: {
		width: '100%',
		height: 300,
		resize: 'contain'
	},
	insuranceImageContainer: {
		width: 400,
		padding: 10
	},
	license: {
		width: '100%',
		height: 100,
		resize: 'contain'
	},
	licenseImageContainer: {
		width: 200,
		padding: 10
	}
}));

export default function CustomerDetail(props) {
	const { form, userInfo, getUserData, setForm, setAlert } = props;
	const classes = useStyles(props);
    const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		const query = { isChangeState: 1, userNumber: form.userNumber, userState: form.userState };
		setLoading(true);
		const result = await axios.post('/userModule.php', query);
		if (result.data.message === 'success') {
			setAlert({ show: true, message: '用户状态更新成功' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				getUserData()
				setLoading(false);
			}, 2000);
		}
	};

	if (loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="flex-col p-16 sm:p-24 max-w-2xl">
				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">用户姓名</span>
				</Typography>
				<TextField
					className="my-8"
					id="driverName"
					value={form.userName}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">电话号码</span>
				</Typography>
				<TextField
					className="my-8"
					id="driverName"
					value={form.userPhone}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">电子邮箱</span>
				</Typography>
				<TextField
					className="my-8"
					id="driverName"
					value={form.userEmail}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				{/* <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">骑手车型</span>
				</Typography>
				<TextField
					className="my-8"
					id="driverName"
					value={form.carModle}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">车主信息</span>
				</Typography>
				<div
					className={clsx(
						classes.insuranceImageContainer,
						'flex items-center justify-center relative rounded-8 mx-4 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
					)}
				>
					<img className={classes.insurance} src={form.driverOwnership} alt="骑手车辆保险照片" />
				</div>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">骑手车辆保险</span>
				</Typography>
				<div
					className={clsx(
						classes.insuranceImageContainer,
						'flex items-center justify-center relative rounded-8 mx-4 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
					)}
				>
					<img className={classes.insurance} src={form.driverInsurance} alt="骑手车辆保险照片" />
				</div>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">骑手驾照信息</span>
				</Typography>
				<div className="flex flex-row">
					<div
						className={clsx(
							classes.licenseImageContainer,
							'flex items-center justify-center relative rounded-8 mx-4 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<img className={classes.license} src={form.driverLicenceFont} alt="骑手驾照正面" />
					</div>
					<div
						className={clsx(
							classes.licenseImageContainer,
							'flex items-center justify-center relative rounded-8 mx-4 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
						)}
					>
						<img className={classes.license} src={form.driverLicenceBack} alt="骑手驾照背面" />
					</div>
				</div>

				 */}
				 <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">用户状态修改</span>
				</Typography>

				<TextField
					className="flex "
					id="blackList"
					name="blackList"
					value={form.userState}
					onChange={event => setForm({ ...form, userState: event.target.value })}
					variant="outlined"
					style={{ width: 300 }}
					select
				>
					<MenuItem value={'0'}>正常</MenuItem>
					<MenuItem value={'2'}>冻结</MenuItem>
				</TextField>

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						// component={Link}
						// to="/user/customers"
						className="whitespace-no-wrap normal-case mt-20"
						variant="contained"
						color="secondary"
						disabled={userInfo.userState == form.userState}
						onClick={() => handleSave()}
					>
						<span className="flex">修改</span>
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

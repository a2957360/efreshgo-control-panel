import React, { useState, useEffect } from 'react';
import { Button, Icon, TextField, Typography, InputAdornment, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
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

export default function ManagerDetail(props) {
	const { form, history, setForm, setAlert } = props;
	const classes = useStyles(props);
	const { userNumber } = useParams();

	const [loading, setLoading] = useState(false);
	const [stores, setStores] = useState();

	useEffect(() => {
		getManagerStoreDetail();
	}, []);

	const getManagerStoreDetail = async () => {
		const query = { isGetAdmin: '1' };
		const result = await axios.post('/storeModule.php', query);
		const data = result.data.data.filter(branch => branch.Zh.managerUserNumber == userNumber)
        setStores(data)
	};

	// const handleSave = async () => {
	// 	console.log('driver', form);
	// 	const query = { isChangeState: 1, userNumber: form.userNumber, userState: form.userState };
	// 	setLoading(true);
	// 	const result = await axios.post('/userModule.php', query);
	// 	if (result.data.message === 'success') {
	// 		setAlert({ show: true, message: '骑手状态更新成功' });
	// 		setTimeout(() => {
	// 			setLoading(false);
	// 			setAlert({ show: false, message: '' });
	// 			history.push('/user/drivers');
	// 		}, 2000);
	// 	}
	// };

	if (loading || !stores) {
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

                <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">负责门店</span>
				</Typography>
				{stores.map(store => (<TextField
					className="my-8"
					id="storeName"
					value={store.Zh.storeName}
					disabled
                    variant="outlined"
                    key={store.Zh.storeNumber}
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>))}

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

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">管理员审批</span>
				</Typography>

				<TextField
					className="flex ml-10 mr-10"
					id="approval"
					name="approval"
					value={form.userState}
					onChange={event => setForm({ ...form, userState: event.target.value })}
					variant="outlined"
					style={{ width: 300 }}
					select
				>
					<MenuItem value={'0'}>未批准</MenuItem>
					<MenuItem value={'1'}>已批准</MenuItem>
					<MenuItem value={'2'}>黑名单</MenuItem>
					<MenuItem value={'3'}>信息有误/信息不完整</MenuItem>
					<MenuItem value={'4'}>审核未通过</MenuItem>
				</TextField> */}

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						to="/user/managers"
						className="whitespace-no-wrap normal-case mt-20"
						variant="contained"
						color="secondary"
					>
						<span className="flex">返回</span>
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

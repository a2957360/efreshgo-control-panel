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

export default function OrderDetail(props) {
	const { form, history, setForm, setAlert } = props;
	const classes = useStyles(props);
	// const { orderNumber } = useParams();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState()
	// const [stores, setStores] = useState();

	// useEffect(() => {
	// 	getUserData();
    // }, []);
    
    // const getUserData = async () => {
    //     const query = { isGet: 1, userRole: 0 };
    //     const { data } = await axios.post('/userModule.php', query);
    //     const userData = data.data.filter(user => user.userNumber == form.userNumber);
    //     console.log('customer', userData)
    //     if(userData.length === 0){
    //         window.alert('该用户账号已注销')
    //         setTimeout(() => {
    //             props.history.push('/order/orders')
    //         }, 1000)
    //     }else{
    //         setUser(userData[0]);
    //     }
    // };


	// const getManagerStoreDetail = async () => {
	// 	const query = { isGetAdmin: '1' };
	// 	const result = await axios.post('/storeModule.php', query);
	// 	const data = result.data.data.filter(branch => branch.Zh.managerUserNumber == userNumber)
	//     setStores(data)
	// };

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

	if (loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="flex-col p-16 sm:p-24 max-w-2xl">
				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">订单编号</span>
				</Typography>
				<TextField
					className="my-8"
					id="orderNo"
					value={form.orderNo}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">下单时间</span>
				</Typography>
				<TextField
					className="my-8"
					id="orderCreateTime"
					value={form.orderCreateTime}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">预计配送时间</span>
				</Typography>
				<TextField
					className="my-8"
					id="expectDeliverTime"
					value={form.expectDeliverTime}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">订单金额</span>
				</Typography>
				<TextField
					className="my-8"
					id="totalPrice"
					value={form.totalPrice}
					disabled
					variant="outlined"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>
					}}
					// fullWidth
					style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">配送地址</span>
				</Typography>
				<TextField
					className="my-8"
					id="orderAddress"
					value={form.orderAddress}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					fullWidth
					// style={{ width: 600, display: 'block' }}
				/>

				{form.orderState > 2 && (
					<>
						<Typography
							className="m-8 normal-case flex items-center sm:mb-12"
							role="subtitle1"
							color="inherit"
						>
							<span className="text-16">配送方式</span>
						</Typography>
						<TextField
							className="my-8"
							id="deliverType"
							value={form.deliverType == 0 ? '自取' : form.deliverType == 1 ? '骑手配送' : '商家配送'}
							disabled
							variant="outlined"
							// fullWidth
							style={{ width: 300, display: 'block' }}
						/>
                        {form.deliverType !== 0 && 
                        (<>
                        <Typography
							className="m-8 normal-case flex items-center sm:mb-12"
							role="subtitle1"
							color="inherit"
						>
							<span className="text-16">配送人员</span>
						</Typography>
						<TextField
							className="my-8"
							id="driverName"
							value={form.driverName}
							disabled
							variant="outlined"
							// fullWidth
							style={{ display: 'block' }}
                        />
                        <TextField
							className="my-8"
							id="driverPhone"
							value={form.driverPhone}
							disabled
							variant="outlined"
							// fullWidth
							style={{ display: 'block' }}
                        />
                        </>)}
					</>
				)}

                <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">付款方式</span>
				</Typography>
				<TextField
					className="my-8"
					id="paymentType"
					value={form.paymentType}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{display: 'block' }}
				/>

                <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">客户姓名</span>
				</Typography>
				<TextField
					className="my-8"
					id="deliverType"
					value={!form.userName ? '客户未设置用户名': form.userName}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					// fullWidth
					style={{ display: 'block' }}
				/>

                <Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">客户联系电话</span>
				</Typography>
				<TextField
					className="my-8"
					id="userPhone"
					value={!form.userPhone ? '客户未填写联系电话': form.userPhone}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					style={{ display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">订单商品列表</span>
				</Typography>
				{form.itemList.map(item => (<TextField
					className="my-8"
					id="storeName"
					value={`${item.itemTitle} ${item.itemQuantity} X $${item.itemDisplayPrice}`}
					disabled
                    variant="outlined"
                    key={item.itemNumber}
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					fullWidth
					// style={{ display: 'block' }}
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

				<FuseAnimate animation="transition.slideRightIn" delay={300} >
					<Button
						component={Link}
						to="/order/orders"
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

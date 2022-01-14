import React, { useState, useEffect } from 'react';
import { Button, Icon, TextField, Typography, InputAdornment, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import axios from '../../../../global/axios';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		flexDirection: 'row'
	},
	// insurance: {
	// 	width: '100%',
	// 	height: 300,
	// 	resize: 'contain'
	// },
	// insuranceImageContainer: {
	// 	width: 400,
	// 	padding: 10
	// },
	// license: {
	// 	width: '100%',
	// 	height: 100,
	// 	resize: 'contain'
	// },
	// licenseImageContainer: {
	// 	width: 200,
	// 	padding: 10
	// },
	imageContainer: {
		width: 200,
		height: 200,
		padding: 10,
	},
	imagePreview: {
		width: '100%',
		height: '100%',
		resize: 'contain'
	}
}));

export default function RefundDetail(props) {
	const { form, history, setForm, setAlert } = props;
	const classes = useStyles(props);
	const { orderNumber } = useParams();

	const [loading, setLoading] = useState(false);
	const [refundDetail, setRefundDetail] = useState({ refundPrice: 0, approval: '' });
	const [viewImage, setViewImage] = useState({
		photoIndex: 0,
		isOpen: false
	});
	const refundImages = form.refundImage;

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

	const handleRefundApproval = async () => {
		const query = {
			orderNumber,
			refundPrice: refundDetail.refundPrice,
			orderState: refundDetail.approval
			//refundReason: refundDetail.refundReason
		};
		setLoading(true);
		const result = await axios.post('/orderManage.php', query);
		if (result.data.message === 'success') {
			setAlert({ show: true, severity: 'success', message: '退款审批完成' });
			setTimeout(() => {
				setLoading(false);
				setAlert({ show: false, message: '' });
				history.push('/order/refunds');
			}, 2000);
		} else {
			setAlert({ show: true, severity: 'error', message: '服务器发生错误，退款未成功，请稍后再试' });
			setTimeout(() => {
				setLoading(false);
				setAlert({ show: false, message: '' });
				history.push('/order/refunds');
			}, 2000);
		}
	};

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
					// style={{ width: 300, display: 'block' }}
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
					value={form.expectDeliverTimeDisplay}
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

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
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
				{form.deliverType == 1 && (
					<>
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
					style={{ display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">客户姓名</span>
				</Typography>
				<TextField
					className="my-8"
					id="deliverType"
					value={!form.userName ? '客户未设置用户名' : form.userName}
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
					value={!form.userPhone ? '客户未填写联系电话' : form.userPhone}
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
				{form.itemList.map(item => (
					<TextField
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
					/>
				))}

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">退款原因</span>
				</Typography>
				<TextField
					className="my-8"
					id="refundReason"
					value={form.refundReview}
					disabled
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					fullWidth
					multiline
					// style={{ width: 300, display: 'block' }}
				/>

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">附件图片</span>
				</Typography>
				{!form.refundImage || form.refundImage.length == 0 ? (
					<div className="flex flex-1 flex-col justify-center p-12">
						<Typography className="text-16" color="textSecondary">
							客户未上传图片
						</Typography>
					</div>
				) : (
					<div className="flex flex-row">
						{form.refundImage.map((img, index) => (
							<div className="flex justify-center sm:justify-start flex-wrap mx-8">
								<div
									key={`refund_images_${index.toString()}`}
									className={clsx(
										classes.imageContainer,
										'flex items-center justify-center relative rounded-8 mx-8 mb-16 overflow-visible cursor-pointer shadow-1 hover:shadow-5'
									)}
									onClick={() => setViewImage({ isOpen: true, photoIndex: index })}
								>
									<img
										className={classes.imagePreview}
										src={img}
										alt={`refund_images_${index.toString()}`}
									/>
								</div>
							</div>
						))}
						{viewImage.isOpen && (
							<Lightbox
								mainSrc={refundImages[viewImage.photoIndex]}
								nextSrc={refundImages[(viewImage.photoIndex + 1) % refundImages.length]}
								prevSrc={refundImages[(viewImage.photoIndex + refundImages.length - 1) % refundImages.length]}
								onCloseRequest={() => setViewImage({ isOpen: false, photoIndex: 0 })}
								onMovePrevRequest={() =>
									setViewImage({
										...viewImage,
										photoIndex: (viewImage.photoIndex + refundImages.length - 1) % refundImages.length
									})
								}
								onMoveNextRequest={() =>
									setViewImage({
										...viewImage,
										photoIndex: (viewImage.photoIndex + 1) % refundImages.length
									})
								}
							/>
						)}
					</div>
				)}

				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">管理员审批</span>
				</Typography>
				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">退款金额</span>
				</Typography>
				<TextField
					className="my-8"
					id="userPhone"
					value={refundDetail.refundPrice}
					onChange={event => setRefundDetail({ ...refundDetail, refundPrice: event.target.value })}
					variant="outlined"
					// InputProps={{
					//     startAdornment: <InputAdornment position="start">$</InputAdornment>
					// }}
					style={{ display: 'block' }}
				/>
				<Typography className="m-8 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="text-16">审批结果</span>
				</Typography>
				<TextField
					className="flex m-0"
					id="approval"
					name="approval"
					value={refundDetail.approval}
					onChange={event => setRefundDetail({ ...refundDetail, approval: event.target.value })}
					variant="outlined"
					style={{ width: 300 }}
					select
				>
					<MenuItem value={'10'}>退款申请通过</MenuItem>
					<MenuItem value={'11'}>拒绝退款</MenuItem>
				</TextField>

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						// component={Link}
						// to="/order/orders"
						className="whitespace-no-wrap normal-case mt-20"
						variant="contained"
						color="secondary"
						onClick={() => handleRefundApproval()}
						disabled={
							refundDetail.approval == '' ||
							(refundDetail.refundPrice == 0 && refundDetail.approval == '10')
						}
					>
						<span className="flex">提交</span>
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

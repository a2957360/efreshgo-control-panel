import React, { useState } from 'react';
//packages
import axios from '../../../../global/axios';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Tab, Tabs, TextField, MenuItem, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';

function OrderHeader(props) {
	const { form, setAlert, history, setLoading } = props;
	// const { itemNumber } = useParams();

	// const canSubmit = () => {
	// 	const isComplete =
	// 		form.itemTitle.Zh.length > 0 &&
	// 		form.itemTitle.Zh.length > 0 &&
	// 		form.itemCategory.length > 0 &&
	// 		form.itemPrice !== '' &&
	// 		form.itemImages.length > 0;
	// 	return isComplete;
	// };

	// const handleSave = async () => {
	// 	console.log(form)
	// 	setLoading(true);
	// 	const result = await axios.post('/itemModule.php', form);
	// 	if (result.data.message === 'success') {
	// 		setAlert({ show: true, message: itemNumber === 'new' ? '新增商品成功！' : '商品信息修改成功！' });
	// 		setTimeout(() => {
	// 			setAlert({ show: false, message: '' });
	// 			setLoading(false);
	// 			history.push(`/product/products`);
	// 		}, 2000);
	// 	}
	// };

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/order/orders"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">查看订单详情</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					{/* <FuseAnimate animation="transition.expandIn" delay={300}>
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="商品图片"
						/>
					</FuseAnimate> */}
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
                                订单编号: {form.orderNo} 
							</Typography>
						</FuseAnimate>
						{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">订单金额: {form.userNumber}</Typography>
						</FuseAnimate> */}
					</div>
				</div>
			</div>
			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					disabled={!canSubmit()}
					onClick={handleSave}
				>
					{itemNumber === 'new' ? "新增" : "保存"}
				</Button>
			</FuseAnimate> */}
		</div>
	);
}

export default OrderHeader;
 
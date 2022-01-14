import React, { useState } from 'react';
//packages
import { Link, useParams } from 'react-router-dom';
import axios from '../../../../global/axios';

//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography } from '@material-ui/core';

function CouponHeader(props) {
	const { form } = props;
	const { couponNumber } = useParams();

	// const canSubmit = () => {
	// 	const isComplete = form.couponRate.length > 0 && form.couponRequiredPrice.length > 0;
	// 	return isComplete;
	// };

	// const handleSave = async () => {
	// 	setLoading(true)
	// 	const result = await axios.post('/couponModule.php', form);
	// 	setAlert({ show: true, message: couponNumber === 'new' ? '新增优惠券成功！' : '优惠券修改成功！' });
	// 	setTimeout(() => {
	// 		setAlert({ show: false, message: '' });
	// 		setLoading(false)
	// 		history.push(`/coupon/coupons`);
	// 	}, 2000);
	// };

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/coupon/coupons"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">优惠券管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="优惠券"
						/>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								{couponNumber === 'new' ? '新优惠券' : `兑换码: ${form.couponCode}`}
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">优惠券详情</Typography>
						</FuseAnimate>
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
					{couponNumber === 'new' ? '新增':'保存'}
				</Button>
			</FuseAnimate> */}
		</div>
	);
}

export default CouponHeader;

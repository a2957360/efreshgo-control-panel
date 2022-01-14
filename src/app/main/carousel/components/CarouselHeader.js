import React, { useState } from 'react';
//packages
import { Link, useParams } from 'react-router-dom';
import axios from '../../../../global/axios';

//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// import { useDispatch, useSelector } from 'react-redux';
// import { saveProduct } from '../../store/ProductStore/ProductSlice';

function CarouselHeader(props) {
	const { data } = props;
	const { id } = useParams();

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/homepage/carousels"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">轮播图管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="新增轮播图"
						/>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">首页轮播图</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">轮播图详情</Typography>
						</FuseAnimate>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CarouselHeader;

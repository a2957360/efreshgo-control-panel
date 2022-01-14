import React, { useState } from 'react';
//packages
import { Link, useParams } from 'react-router-dom';
//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography } from '@material-ui/core';

function RecommendationHeader(props) {

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/homepage/recommendations"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">热搜词条管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="新增热搜词条"
						/>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">热搜词条</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">热搜词条详情</Typography>
						</FuseAnimate>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecommendationHeader;

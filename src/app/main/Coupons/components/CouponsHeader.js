import React, { useState } from 'react';
//packages
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography, } from '@material-ui/core';
//styles
// import { ThemeProvider } from '@material-ui/core/styles';
// import { setSearchText } from '../../store/ProductStore/ProductsSlice'; // 

function CouponsHeader(props) {
	// const [ searchText, setSearchText ] = useState('')
	// const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						优惠券管理
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				{/* <ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={event => setSearchText(event.target.value)}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider> */}
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/coupon/coupon/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">新增优惠券</span>
					<span className="flex sm:hidden">新增</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default CouponsHeader;

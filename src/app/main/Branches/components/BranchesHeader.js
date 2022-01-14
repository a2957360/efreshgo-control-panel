import React, { useState } from 'react';
//packages

//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Input, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
// import { setSearchText } from '../../store/ProductStore/ProductsSlice'; //

function BranchesHeader(props) {
	const { searchText, setSearchText } = props;
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						门店管理
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
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
				</ThemeProvider>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/branch/branch/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">新增门店</span>
					<span className="flex sm:hidden">新增</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default BranchesHeader;

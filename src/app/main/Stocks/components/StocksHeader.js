import React from 'react';
//packages
import * as qs from 'query-string';
// import axios from '../../../../global/axios';
//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Input, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
// import { setSearchText } from '../../store/ProductStore/ProductsSlice'; //

function StocksHeader(props) {
	const { store, history, searchText, setSearchText } = props;
	const { storeNumber } = qs.parse(props.location.search);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						role="button"
						color="inherit"
						onClick={() => history.push('/stock/stocks')}
					>
						<Icon className="text-32">{!storeNumber ? 'local_offer' : 'arrow_back'}</Icon>
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						{!store ? '' : store.storeName}库存管理
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
			{storeNumber && (
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						to={`/stock/stock?stockId=new&storeNumber=${storeNumber}`}
						className="whitespace-no-wrap normal-case"
						variant="contained"
						color="secondary"
					>
						<span className="hidden sm:flex">新增库存信息</span>
						<span className="flex sm:hidden">新增</span>
					</Button>
				</FuseAnimate>
			)}
		</div>
	);
}

export default StocksHeader;

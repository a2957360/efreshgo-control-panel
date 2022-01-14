import React from 'react';
//packages
import { useSelector } from 'react-redux';
//components
import { Icon, Paper, Typography, TextField, MenuItem, Input } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
//styles
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider } from '@material-ui/core/styles';

// import { setCarouselsSearchText } from '../../store/carouselsSlice';

function OrdersHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const { status, orderState, setOrderState, searchText, setSearchText } = props;

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						订单管理
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="搜索订单"
								className="flex flex-1 mx-8"
								disableUnderline
								style={{ width: 250 }}
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={event => setSearchText(event.target.value)}
							/>
						</Paper>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center max-w-512 px-8 ml-5 py-4 rounded-8" elevation={1}>
							<Icon color="action">filter_list</Icon>

							<TextField
								placeholder="按订单状态搜索"
								className="flex flex-1 mx-8"
								style={{ width: 200 }}
								value={orderState}
								inputProps={{
									'aria-label': 'FilterList'
								}}
								onChange={event => setOrderState(event.target.value)}
								select
							>
								<MenuItem value={'all'}>所有订单</MenuItem>
								{status.map( (state, index) => <MenuItem key={index.toString()} value={index.toString()}>{state}</MenuItem>)}
							</TextField>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default OrdersHeader;

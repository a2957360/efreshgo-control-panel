import React, { useState, useEffect } from 'react';
//packages
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//components
import { Button, Icon, Input, Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AddManagerDialog from '../../Dialog/AddManagerDialog';
//styles
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider } from '@material-ui/core/styles';

// import { setCarouselsSearchText } from '../../store/carouselsSlice';

function DriversHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const { searchText, setSearchText, userState, setUserState, setAlert } = props;
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						骑手管理
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="搜索骑手"
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
								placeholder="按骑手状态筛选"
								className="flex flex-1 mx-8"
								style={{ width: 200 }}
								value={userState}
								inputProps={{
									'aria-label': 'FilterList'
								}}
								onChange={event => setUserState(event.target.value)}
								select
							>
								<MenuItem value={''}>无</MenuItem>
								<MenuItem value={'0'}>未批准</MenuItem>
                                <MenuItem value={'1'}>已批准</MenuItem>
								<MenuItem value={'2'}>黑名单</MenuItem>
								<MenuItem value={'3'}>未提交信息</MenuItem>
                                <MenuItem value={'4'}>审核未通过</MenuItem>
							</TextField>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					// component={Link}
					// to="/user/manager/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					onClick={() => setOpenDialog(true)}
				>
					<span className="hidden sm:flex">新增管理员</span>
					<span className="flex sm:hidden">新增</span>
				</Button>
			</FuseAnimate> */}
			{true && <AddManagerDialog open={openDialog} setOpen={setOpenDialog} setAlert={setAlert} />}
		</div>
	);
}

export default DriversHeader;

import React, { useState, useEffect } from 'react';
//packages
import { Link } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import axios from '../../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TableRow, TablePagination, Button, Typography } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import CustomersTableHeader from './CustomersTableHeader';

const CustomersTable = props => {
	const { data, searchText, setAlert, loadCustomers } = props;

	const [displayData, setDisplayData] = useState();
	const [loading, setLoading] = useState(false);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		if (searchText.length !== 0) {
			setDisplayData(FuseUtils.filterArrayByString(data, searchText));
			setPage(0);
		} else {
			setDisplayData(data);
		}
	}, [searchText]);

	useEffect(() => {
		sliceUserData();
	}, [data, page, rowsPerPage]);

	const sliceUserData = () => {
		if (data.length === 0) {
			setDisplayData([]);
			return;
		}
		setDisplayData(
			data.slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage > data.length ? data.length : (page + 1) * rowsPerPage
			)
		);
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	if (!displayData || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<CustomersTableHeader />
						{displayData.length == 0 ? (
							<div className="flex flex-1 flex-col items-center justify-center p-12">
								<Typography className="text-20 mb-16" color="textSecondary">
									未找到用户信息
								</Typography>
							</div>
						) : (
							<TableBody>
								{displayData.map((user, index) => {
									return (
										<TableRow key={index.toString()}>
											<TableCell align="center">{user.userNumber}</TableCell>
											<TableCell align="center">{user.userName}</TableCell>
											<TableCell align="center">{user.userPhone}</TableCell>
											<TableCell align="center">{user.userEmail}</TableCell>
											<TableCell align="center">{user.userState == '0' ? '正常':'冻结'}</TableCell>
											<TableCell align="center">
												<Button
													component={Link}
													to={`/user/customer/${user.userNumber}`}
													className="whitespace-no-wrap normal-case"
													variant="contained"
													color="secondary"
												>
													<span className="hidden sm:flex">查看</span>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						)}
					</Table>
				</FuseScrollbars>
				<TablePagination
					className="overflow-hidden flex-shrink-0"
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		);
	}
};

export default CustomersTable;

import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
//packages
import axios from '../../../../global/axios';

// components
import { Button, Table, TableBody, TableRow, TableCell, Checkbox, TablePagination } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
// import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import CouponsTableHeader from './CouponsTableHeader';

// redux

const CouponsTable = props => {
	const { data, getCouponData, setAlert } = props

	const [couponData, setCouponData] = useState();
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [loading, setLoading] = useState(false)
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		sliceCouponData()
	}, [data, page, rowsPerPage])

	const sliceCouponData = () => {
		if (!data) {
			return;
		}
		const slice_data = data.slice(
			page * rowsPerPage,
			(page + 1) * rowsPerPage > data.length ? data.length : (page + 1) * rowsPerPage
		);
		setCouponData(slice_data);
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			// 全选当前页所有记录
			setSelected(couponData.map( coupon => coupon.couponNumber));
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
        const query = { isDelete: 1, couponNumber: selected };
		setLoading(true)
		const result = await axios.post('/couponModule.php', query);
		if (result) {
			setAlert({show: true, message:'优惠券删除成功！'})
			getCouponData();
			setSelected([]);
			setTimeout(() => {
				setAlert({show: false, message:''})
				setLoading(false)
			}, 1000)			
		}
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	function toggleCheck(event, coupon) {
		const selectedIndex = selected.findIndex(num => num === coupon.couponNumber);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, coupon.couponNumber);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	if (!couponData || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<CouponsTableHeader
							numSelected={selected.length}
							rowCount={couponData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{couponData.map(coupon => {
								const isSelected =
									selected.findIndex(num => num === coupon.couponNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={coupon.couponNumber}
										selected={isSelected}
										onClick={event => toggleCheck(event, coupon)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, coupon)}
											/>
										</TableCell>
										<TableCell align="center">{coupon.couponRequiredPrice}</TableCell>
										<TableCell align="center">
											{coupon.couponType == 0 ? '固定价格' : '百分比'}
										</TableCell>
										<TableCell align="center">{coupon.couponRate}</TableCell>
										<TableCell align="center">{coupon.couponStartDate}</TableCell>
										<TableCell align="center">{coupon.couponEndDate}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/coupon/coupon/${coupon.couponNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看/修改</span>
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
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

export default withRouter(CouponsTable);

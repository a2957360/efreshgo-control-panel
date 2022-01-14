import React, { useState, useEffect } from 'react';
//packages
import { Link } from 'react-router-dom';
import _ from '@lodash';
// import FuseUtils from '@fuse/utils';
import axios from '../../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TableRow, Button, Typography } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import ProfitReportTableHeader from './ProfitReportTableHeader';

const ProfitReportTable = props => {
	const { start, end, setAlert, storeNumber, data } = props;
	const [displayData, setDisplayData] = useState();
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		filterData();
	}, [storeNumber, start, end]);

	const filterData = () => {
		if (storeNumber === 0) {
			//全部门店
			setDisplayData(data);
		} else {
			//指定门店
			setDisplayData(data.filter(record => record.storeNumber == storeNumber));
		}
	};

	const sortingData = (rowId) => {
		let sorted = displayData
		if(rowId === 'orderTime'){
			if(order.direction === 'asc'){
				sorted = _.sortBy(displayData,['createTime'])
			}else{
				_.reverse(sorted)
			}
		}
		if(rowId === 'orderNumber'){
			if(order.direction === 'asc'){
				sorted = _.sortBy(displayData,['orderNo'])
			}else{
				_.reverse(sorted)
			}
		}
		setOrder({ direction: order.direction == 'asc' ? 'desc':'asc', id: rowId })
		setDisplayData(sorted)
	}

	if (!displayData) {
		return <FuseLoading />;
	} else if (displayData.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					今天尚无订单
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<ProfitReportTableHeader
							order={order}
							sortingData={sortingData}
						/>
						<TableBody>
							{displayData.map((record, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{record.createTime}</TableCell>
										<TableCell align="center">{record.orderNo}</TableCell>
										<TableCell align="center">${record.itemPrice}</TableCell>
										<TableCell align="center">${record.deliverPrice}</TableCell>
										<TableCell align="center">
											{record.deliverType == 0
												? '自取'
												: record.deliverType == 1
												? '骑手配送'
												: '商家配送'}
										</TableCell>
										<TableCell align="center">{record.driverNumber == 0 ? '无':record.driverNumber}</TableCell>
										<TableCell align="center">{record.driverIncome}</TableCell>
										<TableCell align="center">${(record.itemPrice*12.75/100).toFixed(2)}</TableCell>
										<TableCell align="center">${record.deliverType == 2 ? 2.99:0}</TableCell>
										<TableCell align="center">${record.deliverType == 2 ? (record.itemPrice*12.75/100+2.99).toFixed(2):(record.itemPrice*12.75/100).toFixed(2)}</TableCell>
										{/* <TableCell align="center">{manager.storeName}</TableCell>
										<TableCell align="center">{userStates[manager.userState]}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/user/manager/${manager.userNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看</span>
											</Button>
										</TableCell> */}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
			</div>
		);
	}
};

export default ProfitReportTable;

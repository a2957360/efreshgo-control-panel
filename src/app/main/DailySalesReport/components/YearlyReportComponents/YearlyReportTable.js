import React, { useState, useEffect } from 'react';
//packages
import { Link } from 'react-router-dom';
import _ from '@lodash';
// import FuseUtils from '@fuse/utils';
import axios from '../../../../../global/axios';
import moment from 'moment';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TableRow, Button, Typography, TextField, MenuItem } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import YearlyReportTableHeader from './YearlyReportTableHeader';

// const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const YearlyReportTable = props => {
	const { data, storeNumber } = props;
	const [displayData, setDisplayData] = useState([]);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		filterDataByStore();
	}, [storeNumber]);

	const filterDataByStore = () => {
		if (storeNumber === 0) {
			const { sumData } = data;
			setDisplayData(sumData);
		} else {
			const { storeData } = data;
			setDisplayData(storeData.filter(record => record.storeNumber === storeNumber));
		}
	};

	const checkNull = (element, index, array) => {
		return element.efreshgoNo === null;
	};

	const sortingData = rowId => {
		let sorted = displayData;
		if (order.direction === 'asc') {
			// if ((rowId == 'SKU' && displayData.some(checkNull)) || rowId == 'itemNumber') {
			// 	sorted = _.sortBy(displayData, ['itemNumber']);
			// } else {
			// 	sorted = _.sortBy(displayData, ['efreshgoNo']);
			// }
			sorted = _.sortBy(displayData, [`${rowId}`]);
		} else {
			_.reverse(sorted);
		}
		setDisplayData(sorted);
		setOrder({ direction: order.direction == 'asc' ? 'desc' : 'asc', id: rowId });
	};

	if (displayData.length == 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					无报表信息
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<YearlyReportTableHeader sortingData={sortingData} order={order} />
						<TableBody>
							{displayData.map((record, index) => {
								console.log(record)
								let total = 0;
								for (let i = 1; i < 13; i++) {
									total += !record[i] ? 0 : record[i].totalPrice;
								}
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{record.itemNumber}</TableCell>
										<TableCell align="center">
											{!record.efreshgoNo ? '未添加商品编号' : record.efreshgoNo}
										</TableCell>
										<TableCell align="center">{record.itemName}</TableCell>
										<TableCell align="center">$ {record.itemPrice}</TableCell>
										<TableCell align="center">
											{!record[1] ? 0 : `$ ${record[1].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[2] ? 0 : `$ ${record[2].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[3] ? 0 : `$ ${record[3].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[4] ? 0 : `$ ${record[4].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[5] ? 0 : `$ ${record[5].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[6] ? 0 : `$ ${record[6].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[7] ? 0 : `$ ${record[7].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[8] ? 0 : `$ ${record[8].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[9] ? 0 : `$ ${record[9].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[10] ? 0 : `$ ${record[10].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[11] ? 0 : `$ ${record[11].totalPrice}`}
										</TableCell>
										<TableCell align="center">
											{!record[12] ? 0 : `$ ${record[12].totalPrice}`}
										</TableCell>
										<TableCell align="center">$ {total}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
			</div>
		);
	}

	return (
		<div>
			<span>123</span>
		</div>
	);
};

export default YearlyReportTable;

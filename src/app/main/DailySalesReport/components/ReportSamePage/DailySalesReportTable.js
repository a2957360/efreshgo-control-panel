import React, { useState, useEffect } from 'react';
//packages
import { Link } from 'react-router-dom';
import _ from '@lodash';
// import FuseUtils from '@fuse/utils';
import axios from '../../../../global/axios';
import moment from 'moment';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TableRow, Button, Typography, TextField, MenuItem } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import DailySalesReportTableHeader from './DailySalesReportTableHeader';

const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const DailySalesReportTable = props => {
	const { reportType, setReportType, data, displayData, setDisplayData, handleSubmit } = props;
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	// const [loading, setLoading] = useState()

	const sortingData = (rowId) => {
		let sorted = displayData
		if(order.direction === 'asc'){ 
			sorted = _.sortBy(displayData,['itemNumber'])
		}else{
			_.reverse(sorted)
		}
		setDisplayData(sorted)
		setOrder({ direction: order.direction == 'asc' ? 'desc':'asc', id: rowId })
	}

	if (
		!data ||
		!displayData ||
		!reportType.type ||
		(!reportType.year && !reportType.month && (!reportType.startDate || !reportType.endDate))
	) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				{/* <Typography className="text-20 mb-16" color="textSecondary">
					选择报表类型
				</Typography> */}
				<TextField
					className="mt-8 mb-16"
					label="请选择报表类型"
					id="reportType"
					name="reportType"
					value={reportType.type}
					onChange={event => setReportType({ ...reportType, type: event.target.value })}
					variant="outlined"
					select
					style={{ width: 300 }}
				>
					<MenuItem value={'daily'}>日报表</MenuItem>
					<MenuItem value={'month'}>月报表</MenuItem>
					<MenuItem value={'year'}>年报表</MenuItem>
				</TextField>
				{/* 日报表时间 */}
				{reportType.type == 'daily' && (
					<div>
						<TextField
							id="startDate"
							name="startDate"
							label="报表起始日期"
							value={reportType.startDate}
							type="date"
							onChange={event => setReportType({ ...reportType, startDate: event.target.value })}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							style={{ marginTop: 20 }}
						/>
						<TextField
							id="endDate"
							name="endDate"
							label="报表起始日期"
							value={reportType.endDate}
							type="date"
							onChange={event => setReportType({ ...reportType, endDate: event.target.value })}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							style={{ marginTop: 20 }}
						/>
					</div>
				)}
				{/* 月报表月份 */}
				{reportType.type == 'month' && (
					<div>
						<div>
							<TextField
								className="mt-8 mb-16"
								label="请选择报表月份"
								id="reportMonth"
								name="reportMonth"
								value={reportType.month}
								onChange={event => setReportType({ ...reportType, month: event.target.value })}
								variant="outlined"
								style={{ width: 300 }}
								select
							>
								{months.map((month, index) => (
									<MenuItem key={index} value={index + 1}>
										{month}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div>
							<TextField
								className="mt-8 mb-16"
								label="请选择报表年份"
								id="reportType"
								name="reportType"
								value={reportType.year}
								onChange={event => setReportType({ ...reportType, year: event.target.value })}
								variant="outlined"
								style={{ width: 300 }}
								select
							>
								{Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (v, i) => 2020 + i).map(
									(year, index) => (
										<MenuItem key={index} value={year}>
											{year}
										</MenuItem>
									)
								)}
							</TextField>
						</div>
					</div>
				)}
				{/* 年报表年份 */}
				{reportType.type == 'year' && (
					<TextField
						className="mt-8 mb-16"
						label="请选择报表年份"
						id="reportType"
						name="reportType"
						value={reportType.year}
						onChange={event => setReportType({ ...reportType, year: event.target.value })}
						variant="outlined"
						style={{ width: 300 }}
						select
					>
						{Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (v, i) => 2020 + i).map(
							(year, index) => (
								<MenuItem key={index} value={year}>
									{year}
								</MenuItem>
							)
						)}
					</TextField>
				)}

				<Button
					className="whitespace-no-wrap normal-case mt-40"
					variant="contained"
					color="secondary"
					onClick={() => handleSubmit()}
					// disabled="true"
				>
					<span className="hidden sm:flex">查询</span>
				</Button>
			</div>
		);
	}

	if (displayData.length == 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					无报表信息
				</Typography>
			</div>
		);
	}

	if(reportType.type == 'year'){
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<DailySalesReportTableHeader sortingData={sortingData} order={order} reportType={reportType} />
						<TableBody>
							{displayData.map((record, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{record.itemNumber}</TableCell>
										<TableCell align="center">
											{!record.efreshgoNo ? '未添加商品编号' : record.efreshgoNo}
										</TableCell>
										<TableCell align="center">{record.itemName}</TableCell>
										<TableCell align="center">{record.itemQuantity}</TableCell>
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
	if(reportType.type == 'month'){
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<DailySalesReportTableHeader sortingData={sortingData} order={order} reportType={reportType} />
						<TableBody>
							{displayData.map((record, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{record.itemNumber}</TableCell>
										<TableCell align="center">
											{!record.efreshgoNo ? '未添加商品编号' : record.efreshgoNo}
										</TableCell>
										<TableCell align="center">{record.itemName}</TableCell>
										<TableCell align="center">{record.itemQuantity}</TableCell>
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
	if(reportType.type == 'daily'){
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<DailySalesReportTableHeader sortingData={sortingData} order={order} reportType={reportType} />
						<TableBody>
							{displayData.map((record, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{record.itemNumber}</TableCell>
										<TableCell align="center">
											{!record.efreshgoNo ? '未添加商品编号' : record.efreshgoNo}
										</TableCell>
										<TableCell align="center">{record.itemName}</TableCell>
										<TableCell align="center">{record.itemQuantity}</TableCell>
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

export default DailySalesReportTable;

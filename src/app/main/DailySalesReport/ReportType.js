import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import { Alert } from '@material-ui/lab';
import { Button, Icon, Input, Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';

const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

function DailySalesReport(props) {
	const [reportType, setReportType] = useState({ type: '', startDate: '', endDate: '', month: '', year: '' });
	const [alert, setAlert] = useState({ show: false, message: '' });

	const handleSubmit = async () => {
        if(reportType.type == 'year'){
            props.history.push(`/sales/salesreport/yearly-report?startDate=${reportType.year}`)
            return
        }
        if(reportType.type == 'month'){
            props.history.push(`/sales/salesreport/monthly-report?queryMonth=${reportType.year}-${reportType.month}`)
            return
        }
        if(reportType.type == 'daily'){
            props.history.push(`/sales/salesreport/daily-report?startDate=${reportType.startDate}&endDate=${reportType.endDate}`)
            return
        }
	};

	return (
		<>
			{alert.show && <Alert severity="success">{alert.message}</Alert>}
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">list_alt</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									销量统计报表
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}
				content={
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
										{Array.from(
											{ length: new Date().getFullYear() - 2020 + 1 },
											(v, i) => 2020 + i
										).map((year, index) => (
											<MenuItem key={index} value={year}>
												{year}
											</MenuItem>
										))}
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
							disabled={
								!reportType.type ||
                                (reportType.type == 'year' && !reportType.year) ||
                                (reportType.type == 'month' && (!reportType.year || !reportType.month))||
                                (reportType.type == 'daily' && (!reportType.startDate || !reportType.endDate))
							}
						>
							<span className="hidden sm:flex">查询</span>
						</Button>
					</div>
				}
				innerScroll
			/>
		</>
	);
}

export default withRouter(DailySalesReport);

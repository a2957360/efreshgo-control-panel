import React, { useState, useEffect } from 'react';
//packages
import { useSelector } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from '../../../../global/axios';
import moment from 'moment';
//components
import { Button, Icon, Input, Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
//styles
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

// import { setCarouselsSearchText } from '../../store/carouselsSlice';
const headers = [
	{ label: '下单时间', key: 'createTime' },
	{ label: '订单编号', key: 'orderNo' },
	{ label: '订单金额（不含运费）', key: 'itemPrice' },
	{ label: '运费', key: 'deliverPrice' },
	{ label: '配送方式(0-自取, 1-骑手配送, 2-商家配送)', key: 'deliverType' },
	{ label: '骑手序号', key: 'driverNumber' },
	{ label: '骑手收入', key: 'driverIncome' },
	{ label: '商品利润', key: 'storeItemPrice' },
	{ label: '派送利润', key: 'storeDeliverPrice' },
	{ label: '小店收入', key: 'storeIncome' }
];

function ProfitReportHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);

	const { stores, storeNumber, setStoreNumber, setAlert, start, setStart, end, setEnd, data } = props;
	const [downloadData, setDownloadData] = useState();

	useEffect(() => {
		filterDownloadData();
	}, [storeNumber, start, end]);

	const filterDownloadData = () => {
		const downloads = data.map(record => {
			return {
				...record,
				deliverType: record.deliverType == 0 ? '自取' : record.deliverType == 1 ? '骑手配送' : '商家配送',
				driverNumber: record.driverNumber == 0 ? '无' : record.driverNumber,
				storeItemPrice: ((record.itemPrice * 12.75) / 100).toFixed(2),
				storeDeliverPrice: record.deliverType == 2 ? 2.99 : 0,
				storeIncome:
					record.deliverType == 2
						? ((record.itemPrice * 12.75) / 100 + 2.99).toFixed(2)
						: ((record.itemPrice * 12.75) / 100).toFixed(2)
			};
		});
		if (storeNumber === 0) {
			setDownloadData(downloads);
		} else {
			setDownloadData(downloads.filter(record => record.storeNumber === storeNumber));
		}
	};

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">list_alt</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						利润报表
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex-row items-center max-w-512 mr-8 px-12 py-4 rounded-8" elevation={1}>
							<TextField
								id="start"
								name="start"
								label="报表起始日期"
								value={start}
								type="date"
								onChange={event => setStart(event.target.value)}
								InputLabelProps={{
									shrink: true
								}}
								// style={{width: 120}}
							/>
						</Paper>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex-row items-center max-w-512 mr-8 px-12 py-4 rounded-8" elevation={1}>
							<TextField
								id="end"
								name="end"
								label="报表结束日期"
								value={end}
								type="date"
								onChange={event => setEnd(event.target.value)}
								InputLabelProps={{
									shrink: true
								}}
								// style={{width: 120}}
							/>
						</Paper>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						{/* <Paper className="flex items-center max-w-512 px-8 ml-5 py-4 rounded-8" elevation={1}> */}
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">filter_list</Icon>

							<TextField
								label="选择门店"
								className="flex flex-1 mx-8"
								fullWidth
								// style={{ width: 200 }}
								value={storeNumber}
								inputProps={{
									'aria-label': 'FilterList'
								}}
								onChange={event => setStoreNumber(event.target.value)}
								select
							>
								<MenuItem value={0}>全部门店</MenuItem>
								{stores.map(store => (
									<MenuItem key={store.storeNumber} value={store.storeNumber}>
										{store.storeName}
									</MenuItem>
								))}
							</TextField>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			{downloadData && (
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<CSVLink
						data={downloadData}
						headers={headers}
						filename={`${
							storeNumber === 0
								? '全部门店'
								: stores.filter(store => store.storeNumber === storeNumber)[0].storeName
						}_${moment().format('YYYYMMDD')}.csv`}
					>
						<Button
							className="whitespace-no-wrap normal-case"
							variant="contained"
							color="secondary"
							// onClick={() => downloadCSV()}
						>
							<span className="hidden sm:flex">下载利润报表</span>
							<span className="flex sm:hidden">下载</span>
						</Button>
					</CSVLink>
				</FuseAnimate>
			)}
		</div>
	);
}

export default ProfitReportHeader;

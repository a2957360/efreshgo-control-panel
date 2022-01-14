import React, { useState, useEffect } from 'react';
//packages
import { useSelector } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from '../../../../global/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

//components
import { Button, Icon, Input, Paper, Typography, TextField, MenuItem } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
//styles
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

// import { setCarouselsSearchText } from '../../store/carouselsSlice';
const headers = [
	{ label: '商品编号', key: 'itemNumber' },
	{ label: '商品SKU', key: 'efreshgoNo' },
	{ label: '商品名称', key: 'itemName' },
	{ label: '1月', key: 'itemQuantity' },
	{ label: '2月', key: 'itemQuantity' },
	{ label: '3月', key: 'itemQuantity' },
	{ label: '4月', key: 'itemQuantity' },
	{ label: '5月', key: 'itemQuantity' },
	{ label: '6月', key: 'itemQuantity' },
	{ label: '7月', key: 'itemQuantity' },
	{ label: '8月', key: 'itemQuantity' },
	{ label: '9月', key: 'itemQuantity' },
	{ label: '10月', key: 'itemQuantity' },
	{ label: '11月', key: 'itemQuantity' },
	{ label: '12月', key: 'itemQuantity' },
	{ label: '合计', key: 'itemQuantity' },
];

function DailySalesReportHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);

	const { data, storeNumber } = props;
	const [downloadData, setDownloadData] = useState();

	useEffect(() => {
		filterDownloadData();
	}, [storeNumber]);

	const filterDownloadData = () => {
		if (storeNumber === 0) {
			const { sumData } = data;
			setDownloadData(sumData);
		} else {
			const { storeData } = data;
			setDownloadData(storeData.filter(record => record.storeNumber === storeNumber));
		}
	};

	const resetReport = () => {};

	return (
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

			{/* <div className="flex flex-1 items-center justify-center px-12">
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
			</div> */}
			{!data ? (
				''
			) : (
				<div>
					<Button
						component={Link}
						to="/sales/salesreport"
						className="whitespace-no-wrap normal-case mr-20"
						variant="contained"
						color="secondary"
					>
						<span className="flex">返回</span>
					</Button>
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
							disabled={!downloadData}
							// onClick={() => downloadCSV()}
						>
							<span className="hidden sm:flex">下载报表</span>
							<span className="flex sm:hidden">下载</span>
						</Button>
					</CSVLink>
				</div>
			)}

			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				

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
						disabled={!downloadData}
						// onClick={() => downloadCSV()}
					>
						<span className="hidden sm:flex">下载每日报表</span>
						<span className="flex sm:hidden">下载</span>
					</Button>
				</CSVLink>
			</FuseAnimate> */}
		</div>
	);
}

export default DailySalesReportHeader;

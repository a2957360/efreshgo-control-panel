import React, { useState, useEffect } from 'react';
//packages
import { useSelector } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from '../../../../../global/axios';
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
	{ label: '商品售价', key: 'itemPrice' },
	{ label: '1月', key: 'Jan' },
	{ label: '2月', key: 'Feb' },
	{ label: '3月', key: 'Mar' },
	{ label: '4月', key: 'Apr' },
	{ label: '5月', key: 'May' },
	{ label: '6月', key: 'Jun' },
	{ label: '7月', key: 'Jul' },
	{ label: '8月', key: 'Aug' },
	{ label: '9月', key: 'Sep' },
	{ label: '10月', key: 'Oct' },
	{ label: '11月', key: 'Nov' },
	{ label: '12月', key: 'Dec' },
	{ label: '合计', key: 'Total' }
];

function YearlyReportHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const { data, stores, storeNumber, setStoreNumber, startDate } = props;
	const [downloadData, setDownloadData] = useState();

	useEffect(() => {
		filterDownloadData();
	}, [storeNumber]);

	const filterDownloadData = () => {
		if (storeNumber === 0) {
			const { sumData } = data;
			const dataToDownload = sumData.map(record => {
				let total = 0;
				for (let i = 1; i < 13; i++) {
					total += !record[i] ? 0 : record[i].totalPrice;
				}
				return {
					itemNumber: `=""${record.itemNumber}""`,
					efreshgoNo: `=""${record.efreshgoNo}""`,
					itemName: record.itemName,
					itemPrice:`$ ${record.itemPrice}`,
					Jan: !record[1] ? 0 : `$ ${record[1].totalPrice}`,
					Feb: !record[2] ? 0 : `$ ${record[2].totalPrice}`,
					Mar: !record[3] ? 0 : `$ ${record[3].totalPrice}`,
					Apr: !record[4] ? 0 : `$ ${record[4].totalPrice}`,
					May: !record[5] ? 0 : `$ ${record[5].totalPrice}`,
					Jun: !record[6] ? 0 : `$ ${record[6].totalPrice}`,
					Jul: !record[7] ? 0 : `$ ${record[7].totalPrice}`,
					Aug: !record[8] ? 0 : `$ ${record[8].totalPrice}`,
					Sep: !record[9] ? 0 : `$ ${record[9].totalPrice}`,
					Oct: !record[10] ? 0 : `$ ${record[10].totalPrice}`,
					Nov: !record[11] ? 0 : `$ ${record[11].totalPrice}`,
					Dec: !record[12] ? 0 : `$ ${record[12].totalPrice}`,
					Total: `$ ${total}`
				};
			});
			setDownloadData(dataToDownload);
		} else {
			const { storeData } = data;
			const dataToDownload = storeData.filter(record => record.storeNumber === storeNumber).map(record => {
				let total = 0;
				for (let i = 1; i < 13; i++) {
					total += !record[i] ? 0 : record[i].totalPrice;
				}
				return {
					itemNumber: `=""${record.itemNumber}""`,
					efreshgoNo: `=""${record.efreshgoNo}""`,
					itemName: record.itemName,
					itemPrice:`$ ${record.itemPrice}`,
					Jan: !record[1] ? 0 : `$ ${record[1].totalPrice}`,
					Feb: !record[2] ? 0 : `$ ${record[2].totalPrice}`,
					Mar: !record[3] ? 0 : `$ ${record[3].totalPrice}`,
					Apr: !record[4] ? 0 : `$ ${record[4].totalPrice}`,
					May: !record[5] ? 0 : `$ ${record[5].totalPrice}`,
					Jun: !record[6] ? 0 : `$ ${record[6].totalPrice}`,
					Jul: !record[7] ? 0 : `$ ${record[7].totalPrice}`,
					Aug: !record[8] ? 0 : `$ ${record[8].totalPrice}`,
					Sep: !record[9] ? 0 : `$ ${record[9].totalPrice}`,
					Oct: !record[10] ? 0 : `$ ${record[10].totalPrice}`,
					Nov: !record[11] ? 0 : `$ ${record[11].totalPrice}`,
					Dec: !record[12] ? 0 : `$ ${record[12].totalPrice}`,
					Total: `$ ${total}`
				};
			});
			setDownloadData(dataToDownload);
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
						年销量统计报表
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
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
			</div>
			<div>
				{data && (
					<Button
						component={Link}
						to="/sales/salesreport"
						className="whitespace-no-wrap normal-case mr-20"
						variant="contained"
						color="secondary"
					>
						<span className="flex">返回</span>
					</Button>
				)}
				{downloadData && (
					<CSVLink
						data={downloadData}
						headers={headers}
						filename={`${
							storeNumber === 0
								? '全部门店'
								: stores.filter(store => store.storeNumber === storeNumber)[0].storeName
						}_${startDate}.csv`}
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
				)}
			</div>
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

export default YearlyReportHeader;

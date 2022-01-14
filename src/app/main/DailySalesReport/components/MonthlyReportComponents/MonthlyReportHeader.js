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

const headers = [
	{ label: '商品编号', key: 'itemNumber' },
	{ label: '商品SKU', key: 'efreshgoNo' },
	{ label: '商品名称', key: 'itemName' },
	{ label: '商品售价', key: 'itemPrice' },
	{ label: '本月销量', key: 'itemQuantity' },
	{ label: '本月销售额', key: 'totalPrice' },
	// { label: '累计销量', key: 'amountSale' },
	// { label: '累计销售额', key: 'amountPrice' }
];

function MonthlyReportHeader(props) {
	// const dispatch = useDispatch();
	// const searchText = useSelector(({ main }) => main.carousels.searchText);
	const mainTheme = useSelector(selectMainTheme);

	const { data, stores, storeNumber, setStoreNumber, queryMonth } = props;
	const [downloadData, setDownloadData] = useState();

	useEffect(() => {
		filterDownloadData();
	}, [storeNumber]);

	const filterDownloadData = () => {
		if (storeNumber === 0) {
			const { sumData } = data;
			const dataToDownload = sumData.map( record => {
				return {
					...record,
					itemNumber: `=""${record.itemNumber}""`,
					efreshgoNo: `=""${record.efreshgoNo}""`,
					itemPrice:`$ ${record.itemPrice}`,
					totalPrice:`$ ${record.totalPrice}`,
					amountPrice:`$ ${record.amountPrice}`
				}
			})
			setDownloadData(dataToDownload);
		} else {
			const { storeData } = data;
			const dataToDownload = storeData.filter(record => record.storeNumber === storeNumber).map( record => {
				return {
					...record,
					itemNumber: `=""${record.itemNumber}""`,
					efreshgoNo: `=""${record.efreshgoNo}""`,
					itemPrice:`$ ${record.itemPrice}`,
					totalPrice:`$ ${record.totalPrice}`,
					amountPrice:`$ ${record.amountPrice}`
				}
			})
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
						月销量统计报表
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
						}_${queryMonth}.csv`}
					>
						<Button className="whitespace-no-wrap normal-case" variant="contained" color="secondary">
							<span className="hidden sm:flex">下载报表</span>
							<span className="flex sm:hidden">下载</span>
						</Button>
					</CSVLink>
				)}
			</div>
		</div>
	);
}

export default MonthlyReportHeader;

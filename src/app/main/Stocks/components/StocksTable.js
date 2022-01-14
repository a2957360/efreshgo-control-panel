import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
//packages
import axios from '../../../../global/axios';
import { useForm } from '@fuse/hooks';
import * as qs from 'query-string';
//styles
import { makeStyles } from '@material-ui/core/styles';

// components
import FuseLoading from '@fuse/core/FuseLoading';
import {
	Typography,
	Button,
	TextField,
	MenuItem,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	TablePagination
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import StocksTableHeader from './StocksTableHeader';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		height: 200,
		backgroundColor: 'red'
	}
}));

const StocksTable = props => {
	// const classes = useStyles(props);
	const { storeNumber } = qs.parse(props.location.search);
	const { form, handleChange, setForm } = useForm({ storeName: '' });
	const { searchText, setAlert } = props;

	const [stores, setStores] = useState();
	const [selected, setSelected] = useState([]);
	const [stockData, setStockData] = useState();

	const [displayData, setDisplayData] = useState();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	useEffect(() => {
		if(!stockData){
			return
		}
		if(searchText !== 0){
			setDisplayData(FuseUtils.filterArrayByString(stockData, searchText))
			setPage(0)
		}else{
			setDisplayData(stockData)
		}
	}, [searchText])

	useEffect(() => {
		if (!storeNumber) {
			loadStores();
			setStockData();
		} else {
			loadStocks();
		}
	}, [storeNumber]);

	useEffect(() => {
		SliceData();
	}, [stockData, page, rowsPerPage]);

	const loadStores = async () => {
		const query = { isGetAdmin: '1' };
		const result = await axios.post('/storeModule.php', query);
		const data = result.data.data.map(branch => {
			return branch.Zh;
		});
		setStores(data);
	};

	const loadStocks = async () => {
		const result = await axios.post('/stockModule.php', {
			isGetAdmin: 1,
			storeNumber,
			language: 'Zh'
		});
		const stocksData = result.data.data;
		setStockData(stocksData);
	};

	const handleConfirm = () => {
		const confirmStore = stores.filter(el => el.storeName === form.storeName)[0];
		props.history.push(`/stock/stocks?storeNumber=${confirmStore.storeNumber}`);
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const SliceData = () => {
		if (!stockData) {
			return;
		}
		const slice_data = stockData.slice(
			page * rowsPerPage,
			(page + 1) * rowsPerPage > stockData.length ? stockData.length : (page + 1) * rowsPerPage
		);
		setDisplayData(slice_data);
	};

	const toggleCheck = (event, stock) => {
		const selectedIndex = selected.findIndex(el => el === stock.stockId);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, stock.stockId);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const handleDelete = async () => {
		const query = { stockNumber: ['null'], isDelete: '1' };
		const result = await axios.post('/stockModule.php', query);
		if (result) {
			loadStocks();
			setAlert({ show: true, message: `成功删除${selected.length}条信息` });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	if ((!storeNumber && !stores) || (storeNumber && !stockData)) {
		return <FuseLoading />;
	} else if (!stockData) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20 mb-16" color="textSecondary">
					请选择门店
				</Typography>
				<TextField
					className="mt-8 mb-16 w-200"
					label="请先选择门店"
					id="storeName"
					name="storeName"
					value={form.storeName}
					onChange={handleChange}
					variant="outlined"
					select
				>
					{stores.map(each => (
						<MenuItem key={each.storeNumber} value={each.storeName}>
							{each.storeName}
						</MenuItem>
					))}
				</TextField>
				<Button
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					onClick={() => handleConfirm()}
					disabled={form.storeName == ''}
				>
					<span className="hidden sm:flex">确定</span>
				</Button>
			</div>
		);
	} else if (!displayData) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<StocksTableHeader
							numSelected={selected.length}
							rowCount={displayData.length}
							// onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{displayData.map(stock => {
								const isSelected = selected.findIndex(el => el === stock.stockId) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={stock.stockId}
										selected={isSelected}
										onClick={event => toggleCheck(event, stock)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, stock)}
											/>
										</TableCell>
										<TableCell className="w-80" align="center">
											{stock.itemImages ? (
												<img src={stock.itemImages[0]} alt={stock.itemTitle} />
											) : (
												<img
													src={require('../../assets/No-image-available.jpg')}
													alt="no-image"
												/>
											)}
										</TableCell>
										<TableCell align="center">{stock.itemTitle}</TableCell>
										<TableCell align="center">{stock.stockTotal}</TableCell>
										<TableCell align="center">{stock.stockForPickup}</TableCell>
										<TableCell align="center">{stock.stockForSell}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/stock/stock?stockId=${stock.stockId}&storeNumber=${storeNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看/修改库存</span>
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
					count={stockData.length}
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

export default withRouter(StocksTable);

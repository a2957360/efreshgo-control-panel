import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
//packages
import axios from '../../../../global/axios';
import _ from '@lodash';
// components
import { Button, Table, TableBody, TableRow, TableCell, Checkbox, TablePagination } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import ProductsTableHeader from './ProductsTableHeader';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//styles
import { withStyles } from '@material-ui/core/styles';

const AntSwitch = withStyles(theme => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		display: 'flex'
	},
	switchBase: {
		padding: 2,
		color: theme.palette.grey[500],
		'&$checked': {
			transform: 'translateX(12px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main
			}
		}
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: 'none'
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white
	},
	checked: {}
}))(Switch);

const ProductsTable = props => {
	const { data, searchText,subcategoryFilter, getProductList, setAlert } = props;

	const [selected, setSelected] = useState([]);
	const [productData, setProductData] = useState(data);
	const [displayData, setDisplayData] = useState()

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		if (searchText.length !== 0 && subcategoryFilter.categoryNumber == '') {
			setProductData(FuseUtils.filterArrayByString(data, searchText));
		} else if(searchText.length == 0 && subcategoryFilter.categoryNumber !== ''){
			setProductData(FuseUtils.filterArrayByString(data, subcategoryFilter.categoryNumber));
		} else if(searchText.length !== 0 && subcategoryFilter.categoryNumber !== ''){
			setProductData(FuseUtils.filterArrayByString(FuseUtils.filterArrayByString(data, searchText), subcategoryFilter.categoryNumber));
		}else{
			setProductData(data);
		}
		setPage(0);
	}, [searchText, subcategoryFilter]);
 
	// useEffect(() => {
	// 	if (subcategoryFilter.categoryNumber !== '') {
	// 		setProductData(FuseUtils.filterArrayByString(data, subcategoryFilter.categoryNumber));
	// 	} else if(searchText.length !== 0){
	// 		setProductData(FuseUtils.filterArrayByString(data, searchText));
	// 	}else{
	// 		setProductData(data);
	// 	}
	// 	setPage(0);
	// }, [subcategoryFilter]);

	useEffect(() => {
		sliceProductData();
	}, [data, productData, page, rowsPerPage]);

	const sliceProductData = () => {
		setDisplayData(
			productData.slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage > data.length ? data.length : (page + 1) * rowsPerPage
			)
		);
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			setSelected(productData.map(product => product.itemNumber));
			return;
		}
		setSelected([]);
	};

	function toggleCheck(event, product) {
		const selectedIndex = selected.findIndex(el => el === product.itemNumber);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, product.itemNumber);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	const handleDelete = async () => {
		const query = { isDelete: 1, itemNumber: selected, language: 'Zh' };
		const imgs = selected.map(itemNum => {
			return data.filter(item => item.itemNumber === itemNum)[0].itemImages;
		});
		setLoading(true);
		const img_result = await axios.post('/imageModule.php', { deleteImages: _.flattenDeep(imgs) });
		const result = await axios.post('/itemModule.php', query);
		if (result.data.message === 'success' && img_result.data.message === 'success') {
			setAlert({ show: true, message: '商品删除成功！' });
			getProductList();
			setSelected([]);
			setLoading(false);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const activeProduct = async (itemNumber, itemState) => {
		const query = { isChangeState: 1, itemNumber, itemState: itemState == 1 ? 0 : 1 };
		// setLoading(true);
		const { data } = await axios.post('/itemModule.php', query);
		if (data.message === 'success') {
			// setLoading(false);
			// setAlert({ show: true, message: '商品状态修改成功！' });
			getProductList();
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const sortingData = (rowId) => {
		let sorted = productData
		if(rowId === 'price'){
			if(order.direction === 'asc'){
				sorted = _.sortBy(productData,['itemPrice'])
			}else{
				_.reverse(sorted)
			}
		}
		if(rowId === 'name'){
			if(order.direction === 'asc'){
				sorted = _.sortBy(productData,['itemTitle'])
			}else{
				_.reverse(sorted)
			}
		}
		setOrder({ direction: order.direction == 'asc' ? 'desc':'asc', id: rowId })
		setProductData(sorted)
		sliceProductData()
	}

	if (!productData || !displayData || loading) {
		return <FuseLoading />;
	} else if (productData.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					未找到商品信息
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<ProductsTableHeader
							numSelected={selected.length}
							rowCount={productData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
							sortingData={sortingData}
							order={order}
						/>
						<TableBody>
							{displayData.map(product => {
								const isSelected = selected.findIndex(el => el === product.itemNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={product.itemNumber}
										selected={isSelected}
										// onClick={event => toggleCheck(event, product)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, product)}
											/>
										</TableCell>
										<TableCell className="w-80" align="center">
											{product.itemImages.length > 0 ? (
												<img src={product.itemImages[0]} alt={product.itemTitle} />
											) : (
												<img src={require('../../assets/No-image-available.jpg')} alt="empty" />
											)}
										</TableCell>
										<TableCell align="center">{product.efreshgoNo == '' ? '未添加商品编号':product.efreshgoNo}</TableCell>
										<TableCell align="center">{product.itemTitle}</TableCell>
										<TableCell align="center">
											$ {product.itemPrice} / {product.itemUnit}
										</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/product/product/${product.itemNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看/修改</span>
											</Button>
										</TableCell>
										<TableCell align="center">
											<Typography component="div">
												<Grid component="label" container alignItems="center" spacing={1}>
													<Grid item>下架</Grid>
													<Grid item>
														<AntSwitch
															checked={product.itemState == 0}
															onChange={() =>
																activeProduct(product.itemNumber, product.itemState)
															}
															name="active"
														/>
													</Grid>
													<Grid item>上架</Grid>
												</Grid>
											</Typography>
										</TableCell>
										{/* <TableCell align="center">
												<Button
													className="whitespace-no-wrap normal-case"
													variant="contained"
													color="secondary"
													onClick={() => activeProduct(product.itemNumber)}
												>
													<span className="hidden sm:flex">下架商品</span>
												</Button>
											</TableCell> */}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
				<TablePagination
					className="overflow-hidden flex-shrink-0"
					component="div"
					count={productData.length}
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

export default withRouter(ProductsTable);

import React, { useState, useEffect } from 'react';
//packages
import FuseUtils from '@fuse/utils';
// import { Link } from 'react-router-dom';
import _ from '@lodash';
import axios from '../../../../global/axios';

//components
// import FuseLoading from '@fuse/core/FuseLoading';
import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Button,
	Typography,
	Checkbox
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FeatureProductsTableHeader from './GridProductsTableHeader';

const FeatureProductsTable = props => {
	const { data, searchText, setAlert, loadFeatureProducts } = props;
	const [page, setPage] = useState(0);
	const [productData, setProductData] = useState(data.componentContent);
	const [selected, setSelected] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	useEffect(() => {
		if (searchText.length !== 0) {
			setProductData(FuseUtils.filterArrayByString(data.componentContent, searchText));
			setPage(0);
		} else {
			setProductData(data.componentContent);
		}
	}, [data, searchText]);

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const toggleCheck = (event, product) => {
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
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			setSelected(productData.map( product => product.itemNumber ));
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
		const temp = { ...data };
		temp.componentContent = data.componentContent.map( el => el.itemNumber)
		_.remove(temp.componentContent, function (component) {
			return selected.findIndex(el => el === component) > -1;
		});
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setAlert({ show: true, message: '滚动商品删除成功！' });
			loadFeatureProducts();
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const hanldeMoveUp = async index => {
		const temp = { ...data };
		const itemNumberArray = temp.componentContent.map( item => item.itemNumber)
		const temp_product = itemNumberArray[index-1]
		itemNumberArray[index-1] = itemNumberArray[index]
		itemNumberArray[index] = temp_product
		temp.componentContent = itemNumberArray
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result.data.message === 'success') {
			loadFeatureProducts();
		}
	};

	const hanldeMoveDown = async index => {
		const temp = { ...data };
		const itemNumberArray = temp.componentContent.map( item => item.itemNumber)
		const temp_product = itemNumberArray[index+1]
		itemNumberArray[index+1] = itemNumberArray[index]
		itemNumberArray[index] = temp_product
		temp.componentContent = itemNumberArray
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result.data.message === 'success') {
			loadFeatureProducts();
		}
	};

	if (!productData || productData.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					未找到滚动商品信息
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<FeatureProductsTableHeader
							numSelected={selected.length}
							rowCount={productData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{productData.map((product,index) => {
								const isSelected =
									selected.findIndex(el => el === product.itemNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={product.itemNumber}
										selected={isSelected}
									>
										<TableCell className="w-10" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, product)}
											/>
										</TableCell>
										<TableCell className="w-60" align="center">
											<img src={product.itemImages[0]} alt={product.itemTitle} />
										</TableCell>
										<TableCell align="center">{product.itemTitle}</TableCell>
										<TableCell align="center">
											<Button
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
												disabled={index === 0}
												onClick={() => hanldeMoveUp(index)}
											>
												<span className="hidden sm:flex">上移</span>
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
												disabled={index === productData.length-1}
												onClick={() => hanldeMoveDown(index)}
											>
												<span className="hidden sm:flex">下移</span>
											</Button>
										</TableCell>
										{/* <TableCell align="center">${product.itemPrice}</TableCell>
										<TableCell align="center">${product.itemSalesPrice}</TableCell> */}
										{/* <TableCell align="center">
											<Button
												component={Link}
												to={`/product/subcategory/${category.categoryId}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">修改分类</span>
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

export default FeatureProductsTable;

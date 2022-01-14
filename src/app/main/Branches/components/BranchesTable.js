import React, { useState, useEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
//packages
import axios from '../../../../global/axios';
import _ from '@lodash'
// components
import { Button, Table, TableBody, TableRow, TableCell, Checkbox, TablePagination } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';

// redux
import { useDispatch, useSelector } from 'react-redux';
import BranchesTableHeader from './BranchesTableHeader';
import { getProducts, selectProducts, deleteBranches } from '../../store/ProductStore/ProductsSlice';

const BranchesTable = props => {
	const { data, setAlert, searchText, getBranchesData } = props;
	const [branchData, setBranchData] = useState(data);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		if (searchText.length !== 0) {
			setBranchData(FuseUtils.filterArrayByString(data, searchText));
			setPage(0);
		} else {
			setBranchData(data);
		}
	}, [searchText]);

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			// 全选当前页所有记录
			const subArray = branchData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
			setSelected(subArray);
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
		const query = { isDelete: 1, storeNumber: selected, language: 'Zh' };
		const imgs = selected.map(storeNum => {
			return data.filter(store => store.storeNumber === storeNum)[0].storeImages;
		});
		setLoading(true);
		const result = await axios.post('/storeModule.php', query);
		const img_result = await axios.post('/imageModule.php', { deleteImages: _.flattenDeep(imgs) });
		if (result.data.message === 'success' && img_result.data.message === 'success') {
			setAlert({ show: true, message: '门店删除成功！' });
			getBranchesData();
			setLoading(false);
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	function toggleCheck(event, branch) {
		const selectedIndex = selected.findIndex(el => el === branch.storeNumber);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, branch.storeNumber);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	if (!branchData || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<BranchesTableHeader
							numSelected={selected.length}
							rowCount={branchData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{branchData.map(branch => {
								const isSelected = selected.findIndex(el => el === branch.storeNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={branch.storeNumber}
										selected={isSelected}
										onClick={event => toggleCheck(event, branch)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, branch)}
											/>
										</TableCell>
										<TableCell className="w-80" align="center">
											{branch.storeImages ? (
												<img src={branch.storeImages} alt={branch.storeName} />
											) : (
												<img src={require('../../assets/No-image-available.jpg')} alt="no-image" />
											)}
										</TableCell>
										<TableCell align="center">{branch.storeName}</TableCell>
										<TableCell align="center">{branch.storePhone}</TableCell>
										<TableCell align="center">{branch.storeAddress}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/branch/branch/${branch.storeNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看/修改</span>
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
					count={branchData.length}
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

export default withRouter(BranchesTable);

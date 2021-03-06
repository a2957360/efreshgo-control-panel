import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../../global/axios';
import FuseUtils from '@fuse/utils';
import { withRouter, Link } from 'react-router-dom';
import _ from '@lodash'
// components
import { Table, TableBody, TableCell, TableRow, TablePagination, Checkbox, Button, Typography } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseLoading from '@fuse/core/FuseLoading';
import RecipeCategoriesTableHeader from './RecipeCategoriesTableHeader';

const ProductMainCategoriesTable = props => {
	const { data, searchText, getRecipeCategories, setAlert } = props;

	const [recipeCategories, setRecipeCategories] = useState(data);
	const [selected, setSelected] = useState([]);

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	useEffect(() => {
		if (searchText.length !== 0) {
			setRecipeCategories(FuseUtils.filterArrayByString(data, searchText));
			setPage(0);
		} else {
			setRecipeCategories(data);
		}
	}, [searchText]);

	useEffect(() => {
		sliceCategoryData();
	}, [data, page, rowsPerPage]);

	const sliceCategoryData = () => {
		setRecipeCategories(
			data.slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage <= data.length ? (page + 1) * rowsPerPage : data.length
			)
		);
	};

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(recipeCategories.map(el => el.categoryNumber));
			return;
		}
		setSelected([]);
	}

	function toggleCheck(event, category) {
		const selectedIndex = selected.findIndex(el => el === category.categoryNumber); // indexOf(categoryNumber);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, category.categoryNumber);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setPage(0);
	}
	
	const handleDelete = async () => {
		const query = { isDelete: 1, categoryNumber: selected };
		const imgs = selected.map(catNum => {
			return data.filter(category => category.categoryNumber === catNum)[0].categoryImages;
		});
		setLoading(true);
		const img_result = await axios.post('/imageModule.php', { deleteImages: _.flattenDeep(imgs) });
		const result = await axios.post('/categoryModule.php', query);
		if (result.data.message == 'success' && img_result.data.message === 'success') {
			setAlert({ show: true, message: '???????????????????????????' });
			getRecipeCategories();
			setSelected([]);
			setLoading(false);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	if (!recipeCategories || loading) {
		return <FuseLoading />;
	} else if (recipeCategories.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					???????????????????????????
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<RecipeCategoriesTableHeader
							numSelected={selected.length}
							rowCount={data.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{recipeCategories.map(category => {
								const isSelected = selected.findIndex(el => el === category.categoryNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={category.categoryId}
										selected={isSelected}
										onClick={event => toggleCheck(event, category)}
									>
										<TableCell className="w-10" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, category)}
											/>
										</TableCell>
										<TableCell className="w-60" align="center">
											<img src={category.categoryImages} alt={category.categoryTitle} />
										</TableCell>
										<TableCell align="center">{category.categoryTitle}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/recipe/category/${category.categoryNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">??????/??????</span>
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
					count={recipeCategories.length}
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

export default withRouter(ProductMainCategoriesTable);

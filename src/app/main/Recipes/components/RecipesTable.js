import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//packages
import FuseUtils from '@fuse/utils';
import axios from '../../../../global/axios';
import _ from '@lodash'
//components
import { Button, Table, TableBody, TableRow, TableCell, Checkbox, TablePagination, Typography } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import RecipesTableHeader from '../components/RecipesTableHeader';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipes } from '../../store/RecipeStore/RecipesSlice';

const RecipeTable = props => {
	const { data, searchText, getRecipeList, setAlert } = props;

	const [selected, setSelected] = useState([]);
	const [recipeData, setRecipeData] = useState(data);

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		if (searchText.length !== 0) {
			setRecipeData(FuseUtils.filterArrayByString(data, searchText));
			setPage(0);
		} else {
			setRecipeData(data);
		}
	}, [searchText]);

	useEffect(() => {
		sliceRecipeData();
	}, [data, page, rowsPerPage]);

	const sliceRecipeData = () => {
		setRecipeData(
			data.slice(
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
			setSelected(recipeData.map(recipe => recipe.cookbookNumber));
			return;
		}
		setSelected([]);
	};

	function toggleCheck(event, recipe) {
		const selectedIndex = selected.findIndex(el => el === recipe.cookbookNumber);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, recipe.cookbookNumber);
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
		const query = { isDelete: 1, cookbookNumber: selected, language: 'Zh' };
		const imgs = selected.map(cookbookNum => {
			return data.filter(recipe => recipe.cookbookNumber === cookbookNum)[0].cookbookImages;
		});
		setLoading(true);
		const img_result = await axios.post('/imageModule.php', { deleteImages: _.flattenDeep(imgs) });
		const result = await axios.post('/cookbookModule.php', query);
		if (result.data.message === 'success' && img_result.data.message === 'success') {
			setAlert({ show: true, message: '菜谱删除成功！' });
			getRecipeList();
			setSelected([]);
			setLoading(false);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	if (!recipeData || loading) {
		return <FuseLoading />;
	} else if(recipeData.length === 0){
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					未找到菜谱信息
				</Typography>
			</div>
		);

	}else{
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<RecipesTableHeader
							numSelected={selected.length}
							rowCount={recipeData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{recipeData.map(recipe => {
								const isSelected = selected.findIndex(el => el === recipe.cookbookNumber) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={recipe.cookbookNumber}
										selected={isSelected}
										onClick={event => toggleCheck(event, recipe)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, recipe)}
											/>
										</TableCell>
										<TableCell className="w-80" align="center">
											{recipe.cookbookImages.length > 0 ? (
												<img src={recipe.cookbookImages[0]} alt={recipe.cookbookTitle} />
											) : (
												<img src={require('../../assets/No-image-available.jpg')} alt="no-image" />
											)}
										</TableCell>
										<TableCell align="center">{recipe.cookbookTitle}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/recipe/recipe/${recipe.cookbookNumber}`}
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
					count={recipeData.length}
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

export default RecipeTable;

import React, { useState, useEffect } from 'react';
//packages
import FuseUtils from '@fuse/utils';
import { Link } from 'react-router-dom';
import axios from '../../../../global/axios';
import _ from '@lodash'
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TablePagination, TableRow, Button, Typography, Checkbox } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import RecommendationsTableHeader from './RecommendationsTableHeader';

const RecommendationsTable = props => {
	const { searchText, setAlert } = props;
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState();
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		loadRecommendations();
	}, []);

	const loadRecommendations = async () => {
		const query = { isGet: 1, recommendType: 0, language: 'Zh' };
		const { data } = await axios.post('/recommendModule.php', query);
		console.log(data.data)
		setData(data.data[0]);
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
			// 全选当前页所有记录
			const subArray = data.recommendContent.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
			setSelected(subArray);
			return;
		}
		setSelected([]);
	};

	const toggleCheck = (event, keyword) => {
		const selectedIndex = selected.findIndex(obj => obj.Zh === keyword.Zh);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, keyword);
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
		const temp = _.difference(data.recommendContent, selected)
		const query = {
			recommendNumber:3,
			recommendContent:temp,
			recommendType:0,
			language:"Zh"
		}
		setLoading(true)
		const result = await axios.post('/recommendModule.php', query)
		console.log(result.data)
		if(result){
			setAlert({ show: true, message:'热搜词条删除成功！'})
			loadRecommendations()
			setLoading(false)
			setSelected([])
			setTimeout(() => {
				setAlert({ show: false, message:"" })
			}, 2000)
		}
	};

	if (!data || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<RecommendationsTableHeader
							numSelected={selected.length}
							rowCount={data.recommendContent.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{data.recommendContent.map((keyword, index) => {
								const isSelected = selected.findIndex(obj => obj.Zh === keyword.Zh) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={index.toString()}
										selected={isSelected}
										onClick={event => toggleCheck(event, keyword)}
									>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, keyword)}
											/>
										</TableCell>
										<TableCell align="center">{index + 1}</TableCell>
										<TableCell align="center">{keyword.Zh}</TableCell>
										<TableCell align="center">{keyword.En}</TableCell>
										{/* <TableCell align="center">
											<Button
												component={Link}
												to={`/homepage/recommendation/${index}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看/修改</span>
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
					count={data.recommendContent.length}
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

export default RecommendationsTable;

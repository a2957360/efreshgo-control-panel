import React, { useState, useEffect } from 'react';
//packages
// import FuseUtils from '@fuse/utils';
// import { Link } from 'react-router-dom';
import axios from '../../../../global/axios';
import _ from '@lodash';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import {
	Table,
	TableBody,
	TableCell,
	// TablePagination,
	TableRow,
	// Button,
	Typography,
	Checkbox
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import TransformersTableHeader from './TransformersTableHeader';

const TransformersTable = props => {
	const { searchText, setAlert } = props;
	const [data, setData] = useState();
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// console.log(searchText);
	}, [searchText]);

	useEffect(() => {
		loadTransformers();
	}, []);

	const loadTransformers = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const transformersData = data.data.filter(layout => layout.componentTitle === 'homeTransformer')[0];
		setData(transformersData);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			setSelected(data.componentContent);
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
		const temp = { ...data };
		_.remove(temp.componentContent, function (component) {
			return selected.findIndex(el => el.categoryNumber === component.categoryNumber) > -1;
		});
		setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setLoading(false);
			setAlert({ show: true, message: '金刚区选项删除成功！' });
			loadTransformers();
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const toggleCheck = (event, transformer) => {
		const selectedIndex = selected.findIndex(el => el.categoryNumber === transformer.categoryNumber);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, transformer);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	if (data === undefined || loading) {
		return <FuseLoading />;
	} else if (!data.componentContent || data.componentContent.length === 0) {
		return (
			<div className="w-full flex flex-col">
				<Typography className="text-8 pl-30 sm:text-20 truncate">未找到金刚区信息</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<TransformersTableHeader
							numSelected={selected.length}
							rowCount={data.componentContent.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{data &&
								data.componentContent.map((transformer, index) => {
									const isSelected =
										selected.findIndex(el => el.categoryNumber === transformer.categoryNumber) !==
										-1;
									return (
										<TableRow key={index.toString()}>
											<TableCell className="w-20" align="center">
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => toggleCheck(event, transformer)}
												/>
											</TableCell>
											<TableCell className="w-80" align="center">
												<img src={transformer.categoryImages} alt={transformer.categoryTitle} />
											</TableCell>
											<TableCell align="center">{transformer.categoryTitle}</TableCell>
											{/* <TableCell align="center">
												<Button
													component={Link}
													to={`/homepage/transformer/${index}`}
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
			</div>
		);
	}
};

export default TransformersTable;

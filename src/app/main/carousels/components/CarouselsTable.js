import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//packages
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import axios from '../../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Table, TableBody, TableCell, TableRow, Checkbox, Typography, Button } from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import CarouselsTableHeader from './CarouselsTableHeader';

const CarouselsTable = props => {
	const { data, displayData, searchText, setAlert, loadCarousels } = props;
	const [carouselsData, setCarouselsData] = useState(displayData);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	useEffect(() => {
		setCarouselsData(displayData);
	}, [displayData]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setCarouselsData(FuseUtils.filterArrayByString(displayData, searchText));
		} else {
			setCarouselsData(displayData);
		}
	}, [searchText]);

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			setSelected(displayData);
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
		const temp = { ...data };
		_.remove(temp.componentContent.Zh, function (component) {
			return selected.findIndex(el => el.uri === component.uri) > -1;
		});
		_.remove(temp.componentContent.En, function (component) {
			return selected.findIndex(el => el.uri_en === component.uri) > -1;
		});
		const imgs = selected.map(carousel => {return carousel.uri} );
		setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		const img_result = await axios.post('/imageModule.php', { deleteImages: _.flattenDeep(imgs) });
		if (result.data.message === 'success' && img_result.data.message === 'success') {
			setAlert({ show: true, message: '轮播图广告删除成功！' });
			loadCarousels();
			setLoading(false);
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const toggleCheck = (event, carousel) => {
		const selectedIndex = selected.findIndex(el => el.uri === carousel.uri);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, carousel);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const hanldeMoveUp = async index => {
		const temp = { ...data };
		//换中文
		const temp_zh = temp.componentContent.Zh[index - 1];
		temp.componentContent.Zh[index - 1] = temp.componentContent.Zh[index];
		temp.componentContent.Zh[index] = temp_zh;
		//换英文
		const temp_en = temp.componentContent.En[index - 1];
		temp.componentContent.En[index - 1] = temp.componentContent.En[index];
		temp.componentContent.En[index] = temp_en;
		// setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result.data.message === 'success') {
			// setLoading(false);
			loadCarousels();
		}
	};

	const hanldeMoveDown = async index => {
		const temp = { ...data };
		//换中文
		const temp_zh = temp.componentContent.Zh[index + 1];
		temp.componentContent.Zh[index + 1] = temp.componentContent.Zh[index];
		temp.componentContent.Zh[index] = temp_zh;
		//换英文
		const temp_en = temp.componentContent.En[index + 1];
		temp.componentContent.En[index + 1] = temp.componentContent.En[index];
		temp.componentContent.En[index] = temp_en;
		// setLoading(true);
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result.data.message === 'success') {
			// setLoading(false);
			loadCarousels();
		}
	};

	if (!carouselsData || loading) {
		return <FuseLoading />;
	} else if (carouselsData.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					未找到轮播图信息
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<CarouselsTableHeader
							numSelected={selected.length}
							rowCount={carouselsData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{carouselsData.map((carousel, index) => {
								const isSelected = selected.findIndex(el => el.uri === carousel.uri) !== -1;
								const link =
									carousel.target == 'product'
										? carousel.itemTitle
										: carousel.target == 'recipe'
										? carousel.cookbookTitle
										: carousel.categoryTitle;
								return (
									<TableRow key={index.toString()}>
										<TableCell className="w-20" align="center">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => toggleCheck(event, carousel)}
											/>
										</TableCell>
										<TableCell className="w-80" align="center">
											<img src={carousel.uri} alt={`banner_${index}`} />
										</TableCell>
										<TableCell className="w-80" align="center">
											<img src={carousel.uri_en} alt={`banner_en_${index}`} />
										</TableCell>
										<TableCell align="center">{link}</TableCell>
										<TableCell align="center">
											<Button
												className="whitespace-no-wrap normal-case"
												component={Link}
												to={`/homepage/carousel/${index}`}
												variant="contained"
												color="secondary"
							
											>
												<span className="hidden sm:flex">修改</span>
											</Button>
										</TableCell>
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
												disabled={index === carouselsData.length-1}
												onClick={() => hanldeMoveDown(index)}
											>
												<span className="hidden sm:flex">下移</span>
											</Button>
										</TableCell>
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

export default CarouselsTable;

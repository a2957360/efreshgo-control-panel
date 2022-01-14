import React, { useState, useEffect } from 'react';
//packages
import FuseUtils from '@fuse/utils';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import axios from '../../../../global/axios';
//components
import {
	Table,
	TableBody,
	TableCell,
	Checkbox,
	// TablePagination,
	TableRow,
	Button,
	Typography
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import RecipeAdsTableHeader from './RecipeAdsTableHeader';
import FuseLoading from '@fuse/core/FuseLoading';

const RecipeAdsTable = props => {
	const { data, loadAds, searchText, setAlert } = props;
	const rebuild = data.componentContent.Zh.map((ad, index) => {
		return {...ad, uri_en:data.componentContent.En[index].uri}
	})

	const [selected, setSelected] = useState([]);
	const [displayData, setDisplayData] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setDisplayData(rebuild);
	}, [data])

	useEffect(() => {
		if(searchText.length !== 0){
			setDisplayData(FuseUtils.filterArrayByString(rebuild, searchText))
		}else{
			setDisplayData(rebuild);	
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
		setLoading(true)
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setAlert({ show: true, message: '广告删除成功！' });
			loadAds();
			setLoading(false)
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const toggleCheck = (event, ad) => {
		const selectedIndex = selected.findIndex(el => el.uri === ad.uri);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, ad);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	if (!displayData || loading) {
		return <FuseLoading />
	}else if(displayData.length === 0){
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-12">
				<Typography className="text-20" color="textSecondary">
					未找到广告信息
				</Typography>
			</div>
		);
	}else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<RecipeAdsTableHeader
							numSelected={selected.length}
							rowCount={displayData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{displayData.map((ad, index) => {
									const isSelected = selected.findIndex(el => el.uri === ad.uri) !== -1;
									const link =
										ad.target === 'product'
											? ad.itemTitle
											: ad.target === 'recipe'
											? ad.cookbookTitle
											: ad.categoryTitle;
									return (
										<TableRow key={index.toString()}>
											<TableCell className="w-20" align="center">
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => toggleCheck(event, ad)}
												/>
											</TableCell>
											<TableCell className="w-80" align="center">
												<img src={ad.uri} alt={`ad_${index}`} />
											</TableCell>
											<TableCell className="w-80" align="center">
												<img src={ad.uri_en} alt={`ad_en_${index}`} />
											</TableCell>
											<TableCell align="center">{link}</TableCell>
											
											<TableCell align="center">
												<Button
													component={Link}
													to={`/homepage/recipeadvertisement/${index}`}
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
			</div>
		);
	}
};

export default RecipeAdsTable;

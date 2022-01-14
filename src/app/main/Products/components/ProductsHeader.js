import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography, Button, TextField, Icon, Input, Paper, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { Autocomplete } from '@material-ui/lab';
import axios from '../../../../global/axios';

function ProductsHeader(props) {
	const { searchText, setSearchText, subcategoryFilter, setSubcategoryFilter } = props;
	const mainTheme = useSelector(selectMainTheme);
	const [subcat_List, setSubcat_List] = useState();

	useEffect(() => {
		getProductSubCategories();
	}, []);

	const getProductSubCategories = async () => {
		const { data } = await axios.post('/categoryModule.php', { isGet: '1', categoryType: '0', language: 'Zh' });
		const result = data.data.filter(category => category.categoryParentId !== '');
		setSubcat_List(result);
	};

	if (!subcat_List) {
		return null;
	} else {
		return (
			<div className="flex flex-1 w-full items-center justify-between">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">local_offer</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							商品管理
						</Typography>
					</FuseAnimate>
				</div>

				<div className="flex flex-1 items-center justify-center px-12">
					<ThemeProvider theme={mainTheme}>
						<FuseAnimate animation="transition.slideDownIn" delay={300}>
							<Paper className="flex items-center max-w-512 px-8 py-4 rounded-8" elevation={1}>
								<Icon color="action">search</Icon>
								<Input
									placeholder="搜索商品"
									className="flex flex-1 mx-8"
									disableUnderline
									style={{ width: 250, height: 55 }}
									value={searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={event => setSearchText(event.target.value)}
								/>
							</Paper>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideDownIn" delay={300}>
							<Paper className="flex items-center max-w-512 px-8 ml-5 py-4 rounded-8" elevation={1}>
								<Icon color="action">filter_list</Icon>
								<Autocomplete
									id="productSubcategory"
									options={subcat_List}
									// fullWidth
									getOptionLabel={option => option.categoryTitle}
									value={subcategoryFilter}
									style={{ width: 300, marginLeft: 10}}
									onChange={(event, value) =>{
										if (!value) {
											setSubcategoryFilter({categoryNumber:'', categoryTitle:''});
											return;
										}else{
											setSubcategoryFilter(value)
										}
									}}
									renderInput={params => (
										<TextField {...params} label="请选择商品二级分类" variant="outlined" />
									)}
								/>
							</Paper>
						</FuseAnimate>
					</ThemeProvider>
				</div>
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						to="/product/product/new"
						className="whitespace-no-wrap normal-case"
						variant="contained"
						color="secondary"
					>
						<span className="hidden sm:flex">新增商品</span>
						<span className="flex sm:hidden">新增</span>
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

export default ProductsHeader;

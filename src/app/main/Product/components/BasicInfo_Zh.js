import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
import _ from '@lodash';

//components
import FuseLoading from '@fuse/core/FuseLoading';
import { TextField, Typography, InputAdornment } from '@material-ui/core';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';

function BasicInfo_Zh(props) {
	const { itemNumber } = useParams();
	const { form, setForm } = props;

	const [mainCats, setMainCats] = useState();
	const [subCats, setSubCats] = useState();

	useEffect(() => {
		getMainCats();
		getSubCats();
	}, []);

	const getMainCats = async () => {
		const query = { isGet: 1, language: 'Zh', categoryType: 0 };
		const result = await axios.post('/categoryModule.php', query);
		const data = result.data.data.filter(category => category.categoryParentId === '');
		setMainCats(data);
	};

	const getSubCats = async () => {
		const result = await axios.post('/categoryModule.php', { isGet: 1, categoryType: 0, language: 'Zh' });
		const data = result.data.data.filter(category => category.categoryParentId !== '');
		setSubCats(data);
	};

	const renderParentCategory = parentCatList => {
		const result = parentCatList.map(catNum => {
			return mainCats.filter(cat => cat.categoryNumber === catNum)[0];
		});
		return result;
	};

	const handleMainCatChange = value => {
		if (!value || value.length === 0) {
			setForm({ ...form, itemParentCategory: [] });
		} else {
			setForm(
				_.set(
					{ ...form },
					'itemParentCategory',
					value.map(category => category.categoryNumber)
				)
			);
		}
	};

	const renderItemCategory = itemCatList => {
		const result = itemCatList.map(catNum => {
			return subCats.filter(cat => cat.categoryNumber === catNum)[0];
		});
		return result;
	};

	const handleChipChange = (value, name) => {
		setForm({ ...form, itemTag: { ...form.itemTag, Zh: value.map(item => item.value) } });
	};

	const handleSubCatChange = value => {
		if (!value || value.length === 0) {
			setForm({ ...form, itemCategory: [], itemParentCategory: [] });
		} else {
			setForm({
				...form,
				itemCategory: value.map(category => category.categoryNumber),
				itemParentCategory: _.uniq(value.map(category => category.categoryParentId))
			});
		}
	};

	if (!mainCats || !subCats) {
		return <FuseLoading />;
	} else {
		return (
			<div>
				<TextField
					className="mt-8 mb-16"
					error={form.efreshgoNo === ''}
					label="商品编号"
					id="efreshgoNo"
					name="efreshgoNo"
					value={form.efreshgoNo}
					onChange={event => setForm({ ...form, efreshgoNo: event.target.value })}
					variant="outlined"
					inputProps={{ maxLength: 20 }}
					fullWidth
				/>

				<TextField
					className="mt-8 mb-16"
					error={form.itemTitle.Zh === ''}
					label="中文名称"
					id="itemTitle"
					name="itemTitle"
					value={form.itemTitle.Zh}
					onChange={event => setForm({ ...form, itemTitle: { ...form.itemTitle, Zh: event.target.value } })}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mt-8 mb-16"
					error={form.itemSubTitle.Zh === ''}
					label="副标题"
					id="itemSubTitle"
					name="itemSubTitle"
					value={form.itemSubTitle.Zh}
					onChange={event =>
						setForm({ ...form, itemSubTitle: { ...form.itemSubTitle, Zh: event.target.value } })
					}
					variant="outlined"
					fullWidth
				/>

				<Typography className="m-10 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">商品一级分类: </span>
				</Typography>
				<Autocomplete
					id="mainCat"
					options={mainCats}
					multiple
					fullWidth
					filterSelectedOptions
					disabled
					getOptionLabel={option => {
						return !option ? '' : option.categoryTitle;
					}}
					// style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}
					value={renderParentCategory(form.itemParentCategory)} //
					onChange={(event, value) => handleMainCatChange(value)}
					renderInput={params => <TextField {...params} label="商品一级分类" variant="outlined" />}
				/>

				<Typography className="m-10 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">商品二级分类:</span>
				</Typography>
				<Autocomplete
					id="subCat"
					options={subCats}
					value={renderItemCategory(form.itemCategory)}
					multiple
					fullWidth
					getOptionLabel={option => {
						return !option ? '': option.categoryTitle
					}}
					style={{ marginBottom: 20 }}
					onChange={(event, value) => handleSubCatChange(value)}
					renderInput={params => <TextField {...params} label="请选择商品二级分类" variant="outlined" />}
				/>

				<TextField
					className="mt-8 mb-16"
					error={form.itemUnit.Zh === ''}
					required
					label="单位"
					id="itemUnit"
					name="itemUnit"
					value={form.itemUnit.Zh}
					onChange={event => setForm({ ...form, itemUnit: { ...form.itemUnit, Zh: event.target.value } })}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mt-8 mb-16"
					required
					label="税率"
					id="isTaxable"
					name="isTaxable"
					value={form.isTaxable}
					onChange={event => setForm({ ...form, isTaxable: event.target.value })}
					variant="outlined"
					fullWidth
					InputProps={{
						endAdornment: <InputAdornment position="start">%</InputAdornment>
					}}
				/>

				<FuseChipSelect
					className="mt-8 mb-16"
					value={form.itemTag.Zh.map(tag => ({
						value: tag,
						label: tag
					}))}
					onChange={value => handleChipChange(value, 'itemTag')}
					placeholder="商品关键词"
					textFieldProps={{
						label: '关键词',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					isMulti
				/>
			</div>
		);
	}
}

export default BasicInfo_Zh;

import React, { useState, useEffect } from 'react';

// packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, TextField, MenuItem, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';

function TransformerForm(props) {
    const { data, setAlert, history } = props;
    const { id } = useParams();
    const [target, setTarget] = useState('');
    const [selected, setSelected] = useState();
	const [mainCat, setMainCat] = useState();
	const [subCat, setSubCat] = useState();
	const [recipeCat, setRecipeCat] = useState();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getMainCats();
		getSubCats();
		getRecipeCats();
    }, []);
    
    const getMainCats = async () => {
		const query = { isGet: 1, language: 'Zh', categoryType: 0 };
		const { data } = await axios.post('/categoryModule.php', query);
		setMainCat(data.data);
	};

	const getSubCats = async () => {
		if (!subCat) {
			const result = await axios.post('/categoryModule.php', { isGet: '1', categoryType: '0', language: 'Zh' });
			const data = result.data.data.filter(category => category.categoryParentId !== '');
			setSubCat(data);
		}
	};

	const getRecipeCats = async () => {
		const query = { isGet: 1, categoryType: 1, language: 'Zh' };
		const { data } = await axios.post('/categoryModule.php', query);
		setRecipeCat(data.data);
	};

	const handleChange = category => {
        setSelected(category)
	};

	const canSubmit = () => {
		return selected !== undefined ;
	};

	const handleSave = async () => {
		const temp = { ...data };
		if (!temp.componentContent) {
			temp.componentContent = [];
		}
		temp.componentContent.push(selected);
		setLoading(true)
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setAlert({ show: true, message: id === 'new' ? '新增金刚区选项成功！' : '选项保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false)
				history.push(`/homepage/transformers`);
			}, 2000);
		}
	};

	if (!mainCat || !subCat || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">站内链接：</span>
				</Typography>

				<TextField
					className="flex ml-10 mr-10"
					id="target"
					name="target"
					value={target}
					onChange={(event) => setTarget(event.target.value)}
                    variant="outlined"
                    style={{width: 300}}
					select
				>
					<MenuItem value={'productMain'}>商品：一级分类</MenuItem>
					<MenuItem value={'productSub'}>商品：二级分类</MenuItem>
				</TextField>
				{target === 'productMain' && (
					<Autocomplete
						id="productMain"
                        options={mainCat}
                        fullWidth
						getOptionLabel={option => option.categoryTitle}
						style={{ width: 300, marginLeft:10, marginTop:20, marginBottom:20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => (
							<TextField {...params} label="请选择商品分类" variant="outlined" />
						)}
					/>
				)}
                {target === 'productSub' && (
					<Autocomplete
						id="productSub"
                        options={subCat}
                        fullWidth
						getOptionLabel={option => option.categoryTitle}
						style={{ width: 300, marginLeft:10, marginTop:20, marginBottom:20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => (
							<TextField {...params} label="请选择商品分类" variant="outlined" />
						)}
					/>
				)}


				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						className="whitespace-no-wrap normal-case mt-10"
						variant="contained"
						color="secondary"
						disabled={!canSubmit()}
						onClick={handleSave}
					>
						保存
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

export default TransformerForm;

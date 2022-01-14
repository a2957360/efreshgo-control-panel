import React, { useState, useEffect } from 'react';
// packages
import axios from '../../../../global/axios';
// components
import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';

function RollingProductForm(props) {
	const { data, setAlert, history } = props;
	const [products, setProducts] = useState();
	const [selected, setSelected] = useState();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		const { data } = await axios.post('/itemModule.php', { isGetAdmin: 1 });
		const result = data.data.map(product => {
			return product.Zh;
		});
		setProducts(result);
	};

	const handleChange = value => {
		if(!value){
			setSelected()
			return
		}
		const { itemNumber } = value;
		setSelected(itemNumber);
		return;
	};

	const canSubmit = () => {
		return selected !== undefined;
	};

	const handleSave = async () => {
		const temp = { ...data };
		if (!temp.componentContent) {
			temp.componentContent = [];
		}
		if(temp.componentContent.includes(selected)){
			alert('商品已存在，请添加其他商品')
			return
		}
		temp.componentContent.push(selected);
		setLoading(true)
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			
			setAlert({ show: true, message: '滚动区商品添加成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false)
				// history.push(`/homepage/carouselproducts`);
			}, 2000);
		}
	};

	if (!products || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">站内链接：</span>
				</Typography>

				<Autocomplete
					id="product"
					options={products}
					fullWidth
					getOptionLabel={option => option.itemTitle}
					style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
					onChange={(event, value) => handleChange(value)}
					renderInput={params => <TextField {...params} label="请选择商品" variant="outlined" />}
				/>

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

export default RollingProductForm;

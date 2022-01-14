import React, { useEffect, useState } from 'react';
//components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FuseLoading from '@fuse/core/FuseLoading';
//packages
import axios from '../../../../global/axios';

function StockForm(props) {
	const { form, loading, setForm, handleChange } = props;
	const [productData, setProductData] = useState();

	useEffect(() => {
		loadProductData();
	}, []);

	const loadProductData = async () => {
		if (form.itemNumber === '') {
			const { data } = await axios.post('/itemModule.php', { isGetAdmin: 1 });
			const products = data.data.map(product => {
				return product.Zh;
			});
			setProductData(products);
		}
		else {
			const { data } = await axios.post('/itemModule.php', { isGetAdmin: 1, itemNumber: form.itemNumber });
			const product = data.data.map(product => {
				return product.Zh;
			});
			setProductData(product);
		}
	};

	const handleProductChange = product => {
		const temp = { ...form };
		temp.itemNumber = product.itemNumber;
		setForm(temp);
	};

	if (!productData || loading) {
		return <FuseLoading />;
	} else {
		const diff = form.stockTotal - form.stockForPickup - form.stockForSell;
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				{!form.stockId && <Autocomplete
					id="product"
					options={productData}
					getOptionLabel={option => option.itemTitle}
					style={{ width: 300 }}
					// fullWidth
					// disabled={form.stockId !== undefined}
					onChange={(event, value) => handleProductChange(value)}
					renderInput={params => <TextField {...params} label="请选择需要添加的商品" variant="outlined" />}
				/>}
				<TextField
					className="mt-20 mb-16"
					required
					label="总库存"
					error={diff < 0}
					id="stockTotal"
					name="stockTotal"
					value={form.stockTotal}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mt-8 mb-16"
					required
					label="自取库存"
					id="stockForPickup"
					name="stockForPickup"
					value={form.stockForPickup}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					className="mt-8 mb-16"
					required
					label="优惠活动库存"
					id="stockForSell"
					name="stockForSell"
					value={form.stockForSell}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
			</div>
		);
	}
}

export default StockForm;

import React, { useState, useEffect } from 'react';
// packages
import axios from '../../../../global/axios';
// components
import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
//styles
// import { red } from '@material-ui/core/colors';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';

// const useStyles = makeStyles(theme => ({
// 	imageContainer: {
// 		width: 180,
// 		padding: 10
// 	},
// 	imagePreview: {
// 		width: '100%',
// 		height: 150
// 	},
// 	deleteIconContainer: {
// 		width: 30,
// 		height: 30,
// 		backgroundColor: '#FFF'
// 	},
// 	deleteImageIcon: {
// 		position: 'absolute',
// 		top: -8,
// 		right: -8,
// 		color: red[500]
// 	}
// }));

function FeatureProductForm(props) {
	const { data, setAlert, history } = props;
	// const classes = useStyles(props);
	const [selected, setSelected] = useState();
	const [products, setProducts] = useState();
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
			setAlert({ show: true, message: '新增大区展示商品成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false)
				history.push(`/homepage/gridproducts`);
			}, 2000);
		}
	};

	if (!products || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">请选择需要添加的商品</span>
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

export default FeatureProductForm;

import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import ProductHeader from './components/ProductHeader';
import ProductForm from './components/ProductForm';

function Product(props) {
	const { itemNumber } = useParams();
	const [form, setForm] = useState(null);
	const [tabIdx, setTabIdx] = useState(0);
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getProduct();
	}, [itemNumber]);

	const getProduct = async () => {
		if (itemNumber === 'new') {
			setForm({
				efreshgoNo: '',
				itemTitle: { Zh: '', En: '' },
				itemSubTitle: { Zh: '', En: '' },
				itemDescription: { Zh: null, En: null },
				itemUnit: { Zh: '', En: '' },
				itemPrice: '',
				itemSalesPrice: '',
				minimumUnit:'',
				itemCategory: [],
				itemParentCategory: [],
				isTaxable: '',
				itemTag: { Zh: [], En: [] },
				itemImages: [],
				language: 'Zh'
			});
		} else {
			const query = { isGetAdmin: '1' };
			const { data } = await axios.post('/itemModule.php', query);
			const product = data.data.filter(product => product.Zh.itemNumber === itemNumber)[0];
			
			if(!product){
				window.alert('未找到该商品')
				setTimeout(() => {
					props.history.push('/product/products')
				}, 1000)
			}
			setForm({
				efreshgoNo: product.Zh.efreshgoNo,
				itemNumber: product.Zh.itemNumber,
				itemTitle: { Zh: product.Zh.itemTitle, En: product.En.itemTitle },
				itemSubTitle: { Zh: product.Zh.itemSubTitle, En: product.En.itemSubTitle },
				itemDescription: { Zh: product.Zh.itemDescription, En: product.En.itemDescription },
				itemUnit: { Zh: product.Zh.itemUnit, En: product.En.itemUnit },
				itemPrice: product.Zh.itemPrice,
				itemSalesPrice: product.Zh.itemSalesPrice,
				minimumUnit: !product.Zh.minimumUnit ? '': product.Zh.minimumUnit,
				itemCategory: product.Zh.itemCategory,
				itemParentCategory: product.Zh.itemParentCategory,
				isTaxable: product.Zh.isTaxable,
				itemTag: { Zh: product.Zh.itemTag, En: product.En.itemTag },
				itemImages: product.Zh.itemImages,
				language: 'Zh'
			});
		}
	};

	function handleChangeTab(event, value) {
		setTabIdx(value);
	}

	if (!form || loading) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert severity="success">{alert.message}</Alert>}
				<FusePageCarded
					classes={{
						toolbar: 'p-0',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<ProductHeader {...props} form={form} setAlert={setAlert} setLoading={setLoading} />}
					contentToolbar={
						<Tabs
							value={tabIdx}
							onChange={handleChangeTab}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64' }}
						>
							<Tab className="h-64 normal-case" label="中文基本信息" />
							<Tab className="h-64 normal-case" label="英文基本信息" />
							<Tab className="h-64 normal-case" label="商品图片" />
							<Tab className="h-64 normal-case" label="商品中文介绍" />
							<Tab className="h-64 normal-case" label="商品英文介绍" />
							<Tab className="h-64 normal-case" label="价格" />
						</Tabs>
					}
					content={<ProductForm form={form} setForm={setForm} tabIdx={tabIdx} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Product);

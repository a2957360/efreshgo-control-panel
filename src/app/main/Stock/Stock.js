import React, { useEffect, useState } from 'react';
//packages
import * as qs from 'query-string';
import { useForm } from '@fuse/hooks';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import StockHeader from './components/StockHeader';
import StockForm from './components/StockForm';
import { Alert } from '@material-ui/lab';
// import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
// import { Button, Icon, Tab, Tabs, TextField, MenuItem, Typography } from '@material-ui/core';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, withRouter } from 'react-router-dom';
// import { getProductCategories, selectProductCategories } from '../store/productCategoriesSlice';
// // import ImagesUpload from '../components/ImagesUpload';

// //packages
// import _ from '@lodash';
// import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/index.css';
// import axios from '../../../global/axios';
// //components
// import ProductHeader from './components/ProductHeader';
// import ProductForm from './components/ProductForm';

// //params

//reducer
import reducer from '../store';
import withReducer from 'app/store/withReducer';

// import { newProduct, getProduct } from '../store/ProductStore/ProductSlice';

function Stock(props) {
	const { stockId, storeNumber } = qs.parse(props.location.search);
	const { form, handleChange, setForm } = useForm(null);
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getStockDetail();
	}, [stockId]);

	const getStockDetail = async () => {
		if (stockId == 'new') {
			setForm({
				storeNumber: storeNumber,
				itemNumber: '',
				stockTotal: 0,
				stockForPickup: 0,
				stockForSell: 0
			});
		} else {
			const query = { isGetAdmin: 1, storeNumber, language: 'Zh' };
			const { data } = await axios.post('/stockModule.php', query);
			const result = data.data.filter(stock => stock.stockId === stockId)[0];
			setForm(result);
		}
	};

	if (!form) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert>{alert.message}</Alert>}

				<FusePageCarded
					classes={{
						toolbar: 'p-0',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={form && <StockHeader {...props} form={form} setAlert={setAlert} setLoading={setLoading} />}
					// contentToolbar={
					// 	<Tabs
					// 		value={0}
					// 		onChange={handleChangeTab}
					// 		indicatorColor="primary"
					// 		textColor="primary"
					// 		variant="scrollable"
					// 		scrollButtons="auto"
					// 		classes={{ root: 'w-full h-64' }}
					// 	>
					// 		<Tab className="h-64 normal-case" label="库存信息" />
					// 	</Tabs>
					// }
					content={
						form && (
							<StockForm loading={loading} form={form} setForm={setForm} handleChange={handleChange} />
						)
					}
					innerScroll
				/>
			</>
		);
	}
}
export default withRouter(Stock);
// export default withReducer('main', reducer)(Stock);

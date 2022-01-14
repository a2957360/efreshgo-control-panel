//packages
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
// import _ from '@lodash';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ProductCategoryHeader from './components/ProductCategoryHeader';
import ProductCategoryForm from './components/ProductCategoryForm';

function ProductCategory(props) {
	const { categoryNumber } = useParams();
	const [form, setForm] = useState(null);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getMainCategory();
	}, [categoryNumber]);

	const getMainCategory = async () => {
		if (categoryNumber === 'new') {
			setForm({
				categoryTitle: { Zh:'', En:'' },
				categoryImages: '',
				language: 'Zh'
			});
		} else {
			const query = { isGetAdmin: 1, categoryType: 0, categoryParentId: 0 };
			const { data } = await axios.post('/categoryModule.php', query);
			const category = data.data.filter(category => category.Zh.categoryNumber === categoryNumber)[0]
			console.log(category)
			setForm({
				categoryNumber: category.Zh.categoryNumber,
				categoryTitle: { Zh:category.Zh.categoryTitle, En:category.En.categoryTitle },
				categoryImages: category.Zh.categoryImages,
				language: 'Zh'
			});
		}
	};

	if (!form) {
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
					header={<ProductCategoryHeader {...props} form={form} setAlert={setAlert} />}
					content={<ProductCategoryForm form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ProductCategory);

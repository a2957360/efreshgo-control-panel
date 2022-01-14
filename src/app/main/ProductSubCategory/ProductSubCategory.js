//packages
import React, { useEffect, useState } from 'react';
import axios from '../../../global/axios';
import { useParams, withRouter } from 'react-router-dom';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ProductCategoryHeader from './components/ProductSubCategoryHeader';
import ProductCategoryForm from './components/ProductSubCategoryForm';
import { Alert } from '@material-ui/lab';

function ProductSubCategory(props) {
	const { categoryNumber } = useParams();
	const [form, setForm] = useState(null);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getSubCategory();
	}, [categoryNumber]);

	const getSubCategory = async () => {
		if (categoryNumber === 'new') {
			setForm({
				categoryTitle: { Zh: '', En: '' },
				categoryImages: '',
				categoryParentId: '',
				language: 'Zh'
			});
		} else {
			const query = { isGetAdmin: 1, categoryType: 0 };
			const { data } = await axios.post('/categoryModule.php', query);
			const category = data.data.filter(category => category.Zh.categoryNumber === categoryNumber)[0];
			setForm({
				categoryNumber: category.Zh.categoryNumber,
				categoryTitle: { Zh: category.Zh.categoryTitle, En: category.En.categoryTitle },
				categoryImages: category.Zh.categoryImages,
				categoryParentId: category.Zh.categoryParentId,
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
					header={<ProductCategoryHeader {...props} form={form} setAlert={setAlert}/>}
					content={<ProductCategoryForm form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ProductSubCategory);

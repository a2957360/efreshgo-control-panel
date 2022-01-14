//packages
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import RecipeCategoryHeader from './components/RecipeCategoryHeader';
import RecipeCategoryForm from './components/RecipeCategoryForm';

function RecipeCategory(props) {
	const { categoryNumber } = useParams();
	const [form, setForm] = useState(null);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getRecipeCategory();
	}, [categoryNumber]);

	const getRecipeCategory = async () => {
		if (categoryNumber === 'new') {
			setForm({
				categoryTitle: { Zh: '', En: '' },
				categoryImages: '',
				categoryType: 1,
				language: 'Zh'
			});
		} else {
			const query = { isGetAdmin: 1, categoryType: 1 };
			const { data } = await axios.post('/categoryModule.php', query);
			const category = data.data.filter(category => category.Zh.categoryNumber === categoryNumber)[0];
			if (!category) {
				window.alert('未找到该菜谱分类');
				setTimeout(() => {
					props.history.push('/recipe/categories');
				}, 1000);
			} else {
				setForm({
					categoryNumber: category.Zh.categoryNumber,
					categoryTitle: { Zh: category.Zh.categoryTitle, En: category.En.categoryTitle },
					categoryImages: category.Zh.categoryImages,
					categoryType: 1,
					language: 'Zh'
				});
			}
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
					header={<RecipeCategoryHeader {...props} form={form} setAlert={setAlert} />}
					content={<RecipeCategoryForm form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RecipeCategory);

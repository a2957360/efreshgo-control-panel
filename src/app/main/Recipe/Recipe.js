import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import RecipeHeader from './components/RecipeHeader';
import RecipeForm from './components/RecipeForm';

function Recipe(props) {
	const { cookbookNumber } = useParams();
	const [form, setForm] = useState(null);
	const [tabIdx, setTabIdx] = useState(0);
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCookbook();
	}, [cookbookNumber]);

	const getCookbook = async () => {
		if (cookbookNumber === 'new') {
			setForm({
				cookbookTitle: { Zh: '', En: '' },
				itemList: [],
				cookbookSubTitle: { Zh: '', En: '' },
				cookbookDescription: { Zh: null, En: null },
				cookbookCategory: [],
				cookbookTag: { Zh: [], En: [] },
				cookbookImages: [],
				language: 'Zh'
			});
		} else {
			const query = { isGetAdmin: '1' };
			const { data } = await axios.post('/cookbookModule.php', query);
			const recipe = data.data.filter(recipe => recipe.Zh.cookbookNumber === cookbookNumber)[0];
			if (!recipe) {
				window.alert('未找到该菜谱');
				setTimeout(() => {
					props.history.push(`/recipe/recipes`);
				}, 1000);
			} else {
				setForm({
					cookbookNumber: recipe.Zh.cookbookNumber,
					cookbookTitle: { Zh: recipe.Zh.cookbookTitle, En: recipe.En.cookbookTitle },
					itemList: recipe.Zh.itemList,
					cookbookSubTitle: { Zh: recipe.Zh.cookbookSubTitle, En: recipe.En.cookbookSubTitle },
					cookbookDescription: { Zh: recipe.Zh.cookbookDescription, En: recipe.En.cookbookDescription },
					cookbookCategory: recipe.Zh.cookbookCategory,
					cookbookTag: { Zh: recipe.Zh.cookbookTag, En: recipe.En.cookbookTag },
					cookbookImages: recipe.Zh.cookbookImages,
					language: 'Zh'
				});
			}
		}
	};

	function handleChangeTab(event, value) {
		setTabIdx(value);
	}

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
					header={<RecipeHeader {...props} form={form} setAlert={setAlert} setLoading={setLoading} />}
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
							<Tab className="h-64 normal-case" label="菜谱图片" />
							<Tab className="h-64 normal-case" label="做法详解（中文）" />
							<Tab className="h-64 normal-case" label="做法详解（英文）" />
						</Tabs>
					}
					content={
						<RecipeForm
							form={form}
							setForm={setForm}
							tabIdx={tabIdx}
							setAlert={setAlert}
							loading={loading}
							setLoaidng={setLoading}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Recipe);

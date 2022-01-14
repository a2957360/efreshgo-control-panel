import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../global/axios';
import { withRouter } from 'react-router-dom';
//components
import { Alert } from '@material-ui/lab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import RecipeCategoriesHeader from './components/RecipeCategoriesHeader';
import RecipeCategoriesTable from './components/RecipeCategoriesTable';

function RecipeCategories(props) {
	const [data, setData] = useState();
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getRecipeCategories();
	}, []);

	const getRecipeCategories = async () => {
		// const query = { isGet: 1, categoryType: 0, categoryParentId: 0 };
		// const { data } = await axios.post('/categoryModule.php', query);
		// const result = data.data.map(category => category.Zh);
		// setData(result);

		const query = { isGet: 1, categoryType: 1, language: 'Zh' };
		const { data } = await axios.post('/categoryModule.php', query);
		setData(data.data);

		// return result.data.data;
	};

	if (!data) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert severity="success">{alert.message}</Alert>}

				<FusePageCarded
					classes={{
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<RecipeCategoriesHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<RecipeCategoriesTable
							{...props}
							data={data}
							searchText={searchText}
							getRecipeCategories={getRecipeCategories}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RecipeCategories);

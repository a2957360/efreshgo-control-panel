import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import RecipesHeader from './components/RecipesHeader';
import RecipesTable from './components/RecipesTable';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Recipes(props) {
	const [data, setData] = useState();
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getRecipeList();
	}, []);

	const getRecipeList = async () => {
		const { data } = await axios.post('/cookbookModule.php', { isGetAdmin: 1 });
		const result = data.data.map(recipe => {
			return recipe.Zh;
		});
		setData(result);
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
					header={<RecipesHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<RecipesTable
							{...props}
							data={data}
							searchText={searchText}
							getRecipeList={getRecipeList}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Recipes);

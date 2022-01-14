import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import RecipeAdHeader from './components/RecipeAdHeader';
import RecipeAdForm from './components/RecipeAdForm';
import FuseLoading from '@fuse/core/FuseLoading';

function RecipeAd(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getCookAd();
	}, []);

	const getCookAd = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const recipeAdsData = data.data.filter(layout => layout.componentTitle == 'cookAdvertisement')[0];
		setData(recipeAdsData);
	};

	if (!data) {
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
					header={<RecipeAdHeader {...props} data={data} setAlert={setAlert} />}
					content={<RecipeAdForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RecipeAd);

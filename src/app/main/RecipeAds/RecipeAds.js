import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import RecipeAdsHeader from './components/RecipeAdsHeader';
import RecipeAdsTable from './components/RecipeAdsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function RecipeAds(props) {
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadAds();
	}, []);

	const loadAds = async () => {
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
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<RecipeAdsHeader data={data} searchText={searchText} setSearchText={setSearchText} />}
					content={<RecipeAdsTable data={data} searchText={searchText} setAlert={setAlert} loadAds={loadAds}/>}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RecipeAds);

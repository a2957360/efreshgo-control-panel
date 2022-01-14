import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import DoubleAdsHeader from './components/DoubleAdsHeader';
import DoubleAdsTable from './components/DoubleAdsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Ads(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		loadAds();
	}, []);

	const loadAds = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const doubleAdsData = data.data.filter(layout => layout.componentTitle == 'homeAdvertisement')[0];
		setData(doubleAdsData);
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
					header={<DoubleAdsHeader data={data} searchText={searchText} setSearchText={setSearchText} setAlert={setAlert} />}
					content={<DoubleAdsTable data={data} searchText={searchText} setAlert={setAlert} loadAds={loadAds} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Ads);

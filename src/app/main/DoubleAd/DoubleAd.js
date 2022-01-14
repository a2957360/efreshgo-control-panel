import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import FuseLoading from '@fuse/core/FuseLoading';
import DoubleAdHeader from './components/DoubleAdHeader';
import DoubleAdForm from './components/DoubleAdForm';

function DoubleAd(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getDoubleAds();
	}, []);

	const getDoubleAds = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const doubleAdsData = data.data.filter(layout => layout.componentTitle === 'homeAdvertisement')[0];
		// console.log('doubleAd', doubleAdsData)
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
						toolbar: 'p-0',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<DoubleAdHeader {...props} data={data} setAlert={setAlert} />}
					content={<DoubleAdForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(DoubleAd);

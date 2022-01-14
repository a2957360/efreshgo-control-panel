import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import SectionAdHeader from './components/SectionAdHeader';
import SectionAdForm from './components/SectionAdForm';
import FuseLoading from '@fuse/core/FuseLoading';

function RecipeAd(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getSectionAds();
	}, []);

	const getSectionAds = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const doubleAdsData = data.data.filter(layout => layout.componentTitle === 'sectionAdvertisement')[0];
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
					header={<SectionAdHeader {...props} data={data} setAlert={setAlert} />}
					content={<SectionAdForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RecipeAd);

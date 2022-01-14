import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FeatureProductsHeader from './components/GridProductsHeader';
import FeatureProductsTable from './components/GridProductsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function SectionAds(props) {
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadFeatureProducts();
	}, []);

	const loadFeatureProducts = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const featureProductsData = data.data.filter(layout => layout.componentTitle == 'productGrid')[0];
		setData(featureProductsData);
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
					header={<FeatureProductsHeader data={data} searchText={searchText} setSearchText={setSearchText} />}
					content={
						<FeatureProductsTable
							data={data}
							searchText={searchText}
							loadFeatureProducts={loadFeatureProducts}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(SectionAds);

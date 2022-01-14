import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import FeatureProductHeader from './components/GridProductHeader';
import FeatureProductForm from './components/GridProductForm';

function FeatureProduct(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getFeatureProducts();
	}, []);

	const getFeatureProducts = async () => {
		const query = { isGetAdmin: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const featureProductsData = data.data.filter(layout => layout.componentTitle === 'productGrid')[0];
		setData(featureProductsData);
	};

	return (
		<>
			{alert.show && <Alert severity="success">{alert.message}</Alert>}
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<FeatureProductHeader {...props} data={data} setAlert={setAlert} />}
				content={<FeatureProductForm {...props} data={data} setAlert={setAlert} />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(FeatureProduct);

import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import RollingProductHeader from './components/CarouselProductHeader';
import RollingProductForm from './components/CarouselProductForm';

function RollingProduct(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getRollingProducts();
	}, []);

	const getRollingProducts = async () => {
		const query = { isGetAdmin: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const rollingProductsData = data.data.filter(layout => layout.componentTitle === 'productCarousels')[0];
		setData(rollingProductsData);
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
					header={<RollingProductHeader />}
					content={<RollingProductForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RollingProduct);

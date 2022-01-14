import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//packages
import axios from '../../../global/axios';

//components
import RollingProductsHeader from './components/CarouselProductsHeader';
import RollingProductsTable from './components/CarouselProductsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function RollingProducts(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		loadRollingProducts();
	}, []);

	const loadRollingProducts = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const rollingProductsData = data.data.filter(layout => layout.componentTitle == 'productCarousels')[0];
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
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<RollingProductsHeader data={data} searchText={searchText} setSearchText={setSearchText} />}
					content={
						<RollingProductsTable
							data={data}
							searchText={searchText}
							loadRollingProducts={loadRollingProducts}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(RollingProducts);

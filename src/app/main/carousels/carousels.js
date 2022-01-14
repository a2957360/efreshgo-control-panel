import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import { Alert } from '@material-ui/lab';
import CarouselsHeader from './components/CarouselsHeader';
import CarouselsTable from './components/CarouselsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

// import withReducer from 'app/store/withReducer';
// import reducer from '../store';

function Carousels(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();
	const [displayData, setDisplayData] = useState();

	useEffect(() => {
		loadCarousels();
	}, []);

	const loadCarousels = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const carouselData = data.data.filter(layout => layout.componentTitle == 'homeBanner')[0];
		setData(carouselData);
		// console.log(carouselData)
		const rebuild = carouselData.componentContent.Zh.map((carousel, index) => {
			return { ...carousel, uri_en: carouselData.componentContent.En[index].uri };
		});
		setDisplayData(rebuild);
	};

	if (!data || !displayData) {
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
					header={<CarouselsHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<CarouselsTable
							data={data}
							displayData={displayData}
							searchText={searchText}
							setAlert={setAlert}
							loadCarousels={loadCarousels}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Carousels);

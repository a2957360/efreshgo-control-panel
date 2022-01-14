import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import CarouselHeader from './components/CarouselHeader';
import CarouselForm from './components/CarouselForm';

function Carousel(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getCarousels();
	}, []);

	const getCarousels = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const carouselData = data.data.filter(layout => layout.componentTitle === 'homeBanner')[0];
		setData(carouselData);
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
					header={<CarouselHeader {...props} data={data} setAlert={setAlert} />}
					content={<CarouselForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Carousel);

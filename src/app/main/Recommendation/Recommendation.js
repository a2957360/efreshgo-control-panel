import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import RecommendationHeader from './components/RecommendationHeader';
import RecommendationForm from './components/RecommendationForm';

function Recommendation(props) {
	// const [searchText, setSearchText] = useState('');
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadRecommendations();
	}, []);

	const loadRecommendations = async () => {
		const query = { isGet: 1, recommendType: 0, language: 'Zh' };
		const { data } = await axios.post('/recommendModule.php', query);
		setData(data.data[0]);
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
					header={<RecommendationHeader />}
					content={<RecommendationForm {...props} data={data} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Recommendation);

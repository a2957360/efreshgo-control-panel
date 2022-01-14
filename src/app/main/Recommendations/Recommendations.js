import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//packages
import axios from '../../../global/axios';

//components
import RecommendationsHeader from './components/RecommendationsHeader';
import RecommendationsTable from './components/RecommendationsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function Recommendations(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	return (
		<>
			{alert.show && <Alert severity="success">{alert.message}</Alert>}

			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<RecommendationsHeader searchText={searchText} setSearchText={setSearchText} />}
				content={<RecommendationsTable searchText={searchText} setAlert={setAlert} />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Recommendations);

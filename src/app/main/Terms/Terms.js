import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios'

//components
import TermsHeader from './components/TermsHeader';
import TermsContent from './components/TermsContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function Terms(props) {
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadTerms();
	}, []);

	const loadTerms = async () => {
		const query = { isGet: 1, infoType: 1 };
		const { data } = await axios.post('/infoModule.php', query);
        setData(data.data[0])
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
					header={<TermsHeader />}
					content={<TermsContent data={data} searchText={searchText} setAlert={setAlert} loadTerms={loadTerms}/>}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Terms);

import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios'
//components
import PrivacyHeader from './components/PrivacyHeader';
import PrivacyContent from './components/PrivacyContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function Privacy(props) {
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadPrivacy();
	}, []);

	const loadPrivacy = async () => {
		const query = { isGet: 1, infoType: 1 };
		const { data } = await axios.post('/infoModule.php', query);
        setData(data.data[1])
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
					header={<PrivacyHeader />}
					content={<PrivacyContent data={data} setAlert={setAlert} loadPrivacy={loadPrivacy}/>}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Privacy);

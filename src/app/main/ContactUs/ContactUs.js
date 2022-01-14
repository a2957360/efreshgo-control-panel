import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import ContactUsHeader from './components/ContactUsHeader';
import ContactUsForm from './components/ContactUsForm';

function ContactUs(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		loadContactUsInfo();
	}, []);

	const loadContactUsInfo = async () => {
		const query = { isGet: 1, infoType: 0 };
		const { data } = await axios.post('/infoModule.php', query);
		// console.log(data.data)
		setData(data.data);
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
					header={<ContactUsHeader />}
					content={
						<ContactUsForm {...props} data={data} setAlert={setAlert} loadContactUsInfo={loadContactUsInfo} />
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ContactUs);

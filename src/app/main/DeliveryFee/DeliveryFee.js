import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import DeliveryFeeHeader from './components/DeliveryFeeHeader';
import DeliveryFeeForm from './components/DeliveryFeeForm';

function DeliveryFee(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		loadFeeInfo();
	}, []);

	const loadFeeInfo = async () => {
		const query = { isGet: 1, infoType: 2 };
		const { data } = await axios.post('/infoModule.php', query);
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
					header={<DeliveryFeeHeader />}
					content={<DeliveryFeeForm {...props} data={data} setAlert={setAlert} loadFeeInfo={loadFeeInfo} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(DeliveryFee);

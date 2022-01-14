import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import CouponsHeader from './components/CouponsHeader';
import CouponsTable from './components/CouponsTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';

function Coupons(props) {
	const [data, setData] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getCouponData();
	}, []);

	const getCouponData = async () => {
		const query = { isGet: '1', admin: '1' };
		const { data } = await axios.post('/couponModule.php', query);
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
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<CouponsHeader />}
					content={<CouponsTable data={data} getCouponData={getCouponData} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Coupons);

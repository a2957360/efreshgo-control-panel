import React, { useEffect, useState } from 'react';
//packages
import { useParams } from 'react-router-dom';
import axios from '../../../global/axios';
import { withRouter } from 'react-router-dom';

//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CouponHeader from './components/CouponHeader';
import CouponForm from './components/CouponForm';

function Coupon(props) {
	const { couponNumber } = useParams();
	const [form, setForm] = useState(null);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getCoupon();
	}, []);

	const getCoupon = async () => {
		if (couponNumber === 'new') {
			setForm({
				couponRate: '',
				couponRequiredPrice: '',
				couponType: '',
				couponStartDate: '',
				couponEndDate: ''
			});
		} else {
			const query = { isGet: 1, admin: 1, couponNumber };
			const { data } = await axios.post('/couponModule.php', query);
			setForm(data.data[0]);
		}
	};

	if (!form) {
		//(!product || (product && routeParams._id !== product._id)) && routeParams.id !== 'new'
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
					header={<CouponHeader {...props} form={form} setAlert={setAlert}/>}
					contentToolbar={
						<Tabs
							value={0}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64' }}
						>
							<Tab className="h-64 normal-case" label="优惠券信息" />
						</Tabs>
					}
					content={
						<CouponForm {...props} form={form} setForm={setForm} setAlert={setAlert} />
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Coupon);

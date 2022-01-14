import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
// import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import OrderHeader from './components/OrderHeader';
import OrderDetail from './components/OrderDetail';

function Order(props) {
	const { orderNumber } = useParams();
	const [form, setForm] = useState(null);
	// const [tabIdx, setTabIdx] = useState(0);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getOrderDetail();
	}, [orderNumber]);

	const getOrderDetail = async () => {
			const query = { isGet: 1, orderNumber };
            const { data } = await axios.post('/orderModule.php', query);
            // const userData = data.data.filter(user => user.userNumber == userNumber);
            // console.log('manager', userData[0])
			if(!data.data){
				window.alert('未找到该订单')
				setTimeout(() => {
					props.history.push('/order/orders')
				}, 1000)
			}else{
				setForm(data.data[0]);
			}
	};

	// function handleChangeTab(event, value) {
	// 	setTabIdx(value);
	// }

	if (!form) {
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
					header={<OrderHeader {...props} form={form} setAlert={setAlert}/>}
					// contentToolbar={
					// 	<Tabs
					// 		value={tabIdx}
					// 		onChange={handleChangeTab}
					// 		indicatorColor="primary"
					// 		textColor="primary"
					// 		variant="scrollable"
					// 		scrollButtons="auto"
					// 		classes={{ root: 'w-full h-64' }}
					// 	>
					// 		<Tab className="h-64 normal-case" label="中文基本信息" />
					// 		<Tab className="h-64 normal-case" label="英文基本信息" />
					// 		<Tab className="h-64 normal-case" label="商品图片" />
					// 		<Tab className="h-64 normal-case" label="商品中文介绍" />
					// 		<Tab className="h-64 normal-case" label="商品英文介绍" />
					// 		<Tab className="h-64 normal-case" label="价格" />
					// 	</Tabs>
					// }
					content={<OrderDetail {...props} form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Order);

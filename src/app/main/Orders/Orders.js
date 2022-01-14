import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import OrdersHeader from './components/OrdersHeader';
import OrdersTable from './components/OrdersTable';
import FuseLoading from '@fuse/core/FuseLoading';

const status = [
	'未付款',
	'已付款',
	'待接单',
	'备货中',
	'待取货',
	'配送中',
	'待收货',
	'待评价',
	'已完成',
	'申请退款',
	'已退款',
	'拒绝退款'
];

function Orders(props) {
	const [alert, setAlert] = useState({ show: false, severity:'', message: '' });
	const [orderState, setOrderState] = useState('all');
	const [data, setData] = useState();
	const [displayData, setDisplayData] = useState();
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		searchOrder();
	}, [orderState]);

	useEffect(() => {
		loadOrderData();
	}, []);

	const loadOrderData = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/orderModule.php', query);
		setData(data.data);
		setDisplayData(data.data);
	};

	const searchOrder = () => {
		if (orderState === 'all') {
			setDisplayData(data);
			return;
		}
		const filterData = data.filter(order => order.orderState === orderState);
		setDisplayData(filterData);
	};

	if (!displayData) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
				<FusePageCarded
					classes={{
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={
						<OrdersHeader
							orderState={orderState}
							setOrderState={setOrderState}
							status={status}
							searchText={searchText}
							setSearchText={setSearchText}
						/>
					}
					content={
						<OrdersTable
							{...props}
							data={displayData}
							setAlert={setAlert}
							loadOrderData={loadOrderData}
							searchText={searchText}
							status={status}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Orders);

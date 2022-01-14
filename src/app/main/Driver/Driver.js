import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import DriverHeader from './components/DriverHeader';
import DriverForm from './components/DriverForm';

function Driver(props) {
	const { userNumber } = useParams();
	const [form, setForm] = useState(null);
	// const [tabIdx, setTabIdx] = useState(0);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getDriver();
	}, [userNumber]);

	const getDriver = async () => {
			const query = { isGet: 1, userRole: 2 };
			const { data } = await axios.post('/userModule.php', query);
            const driver = data.data.filter(driver => driver.userNumber == userNumber);
            console.log('get driver', driver)
			if(!driver){
				window.alert('未找到该骑手')
				setTimeout(() => {
					props.history.push('/user/drivers')
				}, 1000)
			}else{
				setForm(driver[0]);
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
					header={<DriverHeader {...props} form={form} setAlert={setAlert}/>}
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
					content={<DriverForm {...props} form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Driver);

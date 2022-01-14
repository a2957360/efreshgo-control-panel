import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';

//components
import FusePageCarded from '@fuse/core/FusePageCarded';
// import { Tab, Tabs } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab';
import ManagerHeader from './components/ManagerHeader';
import ManagerDetail from './components/ManagerDetail';

function Manager(props) {
	const { userNumber } = useParams();
	const [form, setForm] = useState(null);
	// const [tabIdx, setTabIdx] = useState(0);
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getManagerData();
	}, [userNumber]);

	const getManagerData = async () => {
			const query = { isGet: 1, userRole: 1 };
			const { data } = await axios.post('/userModule.php', query);
            const userData = data.data.filter(user => user.userNumber == userNumber);
            console.log('manager', userData[0])
			if(!userData){
				window.alert('未找到该商家用户')
				setTimeout(() => {
					props.history.push('/user/managers')
				}, 1000)
			}else{
				setForm(userData[0]);
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
					header={<ManagerHeader {...props} form={form} setAlert={setAlert}/>}
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
					content={<ManagerDetail {...props} form={form} setForm={setForm} setAlert={setAlert} />}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Manager);

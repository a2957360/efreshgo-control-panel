import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import { Alert } from '@material-ui/lab';
import CustomersHeader from './components/CustomersHeader';
import CustomersTable from './components/CustomersTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function Customers(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		loadCustomers();
	}, []);

	const loadCustomers = async () => {
		const query = { isGet: 1, userRole: 0 };
		const { data } = await axios.post('/userModule.php', query);
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
					header={<CustomersHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<CustomersTable
							data={data}
							searchText={searchText}
							setAlert={setAlert}
							loadCustomers={loadCustomers}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Customers);

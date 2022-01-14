import React, { useState, useEffect } from 'react';
//packages
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import axios from '../../../global/axios';
import * as qs from 'query-string';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import StocksHeader from './components/StocksHeader';
import StocksTable from './components/StocksTable';

function Stocks(props) {
	const { storeNumber } = qs.parse(props.location.search);
	const [searchText, setSearchText] = useState('')
	const [store, setStore] = useState();
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		loadStore();
	}, [storeNumber]);

	const loadStore = async () => {
		if (!storeNumber) {
			return;
		}
		const query = { isGet: 1, storeNumber };
		const { data } = await axios.post('/storeModule.php', query);
		setStore(data.data[0]);
	};

	return (
		<>
			{alert.show && <Alert>{alert.message}</Alert>}
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<StocksHeader {...props} store={store} setAlert={setAlert} searchText={searchText} setSearchText={setSearchText} />}
				content={<StocksTable {...props} setAlert={setAlert} searchText={searchText} />}
				innerScroll
			/>
		</>
	);
}

export default withReducer('main', reducer)(Stocks);

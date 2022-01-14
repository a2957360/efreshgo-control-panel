import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import { Alert } from '@material-ui/lab';
import ProfitReportHeader from './components/ProfitReportHeader';
import ProfitReportTable from './components/ProfitReportTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function ProfitReport(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [storeNumber, setStoreNumber] = useState(0);
	const [stores, setStores] = useState();
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [data, setData] = useState();

	useEffect(() => {
		loadStores();
	}, []);

	useEffect(() => {
		loadProfitData();
	}, [storeNumber, start, end]);

	const loadStores = async () => {
		const query = { isGetAdmin: '1' };
		const result = await axios.post('/storeModule.php', query);
		const data = result.data.data.map(branch => {
			return branch.Zh;
		});
		setStores(data);
	};

	const loadProfitData = async () => {
		setData()
		if (start === '' && end === '') {
			const result = await axios.post('/getStoreReport.php');
			setData(result.data.data);
			return;
		}
		const query = { startDate: start, endDate: end };
		const result = await axios.post('/getStoreReport.php', query);
		setData(result.data.data);
	};

	if (!stores || !data) {
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
					header={
						<ProfitReportHeader
							stores={stores}
							storeNumber={storeNumber}
							setStoreNumber={setStoreNumber}
							start={start}
							setStart={setStart}
							end={end}
							setEnd={setEnd}
							setAlert={setAlert}
							data={data}
						/>
					}
					content={
						<ProfitReportTable
							start={start}
							end={end}
							setAlert={setAlert}
							storeNumber={storeNumber}
							data={data}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ProfitReport);

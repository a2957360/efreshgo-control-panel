import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
import * as qs from 'query-string';

//components
import { Alert } from '@material-ui/lab';
import DailyReportHeader from './components/DailyReportComponents/DailyReportHeader';
import DailyReportTable from './components/DailyReportComponents/DailyReportTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function DailySalesReport(props) {
	const { startDate, endDate  } = qs.parse(props.location.search);
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();
	const [storeNumber, setStoreNumber] = useState(0);
	const [stores, setStores] = useState();

	useEffect(() => {
		loadStores();
		loadReportData();
	}, []);

	const loadStores = async () => {
		const query = { isGetAdmin: '1' };
		const result = await axios.post('/storeModule.php', query);
		const data = result.data.data.map(branch => {
			return branch.Zh;
		});
		setStores(data);
	};

	const loadReportData = async () => {
		const result = await axios.post('/getStockReport.php', { startDate: `${startDate} 20:00:00`, endDate: `${endDate} 20:00:00` });
		setData(result.data.data);
		// setDisplayData(result.data.data.sumData);
		// console.log(result.data.data.sumData);
		return;
	};

	if (!data || !stores) {
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
						<DailyReportHeader
							data={data}
							stores={stores}
							storeNumber={storeNumber}
							setStoreNumber={setStoreNumber}
							startDate={startDate}
							endDate={endDate}
							// setAlert={setAlert}
						/>
					}
					content={
						<DailyReportTable
							data={data}
							// displayData={displayData}
							// setDisplayData={setDisplayData}
							// setAlert={setAlert}
							storeNumber={storeNumber}
							// loading={loading}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(DailySalesReport);

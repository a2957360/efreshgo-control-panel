import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
import * as qs from 'query-string';

//components
import { Alert } from '@material-ui/lab';
import YearlyReportHeader from './components/YearlyReportComponents/YearlyReportHeader';
import YearlyReportTable from './components/YearlyReportComponents/YearlyReportTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function YearlySalesReport(props) {
	const { startDate } = qs.parse(props.location.search);

	// const [reportType, setReportType] = useState({ type: '', startDate:'', endDate:'', month: '', year: '' });
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
		const result = await axios.post('/getYearReport.php', { startDate });
		setData(result.data.data);
		// if(storeNumber == 0){
		// 	setDisplayData(result.data.data.sumData);
		// }else{
		// 	const dataToDisplay = result.data.data.storeData.filter(record => record.storeNumber === storeNumber)
		// 	console.log(dataToDisplay)
		// 	setDisplayData(dataToDisplay);
		// }
		// return;
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
						<YearlyReportHeader
							data={data}
							stores={stores}
							storeNumber={storeNumber}
							setStoreNumber={setStoreNumber}
							startDate={startDate}
							// setAlert={setAlert}
						/>
					}
					content={
						<YearlyReportTable
							data={data}
							storeNumber={storeNumber}
							// setAlert={setAlert}
							// loading={loading}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(YearlySalesReport);

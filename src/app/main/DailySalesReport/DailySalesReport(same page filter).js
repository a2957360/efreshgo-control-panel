import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import { Alert } from '@material-ui/lab';
import DailySalesReportHeader from './components/DailySalesReportHeader';
import DailySalesReportTable from './components/DailySalesReportTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function DailySalesReport(props) {
	const [reportType, setReportType] = useState({ type: '', startDate:'', endDate:'', month: '', year: '' });
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();
	const [displayData, setDisplayData] = useState([]);

	const handleSubmit = async () => {
		if (reportType.type == 'year') {
			const result = await axios.post('/getYearReport.php', { startDate: reportType.year });
			setData(result.data.data);
			console.log(result.data.data.sumData);
			setDisplayData(result.data.data.sumData);
			return;
		}
		if (reportType.type == 'month') {
			const query = { queryMonth: `${reportType.year}-${reportType.month}` };
			const result = await axios.post('/getStockReport.php', query);
			setData(result.data.data);
			setDisplayData(result.data.data.sumData);
			return;
		}
		if (reportType.type == 'date') {
			const query = { startDate: reportType.startDate, endDate: reportType.endDate };
			const result = await axios.post('/getStockReport.php', query);
			setData(result.data.data);
			setDisplayData(result.data.data.sumData);
			return;
		}
	};


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
					<DailySalesReportHeader
					data={data}
					reportType={reportType}
						// stores={stores}
						// storeNumber={storeNumber}
						// setStoreNumber={setStoreNumber}
						// start={start}
						// setStart={setStart}
						// end={end}
						// setEnd={setEnd}
						// setAlert={setAlert}
						// data={data}
					/>
				}
				content={
					<DailySalesReportTable
					reportType={reportType}
					setReportType={setReportType}
					data={data}
					displayData={displayData}
					setDisplayData={setDisplayData}
					handleSubmit={handleSubmit}
						// setAlert={setAlert}
						// storeNumber={storeNumber}
						// loading={loading}
					/>
				}
				innerScroll
			/>
		</>
	);
}

export default withRouter(DailySalesReport);

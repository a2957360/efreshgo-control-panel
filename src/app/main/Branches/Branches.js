import React, { useState, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
import BranchesHeader from './components/BranchesHeader';
import BranchesTable from './components/BranchesTable';
import { Alert } from '@material-ui/lab';
import FuseLoading from '@fuse/core/FuseLoading';

function Branches() {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getBranchesData();
	}, []);

	const getBranchesData = async () => {
		const query = { isGetAdmin: '1' };
		const result = await axios.post('/storeModule.php', query);
		const data = result.data.data.map(branch => {
			return branch.Zh;
		});
		setData(data);
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
					header={<BranchesHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<BranchesTable
							data={data}
							searchText={searchText}
							setAlert={setAlert}
							getBranchesData={getBranchesData}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Branches);

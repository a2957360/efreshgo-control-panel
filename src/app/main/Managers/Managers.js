import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
//components
import { Alert } from '@material-ui/lab';
import ManagersHeader from './components/ManagersHeader';
import ManagersTable from './components/ManagersTable';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Managers(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [userState, setUserState] = useState('');

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
					<ManagersHeader
						searchText={searchText}
						setSearchText={setSearchText}
						userState={userState}
						setUserState={setUserState}
						setAlert={setAlert}
					/>
				}
				content={<ManagersTable searchText={searchText} setAlert={setAlert} userState={userState} />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Managers);

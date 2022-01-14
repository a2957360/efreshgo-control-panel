import React, { useState, useEffect } from 'react';
//packages
import { withRouter } from 'react-router-dom';
//components
import { Alert } from '@material-ui/lab';
import DriversHeader from './components/DriversHeader';
import DriversTable from './components/DriversTable';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Drivers(props) {
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
					<DriversHeader
						searchText={searchText}
						setSearchText={setSearchText}
						userState={userState}
						setUserState={setUserState}
						setAlert={setAlert}
					/>
				}
				content={<DriversTable searchText={searchText} setAlert={setAlert} userState={userState} />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Drivers);

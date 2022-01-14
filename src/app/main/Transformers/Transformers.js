import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//packages

//components
import { Alert } from '@material-ui/lab';
import TransformersHeader from './components/TransformersHeader';
import TransformersTable from './components/TransformersTable';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Transformers(props) {
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	return (
		<>
			{alert.show && <Alert severity="success">{alert.message}</Alert>}

			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TransformersHeader searchText={searchText} setSearchText={setSearchText} />}
				content={<TransformersTable searchText={searchText} setAlert={setAlert}/>}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Transformers);

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//packages
import axios from '../../../global/axios';

//components
import AnnouncementsHeader from './components/AnnouncementsHeader';
import AnnouncementsTable from './components/AnnouncementsTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import { Alert } from '@material-ui/lab'

function Announcements(props) {
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState();
	const [alert, setAlert] = useState({show:false, message:''})

	useEffect(() => {
		loadAnnouncements();
	}, []);

	const loadAnnouncements = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const annoucementsData = data.data.filter(layout => layout.componentTitle == 'homeBoardCast')[0];
		setData(annoucementsData);
	};

	if (!data) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert severity='success'>{alert.message}</Alert>}
				<FusePageCarded
					classes={{
						content: 'flex',
						contentCard: 'overflow-hidden',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<AnnouncementsHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<AnnouncementsTable data={data} searchText={searchText} loadAnnouncements={loadAnnouncements} setAlert={setAlert} />
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Announcements);

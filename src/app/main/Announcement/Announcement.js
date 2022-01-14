import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AnnoucementHeader from './components/AnnoucementHeader';
import AnnouncementForm from './components/AnnouncementForm';

function Announcement(props) {
    const [alert, setAlert] = useState({ show: false, message: '' });
	const [announcements, setAnnouncements] = useState()

	useEffect(() => {
		getAnnouncements();
	}, []);

	const getAnnouncements = async () => {
		const query = { isGet: 1, language:"Zh" }
		const { data } =  await axios.post('/pageLayoutModule.php', query)
		const announcementsData = data.data.filter( layout => layout.componentTitle === 'homeBoardCast')[0]
		setAnnouncements(announcementsData)
	};

	if (!announcements) {
		return <FuseLoading />;
	} else {
		return (
			<>
				{alert.show && <Alert severity="success">{alert.message}</Alert>}
				<FusePageCarded
					classes={{
						toolbar: 'p-0',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={<AnnoucementHeader />}
					// contentToolbar={
					// 	<Tabs
					// 		value={0}
					// 		indicatorColor="primary"
					// 		textColor="primary"
					// 		variant="scrollable"
					// 		scrollButtons="auto"
					// 		classes={{ root: 'w-full h-64' }}
					// 	>
					// 		<Tab className="h-64 normal-case" label="广播信息详情" />
					// 	</Tabs>
					// }
					content={
							<AnnouncementForm
								{...props}
								data={announcements}
								setAlert={setAlert}
							/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Announcement);

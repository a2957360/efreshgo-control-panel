import React from 'react';
//packages
import { withRouter } from 'react-router-dom';
//components
import LandingHeader from './components/LandingHeader';
import LandingContent from './components/LandingContent';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Landing(props) {

	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<LandingHeader />}
				content={<LandingContent />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Landing);

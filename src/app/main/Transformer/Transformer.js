import React, { useEffect, useState } from 'react';
//packages
import { withRouter } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import TransformerHeader from './components/TransformerHeader';
import TransformerForm from './components/TransformerForm';

function Transformer(props) {
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [data, setData] = useState();

	useEffect(() => {
		getTransformers();
	}, []);

	const getTransformers = async () => {
		const query = { isGet: 1, language: 'Zh' };
		const { data } = await axios.post('/pageLayoutModule.php', query);
		const transformersData = data.data.filter(layout => layout.componentTitle === 'homeTransformer')[0];
		setData(transformersData);
	};

	return (
		<>
			{alert.show && <Alert severity="success">{alert.message}</Alert>}
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TransformerHeader {...props} data={data} setAlert={setAlert} />}
				content={<TransformerForm {...props} data={data} setAlert={setAlert} />}
				innerScroll
			/>
		</>
	);
}

export default withRouter(Transformer);

import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../global/axios';
import { withRouter } from 'react-router-dom';
//components
import { Alert } from '@material-ui/lab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import ProductCategoriesTable from './components/ProductCategoriesTable';
import ProductCategoriesHeader from './components/ProductCategoriesHeader';

function ProductMainCategories(props) {
	const [data, setData] = useState();
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getProductMainCategories();
	}, []);

	const getProductMainCategories = async () => {
		const query = { isGet: 1, categoryType: 0, categoryParentId: 0, language: 'Zh' };
		const result = await axios.post('/categoryModule.php', query);
		const data = result.data.data.filter(cat => cat.categoryParentId === '');
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
					header={<ProductCategoriesHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<ProductCategoriesTable
							{...props}
							data={data}
							searchText={searchText}
							getProductMainCategories={getProductMainCategories}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ProductMainCategories);

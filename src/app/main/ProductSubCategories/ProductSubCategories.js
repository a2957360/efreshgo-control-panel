import React, { useState, useEffect } from 'react';
//packages
import axios from '../../../global/axios';
import { withRouter } from 'react-router-dom';
//components
import { Alert } from '@material-ui/lab';
import ProductSubCategoriesHeader from './components/ProductSubCategoriesHeader';
import ProductSubCategoriesTable from './components/ProductSubCategoriesTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

function ProductSubCategories(props) {
	const [data, setData] = useState();
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });

	useEffect(() => {
		getProductSubCategories();
	}, []);

	const getProductSubCategories = async () => {
		const { data } = await axios.post('/categoryModule.php', { isGet: '1', categoryType: '0', language: 'Zh' });
		const result = data.data.filter(category => category.categoryParentId !== '');
		setData(result);
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
					header={<ProductSubCategoriesHeader searchText={searchText} setSearchText={setSearchText} />}
					content={
						<ProductSubCategoriesTable
							{...props}
							data={data}
							searchText={searchText}
							getProductSubCategories={getProductSubCategories}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(ProductSubCategories);

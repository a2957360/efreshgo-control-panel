import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//packages
import axios from '../../../global/axios';
//components
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Alert } from '@material-ui/lab';
import ProductsHeader from './components/ProductsHeader';
import ProductsTable from './components/ProductsTable';
import FuseLoading from '@fuse/core/FuseLoading';

function Products(props) {
	const [data, setData] = useState();
	const [searchText, setSearchText] = useState('');
	const [alert, setAlert] = useState({ show: false, message: '' });
	const [subcategoryFilter, setSubcategoryFilter] = useState({categoryNumber:'', categoryTitle:''});

	useEffect(() => {
		getProductList();
	}, []);

	const getProductList = async () => {
		const result = await axios.post('/itemModule.php', { isGetAdmin: 1 });
		const data = result.data.data.map(product => {
			return product.Zh;
		});
		console.log('product', data[0])
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
					header={
						<ProductsHeader
							searchText={searchText}
							setSearchText={setSearchText}
							subcategoryFilter={subcategoryFilter}
							setSubcategoryFilter={setSubcategoryFilter}
						/>
					}
					content={
						<ProductsTable
							{...props}
							data={data}
							setData={setData}
							searchText={searchText}
							subcategoryFilter={subcategoryFilter}
							getProductList={getProductList}
							setAlert={setAlert}
						/>
					}
					innerScroll
				/>
			</>
		);
	}
}

export default withRouter(Products);

import React, { useEffect, useState } from 'react';
//packages
import { withRouter, useParams } from 'react-router-dom';
import axios from '../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import BranchHeader from './components/BranchHeader';
import BranchForm from './components/BranchForm';

// import { useDispatch, useSelector } from 'react-redux';
// import { getProductCategories, selectProductCategories } from '../store/productCategoriesSlice';
// import ImagesUpload from '../components/ImagesUpload';

function Branch(props) {
    const { storeNumber } = useParams();
	const [form, setForm] = useState(null)
    const [tabIdx, setTabIdx] = useState(0);
	const [ alert, setAlert ] = useState({show: false, message:''})
	const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBranch()
    }, [])

    const getBranch = async () => {
        if( storeNumber === 'new' ){
            setForm({
                storeName:{ Zh:'', En: ''},
                storePhone:'',
                storeEmail:'',
				storeAddress:'',
				storeLocation: {
					lat:'',
					lng:''
				},
				storeInterval:"0",
                managerUserNumber:0, 
                storeOpenTime:[['9','18'],['9','18'],['9','18'],['9','18'],['9','18'],['9','18'],['9','18'],], 
                storeImages:'',
                language:'Zh'
            })
        }else{
            const query = { isGetAdmin: 1 }
			const { data } = await axios.post('/storeModule.php', query)
			const store = data.data.filter( store => store.Zh.storeNumber === storeNumber )[0]
            setForm({
				storeNumber: store.Zh.storeNumber,
                storeName:{ Zh:store.Zh.storeName, En:store.En.storeName},
                storePhone:store.Zh.storePhone,
                storeEmail:store.Zh.storeEmail,
				storeAddress:store.Zh.storeAddress,
				storeLocation: {
					lat:store.Zh.storeLocation.lat,
					lng:store.Zh.storeLocation.lng
				},
				storeInterval:store.Zh.storeInterval,
                managerUserNumber:store.Zh.managerUserNumber, 
                storeOpenTime:store.Zh.storeOpenTime, 
                storeImages:store.Zh.storeImages,
                language:'Zh'
            })
        }
    }

    const handleChangeTab = (event, value) => {
		setTabIdx(value);
	}

    if (!form) {
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
				header={form && <BranchHeader {...props} form={form} setAlert={setAlert} setLoading={setLoading} />}
				contentToolbar={
					<Tabs
						value={tabIdx}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab className="h-64 normal-case" label="基本信息" />
                        <Tab className="h-64 normal-case" label="门店营业时间" />
						<Tab className="h-64 normal-case" label="分配管理员" />
					</Tabs>
				}
				content={form &&
						<BranchForm
							loading={loading}
							storeNumber={storeNumber}
							form={form}
							setForm={setForm}
							tabIdx={tabIdx}
                            setAlert={setAlert}
						/>
				}
				innerScroll
			/>
            </>
		);
    }
}

export default withRouter(Branch);

import React from 'react';
// packages
// components
import BranchInfo_Zh from './BranchInfo_Zh';
import BranchInfo_En from './BranchInfo_En';
import StoreHours from './StoreHours';
import AssignManager from './AssignManager';
import FuseLoading from '@fuse/core/FuseLoading';

function BranchForm(props) {
	const { form, setForm, tabIdx, storeNumber, setAlert, loading } = props;

	if(loading){
		return <FuseLoading />
	}else{
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				{tabIdx === 0 && <BranchInfo_Zh form={form} setForm={setForm} />}
	
				{tabIdx === 1 && <StoreHours {...props} form={form} setForm={setForm} />}
	
				{tabIdx === 2 && <AssignManager {...props} form={form} setForm={setForm} setAlert={setAlert}/>}
			</div>
		);
	
	}
}

export default BranchForm;

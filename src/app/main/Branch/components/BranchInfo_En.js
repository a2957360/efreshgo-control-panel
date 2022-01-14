import React from 'react';
//packages
import _ from '@lodash';

//components
import { TextField } from '@material-ui/core';

function BranchInfo_En(props) {
	const { form, setForm } = props;

	const handleChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, En: _.set({ ...form.En }, name, value) });
	};

	return (
		<div>
			<TextField
				className="mt-8 mb-16"
				error={form.En.storeName === ''}
				required
				label="Store English Name"
				autoFocus
				id="storeName_en"
				name="storeName"
				value={form.En.storeName}
				onChange={handleChange}
				variant="outlined"
				fullWidth
			/>
		</div>
	);
}

export default BranchInfo_En;

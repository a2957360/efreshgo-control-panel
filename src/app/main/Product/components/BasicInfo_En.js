import React from 'react';
//components
import { TextField } from '@material-ui/core';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';

function BasicInfo_En(props) {
	const { form, setForm } = props;

	const handleChipChange = (value) => {
		setForm({
			...form,
			itemTag:{ ...form.itemTag, En:value.map(item => item.value)}
		});
	};

	return (
		<div>
			<TextField
				className="mt-8 mb-16"
				error={form.itemTitle.En === ''}
				label="商品英文名称"
				id="itemTitle"
				name="itemTitle"
				value={form.itemTitle.En}
				onChange={event => setForm({ ...form, itemTitle: { ...form.itemTitle, En: event.target.value } })}
				variant="outlined"
				fullWidth
			/>
			<TextField
				className="mt-8 mb-16"
				error={form.itemSubTitle.En === ''}
				label="英文副标题"
				id="itemSubTitle"
				name="itemSubTitle"
				value={form.itemSubTitle.En}
				onChange={event => setForm({ ...form, itemSubTitle: { ...form.itemSubTitle, En: event.target.value } })}
				variant="outlined"
				fullWidth
			/>

			<TextField
				className="mt-8 mb-16"
				error={form.itemUnit.En === ''}
				label="英文单位"
				id="itemUnit"
				name="itemUnit"
				value={form.itemUnit.En}
				onChange={event => setForm({ ...form, itemUnit: { ...form.itemUnit, En: event.target.value } })}
				variant="outlined"
				fullWidth
			/>
			<FuseChipSelect
				className="mt-8 mb-16"
				value={form.itemTag.En.map(tag => ({
					value: tag,
					label: tag
				}))}
				onChange={value => handleChipChange(value)}
				placeholder="商品英文关键词"
				textFieldProps={{
					label: 'key words',
					InputLabelProps: {
						shrink: true
					},
					variant: 'outlined'
				}}
				isMulti
			/>
		</div>
	);
}

export default BasicInfo_En;

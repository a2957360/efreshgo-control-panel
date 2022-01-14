import React from 'react';
//components
import { TextField } from '@material-ui/core';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';

function BasicInfo_En(props) {
	const { form, setForm } = props;

	const handleChipChange = (value) => {
		setForm({ ...form, cookbookTag: { ...form.cookbookTag, En: value.map(item => item.value) } });
	};

	return (
		<div>
			<TextField
				className="my-10"
				error={form.cookbookTitle.En === ''}
				label="菜谱英文名称"
				id="cookbookTitle"
				name="cookbookTitle"
				value={form.cookbookTitle.En}
				onChange={event =>
					setForm({ ...form, cookbookTitle: { ...form.cookbookTitle, En: event.target.value } })}
				variant="outlined"
				fullWidth
			/>
			<TextField
				className="my-10"
				error={form.cookbookSubTitle.En === ''}
				label="英文副标题"
				id="cookbookSubTitle"
				name="cookbookSubTitle"
				value={form.cookbookSubTitle.En}
				onChange={event =>
					setForm({ ...form, cookbookSubTitle: { ...form.cookbookSubTitle, En: event.target.value } })}
				variant="outlined"
				fullWidth
				multiline
			/>

			<FuseChipSelect
				className="my-20"
				value={form.cookbookTag.En.map(tag => ({
					value: tag,
					label: tag
				}))}
				onChange={value => handleChipChange(value)}
				placeholder="英文关键词"
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

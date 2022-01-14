import React, { useState, useEffect } from 'react';

// packages
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, TextField } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';

function RecommendationForm(props) {
	const { data, setAlert, history } = props;
	const [form, setForm] = useState();
	const { id } = useParams();

	useEffect(() => {
		initForm();
	}, []);

	const initForm = () => {
		if (id === 'new') {
			setForm({
				Zh: '',
				En: ''
			});
		} else {
			//detail
			setForm(data.recommendContent[id]);
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		const temp = { ...form };
		temp[name] = value;
		setForm(temp);
	};

	const canSubmit = () => {
		return form.Zh !== '' && form.En !== '';
	};

	const handleSave = async () => {
		const { recommendNumber, recommendContent } = data
		const temp = { recommendNumber, recommendContent };
        temp.recommendContent.push({ ...form });
		const result = await axios.post('/recommendModule.php', temp);
		if (result) {
			setAlert({ show: true, message: id === 'new' ? '新增热搜词条成功！' : '修改热搜词条成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				history.push(`/recommendation/recommendations`);
			}, 2000);
		}
	};

	if (!form) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">

				<TextField
					className="mt-8 mb-16"
					label="中文热搜词条"
					id="Zh"
					name="Zh"
					value={form.Zh}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					multiline
				/>

				<TextField
					className="mt-8 mb-16"
					label="英文热搜词条"
					id="En"
					name="En"
					value={form.En}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					multiline
				/>

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						className="whitespace-no-wrap normal-case mt-10"
						variant="contained"
						color="secondary"
						disabled={!canSubmit()}
						onClick={handleSave}
					>
						保存
					</Button>
				</FuseAnimate>
			</div>
		);
	}
}

export default RecommendationForm;

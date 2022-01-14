import React, { useState, useEffect } from 'react';
// packages
import _ from '@lodash';
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, TextField, MenuItem, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { Autocomplete } from '@material-ui/lab';

function AssignManager(props) {
	const { form, setForm, setAlert } = props;
	const { storeNumber } = useParams();
	const [managerList, setManagerList] = useState();
	// const [selected, setSelected] = useState('');
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState('');
	const [newManager, setNewManager] = useState({
		userName: '',
		userPhone: '',
		userEmail: '',
		userRole: 1
	});

	useEffect(() => {
		getManegers();
	}, []);

	const getManegers = async () => {
		const query = { isGet: 1, userRole: 1 };
		const { data } = await axios.post('/userModule.php', query);
		setManagerList(data.data);
	};

	const handleModeChange = event => {
		const { value } = event.target;
		setMode(value);
	};

	const handleChange = value => {
		if (!value) {
			setForm({ ...form, managerUserNumber: '' });
		} else {
			const { userNumber } = value;
			setForm({ ...form, managerUserNumber: userNumber });
		}
	};

	const handleFormChange = event => {
		const { name, value } = event.target;
		setNewManager(_.set({ ...newManager }, name, value));
	};

	const canSubmit = () => {
		const { userName, userPhone, userEmail } = newManager;
		return userName !== '' && userPhone !== '' && userEmail !== '';
	};

	const handleSave = async () => {
		const formData = new FormData();
		formData.append('userName', newManager.userName);
		formData.append('userPhone', `+1${newManager.userPhone}`);
		formData.append('userEmail', newManager.userEmail);
		formData.append('userRole', newManager.userRole);
		setLoading(true);
		const { data } = await axios.post('/userModule.php', formData);
		if (data.message === 'success') {
			setLoading(false);
			setAlert({ show: true, message: '管理员添加成功' });
			return;
		} else {
			alert('管理员手机号已被注册，请重新输入');
			setLoading(false);
			setNewManager(_.set({ ...newManager }, 'userPhone', ''));
			return;
		}
	};

	if (!managerList || loading) {
		return <FuseLoading />;
	} else {
		const manager = managerList.filter(mgr => mgr.userNumber === form.managerUserNumber)[0]
		return (
			<div>
				<Typography className="m-20 normal-case flex items-center sm:mb-12" role="subtitle1" color="inherit">
					<span className="mx-4 text-16">
						{!manager ? '请为门店分配管理员' : `管理员：${manager.userName}`}
					</span>
				</Typography>
				<TextField
					placeholder="请为门店分配管理员"
					id="mode"
					name="mode"
					value={mode}
					onChange={handleModeChange}
					variant="outlined"
					fullWidth
					select
				>
					<MenuItem value="new">新建管理员账户</MenuItem>
					<MenuItem value="assign">分配现有管理员</MenuItem>
				</TextField>

				{mode === 'new' && (
					<div className="p-16 sm:p-24 max-w-2xl">
						<TextField
							className="mt-8 mb-16"
							error={newManager.userName === ''}
							required
							label="管理员姓名"
							id="userName"
							name="userName"
							value={newManager.userName}
							onChange={handleFormChange}
							variant="outlined"
							fullWidth
						/>
						<TextField
							className="mt-8 mb-16"
							error={newManager.userPhone === ''}
							required
							placeholder="4168888888"
							label="管理员电话"
							id="userPhone"
							name="userPhone"
							value={newManager.userPhone}
							onChange={handleFormChange}
							variant="outlined"
							fullWidth
						/>
						<TextField
							className="mt-8 mb-16"
							error={newManager.userEmail === ''}
							required
							placeholder="example@example.ca"
							label="管理员电子邮箱"
							id="userEmail"
							name="userEmail"
							value={newManager.userEmail}
							onChange={handleFormChange}
							variant="outlined"
							fullWidth
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
				)}

				{mode == 'assign' && (
					<Autocomplete
						id="manager"
						options={managerList}
						fullWidth
						getOptionLabel={option => `${option.userName}:${option.userPhone}`}
						style={{ width: 300, marginLeft: 10, marginTop: 20, marginBottom: 20 }}
						onChange={(event, value) => handleChange(value)}
						renderInput={params => <TextField {...params} label="请选择管理员" variant="outlined" />}
					/>
				)}
			</div>
		);
	}
}

export default AssignManager;

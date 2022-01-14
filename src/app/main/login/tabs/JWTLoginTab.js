import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';
import { Alert } from '@material-ui/lab'
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import axios from '../../../../global/axios';

function JWTLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [action, setAction] = useState('login');
	const [alert, setAlert] = useState({show:false, severity:'success', message:''})

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(form) {
		// axios.post('/adminLogin.php', form).then(({data}) => {
		// 	if (data.message === 'success') {
		// 		setAlert({show: true, severity:'success', message:'登录成功！正在跳转...'});
		// 		setTimeout(() => {
		// 			window.sessionStorage.setItem('currentUser', data.data)
		// 			setAlert({show: false, severity:'success', message:''})
		// 			props.history.push('/landing')
		// 		}, 1000)
		// 	} else {
		// 		setAlert({show: true, severity:'error', message:'登录失败，请填写正确的用户名和密码'});
		// 		setTimeout(() => {
		// 			setAlert({show: false, severity:'success', message:''})
		// 		}, 2000)
		// 		return;
		// 	}
		// });
		dispatch(submitLogin(form));
	}

	const changePassword = form => {
		axios.post('/adminLogin.php', form).then(res => {
			if (res.data.message === 'success') {
				setAlert({show: true, severity:'success', message:'密码修改成功！请妥善保管'});
				setAction('login');
			} else {
				setAlert({show: true, severity:'error', message:'密码修改失败，请填写正确的管理员ID和用户名'});
				return;
			}
		});
	};

	return (
		<div className="w-full">
			{alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
			{action === 'login' && (
				<Formsy
					onValidSubmit={handleSubmit}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef}
					className="flex flex-col justify-center w-full"
				>
					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="username"
						label="管理员用户名"
						// value="admin"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: '用户名至少为4位'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										account_box
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="password"
						name="password"
						label="密码"
						// value="wrong"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: '密码至少为4位'
						}}
						InputProps={{
							autoComplete: 'off',
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon className="text-20" color="action">
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16 normal-case"
						aria-label="登录"
						disabled={!isFormValid}
						value="legacy"
					>
						登录
					</Button>

					<Button
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16 normal-case"
						aria-label="修改密码"
						onClick={() => setAction('changepassword')}
					>
						修改密码
					</Button>
				</Formsy>
			)}

			{action === 'changepassword' && (
				<Formsy
					onValidSubmit={changePassword}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef}
					className="flex flex-col justify-center w-full"
				>
					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="adminUserId"
						label="管理员ID"
						// value="admin"
						validations={{
							minLength: 1
						}}
						validationErrors={{
							minLength: '管理员ID至少为1位'
						}}
						InputProps={{
							autoComplete: 'off',
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										account_box
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="userName"
						label="管理员用户名"
						// value="admin"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: '用户名至少为4位'
						}}
						InputProps={{
							autoComplete: 'off',
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										account_box
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<TextFieldFormsy
						className="mb-16"
						type="password"
						name="userPassword"
						label="新密码"
						// value="wrong"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: '密码长度至少为4位'
						}}
						InputProps={{
							autoComplete: 'off',
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon className="text-20" color="action">
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16 normal-case"
						aria-label="修改密码"
						disabled={!isFormValid}
						value="legacy"
					>
						修改密码
					</Button>

					<Button
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16 normal-case"
						aria-label="返回登录"
						onClick={() => setAction('login')}
					>
						返回登录
					</Button>
				</Formsy>
			)}

			{/* <table className="text-center w-full mt-32">
				<thead>
					<tr>
						<th>
							<Typography className="font-600" color="textSecondary">
								Role
							</Typography>
						</th>
						<th>
							<Typography className="font-600" color="textSecondary">
								Username
							</Typography>
						</th>
						<th>
							<Typography className="font-600" color="textSecondary">
								Password
							</Typography>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Typography className="font-600" color="textSecondary">
								Admin
							</Typography>
						</td>
						<td>
							<Typography>admin</Typography>
						</td>
						<td>
							<Typography>admin</Typography>
						</td>
					</tr>
					<tr>
						<td>
							<Typography className="font-600" color="textSecondary">
								Staff
							</Typography>
						</td>
						<td>
							<Typography>staff</Typography>
						</td>
						<td>
							<Typography>staff</Typography>
						</td>
					</tr>
				</tbody>
			</table> */}
		</div>
	);
}

export default JWTLoginTab;

import React, { useEffect, useState } from 'react';
//packages
import axios from '../../../global/axios';
//components
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core'
//styles
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'white'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red'
			},
			'&:hover fieldset': {
				borderColor: 'yellow'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'white'
			}
		}
	}
})(TextField);

export default function FormDialog(props) {
	const { open, setOpen, setAlert } = props;
	// const classes = useStyels(props);
	const [form, setForm] = useState();

	useEffect(() => {
		initForm();
	}, []);

	const initForm = () => {
		if (!form) {
			setForm({
				userName: '',
                userPhone: '',
                userEmail:'',
                userRole:1
			});
		}
	};

	const handleClose = () => {
		setOpen(false);
    };
    
    const handleSave = async () => {
        const formData = new FormData()
        formData.append('userName', form.userName)
        formData.append('userPhone', `+1${form.userPhone}`)
        formData.append('userEmail', form.userEmail)
        formData.append('userRole', form.userRole)
        const { data } = await axios.post('/userModule.php', formData)
        if(data.message === 'success'){
            setAlert({show:true, message:'管理员添加成功'})
            setOpen(false)
            return
        }else{
            alert('管理员手机号已被注册，请重新输入')
            setForm({...form, userPhone:'' })
            return
        }
    }

	return (
		<div>
			<Dialog open={open} onClose={() => initForm()} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">新增管理员</DialogTitle>
				<DialogContent>
					<DialogContentText>请填写管理员信息</DialogContentText>
					{form && (
						<form noValidate autoComplete="off">
							<CssTextField
								id="userName"
								label="用户名称"
								style={{ margin: 8 }}
								placeholder="用户名称"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true
								}}
								value={form.userName}
								onChange={e => setForm({ ...form, userName: e.target.value })}
							/>
							<CssTextField
								id="userPhone"
								label="电话号码"
								style={{ margin: 8 }}
								placeholder="管理员手机号码"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true
								}}
								value={form.userPhone}
								onChange={e => setForm({ ...form, userPhone: e.target.value })}
							/>
							<CssTextField
								id="userEmail"
								label="电子邮箱"
								style={{ margin: 8 }}
								placeholder="管理员电子邮箱"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true
								}}
								value={form.userEmail}
								onChange={e => setForm({ ...form, userEmail: e.target.value })}
							/>
						</form>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="default">
						取消
					</Button>
					<Button onClick={handleSave} color="default">
						保存
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

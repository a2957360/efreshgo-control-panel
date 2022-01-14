import React, { useState, useEffect } from 'react';
// packages
import _ from '@lodash';
import axios from '../../../../global/axios';
// components
import { Button, Icon, Tab, Tabs, TextField, MenuItem, InputAdornment, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
// styles
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	imageContainer: {
		width: 250,
		padding: 10,
	},
	imagePreview: {
		width: '100%',
		// height: 150,
		resize:'contain'
	},
	deleteIconContainer: {		
		// position: 'absolute',
		// width: 30,
		// height: 30,
		// backgroundColor: '#000',
		// borderRadius: 15,
		// justifyContent:'center',
		// alignItems: 'center',
	},
	deleteImageIcon: {
		position: 'absolute',
		color: red[500],
		top: -8,
		right: -8,
	}
}));

function PrivacyContent(props) {
	const { data, loadPrivacy, setAlert, history } = props;
    const classes = useStyles(props);
    const [privacy, setPrivacy] = useState(data.infoContent)
    	const [loading, setLoading] = useState(false)

	const handleChange = event => {
        setPrivacy(event.target.value)
	};

	const canSubmit = () => {
		return privacy !== data.infoContent && privacy !== '';
	};

	const handleSave = async () => {
		const temp = {
			infoNumber:"8",
			infoContent:privacy,
		}
		setLoading(true)
		const {data} = await axios.post('/infoModule.php', temp);
		if (data.message === 'success') {
			setLoading(false)
			setAlert({ show: true, message: '隐私条款修改成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				loadPrivacy();
			}, 2000);
		}
	};

	if ( loading ) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full p-16 sm:p-24 max-w-2xl">
				{/* <Typography className="m-20 normal-case flex items-center sm:mb-12" role="title" color="inherit">
					<span className="mx-4 text-16">服务条款</span>
				</Typography> */}
                <TextField
                    id='privacy'
                    name='privacy'
                    value={privacy}
                    placeholder='请填写隐私政策'
                    onChange={handleChange}
                    multiline
                    variant='outlined'
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
		);
	}
}

export default PrivacyContent;

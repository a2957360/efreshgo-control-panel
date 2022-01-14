import React, { useState, useEffect } from 'react';

// packages
import _ from '@lodash';
import axios from '../../../../global/axios';
import { useParams } from 'react-router-dom';
// components
import { Button, Icon, Tab, Tabs, TextField, MenuItem, InputAdornment, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	textField: {
		margin: 10,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '100%'
	}
}));

function CouponForm(props) {
	const { form, setForm, setAlert, history } = props;
	const classes = useStyles(props);
	const { couponNumber } = useParams();
	const [loading, setLoading] = useState(false);

	const canSubmit = () => {
		return (
			form.couponType !== '' &&
			form.couponRate !== '' &&
			form.couponRequiredPrice !== '' &&
			form.couponStartDate !== '' &&
			form.couponEndDate !== ''
		);
	};

	const handleSave = async () => {
		const temp = {
			couponNumber: form.couponNumber,
			couponRate: form.couponRate,
			couponRequiredPrice: form.couponRequiredPrice,
			couponType: form.couponType,
			couponStartDate: form.couponStartDate,
			couponEndDate: form.couponEndDate
		};
		setLoading(true);
		const result = await axios.post('/couponModule.php', temp);
		if (result) {
			setAlert({ show: true, message: couponNumber === 'new' ? '新增优惠券成功！' : '优惠券更新成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/coupon/coupons`);
			}, 2000);
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setForm(_.set({ ...form }, name, value));
	};

	if (!form || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				<TextField
					className="mt-8 mb-16"
					label="优惠券类型"
					error={form.couponType == ''}
					id="couponType"
					name="couponType"
					value={form.couponType}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					select
				>
					<MenuItem value={'0'}>固定价格</MenuItem>
					<MenuItem value={'1'}>百分比</MenuItem>
				</TextField>

				<TextField
					className="mt-8 mb-16"
					label="优惠金额/百分比"
					error={form.couponRate == ''}
					id="couponRate"
					name="couponRate"
					value={form.couponRate}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>

				<TextField
					className="mt-8 mb-16"
					label="最低消费金额"
					error={form.couponRequiredPrice == ''}
					id="couponRequiredPrice"
					name="couponRequiredPrice"
					value={form.couponRequiredPrice}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					multiline
				/>

				<TextField
					id="couponStartDate"
					name="couponStartDate"
					label="启用日"
					error={form.couponStartDate == ''}
					value={form.couponStartDate}
					type="date"
					className={classes.textField}
					onChange={handleChange}
					InputLabelProps={{
						shrink: true
					}}
					style={{
						width: 300
					}}
				/>

				<TextField
					id="couponEndDate"
					name="couponEndDate"
					label="到期日"
					error={form.couponEndDate == ''}
					value={form.couponEndDate}
					type="date"
					onChange={handleChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					style={{
						width: 300
					}}
				/>

				<div>
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
			</div>
		);
	}
}

export default CouponForm;

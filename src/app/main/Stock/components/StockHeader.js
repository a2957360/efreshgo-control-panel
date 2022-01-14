import React, { useState } from 'react';
//packages
import axios from '../../../../global/axios';
//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Tab, Tabs, TextField, MenuItem, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Link, useParams } from 'react-router-dom';

function StockHeader(props) {
	const { form, setLoading, setAlert, history } = props;

	const canSubmit = () => {
		const diff = form.stockTotal - form.stockForPickup - form.stockForSell;
		return form.itemNumber !== '' && diff >= 0;
	};

	const handleSave = async () => {
		const diff = form.stockTotal - form.stockForPickup - form.stockForSell;
		if (diff < 0) {
			alert('总库存不可小于自取库存和活动库存总和');
			return;
		}
		if (form.itemNumber == '') {
			alert('请选择需要修改库存的商品');
			return;
		}
		const update = {
			stockNumber: form.stockNumber,
			stockTotal: form.stockTotal,
			stockForPickup: form.stockForPickup,
			stockForSell: form.stockForSell
		}
		setLoading(true)
		const { data } = await axios.post('/stockModule.php', update);
		if(data.message === 'success'){
			setAlert({ show: true, message: '库存信息修改成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false)
				history.push(`/stock/stocks?storeNumber=${form.storeNumber}`);
			})
		}
	};

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						role="button"
						color="inherit"
						onClick={() => history.goBack()}
					>
						<Icon className="text-20">arrow_back</Icon>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							{!form.itemTitle ? '新增库存信息':`${form.itemTitle}库存信息`}
						</Typography>
					</Typography>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					className="whitespace-no-wrap normal-case"
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

export default StockHeader;

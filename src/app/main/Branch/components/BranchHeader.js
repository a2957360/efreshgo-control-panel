import React from 'react';
//packages
import { Link, useParams } from 'react-router-dom';
import axios from '../../../../global/axios';

//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography } from '@material-ui/core';

// import { useDispatch, useSelector } from 'react-redux';
// import { saveProduct } from '../../store/ProductStore/ProductSlice';

function BranchHeader(props) {
	const { form, setAlert, history, setLoading } = props;
	const { storeNumber } = useParams();

	const canSubmit = () => {
		const isComplete =
			form.storeName.Zh.length > 0 &&
			form.storeName.En.length > 0 &&
			form.storeOpenTime.length > 0 &&
			form.managerUserNumber !== 0;
		return isComplete;
	};

	const handleSave = async () => {
		try {
			setLoading(true);
			await axios.post('/storeModule.php', form);
			setAlert({ show: true, message: storeNumber === 'new' ? '新增门店成功！' : '门店信息保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/branches`);
			}, 2000);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/branches"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">门店管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						{/* {form.itemImages.length > 0 ? (
							<img className="w-32 sm:w-48 rounded" src={ itemNumber === 'new' ? form.itemImages[0] : form.Zh.itemImages[0]} alt='商品图片' />
						) : ( */}
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="门店图片"
						/>
						{/* )} */}
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								{storeNumber === 'new' ? form.storeName.Zh || '新门店' : form.storeName.Zh}
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">门店详情</Typography>
						</FuseAnimate>
					</div>
				</div>
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

export default BranchHeader;

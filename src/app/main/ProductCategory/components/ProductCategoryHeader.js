import React from 'react';
//packages
import axios from '../../../../global/axios';
import { Link, useParams } from 'react-router-dom';
//components
import { Button, Icon, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';

const ProductCategoryHeader = props => {
	const { categoryNumber } = useParams();
	const { form, setAlert, history } = props;

	const canSubmit = () => {
		const isComplete = form.categoryTitle.Zh !== ''
			&& form.categoryTitle.En !== ''
			&& form.categoryImages !== ''
		return isComplete;
	};

	const handleSave = async () => {
		console.log(123, form)
		const result = await axios.post('/categoryModule.php', form);
		if(result.data.message === 'success'){
			setAlert({ show: true, message: categoryNumber === 'new' ? '新增商品分类成功！' :'分类信息修改成功' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				history.push(`/product/maincategories`);
			}, 2000);
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
						to="/product/maincategories"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4 text-16">商品一级分类管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					{/* <FuseAnimate animation="transition.expandIn" delay={300}>
                        <img
                            className="w-32 sm:w-48 rounded"
                            src="assets/images/ecommerce/product-image-placeholder.png"
                            alt={form.name}
                        />
					</FuseAnimate> */}
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								{form.categoryTitle.Zh === '' ? '新增商品分类' :form.categoryTitle.Zh}
							</Typography>
						</FuseAnimate>
						{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">分类详情</Typography>
						</FuseAnimate> */}
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
					{categoryNumber === 'new' ? '新增' : '保存'}
				</Button>
			</FuseAnimate>
		</div>
	);
};

export default ProductCategoryHeader;

import React from 'react';
//packages
import axios from '../../../../global/axios';
import { Link, useParams } from 'react-router-dom';
//components
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon, Typography } from '@material-ui/core';

function RecipeHeader(props) {
	const { form, setAlert, history, setLoading } = props;
	const { cookbookNumber } = useParams();

	const canSubmit = () => {
		const isComplete =
			form.cookbookTitle.Zh.length > 0 &&
			form.cookbookTitle.En.length > 0 &&
			form.cookbookDescription.Zh &&
			form.cookbookDescription.En &&
			form.cookbookCategory.length > 0 &&
			form.cookbookImages.length > 0;
		return isComplete;
	};

	const handleSave = async () => {
		console.log(form);
		setLoading(true);
		const result = await axios.post('/cookbookModule.php', form);
		if (result.data.message === 'success') {
			setAlert({ show: true, message: cookbookNumber === 'new' ? '新增菜谱成功！' : '菜谱信息保存成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setLoading(false);
				history.push(`/recipe/recipes`);
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
						to="/recipe/recipes"
						color="inherit"
					>
						<Icon className="text-20">arrow_back</Icon>
						<span className="mx-4">菜谱管理</span>
					</Typography>
				</FuseAnimate>

				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<img
							className="w-32 sm:w-48 rounded"
							src="assets/images/ecommerce/product-image-placeholder.png"
							alt="菜谱图片"
						/>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								{form.cookbookTitle.Zh === '' ? '新菜谱' : form.cookbookTitle.Zh}
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">菜谱详情</Typography>
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

export default RecipeHeader;

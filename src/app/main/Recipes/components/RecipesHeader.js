import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

function RecipesHeader(props) {
	const { searchText, setSearchText } = props;
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">local_offer</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						菜谱管理
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => setSearchText(ev.target.value)}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/recipe/recipe/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">新增菜谱</span>
					<span className="flex sm:hidden">新增</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default RecipesHeader;

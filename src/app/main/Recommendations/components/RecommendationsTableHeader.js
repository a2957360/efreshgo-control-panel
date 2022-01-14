import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const headerOptions = [
	{
		id: 'index',
		align: 'center',
		disablePadding: false,
		label: '序号',
		sort: false
	},
	{
		id: 'content_zh',
		align: 'center',
		disablePadding: false,
		label: '中文关键词',
		sort: false
	},
	{
		id: 'content_en',
		align: 'center',
		disablePadding: false,
		label: '英文关键词',
		sort: false
	},
	// {
	// 	id: 'update',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: '查看/修改',
	// 	sort: true
	// }
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function RecommendationsTableHeader(props) {
	const { numSelected, rowCount, onSelectAllClick, handleDelete } = props;
	const classes = useStyles(props);
	const [actionMenu, setActionMenu] = useState(null);

	const toggleActionMenu = event => {
		if (!actionMenu) {
			setActionMenu(event.currentTarget);
		} else {
			setActionMenu(null);
		}
	};

	const createSortHandler = property => event => {
		// props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
			<TableCell padding="none" className="w-64 text-center z-99">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount && rowCount > 0}
						onChange={onSelectAllClick}
					/>
					{numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={actionMenu ? 'actionMenu' : null}
								aria-haspopup="true"
								onClick={toggleActionMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="actionMenu"
								anchorEl={actionMenu}
								open={Boolean(actionMenu)}
								onClose={toggleActionMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											toggleActionMenu();
											handleDelete();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="删除" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
				{headerOptions.map(option => {
					return (
						<TableCell
							key={option.id}
							align={option.align}
							padding={option.disablePadding ? 'none' : 'default'}
							//sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{!option.sort ? <span>{option.label}</span> : (
								<Tooltip
									title="Sort"
									placement={option.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={true}
										direction="desc"
										onClick={() => console.log(option.id)}
									>
										{option.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

export default RecommendationsTableHeader;

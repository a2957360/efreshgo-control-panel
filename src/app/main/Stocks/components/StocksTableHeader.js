import React, { useState } from 'react';
//components
import {
	TableCell,
	TableHead,
	TableRow,
	Checkbox,
	TableSortLabel,
	IconButton,
	Icon,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const headerOptions = [
	{
		id: 'image',
		align: 'center',
		disablePadding: true,
		label: '商品图标',
		sort: false
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: false,
		label: '商品名称',
		sort: true
	},
	{
		id: 'totalstock',
		align: 'center',
		disablePadding: false,
		label: '总库存',
		sort: true
	},
	{
		id: 'stockforpickup',
		align: 'center',
		disablePadding: false,
		label: '自取库存',
		sort: true
	},
	{
		id: 'stockforsell',
		align: 'center',
		disablePadding: false,
		label: '优惠活动库存',
		sort: true
	},
	{
		id: 'detail',
		align: 'center',
		disablePadding: false,
		label: '修改库存',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function StocksTableHeader(props) {
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
						checked={numSelected === rowCount}
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
				{headerOptions.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							// sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										// active={props.order.id === row.id}
										// direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}
export default StocksTableHeader;

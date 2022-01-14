import React, { useState } from 'react';
//components
import { TableCell, TableHead, TableRow, Checkbox, TableSortLabel, IconButton, Icon, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const headerOptions = [
    {
		id: 'min_price',
		align: 'center',
		disablePadding: false,
		label: '最低消费金额',
		sort: false
	},
	{
		id: 'coupon_type',
		align: 'center',
		disablePadding: false,
		label: '优惠券类型',
		sort: false
	},
	{
		id: 'amount',
		align: 'center',
		disablePadding: false,
		label: '优惠金额/百分比',
		sort: false
	},
	{
		id: 'start_date',
		align: 'center',
		disablePadding: false,
		label: '优惠券启用日',
		sort: false
    },
    {
		id: 'end_date',
		align: 'center',
		disablePadding: false,
		label: '优惠券到期日',
		sort: false
    },
    {
		id: 'update',
		align: 'center',
		disablePadding: false,
		label: '查看/修改',
		sort: false
    }  
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function CouponsTableHeader(props) {
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
				{headerOptions.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							// sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{!row.sort ? <span>{row.label}</span> : (
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
export default CouponsTableHeader;

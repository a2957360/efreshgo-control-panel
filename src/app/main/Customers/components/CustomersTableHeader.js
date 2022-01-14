import React, { useState } from 'react';
//packages
import clsx from 'clsx';
//components
import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from '@material-ui/core'
//styles
import { makeStyles } from '@material-ui/core/styles';

const headerOptions = [
	{
		id: 'userNumber',
		align: 'center',
		disablePadding: true,
		label: '用户编号',
		sort: false
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: true,
		label: '用户名称',
		sort: false
	},
	{
		id: 'phone',
		align: 'center',
		disablePadding: true,
		label: '用户电话号码',
		sort: false
	},
	{
		id: 'email',
		align: 'center',
		disablePadding: false,
		label: 'E-mail',
		sort: false
	},
	{
		id: 'userState',
		align: 'center',
		disablePadding: false,
		label: '账户状态',
		sort: false
	},
	{
		id: 'view',
		align: 'center',
		disablePadding: false,
		label: '查看',
		sort: false
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function CustomersTableHeader(props) {
	const classes = useStyles(props);

	const createSortHandler = property => event => {
		// props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
				{headerOptions.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							// sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{!row.sort ? row.label : (
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

export default CustomersTableHeader;

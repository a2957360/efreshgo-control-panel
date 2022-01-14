import React, { useState } from 'react';
//packages
import clsx from 'clsx';
//components
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
//styles
import { makeStyles } from '@material-ui/core/styles';

const headerOptions = [
	{
		id: 'index',
		align: 'center',
		disablePadding: true,
		label: '序号',
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
		label: '电话号码',
		sort: false
	},
	{
		id: 'branch',
		align: 'center',
		disablePadding: false,
		label: '所属门店',
		sort: false
	},
	{
		id: 'state',
		align: 'center',
		disablePadding: false,
		label: '管理员状态',
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

function ManagersTableHeader(props) {
   
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

export default ManagersTableHeader;

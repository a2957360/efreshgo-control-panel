import React, { useState } from 'react';
//packages
import clsx from 'clsx';
//components
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
//styles
import { makeStyles } from '@material-ui/core/styles';

const headerOptions = [
	{
		id: 'orderTime',
		align: 'center',
		disablePadding: true,
		label: '下单时间',
		sort: true
	},
	{
		id: 'orderNumber',
		align: 'center',
		disablePadding: true,
		label: '订单编号',
		sort: true
	},
	{
		id: 'subtotal',
		align: 'center',
		disablePadding: true,
		label: '订单金额（不含运费）',
		sort: false
	},
	{
		id: 'deliveryFee',
		align: 'center',
		disablePadding: false,
		label: '运费',
		sort: false
	},
	{
		id: 'deliveryType',
		align: 'center',
		disablePadding: false,
		label: '配送方式',
		sort: false
	},
	{
		id: 'driverNumber',
		align: 'center',
		disablePadding: false,
		label: '骑手序号',
		sort: false
	},
	{
		id: 'driverIncome',
		align: 'center',
		disablePadding: false,
		label: '骑手收入',
		sort: false
	},
	{
		id: 'itemProfit',
		align: 'center',
		disablePadding: false,
		label: '商品利润',
		sort: false
	},
	{
		id: 'deliveryProfit',
		align: 'center',
		disablePadding: false,
		label: '派送利润',
		sort: false
	},
	{
		id: 'storeProfit',
		align: 'center',
		disablePadding: false,
		label: '小店收入',
		sort: false
	},
	// {
	// 	id: 'view',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: '查看',
	// 	sort: false
	// }
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ProfitReportTableHeader(props) {
	const { order, sortingData } = props
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
							{!row.sort ? (
								<span>{row.label}</span>
							) : (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={order.id === row.id}
										direction={order.direction}
										onClick={() => sortingData(row.id)}
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

export default ProfitReportTableHeader;

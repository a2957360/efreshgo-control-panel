import React, { useState } from 'react';
//packages
import clsx from 'clsx';
//components
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
//styles
import { makeStyles } from '@material-ui/core/styles';

const yearlyReportHeaderOptions = [
	{
		id: 'itemNumber',
		align: 'center',
		disablePadding: true,
		label: '商品编号',
		sort: true
	},
	{
		id: 'efreshgoNo',
		align: 'center',
		disablePadding: true,
		label: '商品SKU',
		sort: true
	},
	{
		id: 'itemName',
		align: 'center',
		disablePadding: true,
		label: '商品名称',
		sort: false
	},
	{
		id: 'itemPrice',
		align: 'center',
		disablePadding: true,
		label: '商品售价',
		sort: false
	},
	{
		id: 'daily-quantity',
		align: 'center',
		disablePadding: true,
		label: '本日销量',
		sort: false
	},
	{
		id: 'daily-sales',
		align: 'center',
		disablePadding: true,
		label: '本日销售额',
		sort: false
	},
	{
		id: 'accumulate-quantity',
		align: 'center',
		disablePadding: true,
		label: '累计销量',
		sort: false
	},
	{
		id: 'accumulate-sales',
		align: 'center',
		disablePadding: true,
		label: '累计销售额',
		sort: false
	},
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function DailyReportTableHeader(props) {
	const { order, sortingData, reportType } = props;
	const createSortHandler = property => event => {
		// props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
				{yearlyReportHeaderOptions.map(row => {
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

export default DailyReportTableHeader;

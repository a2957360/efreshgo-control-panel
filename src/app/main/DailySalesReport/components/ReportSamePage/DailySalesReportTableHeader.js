import React, { useState } from 'react';
//packages
import clsx from 'clsx';
//components
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
//styles
import { makeStyles } from '@material-ui/core/styles';

const dailyHeaderOptions = [
	{
		id: 'itemNumber',
		align: 'center',
		disablePadding: true,
		label: '商品编号',
		sort: true
	},
	{
		id: 'SKU',
		align: 'center',
		disablePadding: true,
		label: '商品SKU',
		sort: true
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: true,
		label: '商品名称',
		sort: false
	},
	{
		id: 'daily-quantity',
		align: 'center',
		disablePadding: true,
		label: '当日销量',
		sort: false
	},
	{
		id: 'daily-sales',
		align: 'center',
		disablePadding: true,
		label: '当日销售额',
		sort: false
	},
	{
		id: 'total-quantity',
		align: 'center',
		disablePadding: true,
		label: '累计销量',
		sort: false
	},
	{
		id: 'total-sales',
		align: 'center',
		disablePadding: true,
		label: '累计销售额',
		sort: false
	},
];

const monthlyHeaderOptions = [
	{
		id: 'itemNumber',
		align: 'center',
		disablePadding: true,
		label: '商品编号',
		sort: true
	},
	{
		id: 'SKU',
		align: 'center',
		disablePadding: true,
		label: '商品SKU',
		sort: true
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: true,
		label: '商品名称',
		sort: false
	},
	{
		id: 'monthly-quantity',
		align: 'center',
		disablePadding: true,
		label: '当月销量',
		sort: false
	},
	{
		id: 'monthly-sales',
		align: 'center',
		disablePadding: true,
		label: '当月销售额',
		sort: false
	},
];

const yearlyReportHeaderOptions = [
	{
		id: 'itemNumber',
		align: 'center',
		disablePadding: true,
		label: '商品编号',
		sort: true
	},
	{
		id: 'SKU',
		align: 'center',
		disablePadding: true,
		label: '商品SKU',
		sort: true
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: true,
		label: '商品名称',
		sort: false
	},
	{
		id: 'January',
		align: 'center',
		disablePadding: true,
		label: '1月',
		sort: false
	},
	{
		id: 'Feburary',
		align: 'center',
		disablePadding: true,
		label: '2月',
		sort: false
	},
	{
		id: 'March',
		align: 'center',
		disablePadding: true,
		label: '3月',
		sort: false
	},
	{
		id: 'April',
		align: 'center',
		disablePadding: true,
		label: '4月',
		sort: false
	},
	{
		id: 'May',
		align: 'center',
		disablePadding: true,
		label: '5月',
		sort: false
	},
	{
		id: 'June',
		align: 'center',
		disablePadding: true,
		label: '6月',
		sort: false
	},
	{
		id: 'July',
		align: 'center',
		disablePadding: true,
		label: '7月',
		sort: false
	},
	{
		id: 'August',
		align: 'center',
		disablePadding: true,
		label: '8月',
		sort: false
	},
	{
		id: 'September',
		align: 'center',
		disablePadding: true,
		label: '9月',
		sort: false
	},
	{
		id: 'October',
		align: 'center',
		disablePadding: true,
		label: '10月',
		sort: false
	},
	{
		id: 'November',
		align: 'center',
		disablePadding: true,
		label: '11月',
		sort: false
	},
	{
		id: 'December',
		align: 'center',
		disablePadding: true,
		label: '12月',
		sort: false
	},
	{
		id: 'Total',
		align: 'center',
		disablePadding: true,
		label: '合计',
		sort: false
	},

];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function DailySalesReportTableHeader(props) {
	const { order, sortingData, reportType } = props
	const createSortHandler = property => event => {
		// props.onRequestSort(event, property);
	};

	if(reportType.type == 'daily'){
		return (
			<TableHead>
				<TableRow className="h-64">
					{dailyHeaderOptions.map(row => {
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
	if(reportType.type == 'month'){
		return (
			<TableHead>
				<TableRow className="h-64">
					{monthlyHeaderOptions.map(row => {
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

	if(reportType.type == 'year'){
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
}

export default DailySalesReportTableHeader;

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
		id: 'ordernumber',
		align: 'center',
		disablePadding: false,
		label: '订单编号',
		sort: false
	},
	{
		id: 'amount',
		align: 'center',
		disablePadding: false,
		label: '订单金额',
		sort: false
    },
	{
		id: 'orderstate',
		align: 'center',
		disablePadding: false,
		label: '订单状态',
		sort: false
	},
	{
		id: 'store',
		align: 'center',
		disablePadding: false,
		label: '门店名称',
		sort: false
	},
	{
		id: 'deliveryType',
		align: 'center',
		disablePadding: false,
		label: '配送方式',
		sort: false
	},
	// {
	// 	id: 'driver',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: '配送人员',
	// 	sort: false
    // },
	{
		id: 'orderdetail',
		align: 'center',
		disablePadding: false,
		label: '查看订单',
		sort: false
    },
    {
		id: 'cancel',
		align: 'center',
		disablePadding: false,
		label: '取消订单',
		sort: false
    },
];

// const useStyles = makeStyles(theme => ({
// 	actionsButtonWrapper: {
// 		background: theme.palette.background.paper
// 	}
// }));

function OrdersTableHeader(props) {
	//const classes = useStyles(props);
	// const [selectedCarouselsMenu, setSelectedCarouselsMenu] = useState(null);

	// const createSortHandler = property => event => {
	// 	props.onRequestSort(event, property);
	// };

	// function openSelectedCarouselsMenu(event) {
	// 	setSelectedCarouselsMenu(event.currentTarget);
	// }

	// function closeSelectedCarouselsMenu() {
	// 	setSelectedCarouselsMenu(null);
	// }

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-20 text-center z-99">
					{/* <Checkbox
						//indeterminate={false}
						checked={true}
						onChange={event => console.log(event)}
					/> */}
				</TableCell>
				{headerOptions.map(option => {
					return (
						<TableCell
							key={option.id}
							align={option.align}
							padding={option.disablePadding ? 'none' : 'default'}
							//sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{!option.sort ? (
								<span>{option.label}</span>
							) :  (
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

export default OrdersTableHeader;

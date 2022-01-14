import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
//packages
import axios from '../../../../global/axios';
import FuseUtils from '@fuse/utils';
// components
import {
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	MenuItem,
	Modal,
	Fade,
	Backdrop,
	TextField,
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseLoading from '@fuse/core/FuseLoading';
import OrdersTableHeader from './OrdersTableHeader';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
}));

const OrdersTable = props => {
	const classes = useStyles(props);
	const { data, setAlert, loadOrderData, status, searchText } = props;

	const [orderData, setOrderData] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [selected, setSelected] = useState();
	const [reason, setReason] = useState('')
	const [loading, setLoading] = useState(false)

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		if (searchText.length !== 0) {
			setOrderData(FuseUtils.filterArrayByString(data, searchText));
			setPage(0);
		} else {
			setOrderData(data);
		}
	}, [data, searchText]);

	useEffect(() => {
		sliceData();
	}, [data, page, rowsPerPage]);

	const sliceData = () => {
		if (!data) {
			return;
		}
		const slice_data = data.slice(
			page * rowsPerPage,
			(page + 1) * rowsPerPage > data.length ? data.length : (page + 1) * rowsPerPage
		);
		setOrderData(slice_data);
	}

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const cancelOrder = async order => {
		const update = { orderNumber:order.orderNumber, orderState: '10', refundReason: reason };
		setOpenModal(false);
		setLoading(true)
		const { data } = await axios.post('/orderManage.php', update);
		if(data.message == 'success'){
			setLoading(false)
			setAlert({ show: true,severity:'success', message: '取消订单成功！' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setSelected();
				loadOrderData();
			}, 2000);	
		}else{
			setLoading(false)
			setAlert({ show: true, severity:'error', message: '服务器发生错误，取消订单未成功，请稍后再试' });
			setTimeout(() => {
				setAlert({ show: false, message: '' });
				setSelected();
				loadOrderData();
			}, 2000);
		}
	};

	const handleModalOpen = order => {
		setOpenModal(true);
		setSelected(order)
	};

	if (!orderData || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={openModal}
					// onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500
					}}
				>
					<Fade in={openModal}>
						<div className={classes.paper}>
							<h2 id="transition-modal-title">确定取消该订单？</h2>
							<p id="transition-modal-description">取消订单后订单款项将直接退还至客户账户</p>
							<TextField
								id='refundReason'
								name='refundReason'
								placeholder='请填写取消订单原因'
								fullWidth
								onChange={(event) => setReason(event.target.value)}
								value={reason}
								style={{ marginTop:10, marginBottom:10 }}
								variant='outlined'
								multiline
							/>
							<div className={classes.buttons}>
								<Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
									关闭
								</Button>
								<Button variant="contained" color="secondary" onClick={() => cancelOrder(selected)}>
									确定取消订单
								</Button>
							</div>
						</div>
					</Fade>
				</Modal>
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<OrdersTableHeader />
						<TableBody>
							{orderData.map(order => {
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										tabIndex={-1}
										key={order.orderNumber}
									>
										<TableCell className="w-20" align="center">
											{/* <Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => toggleCheck(event, product)}
												/> */}
										</TableCell>
										<TableCell align="center">{order.orderNo}</TableCell>
										<TableCell align="center">${order.totalPrice}</TableCell>
										<TableCell align="center">{status[order.orderState]}</TableCell>
										<TableCell align="center">{order.storeName}</TableCell>
										<TableCell align="center">{order.deliverTypeTile}</TableCell>							
										{/* <TableCell align="center">{order.driverName}</TableCell> */}
										<TableCell align="center">
											<Button
												component={Link}
												to={`/order/order/${order.orderNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="flex">查看订单</span>
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												// component={Link}
												// to={`/product/subcategory/${order.orderNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
												disabled={order.orderState >= '10'}
												onClick={() => handleModalOpen(order)}
											>
												<span className="flex">取消订单</span>
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
				<TablePagination
					className="overflow-hidden flex-shrink-0"
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		);
	}
};

export default withRouter(OrdersTable);

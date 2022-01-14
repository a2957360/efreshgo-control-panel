import React, { useState, useEffect } from 'react';
//packages
import { Link } from 'react-router-dom';
// import FuseUtils from '@fuse/utils';
import axios from '../../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Button,
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import DriversTableHeader from './DriversTableHeader';

const DriversTable = props => {
	const { userState } = props;
	const userStates = ['未批准', '已批准', '黑名单', '未提交信息', '审核未通过'];
	const [data, setData] = useState();
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	useEffect(() => {
		loadDrivers();
	}, []);

	useEffect(() => {
		filterManagers();
	}, [userState]);

	const loadDrivers = async () => {
		const query = { isGet: 1, userRole: 2 };
		const { data } = await axios.post('/userModule.php', query);
		setData(data.data);
	};

	const filterManagers = () => {
		if (!data) {
			return;
		}
		const result = data.filter(driver => driver.userState == userState);
		setData(result);
	};

	if (!data) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<DriversTableHeader />
						<TableBody>
							{data.map((driver, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{driver.driverNumber}</TableCell>
										<TableCell align="center">{driver.userName}</TableCell>
										<TableCell align="center">{!driver.driverName ? '骑手未填写姓名':driver.driverName}</TableCell>
										<TableCell align="center">{driver.userPhone}</TableCell>
										<TableCell align="center">{userStates[driver.userState]}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/user/driver/${driver.userNumber}`}
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="secondary"
											>
												<span className="hidden sm:flex">查看</span>
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
			</div>
		);
	}
};

export default DriversTable;

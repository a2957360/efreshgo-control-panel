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
import ManagersTableHeader from './ManagersTableHeader';

const ManagersTable = props => {
	const { searchText, setAlert, userState } = props;
	const userStates = ['正常', '正常', '黑名单'];
	const [data, setData] = useState();
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		loadManagers();
	}, []);

	useEffect(() => {
		filterManagers();
	}, [userState]);

	const loadManagers = async () => {
		const query = { isGet: 1, userRole: 1 };
		const { data } = await axios.post('/userModule.php', query);
		setData(data.data);
	};

	const filterManagers = () => {
		if (!data) {
			return;
		}
		const result = data.filter(manager => manager.userState == userState);
		setData(result);
	};

	if (!data) {
		return <FuseLoading />;
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<ManagersTableHeader />
						<TableBody>
							{data.map((manager, index) => {
								return (
									<TableRow key={index.toString()}>
										<TableCell align="center">{index + 1}</TableCell>
										<TableCell align="center">{manager.userName}</TableCell>
										<TableCell align="center">{manager.userPhone}</TableCell>
										<TableCell align="center">{manager.storeName}</TableCell>
										<TableCell align="center">{userStates[manager.userState]}</TableCell>
										<TableCell align="center">
											<Button
												component={Link}
												to={`/user/manager/${manager.userNumber}`}
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

export default ManagersTable;

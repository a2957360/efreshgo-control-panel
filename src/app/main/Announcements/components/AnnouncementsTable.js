import React, { useState, useEffect } from 'react';
//packages
import FuseUtils from '@fuse/utils';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import axios from '../../../../global/axios';
//components
import {
	Table,
	TableBody,
	TableCell,
	// TablePagination,
	TableRow,
	Typography,
	Checkbox,
	Button
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import AnnouncementsTableHeader from './AnnouncementsTableHeader';
import FuseLoading from '@fuse/core/FuseLoading';

const AnnouncementsTable = props => {
	const { data, searchText, setAlert, loadAnnouncements } = props;
	const [selected, setSelected] = useState([]);
	const [displayData, setDisplayData] = useState()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const rebuild = data.componentContent.Zh.map((announcement, index) => {
			return {...announcement, text_en:data.componentContent.En[index].text}
		})
		setDisplayData(rebuild);
	}, [data])

	useEffect(() => {
		const rebuild = data.componentContent.Zh.map((announcement, index) => {
			return {...announcement, text_en:data.componentContent.En[index].text}
		})
		if(searchText.length !== 0){
			setDisplayData(FuseUtils.filterArrayByString(rebuild, searchText))
		}else{
			setDisplayData(rebuild);	
		}
	}, [searchText]);

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			setSelected(displayData);
			return;
		}
		setSelected([]);
	};

	const handleDelete = async () => {
		const temp = { ...data };
		_.remove(temp.componentContent.Zh, function (component) {
			return selected.findIndex(el => el.text === component.text) > -1;
		});
		_.remove(temp.componentContent.En, function (component) {
			return selected.findIndex(el => el.text_en === component.text) > -1;
		});
		console.log(temp)
		setLoading(true)
		const result = await axios.post('/pageLayoutModule.php', temp);
		if (result) {
			setLoading(false)
			setAlert({ show: true, message: '广播站信息删除成功！' });
			loadAnnouncements();
			setSelected([]);
			setTimeout(() => {
				setAlert({ show: false, message: '' });
			}, 2000);
		}
	};

	const toggleCheck = (event, annoucement) => {
		const selectedIndex = selected.findIndex(el => el.text === annoucement.text);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, annoucement);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	if(!displayData || loading){
		return <FuseLoading />
	}else if (displayData.length === 0) {
		return (
			<div className="w-full flex flex-col">
				<Typography className="text-8 pl-30 sm:text-20 truncate">未找到广播信息</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl">
						<AnnouncementsTableHeader
							numSelected={selected.length}
							rowCount={displayData.length}
							onSelectAllClick={handleSelectAllClick}
							handleDelete={handleDelete}
						/>
						<TableBody>
							{displayData.map((annoucement, index) => {
									const isSelected = selected.findIndex(el => el.text === annoucement.text) !== -1;
									return (
										<TableRow key={index.toString()}>
											<TableCell className="w-20" align="center">
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => toggleCheck(event, annoucement)}
												/>
											</TableCell>
											<TableCell align="center">{annoucement.text}</TableCell>
											<TableCell align="center">{annoucement.text_en}</TableCell>
											<TableCell align="center">
												<Button
													component={Link}
													to={`/homepage/annoucement/${index}`}
													className="whitespace-no-wrap normal-case"
													variant="contained"
													color="secondary"
												>
													<span className="hidden sm:flex">查看/修改</span>
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

export default AnnouncementsTable;

import React, { useState, useEffect } from 'react';
//packages
import FuseUtils from '@fuse/utils';
import _ from '@lodash'
import axios from '../../../../global/axios';
//components
import FuseLoading from '@fuse/core/FuseLoading';
import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Checkbox,
	Typography,
	Button
} from '@material-ui/core';
import FuseScrollbars from '@fuse/core/FuseScrollbars';

const LandingContent = props => {
		return (
			<div className="w-full flex flex-col items-center justify-center">
                <img src={require('../../assets/banner-3x.png')} style={{ width:'60%', height:'auto', marginBottom: 20 }} alt='logo'/>
				{/* <Typography className="text-20">欢迎登陆</Typography> */}
			</div>
		);
	
};

export default LandingContent;

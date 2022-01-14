import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import MainConfig from 'app/main/MainConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';

const routeConfigs = [ExampleConfig, MainConfig, LogoutConfig, LoginConfig];
//
const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
	{
		path: '/',
		component: () => <Redirect to="/landing" />
	}
];

export default routes;

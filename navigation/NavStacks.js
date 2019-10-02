import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import TicketScreen from '../screens/TicketScreen';

const config = Platform.select({
	web: {
		headerMode: 'screen'
	},
	default: {}
});

export const AuthStack = createStackNavigator(
	{
		Login: LoginScreen
	},
	config
);

AuthStack.path = 'auth';

export const AppStack = createStackNavigator(
	{
		Ticket: TicketScreen
	},
	config
);

AppStack.path = 'app';

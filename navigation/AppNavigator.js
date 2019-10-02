import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { AppStack, AuthStack } from './NavStacks';

export default createAppContainer(
	createSwitchNavigator(
		{
			// You could add another route here for authentication.
			// Read more at https://reactnavigation.org/docs/en/auth-flow.html
			App: AppStack,
			Auth: AuthStack
		},
		{
			initialRouteName: 'Auth'
		}
	)
);

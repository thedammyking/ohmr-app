import React, { useEffect } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Spinner } from 'native-base';
import { setToken } from '../constants';

export default function AppLoadingScreen(props) {
	useEffect(() => {
		_handleRedirect();
	}, []);

	const _handleRedirect = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			setToken(token);
			return props.navigation.navigate('Ticket');
		}
		return props.navigation.navigate('Login');
	};

	return (
		<Container style={styles.container}>
			<View style={styles.spinner}>
				<Spinner color='#fff' />
			</View>
		</Container>
	);
}

AppLoadingScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2980b9'
	},
	spinner: {
		marginTop: '80%'
	}
});

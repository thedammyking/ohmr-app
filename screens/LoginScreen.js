import React, { useState } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import {
	Container,
	Content,
	Input,
	Item,
	Form,
	Button,
	Text,
	Toast,
	Spinner
} from 'native-base';
import { Auth, setToken } from '../constants';

export default function LoginScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const _handleSubmit = async () => {
		if (loading) return;
		setLoading(true);
		const data = await Auth.login({ email, password })
			.then(({ response }) => response.data)
			.catch(({ response: { data } }) => {
				if (data !== undefined && data.response.message) {
					Toast.show({
						text: data.response.message,
						buttonText: 'Okay',
						position: 'top',
						type: 'danger'
					});
					setLoading(false);
					return;
				}
				Toast.show({
					text: 'Something went wrong, please try again',
					buttonText: 'Okay',
					position: 'top',
					type: 'danger'
				});
				setLoading(false);
				return;
			});
		if (data && data.token) {
			await AsyncStorage.setItem('token', data.token);
			setLoading(false);
			setToken(data.token);
			props.navigation.navigate('Ticket');
			return;
		}
		Toast.show({
			text: 'Something went wrong, please try again',
			buttonText: 'Okay',
			position: 'top',
			type: 'danger'
		});
		setLoading(false);
		return;
	};
	return (
		<Container style={styles.container}>
			<Content style={styles.contentContainer}>
				<Form style={styles.form}>
					<Item style={styles.inputItem} regular>
						<Input
							style={styles.input}
							placeholder='Email Address'
							placeholderTextColor='#fff'
							returnKeyType='next'
							keyboardType='email-address'
							value={email}
							onChangeText={text => setEmail(text)}
						/>
					</Item>
					<Item style={styles.inputItem} regular>
						<Input
							placeholderTextColor='#fff'
							style={styles.input}
							placeholder='Password'
							secureTextEntry
							returnKeyType='send'
							value={password}
							onChangeText={text => setPassword(text)}
						/>
					</Item>
					<Button
						onPress={() => _handleSubmit()}
						style={styles.button}>
						{loading ? (
							<Spinner color='#2980b9' />
						) : (
							<Text style={styles.buttonText}>LOGIN</Text>
						)}
					</Button>
				</Form>
			</Content>
		</Container>
	);
}

LoginScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2980b9'
	},
	contentContainer: {
		paddingTop: 30,
		paddingHorizontal: '10%'
	},
	form: {
		marginTop: '75%'
	},
	input: {
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderColor: 'rgba(255, 255, 255, 0.2)',
		paddingLeft: 10,
		paddingRight: 15,
		borderRadius: 3
	},
	inputItem: {
		marginBottom: 20,
		borderColor: 'transparent'
	},
	button: {
		backgroundColor: '#fff',
		borderRadius: 25,
		marginTop: 5,
		justifyContent: 'center',
		height: 50
	},
	buttonText: {
		color: '#2980b9',
		fontSize: 17,
		fontWeight: 'bold'
	}
});

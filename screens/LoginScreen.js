import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import { Container, Content, Input, Item, Form, Button } from 'native-base';

export default function LoginScreen() {
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
						/>
					</Item>
					<Item style={styles.inputItem} regular>
						<Input
							placeholderTextColor='#fff'
							style={styles.input}
							placeholder='Password'
							secureTextEntry
							returnKeyType='send'
						/>
					</Item>
					<Button style={styles.button}>
						<Text style={styles.buttonText}>LOGIN</Text>
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

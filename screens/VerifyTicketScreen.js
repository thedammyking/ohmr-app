import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {
	Container,
	Content,
	Fab,
	Icon,
	Button,
	Header,
	Left,
	Text,
	Spinner,
	Toast,
	Form,
	Item,
	Input
} from 'native-base';
import { Tickets } from '../constants';

export default function VerifyTicketScreen(props) {
	const [loading, setLoading] = useState(false);
	const [ticket, setTicket] = useState('');

	const _verifyTictet = async () => {
		setLoading(true);
		const verifiedTicket = await Tickets.verify({ ticketNumber: ticket })
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
				setLoading(false);
				return;
			});
		if (verifiedTicket && verifiedTicket.status === 'used') {
			setLoading(false);
			setTicket('');
			return Toast.show({
				text: 'Verifed Successfully',
				buttonText: 'Okay',
				position: 'top',
				type: 'success'
			});
		}
		setLoading(false);
		return;
	};
	return (
		<Container style={styles.container}>
			<Header style={styles.header}>
				<Left style={styles.left}>
					<Button
						onPress={() => props.navigation.goBack()}
						transparent
						style={{ marginRight: 20 }}>
						<Icon name='arrow-back' />
					</Button>
					<Text style={styles.headerTitle}>Verify Ticket</Text>
				</Left>
			</Header>
			<View
				style={{
					flex: 1
				}}>
				<Content style={styles.containerContent}>
					{!loading && (
						<Form>
							<Item>
								<Input
									placeholder='Ticket Number'
									value={ticket}
									onChangeText={text => setTicket(text)}
									keyboardType='numeric'
								/>
							</Item>
							<Button
								onPress={() => _verifyTictet()}
								style={styles.button}>
								{loading ? (
									<Spinner color='#fff' />
								) : (
									<Text style={styles.buttonText}>
										VERIFY
									</Text>
								)}
							</Button>
						</Form>
					)}
					{loading && (
						<View style={styles.spinner}>
							<Spinner color='#2980b9' />
						</View>
					)}
				</Content>
			</View>
		</Container>
	);
}

VerifyTicketScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	containerContent: {
		padding: 15
	},
	header: {
		paddingTop: 30,
		backgroundColor: '#2980b9',
		height: 80
	},
	fab: {
		backgroundColor: '#2980b9'
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff'
	},
	left: {
		marginLeft: 10,
		marginBottom: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},

	spinner: {
		marginTop: '70%'
	},
	button: {
		backgroundColor: '#2980b9',
		borderRadius: 25,
		marginTop: 20,
		justifyContent: 'center',
		height: 50
	},
	buttonText: {
		color: '#fff',
		fontSize: 17,
		fontWeight: 'bold'
	}
});

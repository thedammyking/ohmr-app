import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, AsyncStorage, RefreshControl } from 'react-native';
import {
	Container,
	Content,
	Fab,
	Icon,
	Button,
	Header,
	Left,
	Right,
	Card,
	CardItem,
	Body,
	Text,
	Badge,
	Spinner,
	Toast
} from 'native-base';
import { Tickets } from '../constants';
import moment from 'moment';

export default function TicketScreen(props) {
	const [loading, setLoading] = useState(false);
	const [tickets, setTickets] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [fabActive, setFabActive] = useState(false);

	useEffect(() => {
		_fetchTictets();
	}, []);

	const _handleLogout = async () => {
		setLoading(true);
		await AsyncStorage.setItem('token', '');
		props.navigation.navigate('Loading');
	};

	const _handleGenerateTicket = async () => {
		if (loading) return;
		setLoading(true);
		const ticket = await Tickets.generate()
			.then(({ response }) => {
				_fetchTictets();
				Toast.show({
					text: response.message,
					buttonText: 'Okay',
					position: 'top',
					type: 'success'
				});
				return response.data;
			})
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
		if (ticket) {
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

	const _onRefresh = useCallback(() => {
		setRefreshing(true);

		_fetchTictets();
	}, [refreshing]);

	const _fetchTictets = async () => {
		setLoading(true);
		const tickets = await Tickets.getAll()
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
		if (tickets && !!tickets.length) {
			setTickets(tickets.reverse());
			setLoading(false);
			setRefreshing(false);
			return;
		}
		return;
	};
	return (
		<Container style={styles.container}>
			<Header style={styles.header}>
				<Left style={styles.left}>
					<Text style={styles.headerTitle}>Tickets</Text>
				</Left>
				<Right style={styles.right}>
					<Button onPress={() => _handleLogout()} transparent>
						<Text style={styles.logout}>Logout</Text>
					</Button>
				</Right>
			</Header>
			<View style={{ flex: 1 }}>
				<Content
					style={styles.containerContent}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={_onRefresh}
							colors={['#2980b9']}
						/>
					}>
					{!loading &&
						!!tickets.length &&
						tickets.map(item => (
							<Card key={item.id}>
								<CardItem header style={styles.cardHeader}>
									<Text style={styles.ticketNumber}>
										{item.ticketNumber}
									</Text>
									<Badge
										success={item.status === 'unused'}
										danger={item.status === 'used'}>
										<Text style={styles.status}>
											{item.status}
										</Text>
									</Badge>
								</CardItem>
								<CardItem footer>
									<Text style={styles.ticketCreatedAt}>
										{moment(item.createdAt).fromNow()}
									</Text>
								</CardItem>
							</Card>
						))}
					{!loading && !tickets.length && (
						<View style={styles.notFound}>
							<Text style={styles.notFoundText}>
								No tickets found
							</Text>
						</View>
					)}
					{loading && (
						<View style={styles.spinner}>
							<Spinner color='#2980b9' />
						</View>
					)}
				</Content>
				<Fab
					active={fabActive}
					direction='up'
					onPress={() => setFabActive(!fabActive)}
					style={styles.fab}
					position='bottomRight'>
					<Icon type='AntDesign' name='menuunfold' />
					<Button
						onPress={() => {
							setFabActive(!fabActive);
							return _handleGenerateTicket();
						}}
						style={styles.fab}>
						<Icon name='add' />
					</Button>
					<Button
						onPress={() => {
							setFabActive(!fabActive);
							return props.navigation.navigate('VerifyTicket');
						}}
						style={styles.fab}>
						<Icon type='Octicons' name='unverified' />
					</Button>
				</Fab>
			</View>
		</Container>
	);
}

TicketScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	containerContent: {
		margin: 15
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
	logout: { fontSize: 15, color: '#fff' },
	left: {
		marginLeft: 20,
		marginBottom: 10
	},
	right: {
		marginBottom: 8
	},
	cardHeader: {
		flex: 1,
		justifyContent: 'space-between'
	},
	ticketNumber: {
		fontSize: 17,
		fontWeight: 'bold'
	},
	ticketCreatedAt: {
		fontSize: 14,
		color: 'rgba(0, 0, 0, 0.5)',
		fontStyle: 'italic'
	},
	spinner: {
		marginTop: '70%'
	},
	notFound: {
		marginTop: '70%',
		alignItems: 'center'
	},
	notFoundText: {
		fontSize: 20,
		color: 'rgba(0, 0, 0, 0.5)',
		fontWeight: 'bold'
	},
	status: {
		textTransform: 'capitalize'
	}
});

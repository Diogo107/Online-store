import React, { Component } from 'react';
import { signUp } from './../../../Services/authentication';
import { signIn } from './../../../Services/authentication';
import { Form, Button } from 'react-bootstrap';
import './style.scss';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: true,
			name: '',
			email: '',
			phoneNumber: '',
			passwordHash: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.signIn = this.signIn.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			toggle: !this.state.toggle,
		});
		console.log('this is toggle', this.state.toggle);
	}

	handleInputChange(event) {
		console.log('this is the signUp', this.props);
		const value = event.target.value;
		const inputName = event.target.name;
		console.log(value);
		this.setState({
			[inputName]: value,
		});
	}

	async sendMessage(event) {
		event.preventDefault();
		const { name, email, phoneNumber, passwordHash } = this.state;
		let admin = true;
		let payment = false;
		let blocked = false;
		let paymentMethods = false;
		let createdAt = Date.now();
		try {
			const user = await signUp({
				name,
				email,
				phoneNumber,
				passwordHash,
				admin,
				payment,
				createdAt,
				blocked,
				paymentMethods,
			});
			this.props.updateUserInformation(user);
			this.props.history.push('/');
		} catch (error) {
			console.log(error);
		}
	}

	async signIn(event) {
		// ...
		event.preventDefault();
		const { email, passwordHash } = this.state;
		const user = await signIn({ email, passwordHash });
		console.log('user', user);
		this.props.updateUserInformation(user);
		this.props.history.push('/');
	}

	render() {
		return (
			<div className="sign-up">
				<div className="toggle">
					<h1>Login</h1>
					<input type="checkbox" id="switch" onClick={this.toggle} />
					<label for="switch">Toggle</label>
					<h1>Registar</h1>
				</div>
				{!this.state.toggle && (
					<>
						<h2>Registar</h2>
						<Form onSubmit={this.sendMessage} method="POST">
							<Form.Group controlId="formBasicEmail">
								<TextField
									className="textfield"
									id="outlined-basic"
									label="Name"
									variant="outlined"
									type="text"
									name="name"
									placeholder="Enter your Name"
									onChange={this.handleInputChange}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<TextField
									className="textfield"
									id="outlined-basic"
									label="Email"
									variant="outlined"
									type="email"
									placeholder="Enter email"
									required
									name="email"
									onChange={this.handleInputChange}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<TextField
									className="textfield"
									id="outlined-basic"
									label="Phone Number"
									variant="outlined"
									type="number"
									name="phoneNumber"
									placeholder="Your Phone Number"
									onChange={this.handleInputChange}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<TextField
									id="outlined-password-input"
									label="Password"
									type="password"
									variant="outlined"
									autoComplete="current-password"
									placeholder="Password"
									required
									name="passwordHash"
									onChange={this.handleInputChange}
								/>
							</Form.Group>
							<Button className="button__test" type="submit">
								Sign Up!
							</Button>
						</Form>
					</>
				)}
				{this.state.toggle && (
					<>
						<h2>Login</h2>

						<Form onSubmit={this.signIn}>
							<Form.Group controlId="formBasicEmail">
								<TextField
									className="textfield"
									id="outlined-basic"
									label="Email"
									variant="outlined"
									type="email"
									placeholder="Enter email"
									name="email"
									onChange={this.handleInputChange}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<TextField
									id="outlined-password-input"
									label="Password"
									type="password"
									variant="outlined"
									autoComplete="current-password"
									placeholder="Password"
									name="passwordHash"
									onChange={this.handleInputChange}
								/>
							</Form.Group>

							<Button className="button__test" type="submit">
								Sign In!
							</Button>
						</Form>
					</>
				)}
			</div>
		);
	}
}

import React, { Component } from 'react';
import './style.scss';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import Relógio from './../../asset/images/contactos/Relógio.png';
import Telemóvel from './../../asset/images/contactos/Telemóvel.png';
import Gmail from './../../asset/images/contactos/Gmail.png';
import Pin from './../../asset/images/contactos/Pin.png';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			mensagem: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.value;
		const inputName = event.target.name;
		console.log(value);
		this.setState({
			[inputName]: value,
		});
	}

	async sendMessage(event) {
		event.preventDefault();
		console.log('This is the mensage', this.state);
	}

	render() {
		let defaultProps = {
			center: {
				lat: 38.654588,
				lng: -9.053262,
			},
			zoom: 14,
		};
		return (
			<div className="At">
				<section>
					<div className="texto">
						<div>
							<img src={Pin} alt="Pin" />

							<p>Colocar aqui a morada</p>
						</div>
						<div>
							<img src={Telemóvel} alt="Telemóvel" />

							<p>
								<a href="tel:+351">919191919191</a>
							</p>
						</div>
						<div>
							<img src={Gmail} alt="Gmail" />
							<p>
								<a href="mailto:webmaster@example.com">Email@email.com</a>
							</p>
						</div>
						<div>
							<img src={Relógio} alt="Relógio" />
							<p>9h - 18h</p>
							<p>2ª a 6ª</p>
						</div>
					</div>
					<div className="contacto">
						<h3>Contacta-nos</h3>
						<Form onSubmit={this.sendMessage}>
							<FormGroup>
								<Label for="exampleEmail">O seu Email</Label>
								<Input
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleInputChange}
									required
									id="exampleEmail"
									placeholder="Escreva o seu email aqui..."
								/>
							</FormGroup>
							<FormGroup>
								<Label for="exampleText">A sua Mensagem</Label>
								<Input
									type="textarea"
									name="mensagem"
									required
									value={this.state.name}
									onChange={this.handleInputChange}
									id="exampleText"
									placeholder="A sua mensagem aqui..."
								/>
							</FormGroup>
							<Button>Submit</Button>
						</Form>
					</div>
				</section>
				<div className="maps" style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{
							key: 'AIzaSyDu1sb9-aIv5r5A1xPPFUW_vj5rVKu86F4',
						}}
						defaultCenter={defaultProps.center}
						defaultZoom={defaultProps.zoom}
					>
						<AnyReactComponent lat={38.64638} lng={-9.063015} text="Armazém" />
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}

export default index;

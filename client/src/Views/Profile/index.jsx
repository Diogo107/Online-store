import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Input, Table, Container, Row, Col } from 'reactstrap';
import './style.scss';
import { preventContextMenu, preventDefault } from '@fullcalendar/core';
import { Link } from 'react-router-dom';
import { updateProfile } from './../../Services/otherServices';
import Total from './../../Components/Total';
//Import Images
import cartImage from './../../asset/images/headerCart.png';
import Edit from './../../asset/images/editar.png';
//Products Forms
import Cheese from './../../Components/Forms/Queijo';
import CreateProduct from './../../Components/Forms/CreateProduct';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryForm: '',
			edit: false,
			admin: '',
			id: '',
			name: '',
			email: '',
			phoneNumber: '',
			NIF: '',
			Council: '',
			Parish: '',
			Address: '',
			BuildingNumber: '',
			Floor: '',
			DoorNumber: '',
			ZipCode: '',
			cart: [],
			total: 0,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.edit = this.edit.bind(this);
		this.update = this.update.bind(this);
		this.productType = this.productType.bind(this);
		this.changeRole = this.changeRole.bind(this);
	}

	componentDidMount() {
		console.log('Profile component did mount', this.props);
		if (this.props.user) {
			let cart = this.props.cart;
			let {
				name,
				email,
				admin,
				phoneNumber,
				NIF,
				Council,
				Parish,
				Address,
				BuildingNumber,
				Floor,
				DoorNumber,
				ZipCode,
			} = this.props.user;

			this.setState({
				id: this.props.user._id,
				name,
				email,
				admin,
				phoneNumber,
				NIF,
				Council,
				Parish,
				Address,
				BuildingNumber,
				Floor,
				DoorNumber,
				ZipCode,
				cart,
			});
			let total = 0;
			for (let i of cart) {
				total += i.price * i.quantity;
			}
			this.setState({
				total: total,
			});
		}
	}

	handleInputChange(event) {
		const value = event.target.value;
		const inputName = event.target.name;
		console.log(value);
		this.setState({
			[inputName]: value,
		});
	}

	edit() {
		this.setState({
			edit: !this.state.edit,
		});
	}

	async update(event) {
		event.preventDefault();
		let {
			id,
			name,
			email,
			admin,
			phoneNumber,
			NIF,
			Council,
			Parish,
			Address,
			BuildingNumber,
			Floor,
			DoorNumber,
			ZipCode,
		} = this.state;
		try {
			await updateProfile({
				id,
				name,
				email,
				admin,
				phoneNumber,
				NIF,
				Council,
				Parish,
				Address,
				BuildingNumber,
				Floor,
				DoorNumber,
				ZipCode,
			});
			this.setState({
				id,
				name,
				email,
				admin,
				phoneNumber,
				NIF,
				Council,
				Parish,
				Address,
				BuildingNumber,
				Floor,
				DoorNumber,
				ZipCode,
				edit: false,
			});

			this.props.history.push('/profile');
		} catch (error) {
			console.log(error);
		}
		this.props.updateUserInformation(this.state);
	}

	productType(event) {
		event.preventDefault();
		var productType = document.getElementById('productType').value;
		this.setState({
			categoryForm: productType,
		});
	}

	async changeRole() {
		let admin = !this.state.admin;
		console.log('this is the role', this.state.admin);
		await this.setState({ admin });
		let {
			id,
			name,
			email,
			phoneNumber,
			NIF,
			Council,
			Parish,
			Address,
			BuildingNumber,
			Floor,
			DoorNumber,
			ZipCode,
		} = this.state;
		await updateProfile({
			id,
			name,
			email,
			admin,
			phoneNumber,
			NIF,
			Council,
			Parish,
			Address,
			BuildingNumber,
			Floor,
			DoorNumber,
			ZipCode,
		});
		this.props.updateUserInformation(this.state);
		this.props.history.push('/');
	}

	render() {
		return (
			<div className="profile__overall">
				<div className="profile__details">
					<div>
						<h3>O meu perfil</h3>
						<button onClick={this.edit}>
							<img src={Edit} alt="edit" />
						</button>

						<Button onClick={this.changeRole}>Mudar Papel</Button>
					</div>
					<Form onSubmit={this.update}>
						<div>
							<p>
								<strong>Name</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.name}
									onChange={this.handleInputChange}
									name="name"
								/>
							)) ||
								this.state.name}
						</div>
						<div>
							<p>
								<strong>Email</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.email}
									onChange={this.handleInputChange}
									name="email"
								/>
							)) ||
								this.state.email}
						</div>
						<div>
							<p>
								<strong>Telefone</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.phoneNumber}
									onChange={this.handleInputChange}
									name="phoneNumber"
								/>
							)) ||
								this.state.phoneNumber}
						</div>
						<div>
							<p>
								<strong>Morada</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.Address}
									onChange={this.handleInputChange}
									name="Address"
								/>
							)) ||
								this.state.Address}
						</div>
						<div>
							<p>
								<strong>NIF</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.NIF}
									onChange={this.handleInputChange}
									name="NIF"
								/>
							)) ||
								this.state.NIF}
						</div>
						<div>
							<p>
								<strong>Nº Prédio</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.BuildingNumber}
									onChange={this.handleInputChange}
									name="BuildingNumber"
								/>
							)) ||
								this.state.BuildingNumber}
						</div>
						<div>
							<p>
								<strong>Piso</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.Floor}
									onChange={this.handleInputChange}
									name="Floor"
								/>
							)) ||
								this.state.Floor}
						</div>
						<div>
							<p>
								<strong>Porta</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.DoorNumber}
									onChange={this.handleInputChange}
									name="DoorNumber"
								/>
							)) ||
								this.state.DoorNumber}
						</div>
						<div>
							<p>
								<strong>Freguesia</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.Parish}
									onChange={this.handleInputChange}
									name="Parish"
								/>
							)) ||
								this.state.Parish}
						</div>
						<div>
							<p>
								<strong>Concelho</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.Council}
									onChange={this.handleInputChange}
									name="Council"
								/>
							)) ||
								this.state.Council}
						</div>
						<div>
							<p>
								<strong>Código Postal</strong>
							</p>
							{(this.state.edit && (
								<Input
									value={this.state.ZipCode}
									onChange={this.handleInputChange}
									name="ZipCode"
								/>
							)) ||
								this.state.ZipCode}
						</div>
						{this.state.edit && <Button type="submit">Atualizar</Button>}
					</Form>
				</div>
				{!this.state.admin && (
					<div className="profile__cart">
						<h3>O meu carrinho:</h3>
						<Table hover>
							<thead>
								<tr>
									<th>Nome</th>
									<th>Quantidade</th>
									<th>Preço/Unid</th>
									<th>Sub-total</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{this.state.cart &&
									this.state.cart.map((single) => (
										<tr key={single._id}>
											<th scope="row">{single.name}</th>

											<td>{single.name}</td>
											<td>{single.quantity}</td>
											<td>{single.price / 100} €</td>
											<td>{(single.price * single.quantity) / 100} €</td>
										</tr>
									))}
							</tbody>
						</Table>
						{this.state.total !== 0 && (
							<div className="Total__Checkout">
								<h3>
									Total do
									<br />
									carrinho:
								</h3>
								<h5>{this.state.total / 100} €</h5>
								<Link to="/carrinho">
									<Button>
										<h6>Finalizar compra</h6>
										<img src={cartImage} alt="botão de compra" />
									</Button>
								</Link>
							</div>
						)}
					</div>
				)}
				{this.state.admin && (
					<div className="profile__cart">
						<>
							<h3>Criar novo artigo:</h3>
							<CreateProduct />
						</>
					</div>
				)}
			</div>
		);
	}
}
{
	/*
	 <Form>
	<Input
		type="select"
		name="selectMulti"
		id="productType"
		onChange={this.productType}
	>
		<option>Escolher um...</option>
		<option value="Queijo">Queijo</option>
		<option value="Vinho">Vinho</option>
		<option value="Enchidos">Enchidos</option>
		<option value="Bolos">Bolos</option>
	</Input>
</Form> 
*/
}

import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import Edit from './../../asset/images/editar.png';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
	}
	componentDidMount() {
		this.setState({
			user: this.props.user,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.state.user) {
			this.setState({
				user: nextProps.user,
			});
		}
	}

	render() {
		console.log('this is the address', this.state);
		return (
			<div className="Address">
				{
					(this.state.user && this.state.user.Address && (
						<div>
							<h3>Morada de Entrega</h3>
							{this.state.user.Address && (
								<>
									<h5>Morada</h5>
									<p>{this.state.user.Address}</p>
								</>
							)}
							{this.state.user.DoorNumber && (
								<>
									<h5>Nº</h5>
									<p>{this.state.user.DoorNumber}</p>
								</>
							)}
							{this.state.user.Floor && (
								<>
									<h5>Piso</h5>
									<p>{this.state.user.Floor}</p>
								</>
							)}
							{this.state.user.DoorNumber && (
								<>
									<h5>Letra</h5>
									<p>{this.state.user.DoorNumber}</p>
								</>
							)}
							{this.state.user.Parish && (
								<>
									<h5>Freguesia</h5>
									<p>{this.state.user.Parish}</p>
								</>
							)}
							{this.state.user.Council && (
								<>
									<h5>Concelho</h5>
									<p>{this.state.user.Council}</p>
								</>
							)}
							{this.state.user.ZipCode && (
								<>
									<h5>Codigo Postal</h5>
									<p>{this.state.user.ZipCode}</p>
								</>
							)}
							{this.state.user.NIF && (
								<>
									<h5>NIF</h5>
									<p>{this.state.user.NIF}</p>
								</>
							)}
						</div>
					)) || (
						<Link to="/profile">
							<div className="No__Address">
								<img src={Edit} alt="editar" />
								<p>Registar morada</p>
							</div>
						</Link>
					)

					/* botão a mandar para o perfil atualizar morada */
				}
			</div>
		);
	}
}
export default index;

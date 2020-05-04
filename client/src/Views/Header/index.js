import React, { Component } from 'react';
import './style.scss';
import headerAt from './../../asset/images/headerAt.png';
import headerSearch from './../../asset/images/headerSearch.png';
import UserActive from './../../asset/images/userActive.png';
import UserInactive from './../../asset/images/userInactive.png';
import EmptyCart from './../../asset/images/emptyCart.png';
import FullCart from './../../asset/images/fullCart.png';
import LogoVendas from './../../asset/images/LogoVendas.jpg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { signOut } from './../../Services/authentication';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			update: false,
			emptyFull: true,
		};
		this.hadleSignout = this.hadleSignout.bind(this);
	}

	componentDidMount() {
		console.log('this is the header', this.props.cart);
		this.setState({
			cart: this.props.cart,
		});
	}

	componentDidUpdate() {
		if (this.props.cart !== this.state.cart) {
			let emptyFull = this.props.cart == 0;
			this.setState({
				update: !this.state.update,
				cart: this.props.cart,
				emptyFull: emptyFull,
			});
		}
	}

	async hadleSignout() {
		await signOut();
		await this.props.history.push('/');
		window.location.reload();
	}

	render() {
		return (
			<div className="firstBar">
				<div id="logo">
					<Link to="/list">
						<img
							src={LogoVendas}
							alt=""
							style={{ width: '100px', height: '100px' }}
						/>
					</Link>
				</div>
				<div>
					<div class="dropdown">
						<button class="dropbtn">
							{!this.props.user && (
								<Link to="/login">
									<img className="invert" src={UserInactive} alt="" />
								</Link>
							)}
							{this.props.user && (
								<Link to="/profile">
									<img src={UserActive} alt="" />
								</Link>
							)}
						</button>
						<div class="dropdown-content">
							<Link to="/profile">Meu Perfil</Link>
							<a>
								<button onClick={this.hadleSignout}>Logout</button>
							</a>
						</div>
					</div>

					<div class="dropdown">
						<Link to="/carrinho">
							<button class="dropbtn ">
								{this.state.emptyFull && (
									<img
										className="invert"
										src={EmptyCart}
										alt="Carrinho Vazio"
									/>
								)}
								{!this.state.emptyFull && (
									<img src={FullCart} alt="Carrinho Cheio" />
								)}
							</button>
						</Link>
						<div class="dropdown-content">
							<Link to="/carrinho">Meu Carrinho</Link>
							<Link to="/encomendas">Encomendas</Link>
							<Link to="/historico">Histórico</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

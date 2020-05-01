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

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			update: false,
			emptyFull: true,
		};
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
	render() {
		return (
			<div className="firstBar">
				<div>
					<Link to="/contactos">
						<img src={headerAt} alt="" width="50px" height="50px" />
					</Link>
					<Link to="/list">
						<img src={headerSearch} alt="Procurar por Categoria" />
					</Link>
				</div>
				<div>
					<Link to="/">
						<img src={LogoVendas} alt="" />
					</Link>
				</div>
				<div>
					{!this.props.user && (
						<Link to="/login">
							<img src={UserInactive} alt="" />
						</Link>
					)}
					{this.props.user && (
						<Link to="/profile">
							<img src={UserActive} alt="" />
						</Link>
					)}
					<Link to="/carrinho">
						{this.state.emptyFull && (
							<img src={EmptyCart} alt="Carrinho Vazio" />
						)}
						{!this.state.emptyFull && (
							<img src={FullCart} alt="Carrinho Cheio" />
						)}
					</Link>
				</div>
			</div>
		);
	}
}

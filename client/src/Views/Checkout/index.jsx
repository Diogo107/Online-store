import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import PaymentMethod from './../PaymentMethodCreate';
import PaymentMethodList from './../PaymentMethodList';
import { create as createPurchase } from './../../Services/purchase';
//importar imagens
import cart from './../../asset/images/headerCart.png';
//Stripe
import Stripe from './../Stripe/index.jsx';
import { loadStripe } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	ElementsConsumer,
} from '@stripe/react-stripe-js';
import { create as paymentMethodCreate } from './../../Services/payment-method';
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
//Fim do Stripe

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			empty: false,
			cart: [],
			total: 0,
		};
		this.handlePurchase = this.handlePurchase.bind(this);
	}

	async componentDidMount() {
		let empty = this.props.cart.length == 0 ? true : false;
		let cart = this.props.cart;
		let total = 0;
		for (let i of cart) {
			total += i.price * i.quantity;
		}
		this.setState({
			cart: this.props.cart,
			empty,
			total,
		});
	}

	async handlePurchase() {
		const ids = this.state.cart.map((product) => product._id);
		const cart = this.state.cart;
		try {
			await createPurchase({ ids, cart });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className="checkout">
				<h1>Checkout</h1>
				{(this.state.empty && (
					<div className="Checkout__emptycart">
						<img src={cart} alt="carrinho de compras" />
						<h5>O carrinho parece estar vazio...</h5>
						<Link to="/list">
							<button className="btn btn-4">Vamos às compras...</button>
						</Link>
					</div>
				)) || (
					<div>
						{this.state.cart.map((product) => (
							<div className="Single__Product__Checkout">
								<img src={product.image} alt={product.name} />
								<div>
									<h4>{product.name}</h4>
									<div>
										<p>{product.quantity} X</p>
										<p>{product.price} €</p>
									</div>
								</div>
								<h3>{product.quantity * product.price} €</h3>
							</div>
						))}
						<PaymentMethod />
						<PaymentMethodList />
						<div className="Checkout__Total">
							<div>This will be the stripe</div>
							<button
								className="Checkout__button"
								onClick={this.handlePurchase}
							>
								Comprar
							</button>
							<h2>Total</h2>
							<h2>{this.state.total} €</h2>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default index;

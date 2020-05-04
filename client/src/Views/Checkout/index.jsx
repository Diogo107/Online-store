import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Button from '@material-ui/core/Button';
import './style.scss';
import PaymentMethod from './../PaymentMethodCreate';
import PaymentMethodList from './../PaymentMethodList';
import Address from './../../Components/Address';
import { create as createPurchase } from './../../Services/purchase';
//importar imagens
import cart from './../../asset/images/headerCart.png';
import remove from './../../asset/images/remove.png';
import plus from './../../asset/images/plus.png';
import minus from './../../asset/images/minus.png';
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
			paymentMethod: false,
		};
		this.handlePurchase = this.handlePurchase.bind(this);
		this.addPayment = this.addPayment.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.updateSingleQuantity = this.updateSingleQuantity.bind(this);
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

	componentWillReceiveProps(nextProps) {
		let empty = nextProps.cart.length == 0 ? true : false;
		let total = 0;
		for (let i of nextProps.cart) {
			total += i.price * i.quantity;
		}
		this.setState({
			cart: nextProps.cart,
			total,
			empty,
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

	addPayment() {
		this.setState({
			paymentMethod: !this.state.paymentMethod,
		});
	}

	removeFromCart(event) {
		event.preventDefault();
		let removeId = event.target[0].name;
		let cart = this.state.cart.filter((single) => single._id !== removeId);
		this.setState({
			cart: cart,
		});
		this.props.removeFromCart(cart);
	}

	updateSingleQuantity(event) {
		event.preventDefault();
		let operation = event.target[0].name;
		let id = event.target[0].value;
		let cart = this.state.cart;
		for (let i of cart) {
			if (i._id == id && operation == 'plus') {
				i.quantity++;
			} else if (i._id == id && operation == 'minus') {
				i.quantity == 1
					? this.props.removeFromCart(
							this.state.cart.filter((single) => single._id !== id)
					  )
					: i.quantity--;
			}
		}
		this.props.updateCartQuantity(cart);
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
						<div className="Checkout__Left">
							<Table hover>
								<thead>
									<tr>
										<th>Producto</th>
										<th>Quantidade</th>
										<th>Preço</th>
										<th>Sub-total</th>
										<th>Remover</th>
									</tr>
								</thead>
								<tbody>
									{this.state.cart.map((product) => (
										<tr key={product._id}>
											<th scope="row">{product.name}</th>
											<td>
												<div>
													<form onSubmit={this.updateSingleQuantity}>
														<button name="minus" value={product._id}>
															<img src={minus} alt="minus" />{' '}
														</button>
													</form>
													{product.quantity}
													<form onSubmit={this.updateSingleQuantity}>
														<button name="plus" value={product._id}>
															<img src={plus} alt="plus" />{' '}
														</button>
													</form>
												</div>
											</td>
											<td>€{product.price / 100}</td>
											<td>€{(product.quantity * product.price) / 100}</td>
											<td>
												<form onSubmit={this.removeFromCart}>
													<button name={product._id}>
														<img src={remove} alt="" />
													</button>
												</form>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
						<div className="Checkout__Right">
							{(this.state.paymentMethod && (
								<PaymentMethod addPayment={this.addPayment} {...this.props} />
							)) || (
								<PaymentMethodList
									addPayment={this.addPayment}
									{...this.props}
								/>
							)}
							<Address {...this.props} />
							<div className="Checkout__Total">
								<Button
									variant="contained"
									color="primary"
									component="span"
									onClick={this.handlePurchase}
								>
									Comprar
								</Button>
								<h2>Total</h2>
								<h2>{this.state.total / 100} €</h2>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default index;

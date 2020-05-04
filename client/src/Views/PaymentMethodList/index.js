import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	list as listPaymentMethods,
	erase,
} from '../../Services/payment-method';
import remove from './../../asset/images/remove.png';
import './style.scss';
import Button from '@material-ui/core/Button';

class PaymentMethodView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paymentMethods: [],
		};
		this.removeCard = this.removeCard.bind(this);
	}

	async fetchData() {
		const paymentMethods = await listPaymentMethods();
		this.setState({ paymentMethods });
	}

	componentDidMount() {
		this.fetchData();
	}

	async removeCard(event) {
		event.preventDefault();
		let id = event.target[0].name;
		await erase(id);
		this.componentDidMount();
	}

	render() {
		return (
			<div>
				<h3>Meio de Pagamento</h3>
				{this.state.paymentMethods.map((method) => (
					<div className="payment__method--card">
						<img src={`/card-brands/${method.brand}.png`} />
						<span>**** **** **** {method.lastFourDigits}</span>
						<span>
							{method.expirationDate.month}/{method.expirationDate.year}
						</span>
						<form onSubmit={this.removeCard}>
							<button name={method._id}>
								<img src={remove} alt="Remover" />
							</button>
						</form>
					</div>
				))}
				<Button
					variant="contained"
					color="primary"
					component="span"
					onClick={this.props.addPayment}
				>
					Adicionar Cartão
				</Button>
			</div>
		);
	}
}

export default PaymentMethodView;

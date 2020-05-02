import React, { Component } from 'react';
import { getProducts } from './../../Services/food';
import { ButtonToggle, Input } from 'reactstrap';
import './style.scss';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			loaded: false,
			product: null,
		};
		this.buttonBuy = this.buttonBuy.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	async componentDidMount() {
		console.log('this is the single product', this.props);
		const id = this.props.match.params.id;
		const products = await getProducts();
		const product = products.filter((one) => one._id == id);
		this.setState({
			product: product[0],
			loaded: true,
		});
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

	buttonBuy() {
		if (this.props.user) {
			const product = {
				_id: this.state.product._id,
				name: this.state.product.Brand,
				quantity: this.state.quantity,
				price: this.state.product.Price,
				image: this.state.product.Picture,
			};
			console.log('this is the product', product);
			this.props.addToCart(product);
		} else {
			this.props.history.push('/login');
		}
	}

	render() {
		return (
			<>
				{this.state.loaded && (
					<div className="Single__Product">
						<div className="Single__Left">
							<img
								src={this.state.product.Picture}
								alt={this.state.product.Category}
							/>
						</div>
						<div className="Single__Right">
							<div>
								<h5>Categoria</h5>
								<p>{this.state.product.Category}</p>
							</div>
							<div>
								<h5>Marca</h5>
								<p>{this.state.product.Brand}</p>
							</div>
							<div>
								<h5>Região</h5>
								<p>{this.state.product.Region}</p>
							</div>
							<div>
								<h5>Descrição</h5>
								<p>{this.state.product.Description}</p>
							</div>
							<div>
								<h5>Preço</h5>
								<p>{this.state.product.Price / 100} €</p>
							</div>
							<div className="Div__Buy__Quantity">
								<ButtonToggle color="warning" onClick={this.buttonBuy}>
									Adicionar ao Carrinho
								</ButtonToggle>
								<Input
									type="Number"
									name="quantity"
									value={this.state.quantity}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<h5>Stock</h5>
								<p>{this.state.product.Stock}</p>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

export default index;

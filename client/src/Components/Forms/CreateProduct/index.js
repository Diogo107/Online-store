import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, Button } from 'reactstrap';
import { createProduct } from '../../../Services/food';
import './style.scss';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Picture: '',
			Category: '',
			Brand: '',
			Quantity: '',
			Region: '',
			Description: '',
			Price: '',
			Stock: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.value;
		const inputName = event.target.name;
		console.log(value);
		this.setState({
			[inputName]: value,
		});
	}

	saveProduct(event) {
		event.preventDefault();
		createProduct(this.state);
		this.setState({
			Picture: '',
			Category: '',
			Brand: '',
			Quantity: '',
			Region: '',
			Description: '',
			Price: '',
			Stock: '',
		});
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.saveProduct}>
					<FormGroup>
						<Label>Categoria</Label>
						<Input
							type="select"
							name="Category"
							value={this.state.Category}
							onChange={this.handleInputChange}
						>
							<option>Escolher um...</option>
							<option value="Queijo">Queijo</option>
							<option value="Vinho">Vinho</option>
							<option value="Enchidos">Enchidos</option>
							<option value="Bolos">Bolos</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label>Imagem</Label>
						<Input
							name="Picture"
							value={this.state.Picture}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Marca</Label>
						<Input
							name="Brand"
							value={this.state.Brand}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Quantidade (g / l)</Label>
						<Input
							name="Quantity"
							type="Number"
							placeholder="Em gramas ou litros..."
							value={this.state.Quantity}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Região</Label>
						<Input
							name="Region"
							value={this.state.Region}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Descrição</Label>
						<Input
							name="Description"
							value={this.state.Description}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Preço</Label>
						<Input
							name="Price"
							type="Number"
							value={this.state.Price}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Unidades Disponíveis</Label>
						<Input
							name="Stock"
							type="Number"
							value={this.state.Stock}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					{/* <FormGroup>
						<Label>Unidades por Embalagem</Label>
						<Input
							name="QuantityPerBox"
							type="Number"
							value={this.state.QuantityPerBox}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Peso da Embalagem</Label>
						<Input
							name="BoxWeight"
							type="Number"
							placeholder="Em gramas..."
							value={this.state.BoxWeight}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Origem</Label>
						<Input
							name="Origin"
							value={this.state.Origin}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Intensidade</Label>
						<Input
							name="Intensity"
							value={this.state.Intensity}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Dicas de Conservação</Label>
						<Input
							name="Preservation"
							value={this.state.Preservation}
							onChange={this.handleInputChange}
						/>
					</FormGroup> */}
					<Button>Gravar</Button>
				</Form>
			</div>
		);
	}
}

export default index;

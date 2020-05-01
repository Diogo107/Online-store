import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, Button } from 'reactstrap';
import { cheese } from '../../../Services/food';
import './style.scss';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Category: 'Queijo',
			Picture: '',
			Brand: '',
			QuantityPerBox: '',
			UnitWeight: '',
			BoxWeight: '',
			Origin: '',
			Intensity: '',
			Region: '',
			Preservation: '',
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
		cheese(this.state);
		console.log('Queijo Guardado', event.target);
		console.log('Queijo Guardado', this.state);
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.saveProduct}>
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
							name="UnitWeight"
							type="Number"
							placeholder="Em gramas..."
							value={this.state.UnitWeight}
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
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
						<Label>Região</Label>
						<Input
							name="Region"
							value={this.state.Region}
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
					<Button>Gravar</Button>
				</Form>
			</div>
		);
	}
}

export default index;

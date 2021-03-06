import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './style.scss';
import { getProducts } from './../../Services/food';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: [],
		};
		this.update = this.update.bind(this);
		this.find = this.find.bind(this);
	}

	async componentDidMount() {
		this.update();
	}

	async update() {
		try {
			const listOfProducts = await getProducts();
			console.log('Client again', listOfProducts);
			this.setState({ content: listOfProducts });
		} catch (error) {
			console.log(error);
		}
	}

	find() {
		console.log(this.state);
	}

	render() {
		console.log('this is the state on the list, Cheese?', this.state);
		return (
			<div className="Card-List">
				{/* <button onClick={this.find}>Hello</button> */}
				<Container>
					<Row xs="4">
						{this.state.content.map((single) => (
							<Col class="container" key={single._id}>
								<Link to={this.props.location.pathname + '/' + single._id}>
									<img
										src={single.Picture}
										alt="single picture"
										className="image"
									/>
									<div class="middle">
										<div class="text">{single.Price / 100} €</div>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		);
	}
}

export default index;

import React, { Component } from 'react';

import './App.scss';
import NavBar from './Components/NavBar';
import { loadUserInformation } from './Services/authentication';
import { updateProfile, updateCart } from './Services/otherServices';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Header from './Views/Header';
import CategoriesBar from './Views/CategoriesBar';
import CardList from './Views/CardList';
import At from './Views/At';
import SignUp from './Views/Auth/SignUp';
import Profile from './Views/Profile';
import SingleProduct from './Views/SingleProduct';
import Checkout from './Views/Checkout';
import Footer from './Components/Footer';
import FAQ from './Views/FAQ';

/* Este ainda não usei */
import PdfViews from './Views/PdfView';
import PostsView from './Views/posts/viewPosts';
import { Toast, Col, Button, Row } from 'react-bootstrap';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			user: null,
			cart: [],
			toggleShowB: true,
		};
		this.updateUserInformation = this.updateUserInformation.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.updateRole = this.updateRole.bind(this);
	}

	async componentDidMount() {
		const user = await loadUserInformation();
		if (user !== null) {
			await this.updateUserInformation(user);
		}
		this.setState({
			loaded: true,
		});
	}

	updateRole() {
		console.log('update role');
	}

	componentDidUpdate() {}

	updateUserInformation(user) {
		this.setState({
			user,
			cart: user.cart,
		});
	}

	async addToCart(data) {
		try {
			if (this.state.cart.some((product) => product._id === data._id)) {
				//if the product exists in cart
				let tempArray = this.state.cart;
				let objIndex = await tempArray.findIndex(
					(product) => product._id === data._id
				);
				tempArray[objIndex].quantity += Number(data.quantity);
				await this.setState({
					cart: tempArray,
				});
				let id = this.state.user._id;
				let cart = this.state.cart;
				await updateCart({ id, cart });
			} else {
				//if the product does not exist in cart
				await this.setState((previousState) => ({
					cart: [...previousState.cart, data],
				}));
				let id = this.state.user._id;
				let cart = this.state.cart;
				await updateCart({ id, cart });
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Route
						path="*"
						render={(props) => (
							<Header
								user={this.state.user}
								cart={this.state.cart}
								{...props}
							/>
						)}
					/>
					<Route
						path="/list"
						render={(props) => (
							<CategoriesBar user={this.state.user} {...props} />
						)}
					/>
					<Route
						path="/contactos"
						exact
						render={(props) => <At user={this.state.user} {...props} />}
					/>
					<Route
						path="/profile"
						exact
						render={(props) => (
							<Profile
								user={this.state.user}
								cart={this.state.cart}
								updateUserInformation={this.updateUserInformation}
								{...props}
							/>
						)}
					/>
					<Route
						path="/login"
						exact
						render={(props) => (
							<SignUp
								user={this.state.user}
								updateUserInformation={this.updateUserInformation}
								{...props}
							/>
						)}
					/>
					<Route
						path="/list"
						exact
						render={(props) => <CardList user={this.state.user} {...props} />}
					/>
					<Route
						path="/carrinho"
						exact
						render={(props) => (
							<Checkout
								cart={this.state.cart}
								user={this.state.user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/list/:id"
						render={(props) => (
							<SingleProduct
								user={this.state.user}
								addToCart={this.addToCart}
								{...props}
							/>
						)}
					/>
					<Route path="/FAQ" exact render={(props) => <FAQ {...props} />} />
					<Route path="/*" exact render={(props) => <Footer {...props} />} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;

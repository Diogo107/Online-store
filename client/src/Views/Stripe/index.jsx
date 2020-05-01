import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ success }) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (!error) {
			const { id } = paymentMethod;

			try {
				const { data } = await axios.post('/api/charge', { id, amount: 1099 });
				console.log(data);
				success();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ maxWidth: '400px', margin: '0 auto' }}
		>
			<CardElement />
			<button type="submit" disabled={!stripe}>
				Pay
			</button>
		</form>
	);
};

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe('pk_test_Ttnf7IRQJmrNtF4Y6cL7WdCo00SgIhiI8D');

const Index = () => {
	const [status, setStatus] = React.useState('ready');

	if (status === 'success') {
		return <div>Obrigado pela sua compra!</div>;
	}

	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm
				success={() => {
					setStatus('success');
				}}
			/>
		</Elements>
	);
};

export default Index;

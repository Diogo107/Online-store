import axios from 'axios';
//const cors = require('cors');

const instance = axios.create({
	baseURL: '/api',
});

const cheese = async (data) => {
	console.log('Ainda no cliente', data);
	new Promise((resolve, reject) => {
		instance
			.post('/cheese', data)
			.then((result) => {
				resolve(result);
			})
			.catch(reject);
	});
};
export { cheese };

const getCheese = async (data) => {
	const result = await instance.get('/cheese', data);
	return result.data.cheese;
};
export { getCheese };

//Criar produtos genéricos

const createProduct = async (data) => {
	const result = await instance.post('/createProduct', data);
	console.log('services', result);
	return result;
};
export { createProduct };

const getProducts = async (data) => {
	const result = await instance.get('/getProducts', data);
	console.log('services getting back', result);
	return result.data.product;
};
export { getProducts };

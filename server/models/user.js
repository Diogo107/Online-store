'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	picture: {
		type: String,
		default:
			'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png',
	},
	phoneNumber: {
		type: Number,
		trim: true,
	},
	passwordHash: {
		type: String,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	NIF: {
		type: Number,
		trim: true,
	},
	Council: {
		type: String,
		trim: true,
	},
	Parish: {
		type: String,
		trim: true,
	},
	Address: {
		type: String,
		trim: true,
	},
	BuildingNumber: {
		type: String,
		trim: true,
	},
	Floor: {
		type: String,
		trim: true,
	},
	DoorNumber: {
		type: String,
		trim: true,
	},
	ZipCode: {
		type: String,
		trim: true,
	},
	cart: [
		{
			_id: String,
			name: String,
			quantity: {
				type: Number,
				default: 1,
			},
			price: Number,
			image: String,
		},
	],
	stripeCustomerId: String,
	createdAt: Date,
});

module.exports = mongoose.model('User', schema);

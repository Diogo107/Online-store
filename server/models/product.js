'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	Picture: {
		type: String,
		default: 'https://source.unsplash.com/random/200x150?cheese',
	},
	Category: String,
	Brand: String,
	QuantityPerBox: Number,
	UnitWeight: Number,
	BoxWeight: Number,
	Origin: String,
	Intensity: String,
	Region: String,
	Preservation: String,
	Description: String,
	Price: Number,
	Stock: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Product', schema);

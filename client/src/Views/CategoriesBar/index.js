import React, { Component } from 'react';
import './style.scss';
import Queijo from './../../asset/images/food/Queijo.png';
import Chouriço from './../../asset/images/food/Chouriço.png';
import Vinho from './../../asset/images/food/Vinho.png';
import Tarte from './../../asset/images/food/Tarte.png';
import Pão from './../../asset/images/food/Pão.png';
import Círculo from './../../asset/images/Círculo.png';

class index extends Component {
	render() {
		return (
			<div class="bar">
				<ul>
					<li>
						<img id="invert" src={Círculo} alt="Todos" />
					</li>
					<li>
						<img src={Queijo} alt="Queijo" />
					</li>
					<li>
						<img src={Chouriço} alt="Chouriço" />
					</li>
					<li>
						<img src={Vinho} alt="Vinho" />
					</li>
					<li>
						<img src={Tarte} alt="Tarte" />
					</li>
					<li>
						<img src={Pão} alt="Pão" />
					</li>
				</ul>
			</div>
		);
	}
}

export default index;

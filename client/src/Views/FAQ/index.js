import React, { Component } from 'react';
import './style.scss';

class index extends Component {
	render() {
		return (
			<div className="FAQ">
				<h1>Perguntas Frequentes</h1>
				<div class="clicker" tabindex="1">
					<h4>Como funciona os pagamentos</h4>
				</div>
				<div class="hiddendiv">
					<p>Por referência bancária</p>
				</div>
				<div class="clicker" tabindex="1">
					<h4>E as entregas?</h4>
				</div>
				<div class="hiddendiv">
					<p>Podem recolher no armazém ou vamos entregar à porta.</p>
				</div>
				<div class="clicker" tabindex="1">
					<h4>Em quanto tempo acontecem as entregas?</h4>
				</div>
				<div class="hiddendiv">
					<p>Podem recolher no armazém ou vamos entregar à porta.</p>
				</div>
				<div class="clicker" tabindex="1">
					<h4>De que forma poderei contactar em caso de dúvidas?</h4>
				</div>
				<div class="hiddendiv">
					<p>Podem recolher no armazém ou vamos entregar à porta.</p>
				</div>
			</div>
		);
	}
}

export default index;

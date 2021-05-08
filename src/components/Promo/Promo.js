import React from 'react';
import './Promo.css';
import landingback from '../../images/landing.svg';

function Promo() {
	return (
		<div className="promo">
			<img className="promo__img" src={landingback} alt="Буква П" />
			<h1 className="promo__title">
				Учебный проект студента факультета Веб-разработки.
			</h1>
		</div>
	);
}

export default Promo;

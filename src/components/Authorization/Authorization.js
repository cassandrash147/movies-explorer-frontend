import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import './Authorization.css';
import logo from '../../images/logo.svg';

function Authorization(props) {
	const location = useLocation();

	return (
		<div className="authorization">
			<div className="authorization__container">
				<Link to="/">
					{' '}
					<img
						className="authorization__logo"
						src={logo}
						alt="Белый смайлик на зеленом фоне"
					/>
				</Link>

				<h2 className="authorization__title">{props.title}</h2>

				<form className="form" name="register" noValidate>
					{props.children}

					<span id="password-error" className="form-element__error"></span>

					<button
						type="submit"
						className={`form-element__button ${
							location.pathname === '/signin' &&
							'form-element__button_place_login'
						}`}
					>
						{props.button}
					</button>
				</form>

				<div className="authorization__nav-container">
					<p className="authorization__question">{props.question}</p>

					<Link to={props.link} className="authorization__link">
						{props.linktext}
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Authorization;

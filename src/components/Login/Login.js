import React from 'react';
import { Redirect } from 'react-router';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';
import { useFormWithValidation } from '../../utils/FormValidator';

function Login(props) {
	const { values, handleChange, errors, isValid } = useFormWithValidation();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		props.handleSubmit(values['email'], values['password']);
	};

	return (
		<>
			{props.loggedIn ? (
				<Redirect to="/movies" />
			) : (
				<Authorization
					title="Рады видеть!"
					button="Войти"
					question="Еще не зарегистрированы?"
					link="/signup"
					linktext="Регистрация"
					handleSubmit={handleSubmit}
					isValid={isValid}
					errorText={props.errorText}
					isError={props.isError}
				>
					<FormElement
						title="E-mail"
						name="email"
						type="email"
						minLength="3"
						maxLength="30"
						pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
						required
						error={errors['email']}
						onChange={handleChange}
					/>
					<FormElement
						title="Пароль"
						name="password"
						type="password"
						minLength="5"
						maxLength="30"
						required
						error={errors['password']}
						onChange={handleChange}
					/>
				</Authorization>
			)}
		</>
	);
}

export default Login;

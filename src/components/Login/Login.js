import React from 'react';
import Authorization from '../Authorization/Authorization';
import FormElement from '../FormElement/FormElement';

function Login(props) {
	const [isEmail, setEmail] = React.useState('');
	const [isPassword, setPassword] = React.useState('');

	return (
		<Authorization
			title="Рады видеть!"
			button="Войти"
			question="Еще не зарегистрированы?"
			link="/signup"
			linktext="Регистрация"
		>
			<FormElement
				title="E-mail"
				setInputValue={setEmail}
				value={isEmail}
				minLength="3"
				maxLength="30"
				pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
				required
			/>
			<FormElement
				title="Пароль"
				setInputValue={setPassword}
				value={isPassword}
				minLength="5"
				maxLength="30"
				required
			/>
		</Authorization>
	);
}

export default Login;

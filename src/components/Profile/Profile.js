import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import { useFormWithValidation } from '../../utils/FormValidator';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [editProfile, setEditProfile] = React.useState(false);
	const [errorEditText, setErrorEditText] = React.useState('');
	const [sucsessProfileChange, setSucsessProfileChange] = React.useState(false);
	const {
		values,
		handleChange,
		isValid,
		setIsValid,
		errors,
	} = useFormWithValidation();

	React.useEffect(() => {
		if (
			values['email'] === currentUser.email &&
			values['name'] === currentUser.name
		) {
			setIsValid(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, currentUser]);

	React.useEffect(() => {
		values['name'] = currentUser.name;
		values['email'] = currentUser.email;

		setIsValid(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	const handleEditProfile = () => {
		setEditProfile(true);
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		document.getElementsByClassName('profile__input').disabled = true;
		document.getElementsByClassName('profile__submit-button').disabled = true;
		mainApi
			.editProfile(values['name'], values['email'])
			.then((userData) => {
				props.setСurrentUser(userData);
				values['name'] = currentUser.name;
				values['email'] = currentUser.email;
				setEditProfile(false);
				setSucsessProfileChange(true);
				setErrorEditText('');
			})
			.catch((err) => {
				console.log('Ошибка', err);
				setErrorEditText(err.message);
			})
			.finally(() => {
				document.getElementsByClassName('profile__input').disabled = false;
				document.getElementsByClassName(
					'profile__submit-button'
				).disabled = false;
				setErrorEditText('');
			});
	};

	const handleLogout = (e) => {
		e.preventDefault();
		props.handleLogout();
	};

	return (
		<div className="profile">
			<h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
			{!editProfile === true ? (
				<>
					<div className="profile_section">
						<p className="profile__user-text">Имя</p>
						<p className="profile__user-text">{currentUser.name}</p>
					</div>
					<div className="profile_section">
						<p className="profile__user-text">E-mail</p>
						<p className="profile__user-text">{currentUser.email}</p>
					</div>

					<div className="profile_navsection">
						<button className="profile__button" onClick={handleEditProfile}>
							Редактировать
						</button>
						<NavLink
							className="profile__button profile__button_type-red"
							to="/signin"
							onClick={handleLogout}
						>
							Выйти из аккаунта
						</NavLink>
					</div>
				</>
			) : (
				<>
					<form
						className="profile__form"
						onSubmit={handleSubmitForm}
						noValidate
					>
						<div className="profile_section">
							<p className="profile__user-text">Имя</p>
							<input
								className="profile__input"
								name="name"
								value={values['name']}
								onChange={handleChange}
								minLength="2"
								maxLength="30"
								required
							/>
						</div>
						<div className="profile_section">
							<p className="profile__user-text">Почта</p>
							<input
								className="profile__input"
								name="email"
								type="email"
								value={values['email']}
								onChange={handleChange}
								pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
								required
							/>
						</div>
						<span className="profile__error">
							{(errors && errors['email'] !== '' && errors['email']) ||
								(errors && errors['name'] !== '' && errors['name']) ||
								errorEditText}
						</span>
						<button
							className={`profile__submit-button ${!isValid}`}
							type="submit"
							disabled={!isValid}
						>
							Сохранить
						</button>
					</form>
				</>
			)}
			{sucsessProfileChange === true ? (
				<div className="profile__sucsess-cover">
					<div className="profile__sucsess-message">
						Профиль успешно сохранен
						<button
							className="profile__sucsess__close-button"
							type="button"
							onClick={() => {
								setSucsessProfileChange(false);
							}}
						/>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Profile;

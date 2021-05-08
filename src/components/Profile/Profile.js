import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
	return (
		<div className="profile">
			<h2 className="profile__title">Привет, Виталий!</h2>
			<div className="profile_section">
				<p className="profile__user-text">Имя</p>
				<p className="profile__user-text">Виталий</p>
			</div>
			<div className="profile_section">
				<p className="profile__user-text">E-mail</p>
				<p className="profile__user-text">pochta@mail.ru</p>
			</div>

			<div className="profile_navsection">
				<button className="profile__button">Редактировать</button>
				<NavLink
					className="profile__button profile__button_type-red"
					to="/signin"
				>
					Выйти из аккаунта
				</NavLink>
			</div>
		</div>
	);
}

export default Profile;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useLocation } from 'react-router-dom';

function Navigation(props) {
	const location = useLocation();

	return (
		<div className="navigation__container">
			{!props.loggedIn ? (
				<ul className="navigation">
					<li>
						<NavLink className="navigation__link" to="/signup">
							Регистрация
						</NavLink>
					</li>
					<li>
						<NavLink
							className="navigation__link navigation__link_type-green"
							to="signin"
						>
							Войти
						</NavLink>
					</li>
				</ul>
			) : (
				<>
					<button
						className="navigation__burger-button"
						onClick={() => {
							props.setSidebar(true);
						}}
					/>
					<ul className="navigation navigation__place_movies">
						<li>
							<NavLink
								className={`navigation__link ${
									location.pathname === '/movies' && 'navigation__link_active'
								}`}
								to="/movies"
							>
								Фильмы
							</NavLink>
						</li>
						<li>
							<NavLink
								className={`navigation__link ${
									location.pathname === '/saved-movies' &&
									'navigation__link_active'
								}`}
								to="/saved-movies"
							>
								Сохранённые фильмы
							</NavLink>
						</li>
					</ul>
				</>
			)}
		</div>
	);
}

export default Navigation;

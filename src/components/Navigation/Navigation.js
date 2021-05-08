import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { Route, Switch, useLocation } from 'react-router-dom';

function Navigation(props) {
	const location = useLocation();

	return (
		<div className="navigation__container">
			<Switch>
				<Route exact path="/">
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
				</Route>
				<Route exact path="/:route">
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
				</Route>
			</Switch>
		</div>
	);
}

export default Navigation;

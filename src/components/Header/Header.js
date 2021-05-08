import React from 'react';
import { Route, Switch, useLocation, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './Header.css';
import Navigation from '../Navigation/Navigation';
import AccountButton from '../AccountButton/AccountButton';

function Header(props) {
	const location = useLocation();
	console.log(location);
	return (
		<header
			className={`header ${
				location.pathname === '/' ? 'header_landing' : 'header_movies'
			}`}
		>
			<Link to="/">
				<img
					className="header__logo"
					src={logo}
					alt="Белый смайлик на зеленом фоне"
				/>
			</Link>
			<Switch>
				<Route exact path="/">
					<Navigation setSidebar={props.setSidebar} />
				</Route>
				<Route exact path="/:route">
					<Navigation setSidebar={props.setSidebar} />
					<AccountButton isHeader="true" />
				</Route>
			</Switch>
		</header>
	);
}

export default Header;

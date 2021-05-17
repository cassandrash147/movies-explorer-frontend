import React from 'react';
import { Route, Switch, useLocation, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import AccountButton from '../AccountButton/AccountButton';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
	const location = useLocation();

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
			{location.pathname === '/signin' || location.pathname === '/signup' ? (
				<></>
			) : (
				<>
					<Navigation setSidebar={props.setSidebar} loggedIn={props.loggedIn} />
					{!props.loggedIn ? <></> : <AccountButton isHeader="true" />}
				</>
			)}
		</header>
	);
}

export default Header;

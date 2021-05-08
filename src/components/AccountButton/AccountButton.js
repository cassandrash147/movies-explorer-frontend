import React from 'react';
import './AccountButton.css';
import { NavLink } from 'react-router-dom';
import icon from '../../images/icon.svg';
import { useLocation } from 'react-router-dom';

function AccountButton(props) {
	const location = useLocation();
	return (
		<li
			className={`account_button ${props.isHeader && 'account_button__header'}`}
		>
			<NavLink
				className={`navigation__link ${
					location.pathname === '/profile' && 'navigation__link_active'
				}`}
				to="/profile"
			>
				Аккаунт
				<img className="account__icon" src={icon} alt="Белый человечек" />
			</NavLink>
		</li>
	);
}

export default AccountButton;

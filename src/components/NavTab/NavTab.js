import React from 'react';
import './NavTab.css';

function NavTab() {
	return (
		<ul className="nav-tab">
			<li className="nav-tab__link-container">
				<a className="nav-tab__link" href="#progect">
					О проекте
				</a>
			</li>
			<li className="nav-tab__link-container">
				<a className="nav-tab__link" href="#tech">
					Технологии
				</a>
			</li>
			<li className="nav-tab__link-container">
				<a className="nav-tab__link" href="#student">
					Студент
				</a>
			</li>
		</ul>
	);
}

export default NavTab;

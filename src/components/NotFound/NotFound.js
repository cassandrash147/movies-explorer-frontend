import React from 'react';

import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(props) {
	return (
		<div className="notfound">
			<h2 className="notfound__err">404</h2>
			<p className="notfound__discription">Страница не найдена</p>

			<Link to="/" className="notfound__link">
				Назад
			</Link>
		</div>
	);
}

export default NotFound;

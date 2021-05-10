import React from 'react';

import './Footer.css';

function Footer() {
	var dateNow = new Date();

	return (
		<footer className="footer">
			<h3 className="footer__title">
				Учебный проект Яндекс.Практикум х BeatFilm.
			</h3>
			<div className="footer__container">
				<p className="footer__copyright">&copy; {dateNow.getFullYear()}</p>
				<ul className="footer__links">
					<li className="footer__link-li">
						<a
							className="footer__link"
							href="https://praktikum.yandex.ru"
							target="_blank"
							rel="noreferrer"
						>
							Яндекс.Практикум
						</a>
					</li>
					<li className="footer__link-li">
						<a
							className="footer__link"
							href="https://github.com/cassandrash147"
							target="_blank"
							rel="noreferrer"
						>
							Github
						</a>
					</li>
					<li className="footer__link-li">
						<a
							className="footer__link"
							href="https://www.facebook.com/alex.perepechenko.1/"
							target="_blank"
							rel="noreferrer"
						>
							Facebook
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;

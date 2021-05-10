import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
	return (
		<div className="portfolio">
			<h2 className="portfolio__title">Портфолио</h2>

			<ul className="portfolio__links">
				<li className="portfolio__link">
					<a
						href="https://github.com/cassandrash147/how-to-learn"
						className="portfolio__link-text"
						target="_blank"
						rel="noreferrer"
					>
						Статичный сайт
						<img
							src={arrow}
							alt="Стрелочка"
							className="portfolio__link-image"
						/>
					</a>
				</li>
				<li className="portfolio__link">
					<a
						href="https://github.com/cassandrash147/russian-travel"
						className="portfolio__link-text"
						target="_blank"
						rel="noreferrer"
					>
						Адаптивный сайт
						<img
							src={arrow}
							alt="Стрелочка"
							className="portfolio__link-image"
						/>
					</a>
				</li>
				<li className="portfolio__link">
					<a
						href="https://github.com/cassandrash147/react-mesto-api-full"
						className="portfolio__link-text"
						target="_blank"
						rel="noreferrer"
					>
						Одностраничное приложение
						<img
							src={arrow}
							alt="Стрелочка"
							className="portfolio__link-image"
						/>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Portfolio;

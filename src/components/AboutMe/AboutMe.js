import React from 'react';
import './AboutMe.css';
import photo from '../../images/portrait.png';

function AboutMe() {
	return (
		<div className="student" id="student">
			<h2 className="landing__title">Студент</h2>
			<section className="student__container">
				<div className="student__information">
					<h3 className="student__name">Александра</h3>
					<p className="student__subtitle">Фронтенд-разработчик, 26 лет</p>

					<p className="student__about">
						Я родился и живу в Саратове, закончил факультет экономики СГУ. У
						меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
						бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
						Контур». После того, как прошёл курс по веб-разработке, начал
						заниматься фриланс-заказами и ушёл с постоянной работы.
					</p>

					<ul className="student__links">
						<li className="student__link">
							<a
								href="https://www.facebook.com/alex.perepechenko.1/"
								className="student__link-text"
								target="_blank"
								rel="noreferrer"
							>
								Facebook
							</a>
						</li>
						<li className="student__link">
							<a
								href="https://github.com/cassandrash147"
								className="student__link-text"
								target="_blank"
								rel="noreferrer"
							>
								Github
							</a>
						</li>
					</ul>
				</div>
				<img className="student__photo" src={photo} alt="Портрет студента" />
			</section>
		</div>
	);
}

export default AboutMe;

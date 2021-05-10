import React from 'react';
import './AboutProject.css';

function AboutProject() {
	return (
		<div className="progect" id="progect">
			<h2 className="landing__title">О проекте</h2>
			<div className="progect__descrition">
				<article className="progect__descrition-element">
					<h3 className="progect__descrition-title">
						Дипломный проект включал 5 этапов
					</h3>
					<p className="progect__descrition-about">
						Составление плана, работу над бэкендом, вёрстку, добавление
						функциональности и финальные доработки.
					</p>
				</article>

				<article className="progect__descrition-element">
					<h3 className="progect__descrition-title">
						На выполнение диплома ушло 5 недель
					</h3>
					<p className="progect__descrition-about">
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
						соблюдать, чтобы успешно защититься.
					</p>
				</article>
			</div>
			<div className="progect__timeline-container">
				<div className="progect__timeline-column">
					<div className="progect__timeline progect__timeline_color_green">
						1 неделя
					</div>
					<p className="progect__timeline-about">Back-end</p>
				</div>

				<div className="progect__timeline-column">
					<div className="progect__timeline progect__timeline_color_grey">
						4 недели
					</div>
					<p className="progect__timeline-about">Front-end</p>
				</div>
			</div>
		</div>
	);
}

export default AboutProject;

import React from 'react';
import './Techs.css';

function Techs() {
	return (
		<div className="tech" id="tech">
			<h2 className="landing__title">Технологии</h2>
			<h3 className="tech__subtitle">7 технологий</h3>
			<p className="tech__about">
				На курсе веб-разработки мы освоили технологии, которые применили в
				дипломном проекте.
			</p>

			<ul className="tech__container">
				<li className="tech__element">HTML</li>
				<li className="tech__element">CSS</li>
				<li className="tech__element">JS</li>
				<li className="tech__element">React</li>
				<li className="tech__element">Git</li>
				<li className="tech__element">Express.js</li>
				<li className="tech__element">mongoDB</li>
			</ul>
		</div>
	);
}

export default Techs;

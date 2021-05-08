import React from 'react';
import { Route, Switch } from 'react-router';
import './MoviesCard.css';
import save from '../../images/save.svg';
import del from '../../images/del.svg';

function MoviesCard(props) {
	const [isFavorite, setFavorite] = React.useState(false);

	function handleFavoriteClick() {
		if (isFavorite) {
			setFavorite(false);
		} else {
			setFavorite(true);
		}
	}

	var decCache = [],
		decCases = [2, 0, 1, 1, 1, 2];
	function decOfNum(number, titles) {
		const intNumber = Math.floor(number);
		if (!decCache[intNumber])
			decCache[intNumber] =
				intNumber % 100 > 4 && intNumber % 100 < 20
					? 2
					: decCases[Math.min(intNumber % 10, 5)];
		return intNumber + ' ' + titles[decCache[intNumber]];
	}

	return (
		<article className="movie-card">
			<div className="movie-card__about">
				<h3 className="movie-card__title">{props.title}</h3>
				<p className="movie-card__duration">
					{decOfNum(props.duration, ['минута', 'минуты', 'минут'])}
				</p>
			</div>
			<img className="movie-card__photo" alt={props.title} src={props.link} />
			<Switch>
				<Route exact path="/movies">
					<button
						className={`movie-card__favorite-button ${
							isFavorite && `movie-card__favorite-button_active`
						}`}
						type="button"
						onClick={handleFavoriteClick}
					>
						{isFavorite ? (
							<img className="save__icon" src={save} alt="Галочка" />
						) : (
							`Сохранить`
						)}
					</button>
				</Route>
				<Route exact path="/saved-movies">
					<button className="movie-card__favorite-button" type="button">
						<img className="save__icon" src={del} alt="Крестик" />
					</button>
				</Route>
			</Switch>
		</article>
	);
}

export default MoviesCard;

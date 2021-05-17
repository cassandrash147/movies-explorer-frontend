import React from 'react';
import { Route, Switch } from 'react-router';
import './MoviesCard.css';
import save from '../../images/save.svg';
import del from '../../images/del.svg';

function MoviesCard(props) {
	const [isFavorite, setFavorite] = React.useState(props.favorite);

	function handleFavoriteClick(e) {
		if (!isFavorite) {
			setFavorite(true);
			props.createSavedMovie(props.cardMovie);
		} else {
			setFavorite(false);
			const cardId = props.saveMovies.find(
				(movie) => movie.movieId === props.cardMovie.id
			)._id;
			props.deleteSavedMovie(cardId);
		}
	}

	const handleRemoveCard = () => {
		
		props.deleteSavedMovie(props.cardMovie._id);
	};

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

	const handleOpenTrailer = () => {
		return window.open(props.trailerLink);
	};

	const calcTime = (number) => {
		const intNumber = Math.floor(number);
		if (intNumber < 60) {
			return decOfNum(intNumber, ['минута', 'минуты', 'минут']);
		} else if (intNumber > 60) {
			const hours = intNumber / 60;
			const minutes = intNumber % 60;
			return `${decOfNum(hours, ['час', 'часа', 'часов'])} ${decOfNum(minutes, [
				'минута',
				'минуты',
				'минут',
			])}`;
		} else if (intNumber % 60 === 0) {
			return decOfNum(intNumber, ['час', 'часа', 'часов']);
		}
	};

	return (
		<article className="movie-card">
			<div className="movie-card__about">
				<h3 className="movie-card__title">{props.title}</h3>
				<p className="movie-card__duration">{calcTime(props.duration)}</p>
			</div>
			<img
				className="movie-card__photo"
				alt={props.title}
				src={props.link}
				onClick={handleOpenTrailer}
			/>
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
					<button
						className="movie-card__favorite-button"
						type="button"
						onClick={handleRemoveCard}
					>
						<img className="save__icon" src={del} alt="Крестик" />
					</button>
				</Route>
			</Switch>
		</article>
	);
}

export default MoviesCard;

import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router';
import { WINDOW_WIDTH, BEATFILM_URL } from '../../utils/constants';
import plug from '../../images/notfound.jpg';

function MoviesCardList(props) {
	const location = useLocation().pathname;
	const [sliceNum, setSliceNum] = React.useState(0);
	const [addCards, setAddCards] = React.useState(0);

	React.useEffect(() => {
		if (WINDOW_WIDTH.LARGE) {
			setSliceNum(12);
			setAddCards(3);
		} else if (WINDOW_WIDTH.MEDIUM) {
			setSliceNum(8);
			setAddCards(2);
		} else if (WINDOW_WIDTH.SMALL) {
			setSliceNum(5);
			setAddCards(2);
		}
	}, []);

	window.onresize = () => {
		if (WINDOW_WIDTH.LARGE) {
			setTimeout(setAddCards, 2000, 3);
		} else {
			setTimeout(setAddCards, 2000, 2);
		}
	};

	const handleMoreButton = () => {
		setSliceNum(sliceNum + addCards);
	};

	return (
		<section className="movie-card-list">
			{location === '/movies' ? (
				<>
					{props.movies.length === 0 ? (
						<p className="movies-card-list__text-error">{props.textError}</p>
					) : (
						<div className="movie-card-list__grid">
							{props.movies.slice(0, sliceNum).map((movie) => {
								return (
									<MoviesCard
										title={movie.nameRU ? movie.nameRU : movie.nameEN}
										key={movie.id}
										duration={movie.duration ? movie.duration : ''}
										link={movie.image ? BEATFILM_URL + movie.image.url : plug}
										favorite={props.saveMovies.some(
											(saveMovie) => saveMovie.movieId === movie.id
										)}
										trailerLink={
											movie.trailerLink
												? movie.trailerLink
												: 'https://www.youtube.com'
										}
										createSavedMovie={props.createSavedMovie}
										cardMovie={movie}
										movies={props.movies}
										deleteSavedMovie={props.deleteSavedMovie}
										saveMovies={props.saveMovies}
									/>
								);
							})}
						</div>
					)}
					<button
						className={
							sliceNum >= props.movies.length
								? 'movies-card-list__button movies-card-list__button_disabled'
								: 'movies-card-list__button'
						}
						onClick={handleMoreButton}
						type="button"
					>
						Ещё
					</button>
				</>
			) : (
				<>
					{props.saveMovies.length === 0 ? (
						<p className="movies-card-list__text-error">{props.textError}</p>
					) : (
						<section className="movie-card-list">
							<div className="movie-card-list__grid">
								{props.saveMovies.map((movie) => {
									return (
										<MoviesCard
											title={movie.nameRU ? movie.nameRU : movie.nameEN}
											duration={movie.duration ? movie.duration : ''}
											link={movie.image ? movie.image : plug}
											key={movie.movieId}
											cardMovie={movie}
											trailerLink={
												movie.trailerLink
													? movie.trailerLink
													: 'https://www.youtube.com'
											}
											saveMovies={props.saveMovies}
											deleteSavedMovie={props.deleteSavedMovie}
										/>
									);
								})}
							</div>
						</section>
					)}
				</>
			)}
		</section>
	);
}

export default MoviesCardList;

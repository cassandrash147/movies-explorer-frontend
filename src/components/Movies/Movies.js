import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { SHORT_FILM_DURATION } from '../../utils/constants';

const Movies = (props) => {
	return (
		<>
			<SearchForm
				setSearchInput={props.setSearchInput}
				handleSearchMovie={props.handleSearchMovie}
				setShortMovie={props.setShortMovie}
			/>
			{props.isloading ? (
				<Preloader />
			) : (
				<MoviesCardList
					createSavedMovie={props.createSavedMovie}
					deleteSavedMovie={props.deleteSavedMovie}
					saveMovies={props.saveMovies}
					movies={
						props.isShortMovie
							? props.movies.filter(
									(movie) => movie.duration <= SHORT_FILM_DURATION
							  )
							: props.movies
					}
					textError={props.textError}
				/>
			)}
		</>
	);
};

export default Movies;

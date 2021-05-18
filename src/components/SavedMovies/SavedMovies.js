import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_FILM_DURATION } from '../../utils/constants';

const SavedMovies = (props) => {
	return (
		<>
			<SearchForm
				setSearchInput={props.setSearchInput}
				handleSearchMovie={props.handleSearchMovie}
				setShortMovie={props.setShortMovie}
			/>
			<MoviesCardList
				textError={props.textError}
				deleteSavedMovie={props.deleteSavedMovie}
				loggedIn={props.loggedIn}
				isloading={props.isloading}
				saveMovies={
					props.isShortMovie
						? props.saveMovies.filter(
								(movie) => movie.duration <= SHORT_FILM_DURATION
						  )
						: props.saveMovies
				}
			/>
		</>
	);
};

export default SavedMovies;

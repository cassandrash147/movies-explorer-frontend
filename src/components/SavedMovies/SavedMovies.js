import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {
	return (
		<>
			<SearchForm />
			<MoviesCardList />
		</>
	);
};

export default SavedMovies;

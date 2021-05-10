import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = (props) => {
	return (
		<>
			<SearchForm />
			{props.isLoading ? <Preloader /> : <MoviesCardList />}
		</>
	);
};

export default Movies;

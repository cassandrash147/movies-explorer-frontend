import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { Route, Switch } from 'react-router';

function MoviesCardList(props) {
	return (
		<Switch>
			<Route exact path="/movies">
				<section className="movie-card-list">
					<div className="movie-card-list__grid">
						<MoviesCard
							title="«Роллинг Стоунз» в изгнании"
							duration="61"
							link="https://api.nomoreparties.co/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="27"
							link="https://api.nomoreparties.co/uploads/wyr_139_03_7a244dbd6e.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="30.05"
							link="https://api.nomoreparties.co/uploads/Art_Cinema_Webslug_Mr_Baker_de10be970f.jpeg"
						/>
						<MoviesCard
							title="«Роллинг Стоунз» в изгнании"
							duration="61"
							link="https://api.nomoreparties.co/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="27"
							link="https://api.nomoreparties.co/uploads/wyr_139_03_7a244dbd6e.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="30.05"
							link="https://api.nomoreparties.co/uploads/Art_Cinema_Webslug_Mr_Baker_de10be970f.jpeg"
						/>
						<MoviesCard
							title="«Роллинг Стоунз» в изгнании"
							duration="61"
							link="https://api.nomoreparties.co/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="27"
							link="https://api.nomoreparties.co/uploads/wyr_139_03_7a244dbd6e.jpeg"
						/>
					</div>
					<button className="movies-card-list__button" type="button">
						Ещё
					</button>
				</section>
			</Route>
			<Route exact path="/saved-movies">
				<section className="movie-card-list">
					<div className="movie-card-list__grid">
						<MoviesCard
							title="«Роллинг Стоунз» в изгнании"
							duration="61"
							link="https://api.nomoreparties.co/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="27"
							link="https://api.nomoreparties.co/uploads/wyr_139_03_7a244dbd6e.jpeg"
						/>
						<MoviesCard
							title="В погоне за Бенкси"
							duration="30.05"
							link="https://api.nomoreparties.co/uploads/Art_Cinema_Webslug_Mr_Baker_de10be970f.jpeg"
						/>
					</div>
				</section>
			</Route>
		</Switch>
	);
}

export default MoviesCardList;

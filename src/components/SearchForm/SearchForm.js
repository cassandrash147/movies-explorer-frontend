import React from 'react';
import './SearchForm.css';

const SearchForm = (props) => {
	function handleSlider(e) {
		if (e.target.checked) {
			props.setShortMovie(true);
		} else {
			props.setShortMovie(false);
		}
	}

	const handleTextValue = (e) => {
		props.setSearchInput(e.target.value);
	};

	const handleSearchMovie = (e) => {
		e.preventDefault();
		document.getElementById('search_input').disabled = true;
		document.getElementById('search_button').disabled = true;
		props.handleSearchMovie(e);
	};

	return (
		<div className="search-form__container">
			<form className="search-form" noValidate onSubmit={handleSearchMovie}>
				<input
					id="search_input"
					className={'search-form__input'}
					type="text"
					placeholder="Фильм"
					minLength="2"
					required
					value={props.searchInput}
					onChange={handleTextValue}
				/>

				<button
					type="submit"
					className="search-form__button"
					id="search_button"
				>
					Найти
				</button>
			</form>

			<div className="search-tumbler__container">
				<label className="search-tumbler">
					<input
						onClick={handleSlider}
						type="checkbox"
						id="checkbox"
						className="search-tumbler__invisible-slider"
					/>
					<span className="search-tumbler__slider"></span>
				</label>
				<p className="search-tumbler__title">Короткометражки</p>
			</div>
		</div>
	);
};

export default SearchForm;

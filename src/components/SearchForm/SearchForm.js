import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
	const [validationError, setValidationError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [isMovie, setMovie] = React.useState('');

	function handleValidate(evt) {
		setMovie(evt.target.value);
		if (!evt.target.validity.valid) {
			setValidationError(true);
			setErrorMessage(evt.target.validationMessage);
		} else {
			setValidationError(false);
			setErrorMessage('');
		}
	}

	return (
		<div className="search-form__container">
			<form lassName="search-form" noValidate>
				<input
					className={`search-form__input ${
						validationError && `search-form__input-error`
					}`}
					type="text"
					placeholder="Фильм"
					minLength="2"
					required
					value={isMovie}
					onChange={handleValidate}
				/>

				<button type="submit" className="search-form__button">
					Найти
				</button>
			</form>
			<span
				className={`search-form__input-error ${
					validationError && 'form-element__input-error_active'
				}`}
			>
				{errorMessage}
			</span>
			<div className="search-tumbler__container">
				<label className="search-tumbler">
					<input type="checkbox" class="search-tumbler__invisible-slider" />
					<span className="search-tumbler__slider"></span>
				</label>
				<p className="search-tumbler__title">Короткометражки</p>
			</div>
		</div>
	);
};

export default SearchForm;

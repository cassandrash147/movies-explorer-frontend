import { BASE_URL, BEATFILM_URL } from '../utils/constants';

class Api {
	constructor({ url }) {
		this._url = url;
	}

	async _getResponseData(res) {
		const response = await res.json();
		if (res.ok) {
			return response;
		} else {
			return Promise.reject(response);
		}
	}

	getSavedMovies() {
		return fetch(`${this._url}/movies`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		}).then((res) => this._getResponseData(res));
	}

	addMovie(movie) {
		return fetch(`${this._url}/movies`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				country: movie.country ? movie.country : 'неизвестно',
				director: movie.director ? movie.director : 'неизвестен',
				duration: movie.duration ? movie.duration : '00',
				year: movie.year ? movie.year : 'неизвестно',
				description: movie.description ? movie.description : 'неизвестно',
				image: movie.image
					? BEATFILM_URL + movie.image.url
					: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
				trailer: movie.trailerLink
					? movie.trailerLink
					: 'https://www.youtube.com',
				thumbnail: movie.image
					? BEATFILM_URL + movie.image.formats.thumbnail.url
					: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
				movieId: movie.id,
				nameRU: movie.nameRU ? movie.nameRU : movie.nameEN,
				nameEN: movie.nameEN ? movie.nameEN : 'none',
			}),
		}).then((res) => this._getResponseData(res));
	}

	deleteMovie(movieId) {
		return fetch(`${this._url}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}).then((res) => this._getResponseData(res));
	}

	editProfile(name, email) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name: `${name}`,
				email: `${email}`,
			}),
		}).then((res) => this._getResponseData(res));
	}

	signup(name, email, password) {
		return fetch(`${this._url}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ name, email, password }),
		}).then((res) => this._getResponseData(res));
	}

	signin(email, password) {
		return fetch(`${this._url}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ password, email }),
		}).then((res) => this._getResponseData(res));
	}

	getCurrentUser(token) {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},

			credentials: 'include',
		}).then((res) => this._getResponseData(res));
	}
}

const mainApi = new Api({
	url: BASE_URL,
});

export default mainApi;

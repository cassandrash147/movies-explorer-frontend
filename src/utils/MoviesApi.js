import { BEATFILM_URL } from '../utils/constants';

class Api {
	constructor({ url }) {
		this._url = url;
	}

	_getResponseData(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(
				`Ошибка связи с сервером: ${res.status}, ${res.statusText}`
			);
		}
	}

	getMovies() {
		return fetch(`${this._url}/beatfilm-movies`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}).then((res) => this._getResponseData(res));
	}
}

const movieApi = new Api({
	url: BEATFILM_URL,
});

export default movieApi;

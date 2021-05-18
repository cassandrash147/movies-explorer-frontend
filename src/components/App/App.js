import React from 'react';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.css';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MoviesApi';
import { SHORT_FILM_DURATION, MESSAGE } from '../../utils/constants';

function App() {
	const history = useHistory();
	const location = useLocation().pathname;

	const [currentUser, setСurrentUser] = React.useState({});
	const [currentToken, setCurrentToken] = React.useState('');
	const [isLoggedIn, setLoggedIn] = React.useState(false);
	const [isSidebar, setSidebar] = React.useState(false);
	const [searchInput, setSearchInput] = React.useState('');
	const [isloading, setLoading] = React.useState(false);

	const [filtredMovies, setFiltredMovies] = React.useState([]);
	const [saveMovies, setSaveMovies] = React.useState([]);

	const [isShortMovie, setShortMovie] = React.useState(false);
	const [movieError, setMovieError] = React.useState('');
	const [errorText, setErrorText] = React.useState('');
	const [isError, setError] = React.useState(false);
	const [isLoginError, setIsLoginError] = React.useState(false);

	// ----Функции работы с фильмами---------------------------

	const filterMovies = (movieData, searchInput, isShortMovie) => {
		const reg = new RegExp(searchInput, 'gi');
		return movieData.filter((film) => {
			if (isShortMovie) {
				return (
					film.duration <= SHORT_FILM_DURATION &&
					(reg.test(film.nameRU) ||
						reg.test(film.description) ||
						reg.test(film.nameEN))
				);
			} else {
				return (
					reg.test(film.nameRU) ||
					reg.test(film.description) ||
					reg.test(film.nameEN)
				);
			}
		});
	};

	function handleSearchMovie(e) {
		setLoading(true);
		if (!localStorage.getItem('beatfilmmovies')) {
			movieApi
				.getMovies()
				.then((movieData) => {
					localStorage.setItem('beatfilmmovies', JSON.stringify(movieData));
					if (searchInput === '') {
						setMovieError(MESSAGE.ENTER_TEXT);
					} else {
						const filtredMovies = filterMovies(
							movieData,
							searchInput,
							isShortMovie
						);
						setFiltredMovies(filtredMovies);
						localStorage.setItem('movies', JSON.stringify(filtredMovies));
						setMovieError(MESSAGE.NOT_FOUND);
					}
				})
				.catch((err) => {
					console.log('Ошибка', err);
					setMovieError(MESSAGE.ERROR);
				})
				.finally(() => {
					setLoading(false);
					const setEnabled = () => {
						document.getElementById('search_button').disabled = false;
						document.getElementById('search_input').disabled = false;
					};
					setTimeout(setEnabled, 1500);
				});
		} else {
			const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmmovies'));
			const filtredMovies = filterMovies(
				beatfilmMovies,
				searchInput,
				isShortMovie
			);
			setFiltredMovies(filtredMovies);
			localStorage.setItem('movies', JSON.stringify(filtredMovies));
			setMovieError(MESSAGE.NOT_FOUND);
			setLoading(false);
			const setEnabled = () => {
				document.getElementById('search_button').disabled = false;
				document.getElementById('search_input').disabled = false;
			};
			setTimeout(setEnabled, 1500);
		}
	}

	React.useEffect(() => {
		const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
		if (isLoggedIn) {
			if (localStorageMovies) {
				setFiltredMovies(localStorageMovies);
			}
		}
	}, [isLoggedIn]);

	React.useEffect(() => {
		
		if (isLoggedIn) {
			mainApi.getSavedMovies()
			.then((savedMovieData) => {
				
				const mySavedMovies = savedMovieData.filter(
					(movie) => movie.owner === currentUser.id
				);
				
				setSaveMovies(mySavedMovies);
				localStorage.setItem('savedMovies', JSON.stringify(saveMovies));
			});
		}
	}, [isLoggedIn]);

	const getSavedMovies = (e) => {
		e.preventDefault();
		const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
		if (searchInput === '') {
			setSaveMovies(savedMovies);
		} else {
			const filteredMovies = filterMovies(
				savedMovies,
				searchInput,
				isShortMovie
			);
			setMovieError(MESSAGE.NOT_FOUND);
			setSaveMovies(filteredMovies);
			document.getElementById('search_button').disabled = false;
			document.getElementById('search_input').disabled = false;
		}
	};

	function deleteSavedMovie(id) {
		mainApi
			.deleteMovie(id)
			.then((moviecard) => {
				const newSavedCards = saveMovies.filter(
					(moviecard) => moviecard._id !== id
				);

				setSaveMovies(newSavedCards);
				localStorage.setItem('savedMovies', JSON.stringify(newSavedCards));
				setMovieError(MESSAGE.NOT_SAVED);
			})
			.catch((err) => {
				console.log('Ошибка', err);
			});
	}

	function createSavedMovie(moviedata) {
		mainApi
			.addMovie(moviedata)
			.then((newSavedMovies) => {
				setSaveMovies([...saveMovies, newSavedMovies]);
				localStorage.setItem(
					'savedMovies',
					JSON.stringify([...saveMovies, newSavedMovies])
				);
				setMovieError(MESSAGE.NOT_SAVED);
			})
			.catch((err) => {
				console.log('Ошибка', err);
				setMovieError(MESSAGE.ERROR);
			});
	}

	// ----Функции автозирации---------------------------
	function handleRegister(name, email, password) {
		mainApi
			.signup(name, email, password)
			.then((result) => {
				handleLogin(email, password);
				setErrorText('');
				setError(false);
			})
			.catch((err) => {
				console.log(err);
				setErrorText(err.message);
				setError(true);
			});
	}

	function handleLogin(email, password) {
		mainApi
			.signin(email, password)
			.then((result) => {
				if (result.token) {
					setLoggedIn(true);
					localStorage.setItem('token', result.token);
					setLoggedIn(true);
					handleTokenCheck();
					setIsLoginError(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrorText(err.message);
				setError(true);
			});
	}

	function handleLogout() {
		setLoggedIn(false);
		localStorage.removeItem('token');
		localStorage.removeItem('movies');
		localStorage.removeItem('savedMovies');
		localStorage.removeItem('beatfilmmovies');
		setСurrentUser({
			name: '',
			email: '',
		});
		history.push('/');
	}

	React.useEffect(() => {
		handleTokenCheck();
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleTokenCheck() {
		if (localStorage.getItem('token')) {
			const token = localStorage.getItem('token');

			mainApi
				.getCurrentUser(token)
				.then((res) => {
					setСurrentUser({ id: res._id, name: res.name, email: res.email });
					setCurrentToken(token);

					setLoggedIn(true);

					if (location === '/movies') {
						history.push('/movies');
					} else if (location === '/saved-movies') {
						history.push('/saved-movies');
					} else if (location === '/profile') {
						history.push('/profile');
					} else {
						history.push('/movies');
					}
				})
				.catch((err) => console.log(err));
		}
	}
console.log(isLoggedIn)
	// -----------------------------------------------------------------
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="content">
				<Header setSidebar={setSidebar} loggedIn={isLoggedIn} />
				<Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>

					<ProtectedRoute
						exact
						path="/movies"
						component={Movies}
						loggedIn={isLoggedIn}
						setShortMovie={setShortMovie}
						isShortMovie={isShortMovie}
						isloading={isloading}
						setSearchInput={setSearchInput}
						handleSearchMovie={handleSearchMovie}
						searchInput={searchInput}
						movies={filtredMovies}
						textError={movieError}
						createSavedMovie={createSavedMovie}
						deleteSavedMovie={deleteSavedMovie}
						saveMovies={saveMovies}
					/>

					<ProtectedRoute
						exact
						path="/saved-movies"
						handleSearchMovie={getSavedMovies}
						component={SavedMovies}
						loggedIn={isLoggedIn}
						setShortMovie={setShortMovie}
						isShortMovie={isShortMovie}
						isloading={isloading}
						setSearchInput={setSearchInput}
						textError={movieError}
						searchInput={searchInput}
						deleteSavedMovie={deleteSavedMovie}
						saveMovies={saveMovies}
					/>
					<ProtectedRoute
						exact
						path="/profile"
						component={Profile}
						loggedIn={isLoggedIn}
						currentUser={currentUser}
						setСurrentUser={setСurrentUser}
						handleLogout={handleLogout}
					></ProtectedRoute>

					<Route exact path="/signin">
						<Login
							loggedIn={isLoggedIn}
							handleSubmit={handleLogin}
							errorText={errorText}
							isError={isError}
						/>
					</Route>
					<Route exact path="/signup">
						<Register
							loggedIn={isLoggedIn}
							handleSubmit={handleRegister}
							errorText={errorText}
							isError={isError}
						/>
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
				<Footer />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

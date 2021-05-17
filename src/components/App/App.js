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
	const [movies, setMovies] = React.useState([]);
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
		e.preventDefault();
		setLoading(true);

		movieApi
			.getMovies()
			.then((movieData) => {
				if (searchInput === '') {
					setMovieError(MESSAGE.ENTER_TEXT);
				} else {
					const filtredMovies = filterMovies(
						movieData,
						searchInput,
						isShortMovie
					);
					setMovies(filtredMovies);
					localStorage.setItem('movies', JSON.stringify(filtredMovies));
					setMovieError(MESSAGE.NOT_FOUND);
				}
			})
			.catch((err) => {
				console.log('Ошибка', err);
				setMovieError(MESSAGE.ERROR);
			})
			.finally(() => setTimeout(setLoading, 1500, false));
	}

	

	React.useEffect(() => {
		const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
		if (isLoggedIn) {
			if (localStorageMovies) {
				setMovies(localStorageMovies);
			}
		}
	}, [isLoggedIn]);

	React.useEffect(() => {
		
		if (isLoggedIn && localStorage.getItem('token')) {
			mainApi.getSavedMovies()
			.then((savedMovieData) => {
				setSaveMovies(savedMovieData);
				localStorage.setItem('savedMovies', JSON.stringify(savedMovieData));
			});
		}
		
	}, [isLoggedIn, location]);


	const getSavedMovies = (e) => {
		e.preventDefault();
		const movies = JSON.parse(localStorage.getItem('savedMovies'));
		if (searchInput === '') {
			setSaveMovies(movies);
		} else {
			const filteredMovies = filterMovies(movies, searchInput, isShortMovie);
			setMovieError(MESSAGE.NOT_FOUND);
			setSaveMovies(filteredMovies);
			
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
					handleTokenCheck()
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
		setСurrentUser({
			name: '',
			email: '',
		});
		history.push('/');
	}

	
	React.useEffect(() => {
		if(isLoggedIn){
			const token = localStorage.getItem('token');
			handleTokenCheck()
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	function handleTokenCheck(){

		if(localStorage.getItem('token')){
			const token = localStorage.getItem('token');
			
			mainApi.getCurrentUser(token).then((res)=>{
				
				setСurrentUser({id: res._id, name: res.name, email: res.email});
				setCurrentToken(token);
				
				setLoggedIn(true);
			
					if (location === '/') {
						history.push('/movies');
					} else {
						history.push(location);
					}
			})
			.catch((err) => console.log(err));
		}
	}

	
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
						movies={movies}
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

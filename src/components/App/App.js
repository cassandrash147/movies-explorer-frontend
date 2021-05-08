import React from 'react';

import { Route, Switch } from 'react-router-dom';

import './App.css';

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

function App() {
	const [isSidebar, setSidebar] = React.useState(false);
	return (
		<div className="content">
			<Switch>
				<Route exact path="/">
					<Header />
					<Main />
					<Footer />
				</Route>

				<Route exact path="/movies">
					<Header setSidebar={setSidebar} />
					<Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
					<Movies

					// Для проверки показа прелоудера
					// isLoading="true"
					/>
					<Footer />
				</Route>
				<Route exact path="/saved-movies">
					<Header setSidebar={setSidebar} />
					<Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
					<SavedMovies />
					<Footer />
				</Route>
				<Route exact path="/profile">
					<Header setSidebar={setSidebar} />
					<Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
					<Profile />
				</Route>
				<Route exact path="/signin">
					<Login />
				</Route>
				<Route exact path="/signup">
					<Register />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}

export default App;

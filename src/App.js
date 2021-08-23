import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Loading from './partials/Loading';
import Failure from './components/Failure';
import Commands from './partials/Dashboard/Routes/Commands';
import Pricing from './components/Pricing';
import AdminLogin from './components/AdminLogin';
import Followers from './partials/Dashboard/Routes/Followers';

const App = () => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		let mounted = true;

		axios
			.get('https://carvbot-twitch-server.herokuapp.com/session/', {
				withCredentials: true,
			})
			.then((res) => {
				if (mounted) {
					if (!res.data.message) setAuth(true);
					else setAuth(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});

		return () => (mounted = false);
	}, []);

	if (auth != null) {
		return (
			<Router>
				<Switch>
					<Route path="/" exact>
						{auth ? <Redirect to="/dashboard" /> : <Home />}
					</Route>
					<Route path="/dashboard" exact>
						{auth ? <Dashboard /> : <NotFound />}
					</Route>
					<Route path="/dashboard/commands" exact>
						{auth ? <Commands /> : <NotFound />}
					</Route>
					<Route path="/dashboard/followers" exact>
						{auth ? <Followers /> : <NotFound />}
					</Route>

					<Route path="/pricing" exact component={Pricing} />

					<Route path="/login/twitch" exact>
						{() => {
							window.location.href =
								'https://carvbot-twitch-server.herokuapp.com/auth/twitch';
						}}
					</Route>
					<Route path="/logout/twitch" exact>
						{auth ? (
							() => {
								window.location.href =
									'https://carvbot-twitch-server.herokuapp.com/auth/twitch/logout';
							}
						) : (
							<Redirect to="/login/twitch" />
						)}
					</Route>

					<Route path="/failure" component={Failure} />
					<Route path="/admin" component={AdminLogin} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	} else {
		return <Loading />;
	}
};

export default App;

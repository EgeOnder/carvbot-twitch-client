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
import Profile from './partials/Dashboard/Routes/Profile';

const App = () => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		let mounted = true;

		axios
			.get(`${process.env.REACT_APP_API_DOMAIN}/session/`, {
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
					<Route path="/dashboard/profile" exact>
						{auth ? <Profile /> : <NotFound />}
					</Route>

					<Route path="/pricing" exact component={Pricing} />

					<Route path="/login/twitch" exact>
						{() => {
							window.location.href = `${process.env.REACT_APP_API_DOMAIN}/auth/twitch`;
						}}
					</Route>
					<Route path="/logout/twitch" exact>
						{auth ? (
							() => {
								window.location.href = `${process.env.REACT_APP_API_DOMAIN}/auth/twitch/logout`;
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

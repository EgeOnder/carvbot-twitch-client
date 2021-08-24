import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import {
	makeStyles,
	AppBar,
	Toolbar,
	Typography,
	Avatar,
	Button,
	Menu,
	MenuItem,
	Divider,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

import Loading from '../partials/Loading';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0,
		boxSizing: 'borderBox',
	},
	navTitle: {
		fontSize: '24px',
		flexGrow: 1,
		'&:hover': {
			textDecoration: 'none',
		},
	},
	navName: {
		marginRight: '12px',
	},
	profileMenu: {
		marginTop: '2rem',
		'& div': {
			width: '200px',
		},
	},
	toolbar: theme.mixins.toolbar,
}));

const Navbar = (props) => {
	const { onOpenChange } = props;

	const classes = useStyles();
	const history = useHistory();

	const [user, setUser] = useState([]);
	const [auth, setAuth] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleSwipeClick = useCallback(() => {
		onOpenChange(true);
	}, [onOpenChange]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(false);
	};

	const handleTwitchButton = () => {
		history.push('/login/twitch');
	};

	const handleLogOut = () => {
		history.push('/logout/twitch');
	};

	useEffect(() => {
		let mounted = true;

		axios
			.get(`${process.env.REACT_APP_API_DOMAIN}/session/`, {
				withCredentials: true,
			})
			.then((res) => {
				if (mounted) {
					if (res.data.message && res.data.message == 'Unauthorized')
						setAuth(false);
					else {
						setUser(res.data);
						setAuth(true);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});

		return () => (mounted = false);
	}, []);

	if (auth != null) {
		if (auth) {
			return (
				<>
					<AppBar color="default">
						<Toolbar>
							<div className="mobile-only">
								<Avatar
									src={
										process.env.REACT_APP_PUBLIC_URL +
										'/img/logo.png'
									}
									alt="Logo"
									style={{ marginRight: '12px' }}
								/>
								<Typography
									className={classes.navTitle}
									color="inherit"
								>
									Carvbot
								</Typography>
							</div>
							<div className="mobile-only-2">
								{onOpenChange ? (
									<MenuIcon onClick={handleSwipeClick} />
								) : null}
							</div>
							<Typography className={classes.navName}>
								{user.username}
							</Typography>
							<Avatar
								src={user.profile_picture}
								onClick={handleClick}
								style={{ cursor: 'pointer' }}
							/>
							<Menu
								open={Boolean(anchorEl)}
								keepMounted
								onClose={handleClose}
								className={classes.profileMenu}
								anchorEl={anchorEl}
							>
								<MenuItem
									onClick={() => history.push('/dashboard')}
								>
									Dashboard
								</MenuItem>
								<MenuItem
									onClick={() => history.push('/profile')}
								>
									Profile
								</MenuItem>
								<Divider style={{ margin: '4px' }} />
								<MenuItem onClick={handleLogOut}>
									Log out
								</MenuItem>
							</Menu>
						</Toolbar>
					</AppBar>
				</>
			);
		} else {
			return (
				<>
					<AppBar color="default">
						<Toolbar>
							<Avatar
								src={
									process.env.REACT_APP_PUBLIC_URL +
									'/img/logo.png'
								}
								style={{ marginRight: '12px' }}
							/>
							<Typography
								className={classes.navTitle}
								color="inherit"
							>
								Carvbot
							</Typography>
							<Button
								startIcon={<KeyboardArrowRightIcon />}
								variant="outlined"
								style={{
									backgroundColor: '#6441a5',
									color: '#fff',
								}}
								onClick={handleTwitchButton}
							>
								Log in
							</Button>
						</Toolbar>
					</AppBar>
				</>
			);
		}
	} else {
		return <Loading />;
	}
};

export default Navbar;

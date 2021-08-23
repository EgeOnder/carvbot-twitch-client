import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import DashboardIcon from '@material-ui/icons/Dashboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RedeemIcon from '@material-ui/icons/Redeem';
import CodeIcon from '@material-ui/icons/Code';
import StarIcon from '@material-ui/icons/Star';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
	Typography,
	Drawer,
	makeStyles,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Avatar,
	Divider,
} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	active: {
		background: '#f4f4f4',
	},
	title: {
		padding: theme.spacing(2),
	},
	pushDown: {
		position: 'fixed',
		bottom: 0,
		textAlign: 'center',
		paddingBottom: '10',
		width: drawerWidth,
		left: 0,
	},
}));

const PermDrawer = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const listItems = [
		{
			text: 'Overview',
			icon: <DashboardIcon />,
			path: '/dashboard',
		},
		{
			text: 'Commands',
			icon: <CodeIcon />,
			path: '/dashboard/commands',
		},
		{
			text: 'Followers',
			icon: <FavoriteIcon />,
			path: '/dashboard/followers',
		},
		{
			text: 'Giveaways',
			icon: <RedeemIcon />,
			path: '/dashboard/giveaway',
		},
		{
			text: 'Spotify Integration',
			icon: <MusicNoteIcon />,
			path: '/dashboard/spotify',
		},
		{
			text: 'Profile',
			icon: <AccountCircleIcon />,
			path: '/profile',
		},
	];

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: classes.drawerPaper }}
			>
				<div style={{ display: 'flex' }}>
					<Avatar
						src={process.env.PUBLIC_URL + '/img/logo.png'}
						style={{ marginTop: '12px', marginLeft: '12px' }}
					/>
					<Typography variant="h5" className={classes.title}>
						Dashboard
					</Typography>
				</div>

				<Divider />
				<List>
					{listItems.map((item) => (
						<ListItem
							key={item.text}
							button
							onClick={() => history.push(item.path)}
							className={
								location.pathname == item.path
									? classes.active
									: null
							}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					<ListItem button onClick={() => history.push('/pricing')}>
						<ListItemIcon>
							<StarIcon />
						</ListItemIcon>
						<ListItemText primary="Get PRO" />
					</ListItem>
				</List>
				<Divider />
				<div className={classes.pushDown}>
					<Divider />
					<List>
						<ListItem
							button
							onClick={() => history.push('/logout/twitch')}
						>
							<ListItemIcon>
								<PowerSettingsNewIcon />
							</ListItemIcon>
							<ListItemText primary="Log out" />
						</ListItem>
					</List>
				</div>
			</Drawer>
		</>
	);
};

export default PermDrawer;

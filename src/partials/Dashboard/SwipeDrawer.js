import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
	Box,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemText,
	Divider,
	Avatar,
	Typography,
	makeStyles,
	ListItemIcon,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RedeemIcon from '@material-ui/icons/Redeem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CodeIcon from '@material-ui/icons/Code';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
	customDrawer: {
		width: drawerWidth,
	},
	paperDrawer: {
		width: drawerWidth,
	},
	active: {
		background: '#f4f4f4',
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

const SwipeDrawer = (props) => {
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	// eslint-disable-next-line react/prop-types
	let { open, onOpenChange } = props;

	return (
		<div>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onClose={() => onOpenChange(false)}
				className={classes.customDrawer}
				classes={{ paper: classes.paperDrawer }}
				onOpen={() => {}}
			>
				<div>
					<Box display="flex" p={2}>
						<Avatar
							src={
								process.env.REACT_APP_PUBLIC_URL +
								'/img/logo.png'
							}
							alt="Logo"
							style={{ marginRight: '12px' }}
						/>
						<Typography variant="h5" style={{ marginTop: '4px' }}>
							Dashboard
						</Typography>
					</Box>
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
						<ListItem
							button
							onClick={() => history.push('/pricing')}
						>
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
				</div>
			</SwipeableDrawer>
		</div>
	);
};

export default SwipeDrawer;

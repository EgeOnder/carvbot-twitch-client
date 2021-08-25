import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';

import {
	makeStyles,
	Grid,
	Paper,
	Avatar,
	Divider,
	Typography,
} from '@material-ui/core';

import SwipeDrawer from '../SwipeDrawer';
import PermDrawer from '../PermDrawer';
import Navbar from '../../Navbar';
import Loading from '../../Loading';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		height: '85%',
	},
	avatar: {
		height: theme.spacing(18),
		width: theme.spacing(18),
	},
	avatar_wrapper: {
		width: '100%',
		paddingLeft: theme.spacing(12),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
	},
	divider: {
		margin: theme.spacing(4),
	},
	title: {
		fontWeight: 'bold',
		paddingLeft: theme.spacing(8),
	},
	info: {
		paddingRight: theme.spacing(8),
	},
	flex: {
		display: 'flex',
		justifyContent: 'space-between',
		flexGrow: 1,
	},
}));

const Profile = () => {
	const [swipeOpen, setSwipeOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [channelInfo, setChannelInfo] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		let mounted = true;

		axios
			.get(`${process.env.REACT_APP_API_DOMAIN}/session/`, {
				withCredentials: true,
			})
			.then((res) => {
				if (mounted) {
					setUser(res.data);

					axios
						.get(
							`${process.env.REACT_APP_API_DOMAIN}/api/channel/${res.data.twitchId}`,
							{
								headers: {
									Authorization: `Bearer ${res.data.access_token}`,
									'Client-Id': process.env.TWITCH_CLIENT_ID,
								},
							}
						)
						.then((response) => {
							setChannelInfo(response.data.data);
						})
						.catch((error) => {
							console.error(error);
						});
				}
			});

		return () => (mounted = false);
	}, []);

	console.log(channelInfo);

	if (user != null && channelInfo != null) {
		return (
			<>
				<Navbar onOpenChange={setSwipeOpen} />
				<div style={{ display: 'flex', width: '100%', height: '100%' }}>
					{isMobile ? (
						<SwipeDrawer
							open={swipeOpen}
							onOpenChange={setSwipeOpen}
						/>
					) : (
						<PermDrawer />
					)}
					<div
						style={{
							width: '90%',
							height: '100vh',
							marginRight: '5%',
							marginLeft: '5%',
							marginTop: '7.5%',
						}}
					>
						<Grid container spacing={4} style={{ height: '100vh' }}>
							<Grid item xs={12} sm={8} className={classes.grid}>
								<Paper
									className={classes.paper}
									elevation={6}
									variant="outlined"
								></Paper>
							</Grid>
							<Grid item xs={12} sm={4} className={classes.grid}>
								<Paper className={classes.paper} elevation={6}>
									<div className={classes.avatar_wrapper}>
										<Avatar
											src={user.profile_picture}
											className={classes.avatar}
										/>
									</div>
									<Typography variant="h5">
										{user.username}
									</Typography>
									<Divider className={classes.divider} />
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											ID:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{user.twitchId}
										</Typography>
									</div>
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											LOGIN:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{user.login}
										</Typography>
									</div>
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											DISPLAY:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{user.username}
										</Typography>
									</div>
									{user.email ? (
										<div className={classes.flex}>
											<Typography
												variant="body1"
												className={classes.title}
											>
												E-MAIL:
											</Typography>
											<Typography
												variant="body1"
												className={classes.info}
											>
												{user.email}
											</Typography>
										</div>
									) : null}
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											LANGUAGE:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
											style={{
												textTransform: 'uppercase',
											}}
										>
											{
												channelInfo[0]
													.broadcaster_language
											}
										</Typography>
									</div>
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											GAME:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{channelInfo[0].game_name}
										</Typography>
									</div>
									<div className={classes.flex}>
										<Typography
											variant="body1"
											className={classes.title}
										>
											TITLE:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{channelInfo[0].title}
										</Typography>
									</div>
									<div
										className={classes.flex}
										style={{ marginBottom: '72px' }}
									>
										<Typography
											variant="body1"
											className={classes.title}
										>
											DELAY:
										</Typography>
										<Typography
											variant="body1"
											className={classes.info}
										>
											{channelInfo[0].delay}
										</Typography>
									</div>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</div>
			</>
		);
	} else return <Loading />;
};

export default Profile;

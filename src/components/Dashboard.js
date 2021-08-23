import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import Masonry from 'react-masonry-css';

import PermDrawer from '../partials/Dashboard/PermDrawer';
import SwipeDrawer from '../partials/Dashboard/SwipeDrawer';
import Navbar from '../partials/Navbar';
import ModCard from '../partials/Dashboard/Cards/ModCard';
import CommandCard from '../partials/Dashboard/Cards/CommandCard';
import ChatCard from '../partials/Dashboard/Cards/ChatCard';
import FollowerChartCard from '../partials/Dashboard/Cards/FollowerChartCard';
import LiveCard from '../partials/Dashboard/Cards/LiveCard';
import Loading from '../partials/Loading';
import GeneralInfo from '../partials/Dashboard/Cards/GeneralInfo';

const Dashboard = () => {
	const [user, setUser] = useState(null);
	const [moderators, setModerators] = useState(null);
	const [swipeOpen, setSwipeOpen] = useState(false);
	const [commands, setCommands] = useState(null);
	const [liveInfo, setLiveInfo] = useState(null);
	const [channelInfo, setChannelInfo] = useState(null);

	useEffect(() => {
		let mounted = true;

		axios
			.get('https://carvbot-twitch-server.herokuapp.com/session/', {
				withCredentials: true,
			})
			.then((res) => {
				if (mounted) {
					setUser(res.data);
					axios
						.get(
							`https://carvbot-twitch-server.herokuapp.com/api/mod/${res.data.twitchId}`
						)
						.then((response) => {
							setModerators(false);
							response.data.forEach((mod) => {
								if (mod.user_name == 'Carvbot')
									setModerators(true);
							});
						})
						.catch((error) => {
							console.error(error);
						});
					axios
						.get(
							`https://carvbot-twitch-server.herokuapp.com/api/commands/${res.data.twitchId}`
						)
						.then((response) => {
							if (
								response.data.commands &&
								response.data.commands.length != 0
							)
								setCommands(true);
							else setCommands(false);
						})
						.catch((error) => {
							console.error(error);
						});
					axios
						.get(
							`https://carvbot-twitch-server.herokuapp.com/api/streaminfo/${res.data.login}/${res.data.login}`,
							{
								headers: {
									Authorization: `Bearer ${res.data.access_token}`,
									'Client-Id': process.env.TWITCH_CLIENT_ID,
								},
							}
						)
						.then((response) => {
							setLiveInfo(response.data.data);
						})
						.catch((error) => {
							console.error(error);
						});
					axios
						.get(
							`https://carvbot-twitch-server.herokuapp.com/api/channel/${res.data.twitchId}`,
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
			})
			.catch((error) => {
				console.error(error);
			});

		return () => (mounted = false);
	}, []);

	const breakpoints = {
		default: 2,
		768: 1,
	};
	if (
		moderators != null &&
		commands != null &&
		user != null &&
		liveInfo != null
	) {
		return (
			<>
				<Navbar onOpenChange={setSwipeOpen} />
				<div style={{ display: 'flex' }}>
					{isMobile ? (
						<SwipeDrawer
							open={swipeOpen}
							onOpenChange={setSwipeOpen}
						/>
					) : (
						<PermDrawer />
					)}
					<div className="content">
						<Masonry
							breakpointCols={breakpoints}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{moderators ? null : <ModCard />}
							<GeneralInfo user={channelInfo} />
							{commands ? null : <CommandCard />}
							<ChatCard user={user.username} height="300" />
							<FollowerChartCard />
							{liveInfo.length == 0 ? null : (
								<LiveCard data={liveInfo} />
							)}
						</Masonry>
					</div>
				</div>
			</>
		);
	} else return <Loading />;
};

export default Dashboard;

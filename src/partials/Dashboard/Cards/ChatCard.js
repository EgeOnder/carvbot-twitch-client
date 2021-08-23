import React from 'react';

import ChatIcon from '@material-ui/icons/Chat';
import { Button, makeStyles } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';

const useStyles = makeStyles(() => ({
	twitchFrame: {
		width: '100%',
	},
}));

const ModCard = (props) => {
	// eslint-disable-next-line react/prop-types
	const { user, height } = props;
	const classes = useStyles();

	return (
		<>
			<FeaturesCard
				title={
					<Button
						variant="text"
						color="inherit"
						startIcon={<ChatIcon />}
						className="card-button"
					>
						Your Twitch chat
					</Button>
				}
				details={
					<iframe
						src={`https://www.twitch.tv/embed/${user}/chat`}
						height={height}
						className={classes.twitchFrame}
					></iframe>
				}
			/>
		</>
	);
};

export default ModCard;

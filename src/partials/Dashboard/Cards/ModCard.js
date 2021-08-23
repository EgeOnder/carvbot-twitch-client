import React from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';

const ModCard = () => {
	return (
		<>
			<FeaturesCard
				title={
					<Button
						variant="text"
						color="inherit"
						startIcon={<ClearIcon />}
						className="card-button"
					>
						Moderation missing
					</Button>
				}
				details={
					<>
						Carvbot is not a moderator in your channel. This might
						cause some issues because Carvbot wants permissions to
						do some actions. To make Carvbot a bot in your channel,
						please type <code>/mod Carvbot</code> in your own chat.
					</>
				}
				type="error"
			/>
		</>
	);
};

export default ModCard;

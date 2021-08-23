import { useHistory } from 'react-router-dom';
import React from 'react';

import TimelineIcon from '@material-ui/icons/Timeline';
import { Button } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';
import ViewerChart from '../Chart';

const ModCard = () => {
	const history = useHistory();

	return (
		<>
			<FeaturesCard
				title={
					<Button
						variant="text"
						color="inherit"
						startIcon={<TimelineIcon />}
						className="card-button"
					>
						Follower count chart
					</Button>
				}
				details={
					<>
						<ViewerChart />
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push('/dashboard/followers')}
						>
							More info
						</Button>
					</>
				}
			/>
		</>
	);
};

export default ModCard;

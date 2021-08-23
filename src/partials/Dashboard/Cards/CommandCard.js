import { useHistory } from 'react-router-dom';
import React from 'react';

import CodeIcon from '@material-ui/icons/Code';
import { Button } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';

const ModCard = () => {
	const history = useHistory();

	return (
		<>
			<FeaturesCard
				title={
					<Button
						variant="text"
						color="inherit"
						startIcon={<CodeIcon />}
						className="card-button"
					>
						Create a command
					</Button>
				}
				details={
					<>
						<div>
							You don&apos;t have any commands. To make moderation
							and your life easy, you can create commands any time
							from Commands section.
						</div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push('/dashboard/commands')}
							style={{
								marginTop: '36px',
							}}
						>
							Create your first command
						</Button>
					</>
				}
			/>
		</>
	);
};

export default ModCard;

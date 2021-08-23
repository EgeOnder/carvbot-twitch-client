/* eslint-disable react/prop-types */
import React from 'react';

import InfoIcon from '@material-ui/icons/Info';
import { Button } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';

const numberWithCommas = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const GeneralInfo = (props) => {
	const { user } = props;

	if (user && user.length !== 0) {
		return (
			<>
				<FeaturesCard
					title={
						<Button
							variant="text"
							color="inherit"
							startIcon={<InfoIcon />}
							className="card-button"
						>
							General info
						</Button>
					}
					details={
						<div>
							<p>
								<strong>USERNAME:</strong>{' '}
								{user[0].broadcaster_name}
							</p>
							<p style={{ textTransform: 'uppercase' }}>
								<strong>LANGUAGE(S):</strong>{' '}
								{user[0].broadcaster_language}
							</p>
							<p>
								<strong>GAME:</strong> {user[0].game_name}
							</p>
							<p>
								<strong>TITLE:</strong> {user[0].title}
							</p>
							<p>
								<strong>DELAY:</strong>{' '}
								{numberWithCommas(user[0].delay)}
							</p>
						</div>
					}
				/>
			</>
		);
	} else return null;
};

export default GeneralInfo;

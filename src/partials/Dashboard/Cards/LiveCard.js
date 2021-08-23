/* eslint-disable react/prop-types */
import React from 'react';

import LiveTvIcon from '@material-ui/icons/LiveTv';
import { Button } from '@material-ui/core';

import FeaturesCard from '../../FeaturesCard';

const numberWithCommas = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const LiveCard = (props) => {
	const { data } = props;

	return (
		<>
			<FeaturesCard
				title={
					<Button
						variant="text"
						color="inherit"
						startIcon={<LiveTvIcon />}
						className="card-button"
					>
						Current stream information
					</Button>
				}
				details={
					<div>
						<p>
							<span style={{ color: 'red' }}>
								{data.length == 0 ? null : '🔴'}
							</span>{' '}
							You are currently <strong>LIVE!</strong>
						</p>
						<br />
						<p>
							<strong>TITLE:</strong> {data[0].title}
						</p>
						<p>
							<strong>GAME:</strong> {data[0].game_name}
						</p>
						<p>
							<strong>VIEWERS:</strong>{' '}
							{numberWithCommas(data[0].viewer_count)}
						</p>
					</div>
				}
			/>
		</>
	);
};

export default LiveCard;

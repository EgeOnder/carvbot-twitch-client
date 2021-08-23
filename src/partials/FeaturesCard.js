import React from 'react';

import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	makeStyles,
} from '@material-ui/core';

const useStyle = makeStyles(() => ({
	card: {
		border: ({ type }) => {
			if (type == 'error') return '1px solid red';
		},
		backgroundColor: ({ type }) => {
			if (type == 'error') return 'rgba(255, 54, 0, 0.1)';
		},
	},
}));

const FeaturesCard = (props) => {
	/* eslint-disable react/prop-types */
	const { title, details, type, subtitle } = props;

	const classes = useStyle({ type });

	return (
		<>
			<Card elevation={3} className={classes.card}>
				<CardHeader title={title} subheader={subtitle} />
				<CardContent>
					<Typography variant="body2" color="textSecondary">
						{details}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default FeaturesCard;

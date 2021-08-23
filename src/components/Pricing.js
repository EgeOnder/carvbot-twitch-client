import React from 'react';

import PricingHeader from '../partials/PricingHeader';
import Navbar from '../partials/Navbar';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
	},
	button: {
		backgroundColor: '#7289da',
		color: '#fff',
	},
}));

const Pricing = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />
			<PricingHeader />
		</div>
	);
};

export default Pricing;

import React from 'react';

import Header from '../partials/Header';
import SectionTwo from '../partials/SectionTwo';
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

const Home = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />
			<Header />
			<SectionTwo />
		</div>
	);
};

export default Home;

import React from 'react';

import FeaturesCard from './FeaturesCard';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CodeIcon from '@material-ui/icons/Code';

import '../css/sectiontwo.scss';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	customButton: {
		fontSize: '18px',
		textTransform: 'none',
		'&:hover': {
			background: 'transparent',
			cursor: 'auto',
		},
	},
}));

const SectionTwo = () => {
	const classes = useStyles();

	return (
		<div className="s2-body">
			<h2 className="s2-features">Features</h2>
			<div className="s2-container">
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<MoneyOffIcon />}
								className={classes.customButton}
							>
								Completely Free
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<CheckCircleIcon />}
								className={classes.customButton}
							>
								Ultimate Moderation
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<DashboardIcon />}
								className={classes.customButton}
							>
								Free Dashboard
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
			</div>
			<div className="s2-container">
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<CardGiftcardIcon />}
								className={classes.customButton}
							>
								Easy Giveaways
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<MusicNoteIcon />}
								className={classes.customButton}
							>
								Spotify Integration
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
				<div className="s2-item">
					<FeaturesCard
						title={
							<Button
								variant="text"
								color="inherit"
								startIcon={<CodeIcon />}
								className={classes.customButton}
							>
								Open Source
							</Button>
						}
						details={
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, cumque dolores autem labore rem esse aperiam, doloremque nemo, quibusdam eum ex eius error debitis possimus alias sapiente harum incidunt facere?'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default SectionTwo;

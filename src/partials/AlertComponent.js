import React from 'react';
import { makeStyles, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
		marginBottom: theme.spacing(3),
	},
}));

const AlertComponent = (props) => {
	const classes = useStyles();

	// eslint-disable-next-line react/prop-types
	const { severity, message } = props;

	if (severity != null && message != null) {
		return (
			<div className={classes.root}>
				<Collapse in={true}>
					<Alert variant="filled" severity={severity}>
						{message}
					</Alert>
				</Collapse>
			</div>
		);
	} else return null;
};

export default AlertComponent;

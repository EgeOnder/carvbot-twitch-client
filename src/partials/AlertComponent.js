import React, { useState } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
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
	const [open, setOpen] = useState(true);

	// eslint-disable-next-line react/prop-types
	const { severity, message } = props;

	if (severity != null && message != null) {
		return (
			<div className={classes.root}>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={open}
					autoHideDuration={6000}
					onClose={() => {
						setOpen(false);
					}}
				>
					<Alert
						variant="filled"
						onClose={() => {
							setOpen(false);
						}}
						severity={severity}
					>
						{message}
					</Alert>
				</Snackbar>
			</div>
		);
	} else return null;
};

export default AlertComponent;

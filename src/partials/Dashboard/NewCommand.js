import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const NewCommand = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [modalStyle] = useState(getModalStyle);

	return (
		<>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 id="simple-modal-title">Text in a modal</h2>
					<p id="simple-modal-description">
						Duis mollis, est non commodo luctus, nisi erat porttitor
						ligula.
					</p>
					<NewCommand />
				</div>
			</Modal>
		</>
	);
};

export default NewCommand;
